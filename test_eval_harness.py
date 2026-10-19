"""Evaluation harness: hold-out, arms, scoring, blinded grading, retrieval check. The model is never called."""
import base64
import json
import os
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/ev.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

import openpyxl  # noqa: E402
import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import db  # noqa: E402
import eval_harness as eh  # noqa: E402
import holdout  # noqa: E402
import main  # noqa: E402
import models_db as m  # noqa: E402

client = TestClient(main.app, headers={"X-Tenant-Id": "ev"})
H = {"X-User-Id": "prog1"}
b64 = lambda t: base64.b64encode(t.encode()).decode()  # noqa: E731


def add(name, text, scope="global", ref="", doc_type=None):
    body = {"files": [{"name": name, "data": b64(text)}], "scope": scope, "scopeRef": ref}
    if doc_type:
        body["docType"] = doc_type
    sid = client.post("/api/knowledge/sources", headers=H, json=body).json()["results"][0]["sourceId"]
    client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
    return sid


@pytest.fixture(autouse=True)
def stub_pipeline(monkeypatch):
    def fake(spec, **kw):  # the CQL differs when a knowledge block is in the prompt, so arms are distinguishable
        kb = spec.get("_knowledge_block", "")
        cql = "SELECT * FROM F.DM WHERE DM.DTHDT < DS.LASTVIS" + (" -- uses KB" if kb else "") + (" ORDER BY RawDate = '2020'" if "RID_B" in spec["reportId"] else "")
        return {"cql": cql, "explanation": "x", "retrieved_precedents": [], "status": "generated",
                "cascade_trace": [{"tier": "claude_generation", "status": "ran"}], "guardrail_reports": [{"passed": True, "checks": []}]}
    monkeypatch.setattr(main.graph, "run_generation_pipeline", fake)
    yield
    holdout.reset()


def cases():
    ref = "proc sql; select DM.DTHDT, DS.LASTVIS from dm; quit;"
    return [{"reportId": f"RID_{c}", "description": f"Death before last visit variant {c}", "logic": "DTHDT earlier than LASTVIS", "referenceCode": ref,
             "edcSystem": "veeva", "language": "cql"} for c in "ABC"]


def test_identifiers_overlap_and_flags():
    assert eh.identifiers("select AESER, usubjid, ds01_x from F where a = b") == {"aeser", "usubjid", "ds01_x"}
    o = eh.identifier_overlap("SELECT DM.DTHDT", "select DTHDT, LASTVIS")
    assert o["recall"] == 0.5 and o["precision"] == 1.0 and o["missing"] == ["lastvis"]
    assert eh.identifier_overlap("x", "a b") is None
    f = eh.flags_for("WHERE RawDate >= '2020-01-01' AND NOT EXISTS (x) ORDER BY to_char(d) ; @HDR.Event.Date")
    assert "date_compared_as_text" in f and "not_exists_unverified" in f and "hdr_event_date_proxy" in f and eh.flags_for("select 1") == []


def test_holdout_hides_a_reports_own_sources_and_rules_and_scopes_can_be_switched_off():
    own = add("own.txt", "Death before last visit uses DTHDT and LASTVIS joined on subject.", "report", "RID_A")
    other = add("other.txt", "Death before last visit uses DTHDT and LASTVIS joined on subject.", "report", "RID_Z")
    glob = add("g.txt", "Death before last visit uses DTHDT and LASTVIS joined on subject.")
    s = db.SessionLocal()
    import knowledge_store as ks
    q = "death before last visit DTHDT LASTVIS"
    ids = lambda r: {x["sourceId"] for x in r["results"]}  # noqa: E731
    assert ids(ks.search(s, "ev", q, report="RID_A", top_k=10)) == {own, other, glob}
    with holdout.active(reports=["rid_a"]):
        assert ids(ks.search(s, "ev", q, report="RID_A", top_k=10)) == {other, glob}
    with holdout.active(scopes=["report"]):
        assert ids(ks.search(s, "ev", q, report="RID_A", top_k=10)) == {glob}
    assert ids(ks.search(s, "ev", q, report="RID_A", top_k=10)) == {own, other, glob}  # restored
    s.close()


def test_holdout_hides_the_precedent_of_the_report_under_test():
    import rag_retriever
    with open(os.path.join(ROOT, "precedents.jsonl"), encoding="utf-8") as f:
        first = json.loads(f.readline())
    spec = {"reportId": first["spec_id"], "description": first.get("description", ""), "logic": first.get("logic", "")}
    store = rag_retriever.PrecedentStore.from_jsonl(os.path.join(ROOT, "precedents.jsonl")) if hasattr(rag_retriever, "PrecedentStore") else None
    assert store is not None and store.retrieve(spec)
    with holdout.active(reports=[first["spec_id"]]):
        assert not any(p["spec_id"] == first["spec_id"] for p, _ in store.retrieve(spec))
    with holdout.active(no_precedents=True):
        assert store.retrieve(spec) == []


def test_run_is_resumable_arms_differ_and_no_spec_rows_are_left(tmp_path):
    add("note.txt", "Death before last visit: compare DTHDT with LASTVIS from the disposition form.")
    out = str(tmp_path / "run")
    cs = cases()
    s0 = db.SessionLocal()
    before = s0.query(m.Spec).filter_by(tenant_id="ev").count()
    s0.close()
    res = eh.run(cs, ["baseline", "knowledge"], client, db.SessionLocal, "ev", out, progress=lambda *_: None)
    assert len(res) == 6 and all(r["ok"] for r in res)
    kb = {r["arm"]: r for r in res if r["caseId"] == "RID_A"}
    assert kb["baseline"]["knowledge"]["sources"] == 0 and kb["knowledge"]["knowledge"]["sources"] >= 1
    assert "uses KB" in kb["knowledge"]["code"] and "uses KB" not in kb["baseline"]["code"]
    assert any("date_compared_as_text" in r["flags"] for r in res if r["caseId"] == "RID_B")
    assert all(r["overlap"] and r["overlap"]["recall"] > 0 for r in res)
    s1 = db.SessionLocal()
    assert s1.query(m.Spec).filter_by(tenant_id="ev").count() == before  # the run's Spec rows were removed
    s1.close()
    again = eh.run(cs, ["baseline", "knowledge"], client, db.SessionLocal, "ev", out, progress=lambda *_: None)
    assert len(again) == 6  # nothing new was run


def test_blinded_sheet_grading_and_paired_scoring(tmp_path):
    out = str(tmp_path / "run")
    cs = cases()
    res = eh.run(cs, ["baseline", "knowledge"], client, db.SessionLocal, "ev", out, progress=lambda *_: None)
    path = eh.write_sheet(cs, res, out, seed=3)
    wb = openpyxl.load_workbook(path)
    ws = wb["Grade"]
    header = [c.value for c in ws[1]]
    assert "arm" not in " ".join(str(h).lower() for h in header)  # the arm is not on the sheet
    key = json.load(open(os.path.join(out, "review_key.json")))
    assert len(key) == 6
    for row in ws.iter_rows(min_row=2):  # knowledge arm: correct on A and B, partial on C. baseline: wrong on A, correct on B and C
        k = key[row[0].value]
        v = {("knowledge", "RID_A"): "correct", ("knowledge", "RID_B"): "correct", ("knowledge", "RID_C"): "partial",
             ("baseline", "RID_A"): "wrong", ("baseline", "RID_B"): "correct", ("baseline", "RID_C"): "correct"}[(k["arm"], k["caseId"])]
        row[6].value = v
        row[7].value, row[8].value = (2, 2) if v == "correct" else (1, 2)
    wb.save(path)
    g = eh.read_grades(out)
    assert len(g) == 6
    st = eh.grade_stats(g)
    assert st["arms"]["knowledge"]["strict"] == round(2 / 3, 3) and st["arms"]["baseline"]["strict"] == round(2 / 3, 3)
    assert st["arms"]["knowledge"]["lenient"] == 1.0 and st["arms"]["baseline"]["lenient"] == round(2 / 3, 3)
    p = st["paired"]["knowledge"]
    assert (p["wins"], p["losses"], p["ties"]) == (1, 1, 1) and p["signTestP"] == 1.0
    assert st["arms"]["knowledge"]["conditionAccuracy"] == round(5 / 6, 3)
    rep = eh.write_report(out, cs, res, g)
    text = open(rep, encoding="utf-8").read()
    assert "Paired against baseline" in text and "better on 1, worse on 1, same on 1 of 3" in text


def test_statistics_helpers():
    lo, hi = eh.wilson(5, 10)
    assert 0.23 < lo < 0.25 and 0.75 < hi < 0.77
    assert eh.sign_test_p(8, 0) == 0.0078 and eh.sign_test_p(0, 0) == 1.0
    lo, hi = eh.bootstrap_ci([1, 1, 1, 0, 1, 1])
    assert lo <= 0.83 <= hi


def test_retrieval_check_uses_held_out_search_and_a_floor_sweep():
    add("RIDR.sas", "proc sql; select ZEBRA_DT, QUAGGA_ID from visits; quit;", "report", "RID_R1", "sas_program")
    add("RIDS.sas", "proc sql; select ZEBRA_DT, QUAGGA_ID, XYLO_NO from visits; quit;", "report", "RID_R2", "sas_program")
    add("junk.txt", "Quarterly invoice reconciliation for vendor payments and purchase orders.")
    c = [{"reportId": "RID_R1", "description": "zebra dates and quagga ids from visits", "logic": "visits", "referenceCode": "select ZEBRA_DT, QUAGGA_ID from visits"}]
    s = db.SessionLocal()
    out = eh.retrieval_check(c, s, "ev")
    s.close()
    assert out["casesWithReference"] == 1 and out["hitAt"]["top1"] == 1.0
    assert out["floorSweep"] and "proxy" in out["note"]


def test_cli_dry_run_and_cost_guard(tmp_path):
    csvp = tmp_path / "g.csv"
    csvp.write_text("reportId,description,logic\nR1,Listing of x,y\nR2,Listing of z,w\n", encoding="utf-8")
    env = {**os.environ, "DATABASE_URL": "sqlite:///" + str(tmp_path / "c.db")}
    base = [sys.executable, os.path.join(ROOT, "scripts", "run_eval.py"), "run", "--cases", str(csvp), "--out", str(tmp_path / "o")]
    p = subprocess.run(base + ["--dry-run"], capture_output=True, text=True, env=env, cwd=ROOT)
    assert p.returncode == 0 and "2 cases x 2 arms x 1 repeat(s) = 4 generation calls" in p.stdout, p.stdout + p.stderr
    p2 = subprocess.run(base + ["--repeats", "6"], capture_output=True, text=True, env=env, cwd=ROOT)
    assert p2.returncode != 0 and "--yes" in (p2.stdout + p2.stderr)
