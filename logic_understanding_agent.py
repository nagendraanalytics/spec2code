"""
logic_understanding_agent.py — a distinct step between Review and
Generate: before any code is written, Claude walks through its
understanding of the spec's LOGIC in plain, ordered, numbered steps --
what domains are involved, how the conditions chain together, what key
terms mean, what's being assumed, and what edge cases were caught.

This exists so a fundamental misreading of the spec is caught by a human
BEFORE a Review or Generate call is spent on it, not after looking at
generated CQL and reverse-engineering whether the model understood the
spec correctly. It is deliberately NOT the same thing as spec review
(cql_agents.run_spec_review, which asks "is this spec well-specified")
or the multi-agent code-gen reasoning chain (code_gen_agents.py, which
is 7x the Claude-call cost and produces SQL-shaped structured output,
not a readable narrative) -- this is one call, in plain language, meant
to be read by a person.
"""

import os

import anthropic

LOGIC_UNDERSTANDING_SYSTEM_PROMPT = """You are a clinical data programmer explaining, \
in plain language and step by step, how you understand a CDM report \
specification's LOGIC -- BEFORE any code is written. This is a chain-of- \
thought comprehension check a human will read, not a generation step.

Walk through your understanding the way a careful programmer would \
explain it to a colleague before starting to code:
1. Identify which domain(s)/Form(s) are involved and why (ground this in \
the spec's Description, Column Heading, and Form.Item Names fields).
2. Break the Logic field down into an ORDERED sequence of numbered \
reasoning steps -- each step should state one discrete piece of THIS \
spec's actual logic, in plain English, using the specific terms, item \
names, and conditions THIS spec's Logic field actually uses. Build up \
understanding progressively -- a later step can reference an earlier one. \
IMPORTANT: logic_steps must NEVER be an empty array. If the Logic field \
is empty, too thin, or too vague to derive genuine reasoning steps from, \
that is ITSELF the finding -- submit exactly one step saying so plainly \
(e.g. "The Logic field is empty / does not contain enough detail to \
derive a reasoning chain -- more detail is needed before this can be \
understood"), never an empty array.
3. Define any domain-specific or ambiguous terms THIS spec uses in your \
own words.
4. State every assumption you're making explicitly -- anywhere the spec \
doesn't fully specify something and you have to infer intent.
5. Call out edge cases the spec addresses (or should address but \
doesn't) -- ongoing/continuing records, ties, nulls, duplicates.

Every spec is structurally different -- some compare pairs of records \
within one Form, some check for the ABSENCE of a related record in \
another Form, some reconcile values ACROSS Forms, some are pure listings \
with no comparison logic at all. Do not default to any one shape \
(especially not a same-Form record-pairing/overlap shape) unless THIS \
spec's Logic field actually describes that. If two different specs would \
get noticeably similar-sounding steps from you, that's a signal you're \
falling back on generic phrasing instead of this spec's specifics --
quote or closely paraphrase the actual condition language from the \
Logic field in each step rather than restating it abstractly.

Ground everything in the actual spec text. If a step in your reasoning \
required inferring something not explicitly stated, say so as part of \
that step -- don't present an inference as if it were stated fact. This \
walkthrough should let a human confirm "yes, that's what I meant" or \
catch "no, that's not right" BEFORE any code gets generated from it.

Use the submit_logic_understanding tool."""

LOGIC_UNDERSTANDING_TOOL = {
    "name": "submit_logic_understanding",
    "description": "Submit a plain-language, step-by-step walkthrough of how the spec's logic is understood.",
    "input_schema": {
        "type": "object",
        "properties": {
            "domains_identified": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "domain": {"type": "string"},
                        "reasoning": {"type": "string"},
                    },
                    "required": ["domain", "reasoning"],
                },
            },
            "logic_steps": {
                "type": "array",
                "description": "Ordered, numbered reasoning steps in plain English, building up understanding progressively.",
                "items": {
                    "type": "object",
                    "properties": {
                        "step_number": {"type": "integer"},
                        "explanation": {"type": "string"},
                        "inferred": {
                            "type": "boolean",
                            "description": "True if this step required inferring something not explicitly stated in the spec.",
                        },
                    },
                    "required": ["step_number", "explanation", "inferred"],
                },
            },
            "key_definitions": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"term": {"type": "string"}, "meaning": {"type": "string"}},
                    "required": ["term", "meaning"],
                },
            },
            "assumptions": {"type": "array", "items": {"type": "string"}},
            "edge_cases": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"case": {"type": "string"}, "handling": {"type": "string"}},
                    "required": ["case", "handling"],
                },
            },
            "summary": {
                "type": "string",
                "description": "A short (2-4 sentence) synthesis tying the whole understanding together.",
            },
        },
        "required": ["domains_identified", "logic_steps", "key_definitions", "assumptions", "edge_cases", "summary"],
    },
}


class AgentError(Exception):
    pass


def build_understanding_user_prompt(spec: dict, supporting_doc_block: str = "") -> str:
    supporting_doc_section = f"\n{supporting_doc_block}\n" if supporting_doc_block else ""
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}
{supporting_doc_section}
Walk through your understanding of this spec's logic now, before any code is written."""


def run_logic_understanding(spec: dict, supporting_doc_block: str = "") -> dict:
    """Returns the structured walkthrough dict. Raises AgentError only if
    genuinely unusable even after sanitization and one retry -- never
    returns a partial/garbage result silently, but also never discards a
    substantially-good response over one missing supplementary field."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)

    last_error = None
    for attempt in range(3):  # bumped from 2 -- logic_steps is the one CRITICAL
        # field (see _sanitize_understanding below); a persistent failure here fully
        # blocks the step, so a little more retry resilience is cheap insurance,
        # especially combined with the token bump below. tool_choice forcing
        # constrains the tool NAME, not a hard guarantee every nested field
        # matches its declared type on every call, so retries are worth it
        # before surfacing an error to the user.
        try:
            # messages.stream() + get_final_message(), not messages.create() --
            # same fix as every other agent in this project (see
            # cql_agents.run_spec_review's comment for the full reasoning).
            with client.messages.stream(
                model="claude-sonnet-5",
                max_tokens=24000,  # bumped from 16000 -- same reasoning as CQL generation's
                # own bump: adaptive thinking shares this budget with the actual response, and
                # a genuinely complex spec (many domains, many conditions) can need real
                # reasoning before producing the full structured walkthrough. A real
                # "missing or empty logic_steps" report, surviving even the existing retry,
                # is consistent with the response being cut off before logic_steps got written
                # (which -- per the tool schema's property order -- comes after domains and
                # before the later fields, so truncation partway through could plausibly land
                # exactly there).
                system=LOGIC_UNDERSTANDING_SYSTEM_PROMPT,
                tools=[LOGIC_UNDERSTANDING_TOOL],
                tool_choice={"type": "tool", "name": "submit_logic_understanding"},
                messages=[{"role": "user", "content": build_understanding_user_prompt(spec, supporting_doc_block)}],
            ) as stream:
                response = stream.get_final_message()
        except Exception as e:  # noqa: BLE001
            last_error = AgentError(f"Claude API request failed: {e}")
            continue

        for block in response.content:
            if getattr(block, "type", None) == "tool_use" and block.name == "submit_logic_understanding":
                try:
                    return _sanitize_understanding(block.input)
                except AgentError as e:
                    last_error = e
                    break  # fall through to retry
        else:
            if response.stop_reason == "max_tokens":
                last_error = AgentError("Logic understanding was cut off before finishing (ran out of tokens).")
            else:
                last_error = AgentError(f"Model did not return a structured understanding (stop_reason={response.stop_reason}).")

    raise last_error


# Fields the walkthrough is still genuinely useful without -- missing or
# wrong-typed, default to an empty list rather than fail the whole call.
# The frontend already renders each of these gracefully as "None
# identified" when empty (see static/app.js's renderLogicUnderstanding),
# so discarding an otherwise-good response over one of these was strictly
# worse than degrading gracefully -- exactly the situation that motivated
# this rewrite.
_SUPPLEMENTARY_LIST_FIELDS = ["domains_identified", "key_definitions", "assumptions", "edge_cases"]

# Fields without which the walkthrough has no real content -- these still
# fail hard (triggering the retry above, then surfacing a clear error).
_CRITICAL_LIST_FIELDS = ["logic_steps"]


def _sanitize_understanding(result: dict) -> dict:
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object understanding (got {type(result).__name__}).")

    for field in _CRITICAL_LIST_FIELDS:
        if field not in result or not isinstance(result[field], list) or len(result[field]) == 0:
            raise AgentError(
                f"Model's understanding is missing or has an empty/malformed '{field}' -- "
                f"this is the core content of the walkthrough, so this response isn't usable."
            )

    sanitized = dict(result)
    for field in _SUPPLEMENTARY_LIST_FIELDS:
        if field not in sanitized or not isinstance(sanitized[field], list):
            sanitized[field] = []
    if not isinstance(sanitized.get("summary"), str):
        sanitized["summary"] = ""
    return sanitized
