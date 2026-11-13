"""llm_client.py -- the ONE place this project calls a language model.

Agents call call_tool(); which provider answers is configuration, not code:

    LLM_PROVIDER=genai       (default) the Accenture GenAI Wrapper -- the enterprise account (see enterprise_llm.py, GENAI_* settings)
    LLM_PROVIDER=anthropic   the Anthropic API with ANTHROPIC_API_KEY (and optional ANTHROPIC_BASE_URL for a company gateway).
                             Use ONLY an enterprise-account key; a personal key must not be used for client data.

call_tool() returns a ToolResult so agents keep the stop_reason handling they already have (a cut-off answer must fail
cleanly, never be shown as if it were finished). The enterprise wrapper has no tool-use and reports no stop reason: it is
asked for one JSON object matching the tool's input_schema, checked here, and a failure to produce valid JSON reports
stop_reason="invalid_json" (which may be a truncated answer).

Callers must pass MASKED, non-proprietary spec text only (project rule). Nothing here logs prompts or answers.
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Optional

import enterprise_llm

PROVIDERS = ("genai", "anthropic")
NOT_CONFIGURED = "The language model is not configured"


class LLMClientError(Exception):
    """Any failure to get an answer (not configured, network/API error)."""


@dataclass
class ToolResult:
    input: Optional[dict]       # the tool's input as a dict, or None when the model did not produce it
    stop_reason: str            # "tool_use" | "max_tokens" | "invalid_json" | "no_tool" | (provider's own value)


def provider() -> str:
    p = os.environ.get("LLM_PROVIDER", "genai").strip().lower() or "genai"
    if p not in PROVIDERS:
        raise LLMClientError(f"Unknown LLM_PROVIDER '{p}' (use one of: {', '.join(PROVIDERS)}).")
    return p


def available() -> bool:
    try:
        p = provider()
    except LLMClientError:
        return False
    return enterprise_llm.available() if p == "genai" else bool(os.environ.get("ANTHROPIC_API_KEY"))


def model_label() -> str:
    try:
        p = provider()
    except LLMClientError:
        return ""
    return enterprise_llm.model_label() if p == "genai" else os.environ.get("ANTHROPIC_MODEL", "")


def not_configured_message() -> str:
    p = os.environ.get("LLM_PROVIDER", "genai").strip().lower() or "genai"
    need = "the GENAI_* settings" if p == "genai" else "ANTHROPIC_API_KEY"
    return f"{NOT_CONFIGURED} (LLM_PROVIDER={p}): set {need} in .env and restart the server."


def is_config_error(e: BaseException) -> bool:
    """True for a 'not configured' failure, including the older per-agent ANTHROPIC_API_KEY message (agents not yet moved here)."""
    s = str(e)
    return NOT_CONFIGURED in s or "ANTHROPIC_API_KEY is not set" in s


def call_tool(*, system: str, user: str, tool: dict, max_tokens: int, model: Optional[str] = None) -> ToolResult:
    """Force one structured answer matching `tool` ({"name", "description", "input_schema"}).
    `model` applies to the anthropic provider only (the enterprise wrapper's model is fixed by its settings)."""
    if not available():
        raise LLMClientError(not_configured_message())
    if provider() == "genai":
        return _call_genai(system, user, tool, max_tokens)
    return _call_anthropic(system, user, tool, max_tokens, model)


def _call_genai(system: str, user: str, tool: dict, max_tokens: int) -> ToolResult:
    try:
        obj = enterprise_llm.complete_json(system, user, schema=tool.get("input_schema"), max_tokens=max_tokens)
    except enterprise_llm.LLMError as e:
        if "no valid JSON" in str(e):
            return ToolResult(None, "invalid_json")
        raise LLMClientError(f"Enterprise LLM request failed: {e}") from e
    return ToolResult(obj, "tool_use")


def _call_anthropic(system: str, user: str, tool: dict, max_tokens: int, model: Optional[str]) -> ToolResult:
    import anthropic  # imported here so a genai-only deployment does not need the SDK at runtime

    model = model or os.environ.get("ANTHROPIC_MODEL", "")
    if not model:
        raise LLMClientError("No model is set for the anthropic provider (pass model= or set ANTHROPIC_MODEL).")
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"], base_url=os.environ.get("ANTHROPIC_BASE_URL") or None)
    try:
        # messages.stream() + get_final_message(): the SDK requires streaming for any request whose max_tokens
        # makes a >10-minute completion plausible (the same reason every agent in this project streams).
        with client.messages.stream(
            model=model, max_tokens=max_tokens, system=system, tools=[tool],
            tool_choice={"type": "tool", "name": tool["name"]},
            messages=[{"role": "user", "content": user}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise LLMClientError(f"Anthropic API request failed: {e}") from e
    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == tool["name"]:
            return ToolResult(block.input, response.stop_reason)
    return ToolResult(None, response.stop_reason or "no_tool")
