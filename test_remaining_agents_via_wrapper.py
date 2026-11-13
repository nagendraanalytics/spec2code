"""The last agents moved to llm_client run correctly through the enterprise wrapper (only enterprise_llm.complete is patched)."""
import json

import pytest

import enterprise_llm
import llm_client
import rule_proposer as rp
import spec_code_crossref_agent as xr
import spec_gap_chat_agent as gap
import spec_sas_crossvalidate_agent as xv
import spec_suggestion_agent as sug
import synthetic_validation_agent as val

def _private_copy(name):
    """test_synthetic.py replaces synthetic_data_agent.run_synthetic_generation with a stub at import time, so test the real one from a private copy."""
    import importlib.util
    spec = importlib.util.spec_from_file_location(name + "_real", f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


syn = _private_copy("synthetic_data_agent")
SPEC = {"reportId": "R1", "description": "AEs", "columnHeading": "Subject", "logic": "Show AE rows", "reportScenarios": "", "sorting": "Subject"}


@pytest.fixture(autouse=True)
def _env(monkeypatch):
    monkeypatch.delenv("LLM_PROVIDER", raising=False)
    monkeypatch.setattr(enterprise_llm.time, "sleep", lambda s: None)


def reply(monkeypatch, text):
    calls = []

    def fake(system, user, **k):
        calls.append(k)
        return text
    monkeypatch.setattr(enterprise_llm, "complete", fake)
    return calls


GOOD = {
    "gap": (lambda: gap.run_gap_chat_turn(SPEC, "", []), {"updated_fields": {}, "done": True, "next_question": "", "gap_context": ""}, gap.AgentError, 8000),
    "xref": (lambda: xr.run_crossref(SPEC, "proc sql; quit;"), {"enriched_logic": "l", "logic_changed": False, "enrichment_summary": "s", "candidate_patterns": []}, xr.AgentError, 24000),
    "xval": (lambda: xv.run_crossvalidation(SPEC, "proc sql; quit;"), {"findings": [{"topic": "t", "classification": "CONFIRMED", "detail": "d"}], "updated_fields": {}, "overall_summary": "s"}, xv.AgentError, 24000),
    "sugg": (lambda: sug.run_spec_suggestion(SPEC, {"insights": []}), {"fields": [], "overall_summary": "s"}, sug.AgentError, 16000),
    "synth": (lambda: syn.run_synthetic_generation(SPEC), {"conditions": [{"id": "c1", "text": "t"}], "cases": [{"id": "k1", "conditionId": "c1", "expectation": "include", "scenario": "s", "rationale": "r", "tables": []}], "summary": "s"}, syn.AgentError, 24000),
    "valid": (lambda: val.run_synthetic_validation(SPEC, "SELECT 1", "sql"), {"test_cases": [{"condition_tested": "c", "synthetic_data": [], "expected_outcome": "e", "traced_outcome": "e", "quadrant": "TP", "explanation": "x"}], "conditions_identified": [], "overall_summary": "s"}, val.AgentError, 24000),
}


@pytest.mark.parametrize("name", GOOD)
def test_agent_returns_a_result_through_the_wrapper(monkeypatch, name):
    run, good, err, mt = GOOD[name]
    calls = reply(monkeypatch, json.dumps(good))
    assert isinstance(run(), dict) and calls[0]["max_tokens"] == mt


@pytest.mark.parametrize("name", GOOD)
def test_truncated_answer_fails_cleanly(monkeypatch, name):
    run, good, err, mt = GOOD[name]
    reply(monkeypatch, '{"cases": [{"x": "tru')
    with pytest.raises(err) as e:
        run()
    assert "cut off" in str(e.value)


@pytest.mark.parametrize("name", GOOD)
def test_not_configured(monkeypatch, name):
    run, good, err, mt = GOOD[name]
    monkeypatch.delenv("GENAI_AUTH_CLIENT_SECRET")
    with pytest.raises(err) as e:
        run()
    assert llm_client.is_config_error(e.value)


@pytest.mark.parametrize("name", GOOD)
def test_api_failure_is_an_agent_error(monkeypatch, name):
    run, good, err, mt = GOOD[name]

    def boom(*a, **k): raise enterprise_llm.LLMError("chat failed (500): down")
    monkeypatch.setattr(enterprise_llm, "complete", boom)
    with pytest.raises(err):
        run()


def test_rule_proposer_returns_rules(monkeypatch):
    reply(monkeypatch, json.dumps({"rules": [{"a": 1}]}))
    assert rp.ask_model("passage", "heading") == [{"a": 1}]


def test_rule_proposer_without_rules_is_empty(monkeypatch):
    reply(monkeypatch, json.dumps({"rules": "nope"}))
    assert rp.ask_model("passage", "heading") == []


def test_rule_proposer_not_configured(monkeypatch):
    monkeypatch.delenv("GENAI_MODEL_ID")
    with pytest.raises(rp.ProposerError) as e:
        rp.ask_model("p", "h")
    assert llm_client.is_config_error(e.value)
