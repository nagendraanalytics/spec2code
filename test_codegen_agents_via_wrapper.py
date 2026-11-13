"""The code generation agents moved to llm_client run correctly through the enterprise wrapper (only enterprise_llm.complete is patched)."""
import json

import pytest

import code_gen_agents as cga
import cot_generation as cg
import enterprise_llm
import llm_client
import r_agents
import sas_agents
import sas_migration_agent as mig
import sql_agents

SPEC = {"reportId": "R1", "description": "AEs", "columnHeading": "Subject", "logic": "Show AE rows", "reportScenarios": "", "sorting": "Subject"}


@pytest.fixture(autouse=True)
def _env(monkeypatch):
    monkeypatch.delenv("LLM_PROVIDER", raising=False)
    monkeypatch.setattr(enterprise_llm.time, "sleep", lambda s: None)


def reply(monkeypatch, *texts):
    seq = list(texts)
    calls = []

    def fake(system, user, **k):
        calls.append(k)
        return seq.pop(0) if len(seq) > 1 else seq[0]
    monkeypatch.setattr(enterprise_llm, "complete", fake)
    return calls


CASES = [
    (sas_agents.run_sas_generation, (SPEC,), {"sas_code": "proc sql; quit;", "explanation": "e"}, "sas_code", sas_agents.AgentError),
    (r_agents.run_r_generation, (SPEC,), {"r_code": "library(dplyr)", "explanation": "e"}, "r_code", r_agents.AgentError),
    (sql_agents.run_sql_generation, (SPEC,), {"sql": "SELECT 1", "explanation": "e"}, "sql", sql_agents.AgentError),
]


@pytest.mark.parametrize("fn,args,good,field,err", CASES)
def test_generation_ok(monkeypatch, fn, args, good, field, err):
    calls = reply(monkeypatch, json.dumps(good))
    assert fn(*args)[field] == good[field] and calls[0]["max_tokens"] == 8000


@pytest.mark.parametrize("fn,args,good,field,err", CASES)
def test_generation_truncated_fails_cleanly(monkeypatch, fn, args, good, field, err):
    reply(monkeypatch, '{"' + field + '": "SELECT 1 FR')
    with pytest.raises(err) as e:
        fn(*args)
    assert "cut off" in str(e.value)


@pytest.mark.parametrize("fn,args,good,field,err", CASES)
def test_generation_not_configured(monkeypatch, fn, args, good, field, err):
    monkeypatch.delenv("GENAI_AUTH_CLIENT_SECRET")
    with pytest.raises(err) as e:
        fn(*args)
    assert llm_client.is_config_error(e.value)


@pytest.mark.parametrize("fn,args,good,field,err", CASES)
def test_generation_api_failure_is_an_agent_error(monkeypatch, fn, args, good, field, err):
    def boom(*a, **k): raise enterprise_llm.LLMError("chat failed (500): down")
    monkeypatch.setattr(enterprise_llm, "complete", boom)
    with pytest.raises(err):
        fn(*args)


# ---- SAS migration
GOOD_MIG = dict(description="d", columnHeading="c", logic="l", reportScenarios="", sorting="", migration_notes="n")


def test_migration_ok(monkeypatch):
    calls = reply(monkeypatch, json.dumps(GOOD_MIG))
    assert mig.run_sas_migration("proc sql; quit;")["logic"] == "l" and calls[0]["max_tokens"] == 16000


def test_migration_unusable_result_is_refused(monkeypatch):
    reply(monkeypatch, json.dumps(dict(GOOD_MIG, description="", logic="")))
    with pytest.raises(mig.AgentError):
        mig.run_sas_migration("proc sql; quit;")


# ---- the six-step CQL decomposition
def test_a_decomposition_step_through_the_wrapper(monkeypatch):
    reply(monkeypatch, json.dumps({"domains": [{"form": "AE", "reason": "r"}]}))
    assert cga.run_domains_agent(SPEC)["domains"][0]["form"] == "AE"


def test_a_decomposition_step_names_itself_on_failure(monkeypatch):
    reply(monkeypatch, "nonsense")
    with pytest.raises(cga.AgentError) as e:
        cga.run_domains_agent(SPEC)
    assert "domains agent" in str(e.value)


# ---- the CoT generation call
TOOL = {"name": "t", "description": "d", "input_schema": {"type": "object", "properties": {"sql": {"type": "string"}}, "required": ["sql"]}}


def test_cot_call_ok(monkeypatch):
    reply(monkeypatch, '{"sql": "SELECT 1"}')
    assert cg._call("s", "u", TOOL, RuntimeError) == {"sql": "SELECT 1"}


def test_cot_call_cut_off(monkeypatch):
    reply(monkeypatch, '{"sql": "SELECT')
    with pytest.raises(RuntimeError) as e:
        cg._call("s", "u", TOOL, RuntimeError)
    assert "cut off" in str(e.value)


def test_cot_call_not_configured(monkeypatch):
    monkeypatch.delenv("GENAI_MODEL_ID")
    with pytest.raises(RuntimeError) as e:
        cg._call("s", "u", TOOL, RuntimeError)
    assert llm_client.is_config_error(e.value)
