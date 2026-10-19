"""Starter rules and the rule proposer. The model call is stubbed."""
import os
import tempfile

os.environ["DATABASE_URL"] = "sqlite:///" + os.path.join(tempfile.mkdtemp(), "rg.db")
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

import db  # noqa: E402
import cdisc_starter_rules as sr  # noqa: E402
import knowledge_rules as kr  # noqa: E402
import models_db as m  # noqa: E402
import rule_proposer as rp  # noqa: E402

db.init_db()
T = "rg"

TEXT = ("Dates prior to RFSTDTC are decreased by 1, with the date preceding RFSTDTC designated as study day -1 (there is no study day 0). "
        "Study Day is not suited for use in subsequent numerical computations. ")
PASSAGE = "Section 4.1. " + TEXT + "A derived duration must be computed from the date portion of the start and end dates. " * 3
PASSAGE += "Pad. " * 40


def _seed(title="SDTM Implementation Guide v3.4", scope="global", ref="", passage=PASSAGE):
    s = db.SessionLocal()
    src = m.KnowledgeSource(tenant_id=T, title=title, filename=title + ".pdf", scope=scope, scope_ref=ref, extract_status="ok", status="approved")
    s.add(src)
    s.commit()
    s.add(m.KnowledgeChunk(tenant_id=T, source_id=src.id, position=0, heading="4.1 Dates", text=passage, meta={"kind": "text"}))
    s.commit()
    sid = src.id
    s.close()
    return sid


def test_starter_rule_is_created_only_when_its_quote_is_in_the_stored_text():
    _seed()
    s = db.SessionLocal()
    res = {r["name"]: r for r in sr.load(s, T)}
    assert res["Study day has no day zero"]["result"] == "created draft"
    assert res["Do not do arithmetic on study day"]["result"] == "created draft"
    assert res["USUBJID is unique across the submission"]["result"] == "skipped"  # quote absent from this text
    rule = s.query(m.KnowledgeRule).filter_by(tenant_id=T, name="Study day has no day zero").one()
    assert rule.status == "draft" and rule.evidence_source_id and "no study day 0" in rule.evidence_note
    again = {r["name"]: r["result"] for r in sr.load(s, T)}
    assert again["Study day has no day zero"] == "exists"
    s.close()


def test_every_starter_rule_passes_its_own_tests_and_the_pattern_compiles():
    for r in sr.STARTER:
        c = kr.clean({"name": r["name"], "appliesTo": r["agents"], "actionType": "prompt", "action": {"text": r["text"]},
                      "condition": {"textPattern": r["pattern"]}, "tests": [sr._t(r["pos"], "fires"), sr._t(r["neg"], "not_fires")]})
        assert all(t["passed"] for t in kr.run_tests(c)), r["name"]


def test_quote_matching_ignores_spacing_and_curly_quotes():
    assert sr.norm("A  “b”\n c") == sr.norm('A "b" c')


def _good(**kw):
    d = {"name": "Duration from dates", "quote": "A derived duration must be computed from the date portion of the start and end dates.",
         "instruction": "Compute durations from the date part of the start and end dates.", "applies_to": ["generate"],
         "text_pattern": "(?i)duration", "example_fires": "Show the duration in days", "example_not_fires": "List the site"}
    d.update(kw)
    return d


def test_proposer_keeps_grounded_rules_and_drops_the_rest():
    sid = _seed(title="TAUG Oncology Test", scope="ta", ref="Oncology")
    answers = [_good(),
               _good(name="Invented", quote="Every record must be signed by the principal investigator at lock."),
               _good(name="Bad pattern", text_pattern="(?i)duration", example_fires="Nothing relevant here"),
               _good(name="Broken regex", text_pattern="(unclosed"),
               "not a dict"]
    s = db.SessionLocal()
    res = rp.propose(s, T, sid, ask=lambda text, heading: answers)
    assert [c["name"] for c in res["created"]] == ["Duration from dates"]
    reasons = {d["name"]: d["reason"] for d in res["dropped"]}
    assert "quote not found" in reasons["Invented"]
    assert "examples fail" in reasons["Bad pattern"]
    assert "Broken regex" in reasons
    r = s.query(m.KnowledgeRule).filter_by(tenant_id=T, name="Duration from dates").one()
    assert r.status == "draft" and r.scope == "ta" and r.scope_ref == "Oncology" and r.evidence_source_id == sid
    again = rp.propose(s, T, sid, ask=lambda text, heading: [_good()])
    assert again["created"] == [] and "exists" in again["dropped"][0]["reason"]
    s.close()


def test_proposer_api_with_stubbed_model(monkeypatch):
    from fastapi.testclient import TestClient
    import main
    sid = _seed(title="Another source")
    monkeypatch.setattr(rp, "ask_model", lambda text, heading: [_good(name="Via API")])
    c = TestClient(main.app)
    h = {"X-Tenant-Id": T}
    r = c.post("/api/rules/propose", json={"sourceId": sid, "limit": 5}, headers=h)
    assert r.status_code == 200 and [x["name"] for x in r.json()["created"]] == ["Via API"], r.text
    assert c.post("/api/rules/propose", json={"sourceId": "nope"}, headers=h).status_code == 400
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    monkeypatch.undo()
    r = c.post("/api/rules/propose", json={"sourceId": sid}, headers=h)
    assert r.status_code == 400 and "ANTHROPIC_API_KEY" in r.json()["error"]


def test_cql_starter_rules_need_their_quote_and_their_own_tests_pass():
    import cql_starter_rules as cq
    text = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "reference_sources", "veeva_cdb_reference.md"), encoding="utf-8").read()
    s = db.SessionLocal()
    src = m.KnowledgeSource(tenant_id="cq", title="Veeva CDB reference", filename="veeva_cdb_reference.md", scope="global", extract_status="ok", status="approved")
    s.add(src)
    s.commit()
    s.add(m.KnowledgeChunk(tenant_id="cq", source_id=src.id, position=0, heading="x", text=text, meta={"kind": "text"}))
    s.commit()
    res = cq.load(s, "cq")
    assert [r["result"] for r in res] == ["created draft"] * len(cq.RULES), res
    r = s.query(m.KnowledgeRule).filter_by(tenant_id="cq").first()
    assert r.status == "draft" and r.condition["language"] == ["CQL"] and r.condition["edcSystem"] == ["veeva"]
    ctx = kr.context({"logic": "Only include submitted forms", "language": "CQL", "edcSystem": "veeva"})
    assert kr.matches(r.scope, r.scope_ref, r.condition, kr.context({"logic": "sort by date", "language": "SAS", "edcSystem": "veeva"}))[0] is False
    assert ctx["language"] == "CQL"
    s.close()
