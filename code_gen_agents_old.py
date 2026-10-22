"""
code_gen_agents.py — multi-agent CQL generation, decomposing the single
Tier 5 Claude call (cql_agents.run_cql_generation) into 6 sequential
reasoning sub-agents + 1 synthesis agent.

Why sequential, not parallel (unlike spec_review_agents.py's 5
independent field agents): the real dependency graph doesn't support
parallelism here.
    domains    -- needs only the spec. The one genuinely independent step.
    columns    -- needs domains (which tables are even in play).
    joins      -- needs domains + columns (join keys reference specific columns).
    filters    -- needs domains + columns + joins (WHERE clauses reference joined tables).
    edge_cases -- needs the filters already drafted, to know what they don't yet cover.
    self_check -- needs the full chain, to review it for gaps/contradictions.
    synthesis  -- needs the full validated chain to render actual code.
Running columns before domains exist, for example, would just make the
model guess at table names it hasn't reasoned about yet -- worse output,
not faster generation, since none of these calls are on the critical
path of anything else running concurrently.

Cost, stated plainly: 7 model calls per generation vs. 1 in
cql_agents.run_cql_generation(). This is a separate, opt-in function --
main.py and orchestration/graph.py's tier5_claude_node do not call this.

MODEL SELECTION (chosen per study in the study-setup phase)
-----------------------------------------------------------
The study setup stores a `model_config` dict and passes it to
run_multi_agent_code_generation(spec, model_config=...). Call
validate_model_config() when the user saves the setup so a bad choice is
caught then, not in the middle of a run:

    {
      "provider": "claude" | "gemini" | "gpt",      # aliases accepted
      "model": "<model id>",                        # required except for claude
      "max_tokens": 1500,                           # optional
      "step_models": {                              # optional per-step override
          "synthesis": {"provider": "claude", "model": "claude-sonnet-5-5"},
          "domains":   {"model": "<cheaper model, same provider>"}
      }
    }

API KEYS are NEVER part of the study config (they would end up in the
database / logs). They come from the server environment or secret store:
    ANTHROPIC_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY
CQLGEN_ALLOWED_PROVIDERS (comma list, default "anthropic,gemini,openai") lets
the deployment restrict which providers a study may choose -- e.g. only the
approved one for client data.

With no model_config, falls back to CQLGEN_PROVIDER / CQLGEN_MODEL env vars,
then to Anthropic's default model.

Every call's provider, model, token usage and latency is returned as
"model_calls" so each generated CQL can be traced to the model that made it.
"""

import contextvars
import json
import os
import time
from typing import Optional

import chain_guardrails
import guardrails

# ---------------------------------------------------------------------
# Provider registry + model configuration
# ---------------------------------------------------------------------

PROVIDERS = {
    "anthropic": {"key_env": "ANTHROPIC_API_KEY", "default_model": "claude-sonnet-5-5"},
    "gemini": {"key_env": "GEMINI_API_KEY", "default_model": None},
    "openai": {"key_env": "OPENAI_API_KEY", "default_model": None},
}

# What users type in the study setup UI -> internal provider name.
PROVIDER_ALIASES = {
    "claude": "anthropic", "anthropic": "anthropic",
    "gemini": "gemini", "google": "gemini",
    "gpt": "openai", "openai": "openai", "chatgpt": "openai",
}

STEP_NAMES = ("domains", "columns", "joins", "filters", "edge_cases", "self_check", "synthesis")

# Synthesis renders the full CQL so it needs the most headroom; a truncated
# tool call makes the agent fail outright.
STEP_MAX_TOKENS = {"default": 1500, "synthesis": 4000}

MAX_RETRIES = 5  # transient errors (429 / 503 / overloaded)


class AgentError(Exception):
    pass


def _normalize_provider(name) -> str:
    key = str(name or "").strip().lower()
    if key not in PROVIDER_ALIASES:
        raise AgentError(f"Unknown provider '{name}'. Choose one of: claude, gemini, gpt.")
    return PROVIDER_ALIASES[key]


def _allowed_providers() -> set:
    raw = os.environ.get("CQLGEN_ALLOWED_PROVIDERS", "anthropic,gemini,openai")
    return {_normalize_provider(p) for p in raw.split(",") if p.strip()}


def _env_default_config() -> dict:
    provider = _normalize_provider(os.environ.get("CQLGEN_PROVIDER", "anthropic"))
    return {"provider": provider, "model": os.environ.get("CQLGEN_MODEL")}


def validate_model_config(model_config: Optional[dict], check_keys: bool = True) -> dict:
    """Validate and normalize a study's model_config. Call this when the study
    setup is saved. Returns the normalized config (provider names canonical);
    raises AgentError with a message suitable to show the user."""
    cfg = dict(model_config or _env_default_config())
    allowed = _allowed_providers()

    def _check(provider_name, model, where):
        provider = _normalize_provider(provider_name)
        if provider not in allowed:
            raise AgentError(f"{where}: provider '{provider_name}' is not enabled for this deployment.")
        if not (model or PROVIDERS[provider]["default_model"]):
            raise AgentError(f"{where}: a model id is required for provider '{provider_name}'.")
        if check_keys and not os.environ.get(PROVIDERS[provider]["key_env"]):
            raise AgentError(f"{where}: {PROVIDERS[provider]['key_env']} is not configured on the server.")
        return provider

    cfg["provider"] = _check(cfg.get("provider"), cfg.get("model"), "study model")

    steps = {}
    for step, override in (cfg.get("step_models") or {}).items():
        if step not in STEP_NAMES:
            raise AgentError(f"Unknown step '{step}' in step_models (valid: {', '.join(STEP_NAMES)}).")
        override = dict(override or {})
        step_provider = override.get("provider") or cfg["provider"]
        # A model id from one provider is meaningless for another, so a step
        # that switches provider must name its own model.
        model = override.get("model") or (cfg.get("model") if _normalize_provider(step_provider) == cfg["provider"] else None)
        override["provider"] = _check(step_provider, model, f"step '{step}'")
        steps[step] = override
    cfg["step_models"] = steps
    return cfg


# The config for the run in progress. A ContextVar (not a global) so concurrent
# runs for different studies can't see each other's provider choice.
_active_config: contextvars.ContextVar = contextvars.ContextVar("cqlgen_active_config", default=None)
# Per-run record of every model call (provider, model, usage, latency).
_call_log: contextvars.ContextVar = contextvars.ContextVar("cqlgen_call_log", default=None)


def _resolve(step_name: str) -> dict:
    cfg = _active_config.get() or validate_model_config(None, check_keys=False)
    step = (cfg.get("step_models") or {}).get(step_name, {})
    provider = _normalize_provider(step.get("provider") or cfg["provider"])
    model = step.get("model") or (cfg.get("model") if provider == cfg["provider"] else None)
    model = model or PROVIDERS[provider]["default_model"]
    if not model:
        raise AgentError(f"No model configured for step '{step_name}' (provider '{provider}').")
    max_tokens = step.get("max_tokens") or cfg.get("max_tokens") or STEP_MAX_TOKENS.get(step_name, STEP_MAX_TOKENS["default"])
    return {"provider": provider, "model": model, "max_tokens": max_tokens}


def _api_key(provider: str) -> str:
    env = PROVIDERS[provider]["key_env"]
    key = os.environ.get(env)
    if not key:
        raise AgentError(f"{env} is not set.")
    return key


def _record_call(step_name: str, provider: str, model: str, usage: dict, seconds: float) -> None:
    log = _call_log.get()
    if log is not None:
        log.append({"step": step_name, "provider": provider, "model": model, "usage": usage, "seconds": round(seconds, 2)})


CQL_DATA_MODEL_CONTEXT = """CQL data model (Veeva Vault CDB): source data lives in \
EDC Forms named after the domain (e.g. AE, VAE, LB), referenced directly \
in FROM (e.g. `FROM AE`) -- there are no RM_<DOMAIN> tables. Subject/Site/ \
Country come from the implicit @HDR context (@HDR.Subject.Name, \
@HDR.Site.Number, etc.), never a joined table. "After encoding/coding" \
means CODEDTERM(Item, 'TermLevel'). Ongoing/continuing records (NULL end \
date) use IFNULL(EndDateItem, ...) per the spec's stated handling."""

# Same pattern as spec_review_agents.py's _CATEGORY_DEFINITIONS: ONE shared
# block, injected identically into every sub-agent's prompt, rather than each
# step re-deriving its own partial phrasing of the same constraints. Before
# this fix, "no CTEs" only appeared in the synthesis agent's own wording --
# every earlier step could reason toward a CTE-shaped structure with nothing
# telling it not to, and only synthesis (or guardrails.py, after the fact)
# would ever catch it.
CQL_RULES_CONTEXT = """Rules that apply at every step of this reasoning chain:
- Ground every choice in the spec's actual Description/Logic/Report Scenarios \
text -- never invent a table, column, join, or condition the spec doesn't \
support. If something is inferred rather than explicitly stated (e.g. an \
Item name assumed from CDISC convention), say so rather than presenting it \
as certain.
- The final query must be a SINGLE statement -- no WITH clauses / CTEs \
anywhere. Plan around subqueries or direct joins from the start, not just \
at the synthesis step -- a join or filter plan that assumes a CTE will \
force a worse rewrite later, not just a syntax swap."""


def _spec_text(spec: dict) -> str:
    return (
        f"Report ID: {spec.get('reportId', '')}\n"
        f"Description: {spec.get('description', '')}\n"
        f"Column Heading: {spec.get('columnHeading', '')}\n"
        f"Logic: {spec.get('logic', '')}\n"
        f"Report Scenarios: {spec.get('reportScenarios', '')}\n"
        f"Sorting: {spec.get('sorting', '')}"
    )


# ---------------------------------------------------------------------
# Provider adapters -- the ONLY place that talks to a model. Prompts,
# tool schemas and the orchestrator below are provider-agnostic. SDKs are
# imported lazily, so only the providers a study actually uses need to be
# installed.
# ---------------------------------------------------------------------

def _call_anthropic(step_name: str, system: str, user: str, tool: dict, model: str, max_tokens: int) -> dict:
    try:
        import anthropic
    except ImportError as e:
        raise AgentError("anthropic is not installed (pip install anthropic).") from e

    client = anthropic.Anthropic(api_key=_api_key("anthropic"), max_retries=MAX_RETRIES)
    started = time.monotonic()
    try:
        response = client.messages.create(
            model=model,
            max_tokens=max_tokens,
            system=system,
            tools=[tool],
            tool_choice={"type": "tool", "name": tool["name"]},
            messages=[{"role": "user", "content": user}],
        )
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"{step_name} agent failed: {e}") from e

    usage = {
        "input_tokens": getattr(response.usage, "input_tokens", None),
        "output_tokens": getattr(response.usage, "output_tokens", None),
    }
    _record_call(step_name, "anthropic", getattr(response, "model", model), usage, time.monotonic() - started)

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == tool["name"]:
            return block.input
    raise AgentError(f"{step_name} agent did not call its tool (stop_reason={response.stop_reason})")


def _to_gemini_schema(schema):
    """Gemini wants upper-case JSON-schema type names (OBJECT, ARRAY, ...)."""
    if isinstance(schema, dict):
        return {k: (v.upper() if k == "type" and isinstance(v, str) else _to_gemini_schema(v)) for k, v in schema.items()}
    if isinstance(schema, list):
        return [_to_gemini_schema(v) for v in schema]
    return schema


def _plain(obj):
    """Convert SDK map/list wrappers into plain dict/list."""
    if hasattr(obj, "items"):
        return {k: _plain(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_plain(v) for v in obj]
    return obj


def _is_transient(exc: Exception) -> bool:
    text = str(exc).lower()
    return any(s in text for s in ("429", "503", "unavailable", "overloaded", "resource_exhausted", "rate limit"))


def _call_gemini(step_name: str, system: str, user: str, tool: dict, model: str, max_tokens: int) -> dict:
    try:
        from google import genai
        from google.genai import types
    except ImportError as e:
        raise AgentError("google-genai is not installed (pip install google-genai).") from e

    client = genai.Client(api_key=_api_key("gemini"))
    fn = types.FunctionDeclaration(
        name=tool["name"],
        description=tool["description"],
        parameters=_to_gemini_schema(tool["input_schema"]),
    )
    config = types.GenerateContentConfig(
        system_instruction=system,
        tools=[types.Tool(function_declarations=[fn])],
        tool_config=types.ToolConfig(
            function_calling_config=types.FunctionCallingConfig(mode="ANY", allowed_function_names=[tool["name"]])
        ),
        max_output_tokens=max_tokens,
    )

    started = time.monotonic()
    resp = None
    for attempt in range(MAX_RETRIES):
        try:
            resp = client.models.generate_content(model=model, contents=user, config=config)
            break
        except Exception as e:  # noqa: BLE001
            if _is_transient(e) and attempt < MAX_RETRIES - 1:
                time.sleep(2 ** attempt)  # 1s, 2s, 4s, 8s
                continue
            raise AgentError(f"{step_name} agent failed: {e}") from e

    um = getattr(resp, "usage_metadata", None)
    usage = {
        "input_tokens": getattr(um, "prompt_token_count", None),
        "output_tokens": getattr(um, "candidates_token_count", None),
    }
    _record_call(step_name, "gemini", model, usage, time.monotonic() - started)

    candidates = getattr(resp, "candidates", None) or []
    if candidates and candidates[0].content and candidates[0].content.parts:
        for part in candidates[0].content.parts:
            fc = getattr(part, "function_call", None)
            if fc and fc.name == tool["name"]:
                return _plain(fc.args)
    finish = candidates[0].finish_reason if candidates else "no candidates"
    raise AgentError(f"{step_name} agent did not call its tool (finish_reason={finish})")


def _call_openai(step_name: str, system: str, user: str, tool: dict, model: str, max_tokens: int) -> dict:
    try:
        import openai
    except ImportError as e:
        raise AgentError("openai is not installed (pip install openai).") from e

    client = openai.OpenAI(api_key=_api_key("openai"), max_retries=MAX_RETRIES)
    started = time.monotonic()
    try:
        response = client.chat.completions.create(
            model=model,
            max_completion_tokens=max_tokens,
            messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
            tools=[{
                "type": "function",
                "function": {
                    "name": tool["name"],
                    "description": tool["description"],
                    "parameters": tool["input_schema"],
                },
            }],
            tool_choice={"type": "function", "function": {"name": tool["name"]}},
        )
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"{step_name} agent failed: {e}") from e

    u = getattr(response, "usage", None)
    usage = {
        "input_tokens": getattr(u, "prompt_tokens", None),
        "output_tokens": getattr(u, "completion_tokens", None),
    }
    _record_call(step_name, "openai", getattr(response, "model", model), usage, time.monotonic() - started)

    choice = response.choices[0]
    for call in (choice.message.tool_calls or []):
        if call.function.name == tool["name"]:
            try:
                return json.loads(call.function.arguments)
            except json.JSONDecodeError as e:
                raise AgentError(f"{step_name} agent returned invalid JSON arguments (finish_reason={choice.finish_reason})") from e
    raise AgentError(f"{step_name} agent did not call its tool (finish_reason={choice.finish_reason})")


_ADAPTERS = {"anthropic": _call_anthropic, "gemini": _call_gemini, "openai": _call_openai}


def _call_tool_agent(step_name: str, system: str, user: str, tool: dict) -> dict:
    r = _resolve(step_name)
    return _ADAPTERS[r["provider"]](step_name, system, user, tool, r["model"], r["max_tokens"])


# ---------------------------------------------------------------------
# Step 1: Domains -- the one independent step
# ---------------------------------------------------------------------

DOMAINS_TOOL = {
    "name": "submit_domains",
    "description": "Submit the Forms this spec requires.",
    "input_schema": {
        "type": "object",
        "properties": {
            "domains": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"form": {"type": "string"}, "reason": {"type": "string"}},
                    "required": ["form", "reason"],
                },
            }
        },
        "required": ["domains"],
    },
}


def run_domains_agent(spec: dict) -> dict:
    system = f"""You identify which Forms a CDM report spec needs. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

List every Form implicated by the spec's Description, Column Heading, and Logic. Use submit_domains."""
    return _call_tool_agent("domains", system, _spec_text(spec), DOMAINS_TOOL)


# ---------------------------------------------------------------------
# Step 2: Columns -- needs domains
# ---------------------------------------------------------------------

COLUMNS_TOOL = {
    "name": "submit_columns",
    "description": "Submit the Items (columns) required from each Form already identified.",
    "input_schema": {
        "type": "object",
        "properties": {
            "columns": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "form": {"type": "string"},
                        "item": {"type": "string"},
                        "source": {"type": "string", "enum": ["EXPLICIT", "INFERRED"]},
                    },
                    "required": ["form", "item", "source"],
                },
            }
        },
        "required": ["columns"],
    },
}


def run_columns_agent(spec: dict, domains: list) -> dict:
    system = f"""You identify which Items (columns) are needed from each Form already \
identified for this spec. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

Mark each item EXPLICIT (named in the spec) or INFERRED (standard CDISC \
convention you assumed). Use submit_columns."""
    user = f"{_spec_text(spec)}\n\nForms already identified:\n{domains}"
    return _call_tool_agent("columns", system, user, COLUMNS_TOOL)


# ---------------------------------------------------------------------
# Step 3: Joins -- needs domains + columns
# ---------------------------------------------------------------------

JOINS_TOOL = {
    "name": "submit_joins",
    "description": "Submit the joins required between the identified Forms.",
    "input_schema": {
        "type": "object",
        "properties": {
            "joins": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "forms": {"type": "array", "items": {"type": "string"}},
                        "join_type": {"type": "string", "enum": ["implicit_subject_event", "self_join_same_form", "explicit_left", "explicit_inner"]},
                        "reason": {"type": "string"},
                    },
                    "required": ["forms", "join_type", "reason"],
                },
            }
        },
        "required": ["joins"],
    },
}


def run_joins_agent(spec: dict, domains: list, columns: list) -> dict:
    system = f"""You determine join logic between the Forms already identified for this \
spec. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

CQL joins on Subject+Event automatically by default across Forms -- only \
specify an explicit join type when the spec requires comparing two rows \
of the SAME Form (self_join_same_form, e.g. overlap/duplicate checks) or \
an explicit cross-form join on something other than Subject+Event. \
Default to implicit_subject_event when nothing special is needed. \
Use submit_joins."""
    user = f"{_spec_text(spec)}\n\nForms:\n{domains}\n\nColumns:\n{columns}"
    return _call_tool_agent("joins", system, user, JOINS_TOOL)


# ---------------------------------------------------------------------
# Step 4: Filters -- needs domains + columns + joins
# ---------------------------------------------------------------------

FILTERS_TOOL = {
    "name": "submit_filters",
    "description": "Submit the filter conditions mapped from the spec's Logic and Report Scenarios.",
    "input_schema": {
        "type": "object",
        "properties": {
            "filters": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"condition": {"type": "string"}, "spec_reference": {"type": "string"}},
                    "required": ["condition", "spec_reference"],
                },
            }
        },
        "required": ["filters"],
    },
}


def run_filters_agent(spec: dict, domains: list, columns: list, joins: list) -> dict:
    system = f"""You map a CDM report spec's Logic and Report Scenarios to filter \
conditions, line by line. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

Every condition in the spec must map to a filter; every filter must trace \
back to spec text -- don't invent conditions. Use CODEDTERM(...) for \
"after encoding/coding" comparisons. Use submit_filters."""
    user = f"{_spec_text(spec)}\n\nForms:\n{domains}\n\nColumns:\n{columns}\n\nJoins:\n{joins}"
    return _call_tool_agent("filters", system, user, FILTERS_TOOL)


# ---------------------------------------------------------------------
# Step 5: Edge cases -- needs the filters already drafted
# ---------------------------------------------------------------------

EDGE_CASES_TOOL = {
    "name": "submit_edge_cases",
    "description": "Submit edge cases the spec calls out and how each is handled.",
    "input_schema": {
        "type": "object",
        "properties": {
            "edge_cases": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"case": {"type": "string"}, "handling": {"type": "string"}},
                    "required": ["case", "handling"],
                },
            }
        },
        "required": ["edge_cases"],
    },
}


def run_edge_cases_agent(spec: dict, filters: list) -> dict:
    system = f"""You identify edge cases a CDM report spec calls out explicitly (ongoing/ \
continuing records with no end date, missing values) that the filters \
drafted so far don't yet address, and state the CQL handling for each \
(e.g. IFNULL(EndDateItem, ...) for ongoing records). {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

Only include cases the spec text actually implies -- don't invent edge \
cases it doesn't call for. Use submit_edge_cases."""
    user = f"{_spec_text(spec)}\n\nFilters drafted so far:\n{filters}"
    return _call_tool_agent("edge_cases", system, user, EDGE_CASES_TOOL)


# ---------------------------------------------------------------------
# Step 6: Self-check -- needs the full chain
# ---------------------------------------------------------------------

SELF_CHECK_TOOL = {
    "name": "submit_self_check",
    "description": "Submit a review of the full reasoning chain for gaps or contradictions.",
    "input_schema": {
        "type": "object",
        "properties": {
            "issues_found": {"type": "array", "items": {"type": "string"}},
            "consistent": {"type": "boolean", "description": "true if the chain is internally consistent and complete"},
        },
        "required": ["issues_found", "consistent"],
    },
}


def run_self_check_agent(spec: dict, domains: list, columns: list, joins: list, filters: list, edge_cases: list) -> dict:
    system = f"""You review a completed reasoning chain (domains, columns, joins, \
filters, edge cases) for a CDM report spec, checking for anything \
invented that isn't grounded in the spec, or anything the spec requires \
that the chain doesn't address.

{CQL_RULES_CONTEXT}

Specifically check whether any step's plan implies a structure that would \
force a CTE at synthesis time (e.g. a filter step that assumes named \
intermediate result sets) -- flag it now, not after the query is written. \
Use submit_self_check."""
    user = (
        f"{_spec_text(spec)}\n\n"
        f"Domains:\n{domains}\n\nColumns:\n{columns}\n\nJoins:\n{joins}\n\n"
        f"Filters:\n{filters}\n\nEdge cases:\n{edge_cases}"
    )
    return _call_tool_agent("self_check", system, user, SELF_CHECK_TOOL)


# ---------------------------------------------------------------------
# Step 7: Synthesis -- renders the actual code from the validated chain
# ---------------------------------------------------------------------

SYNTHESIS_TOOL = {
    "name": "submit_code",
    "description": "Submit the final CQL and explanation, rendered from the validated reasoning chain.",
    "input_schema": {
        "type": "object",
        "properties": {
            "cql": {"type": "string"},
            "explanation": {"type": "string"},
        },
        "required": ["cql", "explanation"],
    },
}


def run_synthesis_agent(spec: dict, domains: list, columns: list, joins: list, filters: list, edge_cases: list, self_check: dict) -> dict:
    system = f"""You render final CQL from an already-validated reasoning chain -- do \
not re-derive the analysis, just translate it into a single CQL \
statement consistent with everything in the \
chain. {CQL_DATA_MODEL_CONTEXT}

{CQL_RULES_CONTEXT}

If self_check flagged issues, resolve them consistent with the spec \
rather than ignoring them. Use submit_code."""
    user = (
        f"{_spec_text(spec)}\n\n"
        f"Domains:\n{domains}\n\nColumns:\n{columns}\n\nJoins:\n{joins}\n\n"
        f"Filters:\n{filters}\n\nEdge cases:\n{edge_cases}\n\nSelf-check:\n{self_check}"
    )
    return _call_tool_agent("synthesis", system, user, SYNTHESIS_TOOL)


# ---------------------------------------------------------------------
# Orchestrator
# ---------------------------------------------------------------------

def run_multi_agent_code_generation(spec: dict, model_config: Optional[dict] = None) -> dict:
    """Runs all 7 steps in sequence, each fed the accumulated output of
    the ones before it. Returns {"cql", "explanation", "reasoning_chain",
    "chain_guardrail_report", "guardrail_report", "model_config",
    "model_calls"}.

    model_config is the study's saved model choice (see module docstring);
    it is validated here again so a stale or edited config fails fast,
    before any model call is made. model_config and model_calls are
    returned so they can be stored with the generated CQL (together with
    the prompt version) -- any output can then be traced back to the exact
    model that produced it.

    GUARDRAILS at two points, closing a real gap: this function used to
    run with NO guardrail checks at all, unlike the single-call and
    Tier 1 paths which both pass through orchestration/graph.py's
    guardrails_node. That made the most complex generation path the
    least checked one -- backwards.
      1. chain_guardrails.run_chain_guardrails() runs on the intermediate
         steps BEFORE synthesis -- catches a hallucinated Form reference
         structurally, which the final CQL text alone wouldn't reveal
         cleanly.
      2. guardrails.run_guardrails() runs on the SYNTHESIZED CQL after --
         same structural check every other generation path gets.
    Neither currently blocks/retries on failure -- both are reported in
    the return value so a caller can decide (surface to a reviewer, log,
    or retry the affected step). Wiring an automatic retry on a
    chain-guardrail failure is a reasonable next step, not done here."""
    cfg = validate_model_config(model_config)

    call_log: list = []
    cfg_token = _active_config.set(cfg)
    log_token = _call_log.set(call_log)
    try:
        domains = run_domains_agent(spec)["domains"]
        columns = run_columns_agent(spec, domains)["columns"]
        joins = run_joins_agent(spec, domains, columns)["joins"]
        filters = run_filters_agent(spec, domains, columns, joins)["filters"]

        chain_guardrail_report = chain_guardrails.run_chain_guardrails(domains, columns, joins, filters)
        if not chain_guardrail_report["passed"]:
            # Not a hard stop -- self_check gets to see these issues too and
            # may resolve them; synthesis's own guardrail check below is the
            # final backstop either way.
            pass

        edge_cases = run_edge_cases_agent(spec, filters)["edge_cases"]
        self_check = run_self_check_agent(spec, domains, columns, joins, filters, edge_cases)
        result = run_synthesis_agent(spec, domains, columns, joins, filters, edge_cases, self_check)
    finally:
        _active_config.reset(cfg_token)
        _call_log.reset(log_token)

    final_cql = result.get("cql", "") or ""
    guardrail_report = guardrails.run_guardrails(final_cql)

    return {
        "cql": result.get("cql"),
        "explanation": result.get("explanation"),
        "chain_guardrail_report": chain_guardrail_report,
        "guardrail_report": guardrail_report,
        "model_config": cfg,
        "model_calls": call_log,
        "reasoning_chain": {
            "domains": domains,
            "columns": columns,
            "joins": joins,
            "filters": filters,
            "edge_cases": edge_cases,
            "self_check": self_check,
        },
    }
