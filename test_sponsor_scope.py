"""Sponsor scope: global -> sponsor -> TA -> study. Claude is never called."""

import base64
import os
import tempfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/sp.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

from fastapi.testclient import TestClient  # noqa: E402

import db  # noqa: E402
import knowledge_binding  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app)
H = {"X-User-Id": "prog1"}
TEXT = "Zebra endpoint rule: the zebra endpoint is assessed with the agreed response criteria at each visit."


def b64(b):
    return base64.b64encode(b).decode()


def approved(name, scope, ref=""):
    r = client.post("/api/knowledge/sources", headers=H, json={"files": [{"name": name, "data": b64(TEXT.encode())}],
                                                                "scope": scope, "scopeRef": ref})
    sid = r.json()["results"][0]["sourceId"]
    client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
    return sid


def search(**kw):
    return client.post("/api/knowledge/search", json={"query": "zebra endpoint rule", "topK": 10, **kw}).json()


def test_sponsor_scope_needs_a_name():
    r = client.post("/api/knowledge/sources", headers=H, json={"files": [{"name": "x.txt", "data": b64(TEXT.encode())}], "scope": "sponsor"})
    assert r.status_code == 400 and "needs a name" in r.json()["error"]


def test_study_stores_sponsor_and_it_can_be_changed():
    assert client.post("/api/studies", json={"studyId": "SP-1", "sponsor": "Acme"}).json()["sponsor"] == "Acme"
    assert client.patch("/api/studies/SP-1", json={"sponsor": "Beta"}).json()["sponsor"] == "Beta"
    client.patch("/api/studies/SP-1", json={"sponsor": "Acme"})
    assert client.get("/api/studies/SP-1").json()["sponsor"] == "Acme"


def test_sponsor_source_applies_only_to_that_sponsor_and_ranks_between_ta_and_global():
    g = approved("g.txt", "global")
    sp = approved("sp.txt", "sponsor", "Acme")
    ta = approved("ta.txt", "ta", "Oncology")
    st = approved("st.txt", "study", "SP-2")
    other = approved("o.txt", "sponsor", "Beta")
    client.post("/api/studies", json={"studyId": "SP-2", "sponsor": "acme", "ta": "Oncology"})
    client.post("/api/studies", json={"studyId": "SP-3", "sponsor": "Beta"})
    ids = lambda r: [x["sourceId"] for x in r["results"]]  # noqa: E731
    assert ids(search()) == [g]  # no study: only global
    r = search(studyId="SP-2")
    assert ids(r) == [st, sp, ta, g]  # study > sponsor > TA > global (boost 1.15/1.10/1.07/1.0), case-insensitive sponsor
    assert any(e["sourceId"] == other and "Beta" in e["reason"] for e in r["excluded"])
    assert set(ids(search(studyId="SP-3"))) == {g, other}
    assert set(ids(search(sponsor="Acme"))) == {g, sp}


def test_sponsor_rule_fires_only_for_that_sponsor_and_binding_uses_it():
    rule = {"name": "Acme date rule", "scope": "sponsor", "scopeRef": "Acme", "appliesTo": ["generate"], "actionType": "prompt",
            "action": {"text": "Acme: show dates as DDMMMYYYY."}, "condition": {"textPattern": "visit date"},
            "tests": [{"spec": {"logic": "visit date is shown", "sponsor": "Acme"}, "expect": "fires"},
                      {"spec": {"logic": "visit date is shown", "sponsor": "Beta"}, "expect": "not_fires"}]}
    r = client.post("/api/rules", headers=H, json=rule).json()
    assert client.post(f"/api/rules/{r['id']}/approve", headers=H).status_code == 200
    client.post("/api/studies", json={"studyId": "SP-4", "sponsor": "Acme"})
    client.post("/api/studies", json={"studyId": "SP-5", "sponsor": "Beta"})
    spec = {"description": "Visits", "logic": "visit date is shown"}
    s = db.SessionLocal()
    try:
        a = knowledge_binding.build(s, "default", spec, "generate", study_id="SP-4")
        b = knowledge_binding.build(s, "default", spec, "generate", study_id="SP-5")
    finally:
        s.close()
    assert "DDMMMYYYY" in a["block"] and "DDMMMYYYY" not in b["block"]
    d = client.post("/api/rules/dry-run", json={"spec": spec, "studyId": "SP-4", "agent": "generate"})
    assert d.status_code == 200 and "Acme date rule" in d.text
    d2 = client.post("/api/rules/dry-run", json={"spec": spec, "studyId": "SP-5", "agent": "generate"})
    assert "Acme date rule" not in d2.text


def test_sponsor_facet_in_stats():
    assert "Acme" in client.get("/api/knowledge/stats").json()["sponsors"]
