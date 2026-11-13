"""enterprise_llm.py -- Accenture GenAI Wrapper client (Entra ID client credentials -> ChatCompletion).

Every setting comes from the environment (GENAI_*); nothing is hardcoded and nothing secret is logged or
returned. Callers must pass MASKED spec text only (project rule); this module never logs prompts or answers.
Use llm_client.call_tool() from the agents -- not this module directly.
"""
from __future__ import annotations

import json
import os
import threading
import time

import httpx


class LLMError(RuntimeError):
    pass


_lock = threading.Lock()
_tok: dict = {}

_NAMES = dict(
    token_url="GENAI_TOKEN_URL", auth_id="GENAI_AUTH_CLIENT_ID", secret="GENAI_AUTH_CLIENT_SECRET",
    scope="GENAI_SCOPE", base_url="GENAI_BASE_URL", client_id="GENAI_CLIENT_ID", deal_id="GENAI_DEAL_ID",
    engine_id="GENAI_ENGINE_ID", model_id="GENAI_MODEL_ID",
)


def _cfg() -> dict:
    c = {k: os.environ.get(v, "").strip() for k, v in _NAMES.items()}
    c["user_id"] = os.environ.get("GENAI_USER_ID", "spec2code")
    # wrapper routing fields: confirm the allowed values for this deal with the wrapper team
    c["tool"] = os.environ.get("GENAI_TOOL", "spec2code")
    c["tool_choice"] = os.environ.get("GENAI_TOOL_CHOICE", "spec2code")
    return c


def available() -> bool:
    c = _cfg()
    return all(c[k] for k in ("token_url", "auth_id", "secret", "scope", "base_url", "client_id", "engine_id", "model_id"))


def model_label() -> str:
    return os.environ.get("GENAI_MODEL_NAME", "") or _cfg()["model_id"]


def reset() -> None:
    with _lock:
        _tok.clear()


def _short(r: httpx.Response, c: dict) -> str:
    try:
        j = r.json()
        s = str(j.get("error_description") or j.get("message") or j)[:200]
    except Exception:  # noqa: BLE001
        s = r.text[:200]
    return s.replace(c["secret"], "***") if c["secret"] else s


def _token(c: dict, force: bool = False) -> str:
    key = "|".join([c["token_url"], c["auth_id"], c["scope"], str(hash(c["secret"]))])
    with _lock:
        if not force and _tok.get(key) and time.time() < _tok[key][1]:
            return _tok[key][0]
        r = httpx.post(c["token_url"], data=dict(grant_type="client_credentials", client_id=c["auth_id"],
                                                 client_secret=c["secret"], scope=c["scope"]), timeout=30)
        if r.status_code >= 400:
            raise LLMError(f"token request failed ({r.status_code}): {_short(r, c)}")
        j = r.json()
        _tok[key] = (j["access_token"], time.time() + max(60, int(j.get("expires_in", 3600)) - 120))
        return _tok[key][0]


def _chat_url(c: dict) -> str:
    deal = f"/Deal/{c['deal_id']}" if c["deal_id"] else ""
    return f"{c['base_url'].rstrip('/')}/Client/{c['client_id']}{deal}/Engine/{c['engine_id']}/Model/{c['model_id']}/ChatCompletion"


def complete(system: str, user: str, *, max_tokens: int = 4000, timeout: int = 120) -> str:
    """One ChatCompletion call; returns the answer text. Retries a 401 once with a new token and 429/502/503/504 with backoff."""
    if not available():
        raise LLMError("The enterprise LLM is not configured (GENAI_* settings)")
    c = _cfg()
    body = dict(context=system, question=user, example=[], tool=c["tool"], tool_choice=c["tool_choice"])
    force = False
    for attempt in range(4):
        h = {"Authorization": f"Bearer {_token(c, force)}", "Content-Type": "application/json", "X-UserId": c["user_id"],
             "X-Max-Tokens": str(max_tokens), "X-Temperature": "0"}
        r = httpx.post(_chat_url(c), headers=h, json=body, timeout=timeout)
        if r.status_code == 401 and not force:
            force = True
            continue
        if r.status_code in (429, 502, 503, 504) and attempt < 3:
            time.sleep(2 ** attempt)
            continue
        if r.status_code >= 400:
            raise LLMError(f"chat failed ({r.status_code}): {_short(r, c)}")
        j = r.json()
        if str(j.get("status", "200")) != "200":
            raise LLMError(f"chat failed: {str(j.get('message'))[:200]}")
        return j.get("response") or ""
    raise LLMError("chat failed after retries")


# ---- structured output: the replacement for forced tool-use. The wrapper has no tool-use, so the schema goes in the prompt and is checked here.
_TYPES = dict(string=str, array=list, object=dict, boolean=bool, integer=int, number=(int, float))


def _parse(text: str):
    t = text.strip()
    i = t.find("{")
    if i < 0:
        return None
    try:
        return json.JSONDecoder().raw_decode(t[i:])[0]
    except Exception:  # noqa: BLE001
        return None


def _check(obj, schema: dict | None) -> str:
    if not isinstance(obj, dict):
        return "the answer was not a single JSON object"
    for k in (schema or {}).get("required", []):
        if k not in obj:
            return f"missing required field '{k}'"
    for k, p in ((schema or {}).get("properties") or {}).items():
        t = _TYPES.get(p.get("type"))
        if k in obj and t and obj[k] is not None and not isinstance(obj[k], t):
            return f"field '{k}' must be of type {p.get('type')}"
    return ""


def complete_json(system: str, user: str, *, schema: dict | None = None, max_tokens: int = 4000, retries: int = 2) -> dict:
    """One JSON object that satisfies `schema` (required fields and top-level types); asks again, naming the problem, when it does not."""
    sys2 = system + "\n\nReturn exactly one JSON object and nothing else: no prose, no code fences." + (
        f" It must match this JSON Schema:\n{json.dumps(schema)}" if schema else "")
    prompt, problem = user, ""
    for _ in range(retries + 1):
        obj = _parse(complete(sys2, prompt, max_tokens=max_tokens))
        problem = _check(obj, schema)
        if not problem:
            return obj
        prompt = f"{user}\n\nYour previous answer was rejected: {problem}. Answer again with only the corrected JSON object."
    raise LLMError(f"no valid JSON after {retries + 1} tries: {problem}")
