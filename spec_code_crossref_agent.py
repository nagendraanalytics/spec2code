"""
spec_code_crossref_agent.py — the systematic, repeatable version of what
got done manually earlier this session: given a written spec AND
EXISTING, CONFIRMED-WORKING legacy code that implements it (e.g. real
SAS code from a client migration), find what the code does that the
spec's formal fields don't state, and separate that into two outcomes:

1. Report-specific enrichment -- propose the spec's Logic field be
   updated to state explicitly what the code already does implicitly.
   Same discipline as spec_suggestion_agent.py: smallest necessary
   change, grounded in what the code ACTUALLY does, every addition
   clearly an addition, never invented.

2. Candidate GENERAL patterns -- conventions that look reusable across
   OTHER reports too, not just this one (a standard deleted-record
   exclusion, a standard date-imputation rule, a standard parameter-
   filtering convention). These are the highest-leverage find, because
   real production code encodes a lot of organizational convention that
   never makes it into individual written specs.

Why this exists as its own agent+storage layer rather than "just update
the prompt by hand," which is what happened earlier this session: doing
it by hand does not scale -- every future spec+code migration would need
a human to re-read the code and edit cql_agents.py's Python source, then
redeploy. Candidate patterns from THIS agent instead get stored in the
learned_patterns table (models_db.py) as UNCONFIRMED rows. A human still
reviews and confirms them (see main.py's /api/learned-patterns/confirm
endpoint) -- nothing here is trusted automatically, same "human decides"
discipline as Save as Precedent -- but once confirmed, a pattern is
PULLED INTO GENERATION PROMPTS AT RUNTIME (store.format_learned_patterns_block,
included in cql_agents.build_generation_user_prompt) for every future
generation for that tenant, with no code change or redeploy required.
That's what makes this a real, live "the system gets smarter from
migrations over time" mechanism instead of a one-off manual exercise.
"""


import llm_client

CROSSREF_SYSTEM_PROMPT = """You are a clinical data programmer cross-referencing a \
written report specification against EXISTING, CONFIRMED-WORKING reference \
code that already implements it (in any language: SAS, SQL, R, Python, \
CQL) -- to find what the code does that the spec doesn't say.

Real production code often encodes organizational conventions and edge- \
case handling that never made it into the formal written spec: a \
standard deleted-record exclusion, a specific date-imputation rule for \
partial/unknown dates, a parameter-filtering convention, a standard way \
of flagging erroneous records. Your job is to find these gaps and sort \
them into two different outcomes -- this distinction matters, don't \
blur it:

1. REPORT-SPECIFIC enrichment: something the code does that's clearly \
tied to THIS report's own business logic -- propose adding it to the \
spec's Logic field explicitly, phrased the way a spec author would \
write it. Smallest necessary change, in the spec's own voice. Every \
addition must be something the CODE actually does, not something you're \
inferring might be nice to have.

2. CANDIDATE GENERAL PATTERNS: something that looks like it would apply \
to OTHER reports too, not just this one. Real signals this is general \
rather than report-specific: it's implemented via a shared/common \
utility macro rather than bespoke logic, a comment phrases it as a \
general rule rather than something tied to this report's specific \
business context, or the same convention would obviously make sense for \
any report handling similar data (e.g. any report should probably \
exclude deleted records, not just this one). Default to NOT calling \
something general unless there's real signal -- most individual pieces \
of logic are report-specific. Being wrong in the "too eager to \
generalize" direction is worse than missing one -- a wrongly-generalized \
pattern gets applied to unrelated future reports where it doesn't \
belong.

Ground everything in what the code actually contains. Never invent a \
pattern the code doesn't evidence, and never claim something is a \
general convention without a real signal for it.

Use the submit_crossref tool."""

CROSSREF_TOOL = {
    "name": "submit_crossref",
    "description": "Submit the spec enrichment and any candidate general patterns found by cross-referencing spec against legacy code.",
    "input_schema": {
        "type": "object",
        "properties": {
            "enriched_logic": {
                "type": "string",
                "description": "The spec's Logic field, enriched with what the code reveals -- or the original text unchanged if nothing needs adding",
            },
            "logic_changed": {"type": "boolean"},
            "enrichment_summary": {
                "type": "string",
                "description": "What was added to the Logic field and why, or a note that nothing needed adding",
            },
            "candidate_patterns": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "description": "Short freeform category, e.g. 'deleted-record handling', 'date imputation', 'randomization filtering'",
                        },
                        "pattern_text": {
                            "type": "string",
                            "description": "The general, reusable rule itself, phrased as generation guidance",
                        },
                        "evidence": {
                            "type": "string",
                            "description": "Where in the code this was found and why it looks general rather than report-specific",
                        },
                    },
                    "required": ["category", "pattern_text", "evidence"],
                },
            },
        },
        "required": ["enriched_logic", "logic_changed", "enrichment_summary", "candidate_patterns"],
    },
}


class AgentError(Exception):
    pass


def build_crossref_user_prompt(spec: dict, legacy_code: str) -> str:
    return f"""SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

EXISTING, CONFIRMED-WORKING LEGACY CODE FOR THIS SAME REPORT:

{legacy_code}

Cross-reference the spec against this code now: propose report-specific Logic
enrichment, and separately identify any candidate general patterns."""


def run_crossref(spec: dict, legacy_code: str) -> dict:
    """Returns {"enriched_logic": ..., "logic_changed": bool,
    "enrichment_summary": ..., "candidate_patterns": [...]}. Raises
    AgentError on failure -- never returns a partial/garbage result
    silently."""
    if not llm_client.available():
        raise AgentError(llm_client.not_configured_message())
    try:
        res = llm_client.call_tool(system=CROSSREF_SYSTEM_PROMPT, user=build_crossref_user_prompt(spec, legacy_code), tool=CROSSREF_TOOL, max_tokens=24000, model="claude-sonnet-5")
    except llm_client.LLMClientError as e:
        raise AgentError(f"Language model request failed: {e}") from e
    if res.input is not None:
        return _sanitize_crossref_result(res.input, spec)
    if res.stop_reason in ("max_tokens", "invalid_json"):
        raise AgentError("Cross-reference was cut off before finishing or was not valid structured output.")
    raise AgentError(f"Model did not return a structured cross-reference result (stop_reason={res.stop_reason}).")


def _sanitize_crossref_result(result: dict, original_spec: dict) -> dict:
    """Same defensive lesson as every other agent: don't trust the shape
    even under tool_choice. A malformed candidate pattern is dropped
    rather than failing the whole call."""
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object result (got {type(result).__name__}).")

    enriched_logic = result.get("enriched_logic")
    if not isinstance(enriched_logic, str) or not enriched_logic.strip():
        enriched_logic = original_spec.get("logic", "")

    logic_changed = bool(result.get("logic_changed")) and enriched_logic != original_spec.get("logic", "")

    enrichment_summary = result.get("enrichment_summary")
    if not isinstance(enrichment_summary, str):
        enrichment_summary = ""

    patterns = []
    for item in result.get("candidate_patterns", []) if isinstance(result.get("candidate_patterns"), list) else []:
        if not isinstance(item, dict):
            continue
        pattern_text = item.get("pattern_text")
        if not isinstance(pattern_text, str) or not pattern_text.strip():
            continue
        patterns.append({
            "category": str(item.get("category", "")),
            "pattern_text": pattern_text,
            "evidence": str(item.get("evidence", "")),
        })

    return {
        "enriched_logic": enriched_logic,
        "logic_changed": logic_changed,
        "enrichment_summary": enrichment_summary,
        "candidate_patterns": patterns,
    }
