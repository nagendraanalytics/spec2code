"""
synthetic_validation_agent.py — a dedicated validation step, available
after Generate: systematically constructs synthetic test cases designed
to exercise EVERY distinct condition in the spec's logic, in both
directions, then traces the generated code's actual logic against each
case and classifies the result as a true positive, true negative, false
positive, or false negative.

This replaces the earlier, narrower synthetic_test_agent.py, which only
tested whatever example scenarios the spec's own Report Scenarios field
happened to describe. That's a real gap: a spec's stated examples are
rarely exhaustive, and a subtle bug (an off-by-one on a date boundary, a
case-sensitivity slip, a wrong AND/OR) can easily hide in a condition the
spec author never wrote an explicit example for. This agent instead
works from the LOGIC's actual conditions and the CODE's actual behavior,
constructing boundary/edge cases specifically chosen to have a real
chance of exposing a bug, not just confirming the easy cases.

TP/TN/FP/FN here mean, per test case (not per report):
  TP -- the case SHOULD be included, and the code's logic includes it (correct)
  TN -- the case SHOULD be excluded, and the code's logic excludes it (correct)
  FP -- the case SHOULD be excluded, but the code's logic includes it anyway (bug: over-inclusive)
  FN -- the case SHOULD be included, but the code's logic excludes it anyway (bug: under-inclusive / overly strict)

CRITICAL, enforced in the UI as well as here: this is a REASONED TRACE of
the generated code's logic against synthetic data, not a real execution
against a real system. A clean TP/TN result is not the same kind of
evidence as an actual test run, and must never be presented or reasoned
about as if it were.
"""

import os

import anthropic

SYNTHETIC_VALIDATION_SYSTEM_PROMPT = """You are a clinical data programmer designing a \
rigorous, systematic test of generated code's logic against synthetic \
data -- BEFORE it has ever run on a real system.

You will be given the original spec (Description, Logic, Report \
Scenarios) and the actual generated code. Your job:

1. Identify each DISTINCT logical condition the code's actual logic \
depends on (e.g. a term-matching requirement, a date-overlap check, a \
deleted-record exclusion, a status filter, a null-handling rule). Pull \
these from the code itself, not just from the spec's prose -- the code \
is the thing being tested.

2. For each condition, construct AT LEAST one test case that should be \
INCLUDED per the spec's true intent, and AT LEAST one that should be \
EXCLUDED -- and prefer boundary/edge variants over obvious ones: an \
onset date exactly ON a cutoff rather than safely inside/outside it, a \
term that differs only in case, a record with a null where the spec's \
handling of null is ambiguous, a date range that touches but barely \
doesn't overlap. These edge cases are the ones actually likely to expose \
a subtle bug -- an obviously-clear-cut case rarely does. Represent each \
case's synthetic data as actual structured rows (column name -> value), \
using the SAME column names across every row within one test case, and \
real Form.Item names where you know them (from the code or provided \
metadata) rather than generic placeholders like "Field1"/"Value1".

3. For EACH constructed case, determine:
   - What SHOULD happen per the spec's true intent (include or exclude, \
and why)
   - What the GENERATED CODE's actual logic would do, traced step by \
step through its real joins/filters/conditions against this data
   - Classify the result: "TP" (should include, code includes), "TN" \
(should exclude, code excludes), "FP" (should exclude, but code \
includes -- a real bug, over-inclusive), or "FN" (should include, but \
code excludes -- a real bug, under-inclusive/overly strict)

4. When you find an FP or FN, say EXACTLY where the code's logic \
diverges from correct behavior -- which condition, which comparison, \
what it should have checked instead.

5. Aim for real coverage, not padding: enough cases to exercise every \
distinct condition in both directions, plus the boundary cases most \
likely to catch a real mistake. Don't invent conditions the code doesn't \
actually contain, and don't skip a condition the code clearly depends on.

6. Never claim more certainty than a text-based trace can support -- \
frame every traced_outcome as reasoning about what the code's logic \
would do, not as a report of what it did when actually run.

Use the submit_synthetic_validation tool."""

SYNTHETIC_VALIDATION_TOOL = {
    "name": "submit_synthetic_validation",
    "description": "Submit a systematic TP/TN/FP/FN test matrix tracing the generated code's actual logic.",
    "input_schema": {
        "type": "object",
        "properties": {
            "test_cases": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "condition_tested": {"type": "string", "description": "The specific logical condition this case targets"},
                        "synthetic_data": {
                            "type": "array",
                            "description": (
                                "Rows of synthetic data as actual structured records, not a text description. "
                                "Each row is an object mapping column name to value. Use the SAME column names "
                                "across every row in this test case (ideally the real Form.Item names the code "
                                "references) so they render as one consistent table."
                            ),
                            "items": {
                                "type": "object",
                                "additionalProperties": {"type": "string"},
                            },
                        },
                        "expected_outcome": {"type": "string", "description": "Include or exclude, and why, per the spec's true intent"},
                        "traced_outcome": {"type": "string", "description": "What tracing the code's actual logic against this data produces"},
                        "quadrant": {"type": "string", "enum": ["TP", "TN", "FP", "FN"]},
                        "explanation": {
                            "type": "string",
                            "description": "Why this classification -- if FP/FN, exactly where the code's logic diverges from correct behavior",
                        },
                    },
                    "required": ["condition_tested", "synthetic_data", "expected_outcome", "traced_outcome", "quadrant", "explanation"],
                },
            },
            "conditions_identified": {
                "type": "array",
                "items": {"type": "string"},
                "description": "The distinct logical conditions identified in the code, for reference",
            },
            "overall_summary": {"type": "string", "description": "1-3 sentences: overall coverage and whether any bugs were found"},
        },
        "required": ["test_cases", "conditions_identified", "overall_summary"],
    },
}


class AgentError(Exception):
    pass


def build_synthetic_validation_user_prompt(spec: dict, generated_code: str, language: str, metadata_block: str = "") -> str:
    metadata_section = f"\n\n{metadata_block}\n" if metadata_block else ""
    return f"""SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
{metadata_section}
GENERATED CODE ({language.upper()}):
{generated_code}

Identify the distinct conditions this code depends on, construct a systematic TP/TN/FP/FN
test matrix, and trace the code's actual logic against each case now."""


def run_synthetic_validation(spec: dict, generated_code: str, language: str, metadata_block: str = "") -> dict:
    """Returns {"test_cases": [...], "conditions_identified": [...],
    "overall_summary": ...}. Raises AgentError on failure -- never
    returns a partial/garbage result silently."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)
    try:
        # See cql_agents.run_spec_review's comment for why this is
        # messages.stream() + get_final_message(), not messages.create().
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=24000,  # systematic multi-condition, multi-direction coverage can produce
            # substantially more test cases than the old scenario-only version -- sized generously
            # from the start given this project's repeated real-world truncation history.
            system=SYNTHETIC_VALIDATION_SYSTEM_PROMPT,
            tools=[SYNTHETIC_VALIDATION_TOOL],
            tool_choice={"type": "tool", "name": "submit_synthetic_validation"},
            messages=[{"role": "user", "content": build_synthetic_validation_user_prompt(spec, generated_code, language, metadata_block)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_synthetic_validation":
            return _sanitize_validation_result(block.input)

    if response.stop_reason == "max_tokens":
        raise AgentError("Synthetic validation was cut off before finishing (ran out of tokens).")
    raise AgentError(f"Model did not return a structured validation result (stop_reason={response.stop_reason}).")


_VALID_QUADRANTS = {"TP", "TN", "FP", "FN"}


def _sanitize_synthetic_data(raw) -> list:
    """Coerces synthetic_data into a real list of {column: value} row
    dicts, defensively. If the model still returns a plain string
    despite the schema (tool_choice constrains the tool name, not a hard
    guarantee every nested field matches its declared type), that string
    becomes a single-column single-row table rather than being dropped
    or crashing the renderer -- degraded but not lost."""
    if isinstance(raw, list):
        rows = []
        for row in raw:
            if isinstance(row, dict):
                rows.append({str(k): str(v) for k, v in row.items()})
        return rows
    if isinstance(raw, str) and raw.strip():
        return [{"data": raw.strip()}]
    return []


def _sanitize_validation_result(result: dict) -> dict:
    """Same defensive lesson as every other agent: don't trust the shape
    even under tool_choice. A malformed test case is dropped rather than
    failing the whole call -- a partial, still-useful matrix beats
    discarding everything over one bad entry. Quadrant counts are NOT
    trusted from the model -- the caller (main.py/frontend) computes
    those directly from the sanitized test_cases array, so a mismatched
    self-reported count can never reach the user."""
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object result (got {type(result).__name__}).")

    test_cases = []
    for item in result.get("test_cases", []) if isinstance(result.get("test_cases"), list) else []:
        if not isinstance(item, dict):
            continue
        quadrant = item.get("quadrant") if item.get("quadrant") in _VALID_QUADRANTS else None
        if quadrant is None:
            continue  # a case with no valid quadrant classification isn't usable -- drop it, don't guess
        test_cases.append({
            "condition_tested": str(item.get("condition_tested", "")),
            "synthetic_data": _sanitize_synthetic_data(item.get("synthetic_data")),
            "expected_outcome": str(item.get("expected_outcome", "")),
            "traced_outcome": str(item.get("traced_outcome", "")),
            "quadrant": quadrant,
            "explanation": str(item.get("explanation", "")),
        })

    if not test_cases:
        raise AgentError("Model did not return any usable test cases.")

    conditions = [str(c) for c in result.get("conditions_identified", [])] if isinstance(result.get("conditions_identified"), list) else []
    overall_summary = result.get("overall_summary")
    if not isinstance(overall_summary, str):
        overall_summary = ""

    return {"test_cases": test_cases, "conditions_identified": conditions, "overall_summary": overall_summary}
