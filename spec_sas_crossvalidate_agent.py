"""
spec_sas_crossvalidate_agent.py — the deeper migration capability
sas_migration_agent.py doesn't provide: when a SPEC ALREADY EXISTS
(written, or previously extracted) AND real legacy SAS code exists for
the SAME report, cross-reference them against each other rather than
just reverse-engineering the spec from code in isolation.

This is a genuinely different task from sas_migration_agent.py, not a
variant of it. sas_migration_agent.py answers "there's no spec yet, what
does this code do?" This agent answers "here's what we THINK the report
should do (the spec) and here's what the code ACTUALLY does (confirmed
working) -- where do they agree, and where do they quietly disagree?"

That second question is what real migrations actually need: specs and
legacy code drift apart over time in every real system -- a spec gets
updated but the code doesn't, or the code picks up an undocumented fix
that never made it back into the spec. Finding that drift BEFORE
generating new code is more valuable than either source alone, because
generating from a spec that's silently wrong produces confidently wrong
output, and generating from code alone loses whatever intent only the
spec captures (and inherits any bug the code has silently carried).

Same non-negotiable discipline as every other agent here: report only
what's actually different between the two sources. Never resolve a
disagreement by guessing which one is "right" -- that's a human call.
"""


import llm_client

CROSSVALIDATE_SYSTEM_PROMPT = """You are a clinical data programmer cross-validating a \
written report specification against REAL, CONFIRMED-WORKING legacy SAS \
code for the same report -- before any new code is generated for a \
different platform.

You will be given the current spec fields and the SAS code. Your job is \
NOT to decide which source is "correct" -- it's to surface where they \
actually agree and where they actually disagree, so a human can decide.

For each distinct piece of logic (a condition, a filter, an edge case, an \
exclusion), classify it as one of:
- CONFIRMED: the spec states this AND the code implements it. High \
confidence -- both independent sources agree.
- SPEC ONLY: the spec states this but the code doesn't appear to \
implement it (or implements something different). Could mean the code is \
out of date, or the spec describes an intended future behavior that was \
never built -- you can't tell which from these two sources alone. Flag \
it, don't guess.
- CODE ONLY: the code implements this but the spec doesn't mention it. \
Could mean the spec is incomplete (missed documenting a real \
requirement), or the code has an undocumented workaround/fix. Flag it, \
don't guess.

Do not resolve these disagreements yourself. Do not assume the code is \
more trustworthy just because it's "confirmed working" -- confirmed \
working means it runs and produces output that was presumably accepted \
at some point, not that every line is intentional or still correct.

Propose an UPDATED version of each spec field that incorporates the \
CONFIRMED logic clearly, and for any CODE ONLY finding you're confident \
enough to state precisely, note it as a suggested addition -- but make \
every SPEC ONLY and CODE ONLY finding visible in drift_notes regardless \
of whether you also folded it into the updated field text, so nothing is \
silently resolved one way.

Use the submit_crossvalidation tool."""

CROSSVALIDATE_TOOL = {
    "name": "submit_crossvalidation",
    "description": "Submit the cross-validation findings and an updated spec incorporating confirmed logic.",
    "input_schema": {
        "type": "object",
        "properties": {
            "findings": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "topic": {"type": "string", "description": "The specific piece of logic (e.g. 'deleted record exclusion', 'date overlap boundary')"},
                        "classification": {"type": "string", "enum": ["CONFIRMED", "SPEC_ONLY", "CODE_ONLY"]},
                        "detail": {"type": "string", "description": "What the spec says and/or what the code actually does, specifically"},
                    },
                    "required": ["topic", "classification", "detail"],
                },
            },
            "updated_fields": {
                "type": "object",
                "properties": {
                    "description": {"type": "string"},
                    "columnHeading": {"type": "string"},
                    "logic": {"type": "string"},
                    "reportScenarios": {"type": "string"},
                    "sorting": {"type": "string"},
                },
                "required": ["description", "columnHeading", "logic", "reportScenarios", "sorting"],
            },
            "overall_summary": {"type": "string", "description": "1-3 sentences on the overall level of agreement found"},
        },
        "required": ["findings", "updated_fields", "overall_summary"],
    },
}


class AgentError(Exception):
    pass


def build_crossvalidate_user_prompt(spec: dict, sas_code: str) -> str:
    return f"""CURRENT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

LEGACY SAS CODE (confirmed working):

{sas_code}

Cross-validate the spec against this code now -- find what's CONFIRMED, SPEC_ONLY, and CODE_ONLY."""


def run_crossvalidation(spec: dict, sas_code: str) -> dict:
    """Returns {"findings": [...], "updated_fields": {...},
    "overall_summary": ...}. Raises AgentError on failure."""
    if not llm_client.available():
        raise AgentError(llm_client.not_configured_message())
    try:
        res = llm_client.call_tool(system=CROSSVALIDATE_SYSTEM_PROMPT, user=build_crossvalidate_user_prompt(spec, sas_code), tool=CROSSVALIDATE_TOOL, max_tokens=24000, model="claude-sonnet-5")
    except llm_client.LLMClientError as e:
        raise AgentError(f"Language model request failed: {e}") from e
    if res.input is not None:
        return _sanitize_crossvalidation_result(res.input, spec)
    if res.stop_reason in ("max_tokens", "invalid_json"):
        raise AgentError("Cross-validation was cut off before finishing or was not valid structured output.")
    raise AgentError(f"Model did not return a structured result (stop_reason={res.stop_reason}).")


_VALID_CLASSIFICATIONS = {"CONFIRMED", "SPEC_ONLY", "CODE_ONLY"}
_EDITABLE_FIELDS = ["description", "columnHeading", "logic", "reportScenarios", "sorting"]


def _sanitize_crossvalidation_result(result: dict, original_spec: dict) -> dict:
    """Same defensive lesson as every other agent: don't trust the shape
    even under tool_choice."""
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object result (got {type(result).__name__}).")

    findings = []
    for item in result.get("findings", []) if isinstance(result.get("findings"), list) else []:
        if not isinstance(item, dict):
            continue
        classification = item.get("classification") if item.get("classification") in _VALID_CLASSIFICATIONS else None
        if classification is None:
            continue
        findings.append({
            "topic": str(item.get("topic", "")),
            "classification": classification,
            "detail": str(item.get("detail", "")),
        })

    raw_fields = result.get("updated_fields")
    updated_fields = {}
    for field in _EDITABLE_FIELDS:
        val = raw_fields.get(field) if isinstance(raw_fields, dict) else None
        updated_fields[field] = val if isinstance(val, str) else original_spec.get(field, "")

    if not findings:
        raise AgentError("Model did not return any usable cross-validation findings.")

    overall_summary = result.get("overall_summary")
    if not isinstance(overall_summary, str):
        overall_summary = ""

    return {"findings": findings, "updated_fields": updated_fields, "overall_summary": overall_summary}
