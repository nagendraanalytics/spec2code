import os, tempfile
os.environ["DATABASE_URL"] = "sqlite:///" + os.path.join(tempfile.mkdtemp(), "t.db")
from fastapi.testclient import TestClient
import main

c = TestClient(main.app)
H = {"X-Tenant-Id": "lk"}
L = lambda rid: {"reportId": rid, "description": f"Listing of adverse events {rid}", "logic": "Include records where AESER = Y. Exclude deleted forms. " * 5}


def test_ta_scope_draft_then_approved_and_dup():
    r = c.post("/api/knowledge/from-listings", headers=H, json={"listings": [L("A1"), L("A2")], "scope": "ta", "scopeRef": "Oncology"})
    assert r.status_code == 200, r.text
    j = r.json()
    assert j["added"] == 2 and all(x["status"] == "draft" for x in j["results"])
    r2 = c.post("/api/knowledge/from-listings", headers=H, json={"listings": [L("A1")], "scope": "ta", "scopeRef": "Oncology", "approve": True})
    assert r2.json()["duplicates"] == 1
    r3 = c.post("/api/knowledge/from-listings", headers=H, json={"listings": [L("B1")], "scope": "study", "scopeRef": "S1", "approve": True})
    assert r3.json()["results"][0]["status"] == "approved"
    srcs = c.get("/api/knowledge/sources?scope=study", headers=H).json()
    assert srcs and srcs[0]["scopeRef"] == "S1"


def test_standard_maps_to_global_listing_standard():
    r = c.post("/api/knowledge/from-listings", headers=H, json={"listings": [L("C1")], "scope": "standard", "standardVersion": "CDASH 2.1"})
    assert r.json()["added"] == 1
    s = c.get("/api/knowledge/sources?scope=global", headers=H).json()
    assert any(x["docType"] == "listing_standard" for x in s)


def test_errors():
    assert c.post("/api/knowledge/from-listings", headers=H, json={"listings": [L("D")], "scope": "study"}).status_code == 400
    assert c.post("/api/knowledge/from-listings", headers=H, json={"listings": [], "scope": "global"}).status_code == 400
    r = c.post("/api/knowledge/from-listings", headers=H, json={"listings": [{"reportId": "E"}], "scope": "global"})
    assert r.json()["failed"] == 1
