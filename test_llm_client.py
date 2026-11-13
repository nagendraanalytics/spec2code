"""llm_client / enterprise_llm tests. No real model or network: enterprise_llm.complete or httpx.post is patched."""
import json
import os
import types

import httpx
import pytest

import cql_agents
import enterprise_llm
import llm_client

TOOL = {"name": "submit_x", "description": "d", "input_schema": {
    "type": "object", "properties": {"cql": {"type": "string"}, "steps": {"type": "array"}}, "required": ["cql", "steps"]}}


@pytest.fixture(autouse=True)
def _genai_default(monkeypatch):
    monkeypatch.delenv("LLM_PROVIDER", raising=False)
    enterprise_llm.reset()


def test_genai_returns_the_tool_input(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: 'Here: {"cql": "SELECT 1", "steps": ["a"]}')
    r = llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=100)
    assert r.input == {"cql": "SELECT 1", "steps": ["a"]} and r.stop_reason == "tool_use"


def test_schema_is_sent_to_the_wrapper(monkeypatch):
    seen = {}
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: seen.update(system=s) or '{"cql": "q", "steps": []}')
    llm_client.call_tool(system="SYS", user="u", tool=TOOL, max_tokens=100)
    assert "SYS" in seen["system"] and '"required": ["cql", "steps"]' in seen["system"]


def test_invalid_answer_is_retried_with_the_problem_named(monkeypatch):
    prompts = []

    def fake(system, user, **k):
        prompts.append(user)
        return "not json at all" if len(prompts) == 1 else '{"cql": "q", "steps": []}'
    monkeypatch.setattr(enterprise_llm, "complete", fake)
    r = llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=100)
    assert r.input["cql"] == "q" and len(prompts) == 2 and "rejected" in prompts[1]


def test_missing_required_field_ends_as_invalid_json_not_a_crash(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: '{"cql": "q"}')
    r = llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=100)
    assert r.input is None and r.stop_reason == "invalid_json"


def test_wrong_type_is_rejected(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: '{"cql": 5, "steps": []}')
    assert llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=100).stop_reason == "invalid_json"


def test_api_failure_raises_client_error(monkeypatch):
    def boom(*a, **k): raise enterprise_llm.LLMError("chat failed (500): x")
    monkeypatch.setattr(enterprise_llm, "complete", boom)
    with pytest.raises(llm_client.LLMClientError):
        llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=100)


def test_not_configured(monkeypatch):
    monkeypatch.delenv("GENAI_AUTH_CLIENT_SECRET")
    assert not llm_client.available()
    with pytest.raises(llm_client.LLMClientError) as e:
        llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=100)
    assert llm_client.is_config_error(e.value)
    assert llm_client.is_config_error(Exception("ANTHROPIC_API_KEY is not set."))      # an agent not yet moved to llm_client
    assert not llm_client.is_config_error(Exception("timeout"))


def test_unknown_provider_is_refused(monkeypatch):
    monkeypatch.setenv("LLM_PROVIDER", "nope")
    assert not llm_client.available()
    with pytest.raises(llm_client.LLMClientError):
        llm_client.provider()


def test_anthropic_provider_uses_the_key_and_base_url(monkeypatch):
    monkeypatch.setenv("LLM_PROVIDER", "anthropic")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "ent-key")
    monkeypatch.setenv("ANTHROPIC_BASE_URL", "https://gateway.example.invalid")
    seen = {}

    class Stream:
        def __enter__(self): return self
        def __exit__(self, *a): return False
        def get_final_message(self):
            blk = types.SimpleNamespace(type="tool_use", name="submit_x", input={"cql": "q", "steps": []})
            return types.SimpleNamespace(content=[blk], stop_reason="tool_use")

    class FakeAnthropic:
        def __init__(self, api_key, base_url=None): seen.update(api_key=api_key, base_url=base_url)
        messages = types.SimpleNamespace(stream=lambda **k: seen.update(kw=k) or Stream())

    import anthropic
    monkeypatch.setattr(anthropic, "Anthropic", FakeAnthropic)
    r = llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=10, model="m1")
    assert r.input["cql"] == "q" and seen["api_key"] == "ent-key" and seen["base_url"] == "https://gateway.example.invalid"
    assert seen["kw"]["model"] == "m1" and seen["kw"]["tool_choice"] == {"type": "tool", "name": "submit_x"}


def test_anthropic_provider_needs_a_model(monkeypatch):
    monkeypatch.setenv("LLM_PROVIDER", "anthropic")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "k")
    monkeypatch.delenv("ANTHROPIC_MODEL", raising=False)
    with pytest.raises(llm_client.LLMClientError):
        llm_client.call_tool(system="s", user="u", tool=TOOL, max_tokens=10)


# ---- the real HTTP flow of enterprise_llm, with httpx.post replaced
def _resp(status, body):
    return httpx.Response(status, json=body, request=httpx.Request("POST", "https://x.invalid"))


def test_wrapper_http_flow_token_cache_and_401_retry(monkeypatch):
    calls = []

    def post(url, **k):
        calls.append(url)
        if url.endswith("/token"):
            return _resp(200, {"access_token": f"tok{len([c for c in calls if c.endswith('/token')])}", "expires_in": 3600})
        auth = k["headers"]["Authorization"]
        if auth == "Bearer tok1" and len([c for c in calls if c.endswith("ChatCompletion")]) == 1:
            return _resp(401, {"message": "expired"})
        return _resp(200, {"status": "200", "response": '{"cql": "q", "steps": []}'})
    monkeypatch.setenv("GENAI_TOKEN_URL", "https://login.example.invalid/token")
    monkeypatch.setattr(httpx, "post", post)
    out = enterprise_llm.complete_json("s", "u", schema=TOOL["input_schema"])
    assert out["cql"] == "q"
    assert [c.endswith("/token") for c in calls] == [True, False, True, False]      # token, chat 401, new token, chat ok
    assert calls[1].endswith("/Client/test-client/Engine/test-engine/Model/test-model/ChatCompletion")


def test_wrapper_error_text_never_contains_the_secret(monkeypatch):
    monkeypatch.setattr(httpx, "post", lambda url, **k: _resp(400, {"error_description": "bad secret test-secret here"}))
    with pytest.raises(enterprise_llm.LLMError) as e:
        enterprise_llm.complete("s", "u")
    assert "test-secret" not in str(e.value) and "***" in str(e.value)


def test_wrapper_backs_off_on_503(monkeypatch):
    seq = iter([503, 503, 200])
    monkeypatch.setattr(enterprise_llm.time, "sleep", lambda s: None)

    def post(url, **k):
        if url.endswith("/token"): return _resp(200, {"access_token": "t", "expires_in": 3600})
        st = next(seq)
        return _resp(st, {"status": "200", "response": "ok"} if st == 200 else {"message": "busy"})
    monkeypatch.setattr(httpx, "post", post)
    assert enterprise_llm.complete("s", "u") == "ok"


# ---- through the real cql_agents code
def test_cql_generation_through_the_wrapper(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: json.dumps({"cql": "SELECT 1 FROM AE", "explanation": "e"}))
    out = cql_agents.run_cql_generation({"reportId": "R1", "description": "d"})
    assert out["cql"] == "SELECT 1 FROM AE"


def test_cql_generation_truncation_fails_cleanly(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: '{"cql": "SELECT 1 FR')
    with pytest.raises(cql_agents.AgentError) as e:
        cql_agents.run_cql_generation({"reportId": "R1", "description": "d"})
    assert "cut off" in str(e.value)


def test_cql_generation_empty_cql_is_refused(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: '{"cql": "", "explanation": "e"}')
    with pytest.raises(cql_agents.AgentError):
        cql_agents.run_cql_generation({"reportId": "R1", "description": "d"})


def test_spec_review_through_the_wrapper(monkeypatch):
    monkeypatch.setattr(enterprise_llm, "complete", lambda s, u, **k: json.dumps({"readiness": "ready", "insights": [], "summary": "ok"}))
    assert cql_agents.run_spec_review({"reportId": "R1", "description": "d"})["readiness"] == "ready"
