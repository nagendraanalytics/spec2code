"""
synthetic_data_agent.py -- synthetic test data built from a spec's LOGIC, before any code exists.

Purpose: give a reviewer something concrete to check the logic against. The model lists the distinct
conditions it finds in the spec, then builds small multi-form datasets, each tagged with one condition and
an expected outcome (include or exclude) with the reason. A reviewer reads the cases, corrects any whose
expectation is wrong, and signs the set off. The set can then be used to review generated code.

This is reasoning about the spec, not an execution. Nothing here proves code correct.
"""
from __future__ import annotations

import os

import llm_client

MODEL = os.environ.get("SPEC2CODE_SYNTH_MODEL", "claude-sonnet-5")

SYSTEM = """You are a senior clinical data programmer building synthetic test data for a listing, to check its \
LOGIC before code is written.

Given the spec (Description, Columns, Logic, Scenarios), do this:

1. List every DISTINCT condition the logic depends on (c1, c2, ...). One condition = one check: a status filter, \
a date window, a deleted-record exclusion, a join between forms, a null rule, a duplicate rule. Quote or \
paraphrase the spec text for each. If the logic is numbered (Logic 1, Logic 1.1 ...), keep that label in the text. \
Do not invent conditions the spec does not state. If something is ambiguous, say so in the condition text.

2. For EACH condition build at least one case that must be INCLUDED and at least one that must be EXCLUDED. \
Prefer boundary cases (a date exactly on the cutoff, a value differing only in case, a null where the spec is \
unclear) and mark them boundary=true. Add a few combined cases where two conditions interact (OR/AND).

3. Each case is small: one or a few subjects, as tables. EVERY table must have a SubjectId column, and every case \
must use its OWN subject IDs that no other case uses (for example S-k1-01 for case k1), because code is later run \
against all cases at once and judged by which subjects it returns. A table has a form name and rows (column -> value), \
using the same columns across the rows of that table. Use real Form.Item names from the metadata when provided. \
Use fictitious subject and site IDs only. Never use real patient data or real names.

4. For each case state the expectation (include or exclude), the scenario in one line, and the rationale, \
quoting the part of the spec that decides it.

5. Be honest about doubt: if the spec does not decide a case, put it in open_questions instead of guessing.

Use the submit_synthetic_data tool."""

TOOL = {
    "name": "submit_synthetic_data",
    "description": "Submit conditions and synthetic test cases derived from the spec's logic.",
    "input_schema": {
        "type": "object",
        "properties": {
            "conditions": {"type": "array", "items": {"type": "object", "properties": {
                "id": {"type": "string"}, "text": {"type": "string"}}, "required": ["id", "text"]}},
            "cases": {"type": "array", "items": {"type": "object", "properties": {
                "id": {"type": "string"},
                "conditionId": {"type": "string", "description": "The condition this case mainly tests"},
                "expectation": {"type": "string", "enum": ["include", "exclude"]},
                "boundary": {"type": "boolean"},
                "scenario": {"type": "string"},
                "rationale": {"type": "string"},
                "tables": {"type": "array", "items": {"type": "object", "properties": {
                    "form": {"type": "string"},
                    "rows": {"type": "array", "items": {"type": "object", "additionalProperties": {"type": "string"}}}},
                    "required": ["form", "rows"]}},
            }, "required": ["id", "conditionId", "expectation", "scenario", "rationale", "tables"]}},
            "open_questions": {"type": "array", "items": {"type": "string"}},
            "summary": {"type": "string"},
        },
        "required": ["conditions", "cases", "summary"],
    },
}


class AgentError(Exception):
    pass


def build_prompt(spec: dict, metadata_block: str = "", knowledge_block: str = "") -> str:
    return f"""SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}
{metadata_block}{knowledge_block}
List the conditions and build the synthetic cases now."""


def sanitize(raw) -> dict:
    """Never trust shape, even under forced tool use. A bad case is dropped, not fatal."""
    if not isinstance(raw, dict):
        raise AgentError(f"Model returned a non-object result ({type(raw).__name__}).")
    conds, seen = [], set()
    for c in raw.get("conditions") if isinstance(raw.get("conditions"), list) else []:
        if isinstance(c, dict) and str(c.get("id", "")).strip() and str(c.get("id")) not in seen:
            seen.add(str(c["id"]))
            conds.append({"id": str(c["id"]).strip(), "text": str(c.get("text", ""))})
    cases, ids = [], set()
    for i, c in enumerate(raw.get("cases") if isinstance(raw.get("cases"), list) else []):
        if not isinstance(c, dict) or c.get("expectation") not in ("include", "exclude"):
            continue
        cid = str(c.get("id") or f"case{i + 1}")
        if cid in ids:
            cid = f"{cid}_{i + 1}"
        ids.add(cid)
        tables = []
        for t in c.get("tables") if isinstance(c.get("tables"), list) else []:
            if isinstance(t, dict):
                rows = [{str(k): str(v) for k, v in r.items()} for r in (t.get("rows") if isinstance(t.get("rows"), list) else []) if isinstance(r, dict)]
                tables.append({"form": str(t.get("form", "")), "rows": rows})
        cases.append({"id": cid, "conditionId": str(c.get("conditionId", "")), "expectation": c["expectation"],
                      "boundary": bool(c.get("boundary")), "scenario": str(c.get("scenario", "")),
                      "rationale": str(c.get("rationale", "")), "tables": tables, "note": ""})
    if not cases:
        raise AgentError("Model did not return any usable test cases.")
    oq = [str(q) for q in raw.get("open_questions", [])] if isinstance(raw.get("open_questions"), list) else []
    return {"conditions": conds, "cases": cases, "openQuestions": oq, "summary": str(raw.get("summary", ""))}


def run_synthetic_generation(spec: dict, metadata_block: str = "", knowledge_block: str = "") -> dict:
    if not llm_client.available():
        raise AgentError(llm_client.not_configured_message())
    try:
        res = llm_client.call_tool(system=SYSTEM, user=build_prompt(spec, metadata_block, knowledge_block), tool=TOOL, max_tokens=24000, model=MODEL)
    except llm_client.LLMClientError as e:
        raise AgentError(f"Language model request failed: {e}") from e
    if res.input is not None:
        return sanitize(res.input)
    if res.stop_reason in ("max_tokens", "invalid_json"):
        raise AgentError("Synthetic data generation was cut off before finishing or was not valid structured output.")
    raise AgentError(f"Model did not return structured data (stop_reason={res.stop_reason}).")
