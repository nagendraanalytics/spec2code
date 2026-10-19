"""useKnowledge: approved knowledge and rules reach the review, understand and
generate prompts, only when asked, and only when approved, in scope and relevant."""

import base64
import os
import tempfile
import time

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/kbb.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import cql_agents  # noqa: E402
import generation_router  # noqa: E402
import logic_understanding_agent  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app, headers={"X-Tenant-Id": "kbb"})  # own tenant: test modules share one database when run together
H = {"X-User-Id": "prog1"}
b64 = lambda t: base64.b64encode(t.encode()).decode()  # noqa: E731

SPEC = {"reportId": "KB1", "description": "Listing of subjects with deleted disposition forms",
        "logic": "DS01.Status <> Completed and the form is not deleted", "columnHeading": "Site, Subject",
        "edcSystem": "rave", "language": "sql", "studyId": "KBS1"}


def add(name, text, scope="global", ref="", approve=True, **kw):
    r = client.post("/api/knowledge/sources", headers=H, json={"files": [{"name": name, "data": b64(text)}], "scope": scope, "scopeRef": ref, **kw}).json()
    sid = r["results"][0]["sourceId"]
    if approve:
        assert client.post(f"/api/knowledge/sources/{sid}/approve", headers=H).status_code == 200
    return sid


def rule(name, action_type="prompt", action=None, approve=True, **kw):
    body = {"name": name, "appliesTo": ["generate", "review", "understand"], "actionType": action_type,
            "action": action or {"text": f"{name} text"}, "condition": {}, "tests": [], **kw}
    r = client.post("/api/rules", headers=H, json=body).json()
    if approve:
        assert client.post(f"/api/rules/{r['id']}/approve", headers=H).status_code == 200
    return r


@pytest.fixture(autouse=True, scope="module")
def library():
    client.post("/api/studies", json={"studyId": "KBS1", "edcSystem": "rave", "ta": "Oncology"})
    client.post("/api/studies/KBS1/metadata", json={"files": [{"name": "i.csv", "data": b64("Form,Item,Label\nDS01,DSDECOD,Status\n")}]})
    add("sdtm.txt", "Deleted disposition forms must be excluded from subject listings; a deleted form is one flagged deleted in the EDC audit data.")
    add("onc.txt", "Oncology convention: disposition listings show the study treatment discontinuation reason for deleted forms review.", "ta", "Oncology")
    add("other_study.txt", "Study OTHER-9 special handling of deleted disposition forms listing for subjects.", "study", "OTHER-9")
    add("draft.txt", "Draft only guidance on deleted disposition forms subjects listing that nobody approved yet.", approve=False)
    add("irrelevant.txt", "Quarterly invoice reconciliation procedure for vendor payments and purchase orders.")
    rule("Use SiteNumber", "name_map", {"from": "Site", "to": "SiteNumber"})
    rule("Keep deleted out", "prompt", {"text": "Always exclude deleted DS01 records."})
    rule("Check order", "guardrail", {"text": "Rows must be sorted by Site then Subject."})
    rule("Bind pattern", "pattern", {"pattern": "exclude_deleted"})
    rule("Never approved", "prompt", {"text": "SHOULD NOT APPEAR"}, approve=False)
    rule("Other study only", "prompt", {"text": "OTHER STUDY ONLY"}, scope="study", scopeRef="OTHER-9")


@pytest.fixture()
def probes(monkeypatch):
    seen = {}
    monkeypatch.setattr(cql_agents, "run_spec_review", lambda s: seen.setdefault("review", dict(s)) and {"readiness": "ready", "summary": "", "insights": []})
    monkeypatch.setattr(logic_understanding_agent, "run_logic_understanding",
                        lambda s, b="": seen.setdefault("understand", dict(s)) and {"summary": "", "logic_steps": [{"step_number": 1, "explanation": "x", "inferred": False}], "domains_identified": [], "key_definitions": [], "assumptions": [], "edge_cases": []})
    monkeypatch.setattr(generation_router, "run_beta_generation", lambda lang, s: seen.setdefault("beta", dict(s)) and {"code": "select 1", "explanation": "d"})
    return seen


def blk(seen, k):
    return seen[k].get("_knowledge_block", "") + seen[k].get("_context_block", "")


def test_off_by_default_adds_nothing_to_any_prompt(probes):
    r = client.post("/api/review", json=SPEC).json()
    assert "knowledge" not in r and "_knowledge_block" not in probes["review"] or probes["review"]["_knowledge_block"] == ""
    client.post("/api/understand", json=SPEC)
    assert not probes["understand"].get("_knowledge_block")
    client.post("/api/generate?allow_unverified=true", json=SPEC)
    assert "REFERENCE KNOWLEDGE" not in blk(probes, "beta")


@pytest.mark.parametrize("endpoint,key", [("/api/review", "review"), ("/api/understand", "understand"), ("/api/generate?allow_unverified=true", "beta")])
def test_knowledge_reaches_each_agent_and_is_recorded(probes, endpoint, key):
    r = client.post(endpoint, json={**SPEC, "useKnowledge": True}).json()
    text = blk(probes, key)
    assert "REFERENCE KNOWLEDGE" in text and "authoritative" in text
    assert "Deleted disposition forms must be excluded" in text  # global source
    assert "Oncology convention" in text  # the study's TA source
    assert "Always exclude deleted DS01 records." in text  # prompt rule
    assert 'use "SiteNumber"' in text  # name map
    assert "Rows must be sorted by Site then Subject." in text and "MUST ALSO SATISFY" in text  # guardrail rule
    k = r["knowledge"]
    assert k["mode"] == "applied" and k["ta"] == "Oncology"
    assert {s["title"] for s in k["sources"]} == {"sdtm", "onc"}
    assert {x["name"] for x in k["rules"]} == {"Use SiteNumber", "Keep deleted out", "Check order"}


def test_drafts_other_scopes_irrelevant_and_unapproved_are_excluded(probes):
    client.post("/api/generate?allow_unverified=true", json={**SPEC, "useKnowledge": True})
    text = blk(probes, "beta")
    for bad in ("Draft only guidance", "Study OTHER-9", "OTHER STUDY ONLY", "SHOULD NOT APPEAR", "invoice reconciliation"):
        assert bad not in text, bad


def test_pattern_rules_are_reported_as_not_executed(probes):
    k = client.post("/api/generate?allow_unverified=true", json={**SPEC, "useKnowledge": True}).json()["knowledge"]
    assert any(s["name"] == "Bind pattern" and "not yet executed" in s["reason"] for s in k["skipped"])
    assert "exclude_deleted" not in blk(probes, "beta")


def test_the_study_scope_applies_to_its_own_study(probes):
    client.post("/api/studies", json={"studyId": "OTHER-9", "edcSystem": "rave"})
    client.post("/api/studies/OTHER-9/metadata", json={"files": [{"name": "i.csv", "data": b64("Form,Item,Label\nDS01,DSDECOD,Status\n")}]})
    client.post("/api/generate?allow_unverified=true", json={**SPEC, "studyId": "OTHER-9", "useKnowledge": True})
    text = blk(probes, "beta")
    assert "Study OTHER-9" in text and "OTHER STUDY ONLY" in text and "Oncology convention" not in text


def test_irrelevant_sources_are_left_out_but_unconditional_global_rules_still_apply(probes):
    spec = {**SPEC, "description": "Zzyzx quantum flux", "logic": "qqq.rrr = ttt", "columnHeading": "", "studyId": ""}
    k = client.post("/api/review", json={**spec, "useKnowledge": True}).json()["knowledge"]
    assert k["mode"] == "applied" and k["sources"] == []  # no source clears the relevance floor
    assert {r["name"] for r in k["rules"]} == {"Use SiteNumber", "Keep deleted out", "Check order"}  # no condition = always applies
    assert "Quarterly invoice" not in probes["review"]["_knowledge_block"] and "Deleted disposition" not in probes["review"]["_knowledge_block"]


def test_nothing_at_all_relevant_adds_no_block(probes):
    # a tenant with an empty library: switch on, nothing to add
    other = {"X-Tenant-Id": "empty"}
    k = client.post("/api/review", headers=other, json={**SPEC, "studyId": "", "useKnowledge": True}).json()["knowledge"]
    assert k["mode"] == "applied" and k["sources"] == [] and k["rules"] == [] and "No approved knowledge" in k["note"]
    assert probes["review"]["_knowledge_block"] == ""


def test_cql_path_records_whether_the_model_actually_ran(monkeypatch):
    def fake(kind):
        def run(spec, **kw):
            fake.spec = dict(spec)
            return {"cql": "SELECT 1", "explanation": "", "retrieved_precedents": [], "guardrail_reports": [], "status": "generated",
                    "cascade_trace": [{"tier": kind, "status": "ran", "detail": ""}]}
        return run

    cql_spec = {**SPEC, "edcSystem": "veeva", "language": "cql", "useKnowledge": True}
    monkeypatch.setattr(main.graph, "run_generation_pipeline", fake("claude"))
    k = client.post("/api/generate", json=cql_spec).json()["knowledge"]
    assert k["mode"] == "applied" and "REFERENCE KNOWLEDGE" in fake.spec["_knowledge_block"]
    monkeypatch.setattr(main.graph, "run_generation_pipeline", fake("rules"))
    k = client.post("/api/generate", json=cql_spec).json()["knowledge"]
    assert k["mode"] == "not_used" and k["sources"] == [] and "deterministic rule" in k["note"]


def test_batch_carries_the_switch(probes, monkeypatch):
    monkeypatch.setattr(cql_agents, "run_spec_review", lambda s: {"readiness": "ready", "summary": "", "insights": []})
    items = [{"name": "a", "spec": {"reportId": "BK1", "description": SPEC["description"], "logic": SPEC["logic"]}}]
    base = {"edcSystem": "rave", "language": "sql", "allowUnverified": True, "studyId": "KBS1"}

    def run(**o):
        job = client.post("/api/batch", json={"name": "t", "items": items, "options": {**base, **o}}).json()
        end = time.time() + 30
        while time.time() < end:
            d = client.get(f"/api/batch/{job['id']}").json()
            if d["status"] != "running" and not d["active"]:
                return client.get(f"/api/batch/{job['id']}/items/{d['items'][0]['id']}").json()
            time.sleep(0.05)
        raise AssertionError("timeout")

    off = run()
    assert off["result"]["knowledge"]["mode"] == "shadow"
    probes.clear()
    on = run(useKnowledge=True)
    assert on["result"]["knowledge"]["mode"] == "applied" and "REFERENCE KNOWLEDGE" in blk(probes, "beta")
