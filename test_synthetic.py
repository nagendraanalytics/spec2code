"""Synthetic data management: generate from library spec / batch item / inline spec, edit, coverage, sign-off, export."""
import json
import os
import tempfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/syn.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

from fastapi.testclient import TestClient  # noqa: E402

import main  # noqa: E402
import models_db as m  # noqa: E402
import db  # noqa: E402
import synthetic_data_agent as agent  # noqa: E402

client = TestClient(main.app, headers={"X-Tenant-Id": "syn", "X-User-Id": "prog1"})
SEEN = {}


def fake(spec, meta="", kb=""):
    SEEN.update(spec=spec, meta=meta, kb=kb)
    return agent.sanitize({
        "conditions": [{"id": "c1", "text": "Logic 1: AE.Term not null"}, {"id": "c2", "text": "Logic 2: form not deleted"}],
        "cases": [
            {"id": "k1", "conditionId": "c1", "expectation": "include", "scenario": "term present", "rationale": "Logic 1",
             "tables": [{"form": "AE", "rows": [{"SubjectId": "S001", "Term": "Headache"}]}]},
            {"id": "k2", "conditionId": "c1", "expectation": "exclude", "boundary": True, "scenario": "term null", "rationale": "Logic 1",
             "tables": [{"form": "AE", "rows": [{"SubjectId": "S002", "Term": ""}]}]},
            {"id": "k3", "conditionId": "c2", "expectation": "include", "scenario": "live", "rationale": "Logic 2",
             "tables": [{"form": "AE", "rows": [{"SubjectId": "S003", "Term": "Rash", "Deleted": "N"}]}]},
        ],
        "open_questions": ["Is blank different from null?"], "summary": "ok"})


agent.run_synthetic_generation = fake
SPEC = {"reportId": "SYN1", "description": "Adverse events listing", "logic": "AE.Term not null and not deleted"}


def gen(**kw):
    r = client.post("/api/synthetic/generate", json={"spec": SPEC, **kw})
    assert r.status_code == 200, r.text
    return r.json()


def test_generate_inline_reports_coverage_gap_and_counts():
    d = gen()
    assert d["version"] == 1 and d["status"] == "draft" and d["caseCount"] == 3 and d["include"] == 2 and d["exclude"] == 1
    assert d["coverage"]["uncovered"] == ["c2"] and d["coverage"]["covered"] == 1
    assert d["coverage"]["conditions"][1]["gap"] == "no exclude case"
    assert d["openQuestions"] == ["Is blank different from null?"]


def test_signoff_needs_gaps_fixed_or_acknowledged_and_a_reviewer():
    d = gen()
    assert client.post(f"/api/synthetic/{d['id']}/approve", json={}).status_code == 409
    anon = TestClient(main.app, headers={"X-Tenant-Id": "syn"})
    assert anon.post(f"/api/synthetic/{d['id']}/approve", json={"acknowledgeGaps": True}).status_code == 400
    r = client.post(f"/api/synthetic/{d['id']}/approve", json={"acknowledgeGaps": True}).json()
    assert r["status"] == "reviewed" and r["reviewedBy"] == "prog1"


def test_edit_adds_missing_case_returns_set_to_draft_and_then_signs_clean():
    d = gen()
    client.post(f"/api/synthetic/{d['id']}/approve", json={"acknowledgeGaps": True})
    cases = d["cases"] + [{"id": "k4", "conditionId": "c2", "expectation": "exclude", "scenario": "deleted", "rationale": "Logic 2", "note": "added by reviewer",
                           "tables": [{"form": "AE", "rows": [{"SubjectId": "S004", "Deleted": "Y"}]}]}]
    e = client.patch(f"/api/synthetic/{d['id']}", json={"cases": cases}).json()
    assert e["status"] == "draft" and e["edited"] and e["reviewedBy"] == "" and e["coverage"]["uncovered"] == []
    assert [c["note"] for c in e["cases"]][-1] == "added by reviewer"
    assert client.post(f"/api/synthetic/{d['id']}/approve", json={}).json()["status"] == "reviewed"
    bad = client.patch(f"/api/synthetic/{d['id']}", json={"cases": [{"id": "x", "expectation": "maybe"}]})
    assert bad.status_code == 400


def test_regenerating_retires_the_old_version_and_retired_cannot_be_edited():
    a = gen(); b = gen()
    assert b["version"] == a["version"] + 1
    old = client.get(f"/api/synthetic/{a['id']}").json()
    assert old["status"] == "retired"
    assert client.patch(f"/api/synthetic/{a['id']}", json={"cases": old["cases"]}).status_code == 409
    assert client.post(f"/api/synthetic/{a['id']}/approve", json={"acknowledgeGaps": True}).status_code == 409


def test_generate_from_library_spec_and_batch_item_and_errors():
    sp = client.post("/api/specs/import", json={"files": [], "dryRun": False})  # no-op, just proves the route coexists
    assert sp.status_code in (200, 400)
    s = db.SessionLocal()
    try:
        row = main.store.create_spec(s, "syn", {"reportId": "LIB1", "description": "Library spec", "logic": "x"})
        job = m.BatchJob(tenant_id="syn", name="b")
        s.add(job); s.commit()
        it = m.BatchItem(job_id=job.id, tenant_id="syn", report_id="BAT1", spec_json=json.dumps({"reportId": "BAT1", "description": "Batch spec", "logic": "y"}))
        empty = m.BatchItem(job_id=job.id, tenant_id="syn", report_id="BAT2", spec_json="")
        s.add_all([it, empty]); s.commit()
        ids = (row.id, job.id, it.id, empty.id)
    finally:
        s.close()
    assert gen_by(specId=ids[0])["reportId"] == "LIB1" and SEEN["spec"]["description"] == "Library spec"
    d = gen_by(batchId=ids[1], batchItemId=ids[2])
    assert d["reportId"] == "BAT1" and d["batchId"] == ids[1]
    assert client.post("/api/synthetic/generate", json={"batchId": ids[1], "batchItemId": ids[3]}).status_code == 400
    assert client.post("/api/synthetic/generate", json={"specId": "nope"}).status_code == 404
    assert client.post("/api/synthetic/generate", json={}).status_code == 400
    assert len(client.get(f"/api/synthetic?batchId={ids[1]}").json()) == 1


def gen_by(**kw):
    r = client.post("/api/synthetic/generate", json=kw)
    assert r.status_code == 200, r.text
    return r.json()


def test_export_csv_flat_and_json_and_tenant_isolation():
    d = gen()
    csv_text = client.get(f"/api/synthetic/{d['id']}/export").text.splitlines()
    assert csv_text[0].startswith("case_id,condition_id,expectation,boundary,form,SubjectId,Term,Deleted") and len(csv_text) == 4
    assert "k2,c1,exclude,yes,AE,S002" in csv_text[2]
    assert json.loads(client.get(f"/api/synthetic/{d['id']}/export?format=json").text)["reportId"] == "SYN1"
    other = TestClient(main.app, headers={"X-Tenant-Id": "other", "X-User-Id": "x"})
    assert other.get(f"/api/synthetic/{d['id']}").status_code == 404
    assert other.get("/api/synthetic").json() == []
    assert other.delete(f"/api/synthetic/{d['id']}").status_code == 404
    assert client.delete(f"/api/synthetic/{d['id']}").json() == {"deleted": d["id"]}


def test_model_failure_is_reported_and_stores_nothing():
    def boom(*a, **k):
        raise agent.AgentError("Claude API request failed: overloaded")
    keep, agent.run_synthetic_generation = agent.run_synthetic_generation, boom
    try:
        n = len(client.get("/api/synthetic").json())
        r = client.post("/api/synthetic/generate", json={"spec": {**SPEC, "reportId": "FAIL1"}})
        assert r.status_code == 502 and len(client.get("/api/synthetic").json()) == n
    finally:
        agent.run_synthetic_generation = keep


def test_sanitize_drops_bad_cases_and_dedupes_ids():
    out = agent.sanitize({"conditions": [{"id": "c1", "text": "t"}, {"id": "c1", "text": "dup"}],
                          "cases": [{"id": "a", "expectation": "include", "tables": "junk"}, {"id": "a", "expectation": "exclude"}, {"id": "z", "expectation": "bogus"}]})
    assert len(out["conditions"]) == 1 and [c["id"] for c in out["cases"]] == ["a", "a_2"] and out["cases"][0]["tables"] == []


# ---------------------------------------------------------------- run code against a set

import base64 as _b64  # noqa: E402
import io  # noqa: E402
import zipfile  # noqa: E402
import synthetic_exec as ex  # noqa: E402


def gen_exec_set(rid="EXE1"):
    def f(spec, meta="", kb=""):
        return agent.sanitize({
            "conditions": [{"id": "c1", "text": "AE.Term not null"}],
            "cases": [
                {"id": "k1", "conditionId": "c1", "expectation": "include", "scenario": "term", "rationale": "r",
                 "tables": [{"form": "AE", "rows": [{"SubjectId": "S-k1-01", "Term": "Headache"}]}]},
                {"id": "k2", "conditionId": "c1", "expectation": "exclude", "scenario": "null", "rationale": "r",
                 "tables": [{"form": "AE", "rows": [{"SubjectId": "S-k2-01", "Term": ""}]}]},
                {"id": "k3", "conditionId": "c1", "expectation": "include", "scenario": "two subjects", "rationale": "r",
                 "tables": [{"form": "AE", "rows": [{"SubjectId": "S-k3-01", "Term": "Rash"}, {"SubjectId": "S-k3-02", "Term": "Nausea"}]}]},
            ], "summary": "x"})
    keep, agent.run_synthetic_generation = agent.run_synthetic_generation, f
    try:
        return client.post("/api/synthetic/generate", json={"spec": {"reportId": rid, "description": "d", "logic": "l"}}).json()
    finally:
        agent.run_synthetic_generation = keep


def test_sql_run_correct_query_all_cases_match():
    d = gen_exec_set()
    r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": 'SELECT SubjectId FROM AE WHERE Term IS NOT NULL;'}).json()
    assert r["status"] == "executed" and r["counts"] == {"TP": 2, "TN": 1, "FP": 0, "FN": 0, "not_judged": 0} and r["rowsReturned"] == 3


def test_sql_run_wrong_query_shows_fp_and_fn_with_reasons():
    d = gen_exec_set("EXE2")
    r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": "SELECT SubjectId FROM AE WHERE Term IS NULL OR SubjectId = 'S-k3-01'"}).json()
    by = {x["caseId"]: x for x in r["results"]}
    assert by["k1"]["quadrant"] == "FN" and by["k2"]["quadrant"] == "FP"
    assert by["k3"]["quadrant"] == "FN" and "missing S-k3-02" in by["k3"]["detail"]


def test_sql_run_refuses_non_select_and_reports_missing_table_without_raising():
    d = gen_exec_set("EXE3")
    for bad in ("DROP TABLE AE", "SELECT 1; DROP TABLE AE", "UPDATE AE SET Term='x'"):
        r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": bad}).json()
        assert r["status"] == "could_not_execute", bad
    r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": "SELECT SubjectId FROM Form_AE"}).json()
    assert r["status"] == "could_not_execute" and "no such table" in r["error"] and r["counts"] == {}
    r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": "SELECT Term FROM AE"}).json()
    assert "no subject column" in r["error"]
    assert client.post(f"/api/synthetic/{d['id']}/runs/sql", json={}).status_code == 400  # nothing stored, nothing pasted


def test_sql_run_uses_newest_stored_generation_and_rejects_non_sql_code():
    d = gen_exec_set("EXE4")
    s = db.SessionLocal()
    try:
        sp = main.store.create_spec(s, "syn", {"reportId": "EXE4", "description": "d"})
        spid = sp.id
        main.store.save_generation_run(s, "syn", spid, {"cql": "SELECT SubjectId FROM AE WHERE Term IS NOT NULL", "language": "sql", "status": "generated"})
    finally:
        s.close()
    assert client.post(f"/api/synthetic/{d['id']}/runs/sql", json={}).json()["counts"]["TP"] == 2
    s = db.SessionLocal()
    try:
        main.store.save_generation_run(s, "syn", spid, {"cql": "proc sql; quit;", "language": "sas", "status": "generated"})
    finally:
        s.close()
    r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={})
    assert r.status_code == 400 and "SAS" in r.json()["error"]


def test_upload_result_compares_and_flags_bad_files():
    d = gen_exec_set("EXE5")
    up = lambda text, **kw: client.post(f"/api/synthetic/{d['id']}/runs/upload", json={"files": [{"name": "out.csv", "data": _b64.b64encode(text.encode()).decode()}], "language": "sas", **kw})  # noqa: E731
    r = up("USUBJID,Term\nS-k1-01,x\nS-k3-01,y\nS-k3-02,z\n").json()
    assert r["method"] == "uploaded" and r["language"] == "sas" and r["counts"]["TP"] == 2 and r["counts"]["TN"] == 1 and r["sourceName"] == "out.csv"
    assert up("Term\nx\n").status_code == 400
    assert up("").status_code == 400
    assert client.post(f"/api/synthetic/{d['id']}/runs/upload", json={"files": []}).status_code == 400
    assert len(client.get(f"/api/synthetic/{d['id']}/runs").json()) == 1


def test_cases_sharing_or_lacking_subject_ids_are_not_judged():
    cases = [
        {"id": "a", "expectation": "include", "tables": [{"form": "AE", "rows": [{"SubjectId": "S1"}]}]},
        {"id": "b", "expectation": "exclude", "tables": [{"form": "AE", "rows": [{"SubjectId": "S1"}]}]},
        {"id": "c", "expectation": "include", "tables": [{"form": "AE", "rows": [{"Term": "x"}]}]},
        {"id": "d", "expectation": "include", "tables": [{"form": "AE", "rows": [{"SubjectId": "S9"}]}]},
    ]
    out = ex.compare(cases, {"S9"})
    assert out["counts"]["not_judged"] == 3 and out["counts"]["TP"] == 1
    assert out["issues"]["noKey"] == ["c"] and out["issues"]["shared"] == {"S1": ["a", "b"]}


def test_stale_flag_testpack_and_key_issues_on_set():
    d = gen_exec_set("EXE6")
    assert d["keyIssues"] == {"noKey": [], "shared": {}}
    r = client.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": "SELECT SubjectId FROM AE"}).json()
    assert r["stale"] is False
    full = client.get(f"/api/synthetic/{d['id']}").json()
    client.patch(f"/api/synthetic/{d['id']}", json={"cases": full["cases"][:2]})
    assert client.get(f"/api/synthetic/{d['id']}/runs").json()[0]["stale"] is True
    z = zipfile.ZipFile(io.BytesIO(client.get(f"/api/synthetic/{d['id']}/testpack?language=cql").content))
    names = set(z.namelist())
    assert {"README.txt", "expected.csv", "data/AE.csv"} <= names
    assert "S-k1-01" in z.read("data/AE.csv").decode() and "S-k1-01" in z.read("expected.csv").decode()
    other = TestClient(main.app, headers={"X-Tenant-Id": "other", "X-User-Id": "x"})
    assert other.get(f"/api/synthetic/{d['id']}/runs").status_code == 404
    assert other.post(f"/api/synthetic/{d['id']}/runs/sql", json={"code": "select 1"}).status_code == 404
