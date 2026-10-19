"""Report scope: knowledge tied to one Report ID. Claude is never called."""

import base64
import os
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/rp.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

from fastapi.testclient import TestClient  # noqa: E402

import db  # noqa: E402
import knowledge_binding  # noqa: E402
import main  # noqa: E402
import models_db as m  # noqa: E402

client = TestClient(main.app)
H = {"X-User-Id": "prog1"}
TEXT = "Zebra migration note: the zebra endpoint listing joins the visit form to the dosing form on subject and visit."


def up(name, scope, ref="", text=TEXT):
    r = client.post("/api/knowledge/sources", headers=H, json={"files": [{"name": name, "data": base64.b64encode(text.encode()).decode()}],
                                                                "scope": scope, "scopeRef": ref})
    sid = r.json()["results"][0]["sourceId"]
    client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
    return sid


def search(**kw):
    return client.post("/api/knowledge/search", json={"query": "zebra endpoint listing", "topK": 10, **kw}).json()


def test_report_scope_needs_a_label_and_every_report_is_searched_by_similarity():
    r = client.post("/api/knowledge/sources", headers=H, json={"files": [{"name": "x.txt", "data": base64.b64encode(TEXT.encode()).decode()}], "scope": "report"})
    assert r.status_code == 400
    g = up("g.txt", "global")
    rp = up("rp.txt", "report", "RID002")
    other = up("o.txt", "report", "RID009")
    ids = lambda r: [x["sourceId"] for x in r["results"]]  # noqa: E731
    none = search()  # no report ID: every report is still a candidate, none is an exact match
    assert set(ids(none)) == {g, rp, other} and not any(x["reportMatch"] for x in none["results"])
    r2 = search(reportId="rid002")  # case-insensitive; the exact match is boosted, the others still appear
    assert ids(r2)[0] == rp and set(ids(r2)) == {g, rp, other}
    assert [x["reportMatch"] for x in r2["results"] if x["sourceId"] == rp] == [True]
    assert [x["reportMatch"] for x in r2["results"] if x["sourceId"] == other] == [False]
    assert {"RID002", "RID009"} <= set(client.get("/api/knowledge/stats").json()["reports"])


def test_a_reports_code_is_found_through_its_spec_text_not_its_id():
    s = db.SessionLocal()
    try:
        s.add(m.Spec(tenant_id="default", report_id="RID100", description="Subjects with delayed dosing after randomization",
                     column_heading="Subject, Delay days", logic="Dosing date minus randomization date greater than seven days"))
        s.commit()
    finally:
        s.close()
    sas = up("RID100.sas", "report", "RID100", text="proc sql; create table out as select a.usubjid, b.exdate - a.rfdate as gap from dm a join ex b on a.usubjid = b.usubjid; quit;")
    # the code itself never says "delayed", "randomization" or "dosing"; the report's spec does
    r = client.post("/api/knowledge/search", json={"query": "listing of delayed dosing after randomization", "topK": 5, "reportId": "RID777"}).json()
    hit = [x for x in r["results"] if x["sourceId"] == sas]
    assert hit and hit[0]["reportMatch"] is False


def test_report_rule_and_binding_use_the_specs_report_id():
    rule = {"name": "RID002 join", "scope": "report", "scopeRef": "RID002", "appliesTo": ["generate"], "actionType": "prompt",
            "action": {"text": "RID002: join Visit to Dosing on subject and visit."}, "condition": {"textPattern": "dosing"},
            "tests": [{"spec": {"reportId": "RID002", "logic": "dosing after visit"}, "expect": "fires"},
                      {"spec": {"reportId": "RID003", "logic": "dosing after visit"}, "expect": "not_fires"}]}
    r = client.post("/api/rules", headers=H, json=rule).json()
    assert client.post(f"/api/rules/{r['id']}/approve", headers=H).status_code == 200
    s = db.SessionLocal()
    try:
        a = knowledge_binding.build(s, "default", {"reportId": "RID002", "description": "zebra endpoint listing", "logic": "dosing after visit"}, "generate")
        b = knowledge_binding.build(s, "default", {"reportId": "RID003", "description": "zebra endpoint listing", "logic": "dosing after visit"}, "generate")
    finally:
        s.close()
    assert "join Visit to Dosing" in a["block"] and "join Visit to Dosing" not in b["block"]  # the rule is exact-ID
    # another report's note is offered by similarity, labelled as a precedent; an unrelated report's is not offered
    assert "similar report RID002" in b["block"] and "not this report's own logic" in b["block"]
    assert "(report RID002)" in a["block"]
    unrelated = up("q.txt", "report", "RID555", text="Quasar nebula photometry calibration wavelength spectrum redshift survey catalogue.")
    s = db.SessionLocal()
    try:
        c = knowledge_binding.build(s, "default", {"reportId": "RID003", "description": "zebra endpoint listing", "logic": "dosing after visit"}, "generate")
    finally:
        s.close()
    assert "RID555" not in c["block"] and unrelated not in [x["sourceId"] for x in c["sources"]]


def test_import_script_finds_report_ids_in_names_and_folders_and_labels_the_rest_from_the_file_name():
    src = tempfile.mkdtemp()
    os.makedirs(os.path.join(src, "RID042"))
    open(os.path.join(src, "RID007_migration.sas"), "w").write("proc sql; create table x as select * from ae; quit;")
    open(os.path.join(src, "RID042", "notes.txt"), "w").write("Supporting note for the report about zebra visits and dosing joins.")
    open(os.path.join(src, "random.txt"), "w").write("A file with no report identifier anywhere in its name or folder.")
    env = {**os.environ, "DATABASE_URL": "sqlite:///" + os.path.join(tempfile.mkdtemp(), "i.db"), "SPEC2CODE_KB_DIR": tempfile.mkdtemp()}
    cmd = [sys.executable, os.path.join(ROOT, "scripts", "import_report_knowledge.py"), src, "--tenant", "t1"]
    p = subprocess.run(cmd, capture_output=True, text=True, env=env, cwd=ROOT)
    assert p.returncode == 0 and "3 stored as drafts, 0 duplicates, 0 failed, 1 labelled from the file name" in p.stdout, p.stdout + p.stderr
    assert "RID007" in p.stdout and "RID042" in p.stdout and "random" in p.stdout and "label from name" in p.stdout
    p2 = subprocess.run(cmd, capture_output=True, text=True, env=env, cwd=ROOT)
    assert "0 stored as drafts, 3 duplicates" in p2.stdout
    code = f"""
import os
os.environ['DATABASE_URL']={env['DATABASE_URL']!r}; os.environ['SPEC2CODE_KB_DIR']={env['SPEC2CODE_KB_DIR']!r}
import db, models_db as m
s=db.SessionLocal()
rows={{r.scope_ref:r for r in s.query(m.KnowledgeSource).filter_by(tenant_id='t1').all()}}
assert set(rows)=={{'RID007','RID042','random'}} and all(r.scope=='report' and r.status=='draft' for r in rows.values())
assert rows['RID007'].doc_type=='sas_program'
print('ok')
"""
    r = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True, env=env, cwd=ROOT)
    assert "ok" in r.stdout, r.stdout + r.stderr


def test_confirming_a_precedent_also_stores_the_pair_in_report_knowledge_and_it_is_found_by_similarity():
    import json
    first = json.loads(open(os.path.join(ROOT, "precedents.jsonl"), encoding="utf-8").readline())
    body = {"spec_id": "RID801", "description": "Subjects with quagga overlap between visits", "logic": "quagga onset before previous quagga end",
            "column_heading": "Site, Subject", "report_scenarios": "", "cql": first["cql"], "notes": "checked against SAS"}
    r = client.post("/api/precedents", headers=H, json=body)
    assert r.status_code == 200, r.text
    rk = r.json()["reportKnowledge"]
    assert rk["sourceId"] and not rk["duplicate"] and rk["chunks"] >= 2
    src = client.get(f"/api/knowledge/sources/{rk['sourceId']}").json()
    assert src["scope"] == "report" and src["scopeRef"] == "RID801" and src["status"] == "approved" and src["approvedBy"] == "prog1"
    hit = client.post("/api/knowledge/search", json={"query": "quagga overlap between visits listing", "topK": 5, "reportId": "RID999"}).json()["results"]
    assert any(x["sourceId"] == rk["sourceId"] and x["reportMatch"] is False for x in hit)
    # confirming again with a changed note replaces the earlier copy, so one current version remains
    r2 = client.post("/api/precedents", headers=H, json={**body, "notes": "second look"}).json()["reportKnowledge"]
    assert r2["retired"] == 1
    assert client.get(f"/api/knowledge/sources/{rk['sourceId']}").json()["status"] == "retired"


def test_backfill_script_adds_earlier_precedents_once():
    import json
    import store
    first = json.loads(open(os.path.join(ROOT, "precedents.jsonl"), encoding="utf-8").readline())
    s = db.SessionLocal()
    store.create_precedent(s, "bf", {"spec_id": "RID811", "description": "Early confirmed report about zebra visits", "logic": "zebra", "report_scenarios": "",
                                      "column_heading": "Site", "cql": first["cql"], "notes": ""})
    s.close()
    env = {**os.environ, "DATABASE_URL": os.environ["DATABASE_URL"]}
    cmd = [sys.executable, os.path.join(ROOT, "scripts", "backfill_report_knowledge.py"), "--tenant", "bf"]
    p = subprocess.run(cmd, capture_output=True, text=True, env=env, cwd=ROOT)
    assert "1 precedents: 1 stored, 0 duplicates" in p.stdout, p.stdout + p.stderr
    p2 = subprocess.run(cmd, capture_output=True, text=True, env=env, cwd=ROOT)
    assert "1 precedents: 0 stored, 1 duplicates" in p2.stdout
    r = client.get("/api/knowledge/sources?scope=report", headers={"X-Tenant-Id": "bf"}).json()
    assert [x["scopeRef"] for x in r] == ["RID811"] and r[0]["status"] == "approved"
