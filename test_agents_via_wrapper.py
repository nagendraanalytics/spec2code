"""The agents moved to llm_client run correctly through the enterprise wrapper. Only enterprise_llm.complete is patched (no network);
the real agent code, prompts' schema handling and result checks all run."""
import json

import pytest

import enterprise_llm
import llm_client
import logic_understanding_agent as lu
import spec_extraction_agent as ex
import spec_review_agents as rv

SPEC = {"reportId": "R1", "description": "AEs", "columnHeading": "Subject", "logic": "Show AE rows", "reportScenarios": "", "sorting": "Subject"}


@pytest.fixture(autouse=True)
def _env(monkeypatch):
    monkeypatch.delenv("LLM_PROVIDER", raising=False)
    monkeypatch.setattr(enterprise_llm.time, "sleep", lambda s: None)


def answer(monkeypatch, *texts):
    seq = list(texts)
    calls = []

    def fake(system, user, **k):
        calls.append((system, user, k))
        return seq.pop(0) if len(seq) > 1 else seq[0]
    monkeypatch.setattr(enterprise_llm, "complete", fake)
    return calls


# ---- logic understanding
GOOD_LOGIC = dict(domains_identified=["AE"], logic_steps=[{"step_number": 1, "explanation": "Take AE rows"}], key_definitions=[], assumptions=[], edge_cases=[], summary="s")


def test_logic_understanding_ok(monkeypatch):
    calls = answer(monkeypatch, json.dumps(GOOD_LOGIC))
    out = lu.run_logic_understanding(SPEC)
    assert out["logic_steps"][0]["explanation"] == "Take AE rows" and len(calls) == 1
    assert calls[0][2]["max_tokens"] == 24000


def test_logic_understanding_retries_after_an_unusable_steps_field(monkeypatch):
    bad = dict(GOOD_LOGIC, logic_steps=[])
    calls = answer(monkeypatch, json.dumps(bad), json.dumps(GOOD_LOGIC))
    assert lu.run_logic_understanding(SPEC)["logic_steps"]
    assert len(calls) == 2


def test_logic_understanding_gives_up_cleanly_on_garbage(monkeypatch):
    answer(monkeypatch, "I cannot do that")
    with pytest.raises(lu.AgentError) as e:
        lu.run_logic_understanding(SPEC)
    assert "cut off" in str(e.value) or "valid structured" in str(e.value)


def test_logic_understanding_not_configured(monkeypatch):
    monkeypatch.delenv("GENAI_MODEL_ID")
    with pytest.raises(lu.AgentError) as e:
        lu.run_logic_understanding(SPEC)
    assert llm_client.is_config_error(e.value)


# ---- extraction
GOOD_EXTRACT = dict(reportId="R1", description="d", columnHeading="c", logic="l", reportScenarios="", sorting="", extraction_notes="")


def test_extraction_ok(monkeypatch):
    answer(monkeypatch, json.dumps(GOOD_EXTRACT))
    assert ex.run_spec_extraction("some raw spec text")["reportId"] == "R1"


def test_extraction_empty_text(monkeypatch):
    with pytest.raises(ex.AgentError):
        ex.run_spec_extraction("   ")


def test_extraction_truncated_answer_fails_cleanly(monkeypatch):
    answer(monkeypatch, '{"reportId": "R1", "descr')
    with pytest.raises(ex.AgentError) as e:
        ex.run_spec_extraction("some raw spec text")
    assert "cut off" in str(e.value)


def test_extraction_missing_required_field_is_not_returned(monkeypatch):
    answer(monkeypatch, json.dumps({"reportId": "R1"}))
    with pytest.raises(ex.AgentError):
        ex.run_spec_extraction("some raw spec text")


# ---- multi-agent review (5 field agents in parallel + master)
def test_multi_agent_review_through_the_wrapper(monkeypatch):
    def fake(system, user, **k):
        if "submit_master_review" in system:
            return json.dumps({"consistency_insights": [{"finding": "x", "severity": "warning"}], "summary": "overall"})
        return json.dumps({"insights": [{"finding": "f", "severity": "info", "category": "ambiguity"}]})
    monkeypatch.setattr(enterprise_llm, "complete", fake)
    out = rv.run_multi_agent_spec_review(SPEC)
    assert out["summary"] == "overall"
    sources = {i["source"] for i in out["insights"]}
    assert "master_agent" in sources and any(s.endswith("_agent") and s != "master_agent" for s in sources)
    assert out["readiness"] == "ready_with_notes"


def test_a_field_agent_failure_is_reported_not_swallowed(monkeypatch):
    def fake(system, user, **k):
        raise enterprise_llm.LLMError("chat failed (500): down")
    monkeypatch.setattr(enterprise_llm, "complete", fake)
    with pytest.raises(rv.AgentError):
        rv.run_multi_agent_spec_review(SPEC)
