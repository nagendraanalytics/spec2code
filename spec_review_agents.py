"""
spec_review_agents.py — multi-agent Spec Review, replacing the single
Claude call in cql_agents.run_spec_review() with 5 field sub-agents
(running in parallel) + 1 master agent.

Why split this way: completeness/ambiguity/testability/naming are all
checkable within ONE field in isolation -- a field sub-agent only needs
its own field's text (plus the rest of the spec as read-only context, so
it isn't reviewing a fragment with no idea what report it's part of).
consistency is different in kind: "Column Heading promises a field Logic
never populates" requires seeing both fields at once, so no field
sub-agent can ever produce it -- it's reserved for the Master, which is
the only agent with the full picture.

Cost, stated plainly: this is 6 Claude calls per spec review (5 field
agents + 1 master) versus 1 call in cql_agents.run_spec_review(). The 5
field agents run in parallel (ThreadPoolExecutor), so wall-clock latency
is closer to ~2x than 6x, but token cost is genuinely ~6x. This is a
separate function from cql_agents.run_spec_review(), not a replacement
for it -- main.py/orchestration/graph.py choose which to call.

readiness is computed in code from the aggregated insight list, not
asked of any LLM -- "any blocking insight anywhere -> needs_revision" is
a pure function of severities, and asking a model to do that arithmetic
correctly every time is an unforced risk.
"""

import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Optional

import anthropic

FIELD_NAMES = ["description", "columnHeading", "logic", "reportScenarios", "sorting"]

_CATEGORY_DEFINITIONS = """- completeness: something implied but not actually stated in this field.
- ambiguity: an undefined term ("recent", "abnormal") with no stated threshold/window, or wording that could reasonably be read two ways.
- testability: content in this field that can't actually be acted on or distinguished from something else in it.
- naming: references that don't follow a consistent convention, or are internally inconsistent within this field."""

_FIELD_FOCUS = {
    "description": "Does the Description actually state what the report identifies, clearly enough that someone unfamiliar with it would know what to expect as output?",
    "columnHeading": "Are the column headings well-defined and unambiguous? Do any headings imply a field whose meaning isn't obvious from the heading alone?",
    "logic": "Is the rule that determines when a row is output actually complete and unambiguous on its own terms -- every condition stated, every term defined?",
    "reportScenarios": "Is each scenario clearly distinguishable from the others, with a concrete YES/NO condition rather than a vague description?",
    "sorting": "Are the sort fields specific and unambiguous (e.g. do they reference fields that would plausibly exist as output columns)?",
}

FIELD_REVIEW_TOOL = {
    "name": "submit_field_review",
    "description": "Submit findings for this ONE spec field only -- not the whole spec.",
    "input_schema": {
        "type": "object",
        "properties": {
            "insights": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "category": {"type": "string", "enum": ["completeness", "ambiguity", "testability", "naming"]},
                        "severity": {"type": "string", "enum": ["info", "warning", "blocking"]},
                        "finding": {"type": "string"},
                        "suggestion": {"type": "string"},
                    },
                    "required": ["category", "severity", "finding", "suggestion"],
                },
            }
        },
        "required": ["insights"],
    },
}

MASTER_REVIEW_TOOL = {
    "name": "submit_master_review",
    "description": "Submit cross-field consistency findings (the one category no single field agent can see) and an overall summary.",
    "input_schema": {
        "type": "object",
        "properties": {
            "consistency_insights": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "severity": {"type": "string", "enum": ["info", "warning", "blocking"]},
                        "finding": {"type": "string"},
                        "suggestion": {"type": "string"},
                    },
                    "required": ["severity", "finding", "suggestion"],
                },
            },
            "summary": {"type": "string", "description": "1-2 sentence overall assessment, informed by all field agents' findings plus your own consistency check"},
        },
        "required": ["consistency_insights", "summary"],
    },
}


class AgentError(Exception):
    pass


def _get_client() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")
    return anthropic.Anthropic(api_key=api_key)


def _full_spec_text(spec: dict) -> str:
    return (
        f"Report ID: {spec.get('reportId', '')}\n"
        f"Description: {spec.get('description', '')}\n"
        f"Column Heading: {spec.get('columnHeading', '')}\n"
        f"Logic: {spec.get('logic', '')}\n"
        f"Report Scenarios: {spec.get('reportScenarios', '')}\n"
        f"Sorting: {spec.get('sorting', '')}"
    )


def _run_field_agent(field_name: str, spec: dict) -> list:
    """Reviews exactly one field. Sees the full spec as read-only context
    (so it isn't judging a fragment blind) but its OUTPUT must only be
    about problems within its own field -- enforced by prompt, not code,
    so this is a soft guarantee, not a hard one; the master's aggregation
    doesn't re-check field-scoping."""
    client = _get_client()
    field_value = spec.get(field_name, "") or "(empty)"
    focus = _FIELD_FOCUS[field_name]

    system = f"""You are reviewing ONLY the "{field_name}" field of a CDM report \
specification, for readiness before code is generated from it. You are \
one of five field-specific reviewers; a separate master reviewer handles \
cross-field consistency -- do not comment on other fields, only this one.

Focus for this field: {focus}

Evaluate against these categories (consistency is NOT your job -- skip it):
{_CATEGORY_DEFINITIONS}

Ground every finding in this field's actual text. If this field is \
genuinely clear and complete on its own terms, return an empty insights \
array rather than manufacturing a finding.

Severity: blocking = a code generator would have to guess at something \
materially changing the output; warning = a reasonable, statable \
assumption would be needed; info = minor, wouldn't change generated code.

Use the submit_field_review tool."""

    user = f"""Full spec (for context only -- review ONLY the "{field_name}" field below):
{_full_spec_text(spec)}

--
The "{field_name}" field to review: {field_value}"""

    try:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1200,
            system=system,
            tools=[FIELD_REVIEW_TOOL],
            tool_choice={"type": "tool", "name": "submit_field_review"},
            messages=[{"role": "user", "content": user}],
        )
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"{field_name} agent failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_field_review":
            insights = block.input.get("insights", [])
            for insight in insights:
                insight["source"] = f"{field_name}_agent"
            return insights

    raise AgentError(f"{field_name} agent did not return a structured review (stop_reason={response.stop_reason})")


def _run_master_agent(spec: dict, field_insights: list) -> dict:
    client = _get_client()
    findings_summary = "\n".join(
        f"- [{i['source']}] ({i['severity']}/{i['category']}) {i['finding']}" for i in field_insights
    ) or "(no findings from any field agent)"

    system = """You are the master reviewer for a CDM report specification. \
Five field-specific agents have already reviewed each field in isolation \
for completeness/ambiguity/testability/naming. Your job is the ONE thing \
none of them could see: consistency ACROSS fields -- e.g. a Report \
Scenario with no corresponding Logic condition, a Column Heading field \
the Logic never populates, or fields using different terms for what \
should be the same thing.

Ground every finding in the spec's actual text. Do not repeat findings \
the field agents already made -- only add genuinely cross-field issues.

Then write a 1-2 sentence overall summary informed by both the field \
agents' findings and your own consistency check.

Use the submit_master_review tool."""

    user = f"""Full spec:
{_full_spec_text(spec)}

Field agents' findings so far:
{findings_summary}

Check for cross-field consistency issues and write the overall summary."""

    try:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1200,
            system=system,
            tools=[MASTER_REVIEW_TOOL],
            tool_choice={"type": "tool", "name": "submit_master_review"},
            messages=[{"role": "user", "content": user}],
        )
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"master agent failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_master_review":
            result = block.input
            for insight in result.get("consistency_insights", []):
                insight["category"] = "consistency"
                insight["source"] = "master_agent"
            return result

    raise AgentError(f"master agent did not return a structured review (stop_reason={response.stop_reason})")


def _compute_readiness(all_insights: list) -> str:
    """Pure function, no LLM involved -- deterministic by design."""
    severities = {i["severity"] for i in all_insights}
    if "blocking" in severities:
        return "needs_revision"
    if "warning" in severities:
        return "ready_with_notes"
    return "ready"


def run_multi_agent_spec_review(spec: dict, max_workers: int = 5) -> dict:
    """Orchestrates the 5 field sub-agents (parallel) + master agent
    (after, since it needs the field agents' output). Returns the same
    top-level shape as cql_agents.run_spec_review() (readiness, insights,
    summary) so callers don't need to know which implementation ran --
    plus each insight now carries a "source" field identifying which
    agent produced it."""
    all_insights: list = []
    errors: list = []

    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        futures = {pool.submit(_run_field_agent, field, spec): field for field in FIELD_NAMES}
        for future in as_completed(futures):
            field = futures[future]
            try:
                all_insights.extend(future.result())
            except AgentError as e:
                errors.append(str(e))

    if errors:
        raise AgentError("; ".join(errors))

    master_result = _run_master_agent(spec, all_insights)
    all_insights.extend(master_result.get("consistency_insights", []))

    return {
        "readiness": _compute_readiness(all_insights),
        "insights": all_insights,
        "summary": master_result.get("summary", ""),
    }
