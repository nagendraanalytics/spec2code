"""
spec_suggestion_agent.py — a distinct, OPTIONAL step available from Review:
given the original spec and Review's actual findings, propose a REVISED
spec that resolves those specific issues, for a human to accept, edit, or
discard before Generate ever runs.

This exists because Review only FLAGS problems; without this, an
ambiguity or gap either gets silently resolved by Tier 5 during
generation (buried in the explanation text, easy to miss) or gets
generated wrong. Surfacing the resolution as editable SPEC TEXT, before
any code is written, means the person closest to the domain gets to
confirm or correct the interpretation at the cheapest possible point --
before a Review or Generate call is spent on a potentially wrong reading.

Critically: this is spec-editing, not spec-invention. Every suggested
change must trace back to an actual review finding or an explicit gap in
the original spec text -- never a new business requirement the review
didn't surface and the original spec didn't imply. Same discipline as
every other agent in this project: ground suggestions in what's actually
there, flag every addition as an assumption, never silently invent scope.
"""

import os

import anthropic

SPEC_SUGGESTION_SYSTEM_PROMPT = """You are a clinical data programmer proposing a \
REVISED version of a CDM report specification, to resolve issues a prior \
review already identified -- before any code is written.

You will be given the ORIGINAL spec fields and a list of REVIEW FINDINGS \
(each with a category, severity, the finding itself, and a suggested \
fix). Your job is to propose REVISED field text that resolves these \
specific findings -- not to rewrite the spec wholesale, not to add \
requirements the findings didn't raise, and not to change anything the \
review didn't flag as a problem.

Rules:
- For each of the five editable fields (description, columnHeading, \
logic, reportScenarios, sorting), decide whether a review finding \
actually concerns that field. If none does, return that field UNCHANGED \
(identical to the original text) -- do not "improve" prose that wasn't \
flagged.
- When a field DOES need revision, make the smallest change that \
resolves the specific finding(s) tied to it -- e.g. if a finding says \
"case-sensitivity for LLT matching isn't stated", add an explicit \
sentence stating the assumed handling (e.g. "LLT matching is case- \
sensitive, per standard coded-terminology convention"), don't rewrite \
the whole Logic field's structure or add unrelated detail.
- Every substantive addition you make must be phrased so it's obviously \
an ADDED clarification, not disguised as if it were always there -- the \
person reviewing this needs to be able to tell what YOU added versus \
what the original spec said. A natural way to do this: state the \
resolution plainly as part of the field's prose (the way a spec author \
would phrase a clarification), and rely on the change_summary to make \
the diff explicit -- never fabricate a citation or pretend the original \
spec said something it didn't.
- Never invent a NEW business rule, edge case, or requirement that \
neither the review findings nor the original spec text implies. If a \
finding is genuinely unresolvable without input only a human has (e.g. \
"confirm with the sponsor whether X applies"), say so in that field's \
change_summary instead of guessing an answer.
- If NONE of the review findings concern the spec content at all (e.g. \
they're all about something outside these five fields), return every \
field unchanged and say so in the overall summary.

Use the submit_spec_suggestion tool."""

SPEC_SUGGESTION_TOOL = {
    "name": "submit_spec_suggestion",
    "description": "Submit a revised spec (or explicit no-change) for each field, resolving actual review findings.",
    "input_schema": {
        "type": "object",
        "properties": {
            "fields": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "field": {
                            "type": "string",
                            "enum": ["description", "columnHeading", "logic", "reportScenarios", "sorting"],
                        },
                        "suggested_text": {
                            "type": "string",
                            "description": "The revised field text, or the identical original text if no change is needed.",
                        },
                        "changed": {"type": "boolean"},
                        "change_summary": {
                            "type": "string",
                            "description": "If changed: what was added/clarified and which finding it resolves. If unchanged: empty string.",
                        },
                    },
                    "required": ["field", "suggested_text", "changed", "change_summary"],
                },
            },
            "overall_summary": {
                "type": "string",
                "description": "1-3 sentences: what changed overall, or that nothing needed to change.",
            },
        },
        "required": ["fields", "overall_summary"],
    },
}


class AgentError(Exception):
    pass


def build_suggestion_user_prompt(spec: dict, review: dict) -> str:
    insights = review.get("insights", [])
    findings_text = "\n".join(
        f"- [{i.get('severity', '?').upper()}] ({i.get('category', '?')}) {i.get('finding', '')} -> Suggested fix: {i.get('suggestion', '')}"
        for i in insights
    ) or "(no findings -- review found the spec ready with no issues)"

    return f"""ORIGINAL SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

REVIEW FINDINGS (readiness: {review.get('readiness', '?')})
{findings_text}

Propose revised field text resolving these specific findings now."""


def run_spec_suggestion(spec: dict, review: dict) -> dict:
    """Returns {"fields": [...], "overall_summary": ...}. Raises
    AgentError on failure -- never returns a partial/garbage result
    silently."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)
    try:
        # See cql_agents.run_spec_review's comment for why this is
        # messages.stream() + get_final_message(), not messages.create().
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=16000,
            system=SPEC_SUGGESTION_SYSTEM_PROMPT,
            tools=[SPEC_SUGGESTION_TOOL],
            tool_choice={"type": "tool", "name": "submit_spec_suggestion"},
            messages=[{"role": "user", "content": build_suggestion_user_prompt(spec, review)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_spec_suggestion":
            result = block.input
            return _sanitize_suggestion(result, spec)

    if response.stop_reason == "max_tokens":
        raise AgentError("Spec suggestion was cut off before finishing (ran out of tokens).")
    raise AgentError(f"Model did not return a structured suggestion (stop_reason={response.stop_reason}).")


_EDITABLE_FIELDS = ["description", "columnHeading", "logic", "reportScenarios", "sorting"]


def _sanitize_suggestion(result: dict, original_spec: dict) -> dict:
    """Defensive, same lesson as logic_understanding_agent.py: don't trust
    the shape even under tool_choice. Missing/malformed fields default to
    the ORIGINAL spec's text unchanged (the always-safe fallback for this
    specific feature -- 'no suggested change' is never wrong), rather than
    failing the whole call over one field."""
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object suggestion (got {type(result).__name__}).")

    by_field = {}
    if isinstance(result.get("fields"), list):
        for item in result["fields"]:
            if isinstance(item, dict) and item.get("field") in _EDITABLE_FIELDS:
                by_field[item["field"]] = item

    fields = []
    for field in _EDITABLE_FIELDS:
        item = by_field.get(field)
        if item and isinstance(item.get("suggested_text"), str):
            fields.append({
                "field": field,
                "suggested_text": item["suggested_text"],
                "changed": bool(item.get("changed")) and item["suggested_text"] != original_spec.get(field, ""),
                "change_summary": item.get("change_summary", "") if isinstance(item.get("change_summary"), str) else "",
            })
        else:
            fields.append({
                "field": field, "suggested_text": original_spec.get(field, ""),
                "changed": False, "change_summary": "",
            })

    overall_summary = result.get("overall_summary")
    if not isinstance(overall_summary, str):
        overall_summary = ""

    return {"fields": fields, "overall_summary": overall_summary}
