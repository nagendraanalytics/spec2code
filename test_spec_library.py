"""Spec library: reviews are readable, library rows carry an overview, and executed-elsewhere specs import safely."""
import base64
import os
import tempfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/lib.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"

from fastapi.testclient import TestClient  # noqa: E402

import main  # noqa: E402
import store  # noqa: E402

client = TestClient(main.app, headers={"X-Tenant-Id": "libt"})
b64 = lambda t: base64.b64encode(t.encode()).decode()  # noqa: E731

CSV = (
    "Report ID,Description,Logic,Readiness,Review Summary,Review Notes,SAS,Status\n"
    'L1,Subjects with AE,"AE.Term not null",Ready with notes,Looks fine,Check date format,"proc sql; select 1 from ae; quit;",Validated\n'
    "L2,Disposition listing,DS.Status <> Completed,,,,,\n"
    ",No id here,,,,,,\n"
    "L4,Bad readiness,x,maybe,,,,\n"
)


def test_dry_run_reports_rows_and_writes_nothing():
    r = client.post("/api/specs/import", json={"files": [{"name": "h.csv", "data": b64(CSV)}]}).json()
    assert r["dryRun"] and len(r["rows"]) == 4
    by = {x["reportId"]: x for x in r["rows"]}
    assert by["L1"]["hasReview"] and by["L1"]["language"] == "sas" and not by["L1"]["error"]
    assert by["L2"]["error"] is None and not by["L2"]["hasCode"]
    assert by[""]["error"] and by["L4"]["error"]
    assert client.get("/api/specs").json() == []


def test_import_saves_review_and_code_and_marks_them_imported_then_skips_repeat():
    r = client.post("/api/specs/import", json={"files": [{"name": "h.csv", "data": b64(CSV)}], "dryRun": False}).json()
    assert [c["reportId"] for c in r["created"]] == ["L1", "L2"] and len(r["failed"]) == 2
    specs = {s["reportId"]: s for s in client.get("/api/specs").json()}
    assert specs["L1"]["source"] == "imported" and specs["L1"]["readiness"] == "ready_with_notes"
    assert specs["L1"]["runs"] == 1 and specs["L1"]["languages"] == ["sas"] and specs["L2"]["runs"] == 0
    sid = specs["L1"]["id"]
    rv = client.get(f"/api/specs/{sid}/reviews").json()
    assert rv[0]["summary"] == "Looks fine" and rv[0]["insights"][0]["finding"] == "Check date format"
    run = client.get(f"/api/specs/{sid}/runs").json()[0]
    assert run["status"] == "imported" and run["language"] == "sas" and run["source"] == "imported" and "select 1" in run["cql"]
    again = client.post("/api/specs/import", json={"files": [{"name": "h.csv", "data": b64(CSV)}], "dryRun": False}).json()
    assert again["created"] == [] and len(again["skipped"]) == 2


def test_nothing_imported_reaches_the_trusted_precedent_store():
    from models_db import Precedent
    import db
    s = db.SessionLocal()
    try:
        assert s.query(Precedent).filter(Precedent.tenant_id == "libt").count() == 0
    finally:
        s.close()


def test_reviews_endpoint_is_tenant_isolated():
    sid = [s for s in client.get("/api/specs").json() if s["reportId"] == "L1"][0]["id"]
    other = TestClient(main.app, headers={"X-Tenant-Id": "someone-else"})
    assert other.get(f"/api/specs/{sid}/reviews").json() == []
    assert other.get("/api/specs").json() == []


def test_unsupported_file_is_reported_not_raised():
    r = client.post("/api/specs/import", json={"files": [{"name": "x.pdf", "data": b64("hi")}]}).json()
    assert r["rows"][0]["error"]
