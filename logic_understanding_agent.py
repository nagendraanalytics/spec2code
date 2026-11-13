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

import json
import re

import llm_client

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
{supporting_doc_section}{spec.get('_knowledge_block', '')}
Walk through your understanding of this spec's logic now, before any code is written."""


def run_logic_understanding(spec: dict, supporting_doc_block: str = "") -> dict:
    """Returns the structured walkthrough dict. Raises AgentError only if
    genuinely unusable even after sanitization and one retry -- never
    returns a partial/garbage result silently, but also never discards a
    substantially-good response over one missing supplementary field."""
    if not llm_client.available():
        raise AgentError(llm_client.not_configured_message())

    last_error = None
    for attempt in range(3):  # bumped from 2 -- logic_steps is the one CRITICAL
        # field (see _sanitize_understanding below); a persistent failure here fully
        # blocks the step, so a little more retry resilience is cheap insurance.
        # A forced structured answer constrains the tool NAME, not a hard guarantee every
        # nested field matches its declared type on every call, so retries are worth it
        # before surfacing an error to the user.
        try:
            # max_tokens 24000 (bumped from 16000): thinking shares this budget with the response on
            # models with adaptive thinking, and a complex spec (many domains/conditions) needs real
            # reasoning before the full structured walkthrough; a "missing or empty logic_steps" report
            # that survived the retry is consistent with a cut-off before logic_steps was written.
            res = llm_client.call_tool(
                system=LOGIC_UNDERSTANDING_SYSTEM_PROMPT,
                user=build_understanding_user_prompt(spec, supporting_doc_block),
                tool=LOGIC_UNDERSTANDING_TOOL, max_tokens=24000, model="claude-sonnet-5",
            )
        except llm_client.LLMClientError as e:
            last_error = AgentError(str(e))
            continue

        if res.input is not None:
            try:
                return _sanitize_understanding(res.input)
            except AgentError as e:
                last_error = e
                continue  # retry
        if res.stop_reason in ("max_tokens", "invalid_json"):
            last_error = AgentError("Logic understanding was cut off or was not valid structured output (ran out of tokens, or not valid JSON).")
        else:
            last_error = AgentError(f"Model did not return a structured understanding (stop_reason={res.stop_reason}).")

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


_LEAKED_PARAM = re.compile(r'<parameter\s+name="([A-Za-z_]\w*)"\s*>')


def _decode_prefix(text: str):
    """Decode the first JSON value at the start of text, ignoring whatever
    follows it (closing tags, further leaked parameters). None on failure."""
    text = text.lstrip()
    if not text or text[0] not in "[{":
        return None
    try:
        value, _ = json.JSONDecoder().raw_decode(text)
    except ValueError:
        return None
    return value


def _recover_leaked_params(result: dict) -> dict:
    """The model sometimes emits its tool-call markup as TEXT inside one
    field, e.g. logic_steps = '\\n<parameter name="logic_steps">[...]\\n
    <parameter name="assumptions">[...]'. Pull each leaked parameter out and
    fill fields that are not already usable lists. Never overwrites a field
    that already holds a real list."""
    recovered = dict(result)
    for value in list(result.values()):
        if not isinstance(value, str) or '<parameter' not in value:
            continue
        parts = _LEAKED_PARAM.split(value)
        # parts = [prefix, name1, body1, name2, body2, ...]
        for name, body in zip(parts[1::2], parts[2::2]):
            if isinstance(recovered.get(name), list) and recovered[name]:
                continue
            decoded = _decode_prefix(body)
            if decoded is not None:
                recovered[name] = decoded
    return recovered


def _coerce_list(value):
    """Tool-use output sometimes carries a nested array as a JSON-encoded
    string, or wraps it in a one-key object. Accept those shapes instead of
    discarding an otherwise-good response; anything else becomes None."""
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            decoded = json.loads(value)
        except ValueError:
            decoded = _decode_prefix(value)
            return _coerce_list(decoded) if decoded is not None else None
        return _coerce_list(decoded) if not isinstance(decoded, str) else None
    if isinstance(value, dict) and len(value) == 1:
        return _coerce_list(next(iter(value.values())))
    return None


def _normalize_logic_steps(steps: list) -> list:
    """Bare strings become numbered steps; dicts missing fields get defaults.
    Entries with no usable explanation are dropped."""
    out = []
    for i, step in enumerate(steps, start=1):
        if isinstance(step, str):
            step = {"explanation": step}
        if not isinstance(step, dict):
            continue
        explanation = step.get("explanation")
        if not isinstance(explanation, str) or not explanation.strip():
            continue
        number = step.get("step_number")
        out.append({
            "step_number": number if isinstance(number, int) else i,
            "explanation": explanation,
            "inferred": bool(step.get("inferred", False)),
        })
    return out


def _sanitize_understanding(result: dict) -> dict:
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object understanding (got {type(result).__name__}).")

    result = _recover_leaked_params(result)
    sanitized = dict(result)

    steps = _coerce_list(result.get("logic_steps"))
    steps = _normalize_logic_steps(steps) if steps else []
    if not steps:
        raw = result.get("logic_steps")
        preview = repr(raw)[:200]
        print(f"[logic_understanding] unusable logic_steps: type={type(raw).__name__} keys={list(result)} preview={preview}", flush=True)
        raise AgentError(
            f"Model's understanding is missing or has an empty/malformed 'logic_steps' "
            f"(got {type(raw).__name__}: {preview}) -- this is the core content of the "
            f"walkthrough, so this response isn't usable."
        )
    sanitized["logic_steps"] = steps

    for field in _SUPPLEMENTARY_LIST_FIELDS:
        coerced = _coerce_list(result.get(field))
        sanitized[field] = coerced if coerced is not None else []
    if not isinstance(sanitized.get("summary"), str):
        sanitized["summary"] = ""
    return sanitized
