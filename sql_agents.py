"""
sql_agents.py — Tier 5 SQL generation. UNVERIFIED BETA TIER.

This reuses the RM_<DOMAIN> relational-table SQL system prompt developed
and iteratively refined earlier in this same project (grounding rules,
join-safety defaults, partial-date handling, null handling, coded-
terminology matching, UNION ALL over UNION) -- that engineering is real,
not invented for this file. What's NOT verified: nobody has run this
against a real study and confirmed the output is correct, and the
RM_<DOMAIN> table-naming convention itself (not just specific column
names within it) has never been checked against ground truth for these
specific report specs.

Every function in this module that touches generation output makes that
status explicit in the returned explanation -- never silently presented
as equivalent to cql_agents.py's verified path. See
code_gen_registry.py's "unverified_beta" status and
generation_router.py's allow_unverified opt-in gate, which is what
callers must pass through before this module is ever invoked.
"""

import os
from typing import Optional

import anthropic

import clinical_modules

SQL_SYSTEM_PROMPT = """You are a clinical data programmer generating SQL for a \
CDM (clinical data management) report specification. These specs follow \
Merck/CDISC-style report library conventions: source tables are named \
RM_<DOMAIN> (e.g. RM_AE for adverse events, RM_VAE for vaccine adverse \
events, RM_LB for labs, RM_SA for subject/site info), with CDISC-style \
column names (e.g. AETERM, AELLT, AESTDTC, AEENDTC).

UNVERIFIED SCHEMA WARNING: the RM_<DOMAIN> table/column naming convention \
below is a reasonable, previously-reasoned assumption -- it has NOT been \
confirmed against this study's actual database schema. Every table and \
column name you use must be flagged EXPLICIT (named directly in the spec \
text) or INFERRED (assumed from convention) -- never presented as certain.

Rules:
GROUNDING
- Ground every join and filter in the spec's Logic and Report Scenarios \
fields -- don't invent requirements that aren't there.
- If the spec is ambiguous or underspecified on a point, do NOT silently \
pick an interpretation. State the ambiguity and your chosen \
interpretation explicitly in the explanation.
- Never widen scope beyond the spec (no DISTINCT, ORDER BY, or an added \
filter "for safety" unless the spec's Logic or Report Scenarios call \
for it).

SUBJECT IDENTIFIERS & JOINS
- Join on the standard subject key (USUBJID) unless the spec specifies \
otherwise. When joining across domains, always join on USUBJID, and add \
STUDYID to the join condition if more than one study/table population \
could be in scope.
- Use LEFT JOIN (never INNER JOIN) when the joined table provides \
supplementary/optional data, so subjects without a match aren't \
silently dropped. Use INNER JOIN only when the spec's Logic requires \
the record to exist in both tables.
- Never assume a 1:1 relationship between subject and record unless the \
domain guarantees it. Guard against join fan-out with appropriate \
GROUP BY/aggregation or scoped subqueries when the spec implies a \
subject-level or visit-level grain rather than a record-level grain.

DATES
- CDISC dates (fields ending in DTC) are ISO 8601 strings and may be \
PARTIAL (e.g. "2024-05" or "2024" with no day/month). Do not assume a \
fixed-length string or apply date arithmetic that assumes full \
YYYY-MM-DD precision unless the spec's Logic explicitly addresses \
partial dates or the column is stated to be complete.
- For ongoing/continuing records (e.g. an end date is NULL and an \
ongoing flag is present), follow the spec's stated handling exactly; if \
the spec is silent, default to treating NULL end date as "ongoing as of \
data cutoff" and say so explicitly rather than defaulting to today's \
date or excluding the record.

NULLS & MISSING DATA
- Never use `= NULL`; use IS NULL / IS NOT NULL.
- When a filter or CASE expression touches a nullable column, state \
explicitly how NULL is handled at that point.
- Do not COALESCE or default a value into existence unless the spec's \
Logic specifies a default.

CODED / CONTROLLED TERMINOLOGY FIELDS
- Comparisons against coded terminology fields must match the spec's \
stated term/value exactly, including case, unless the spec indicates \
case-insensitive matching is needed. If case-sensitivity isn't stated, \
use a case-insensitive comparison and note this assumption.
- Do not hardcode a MedDRA/WHODrug dictionary version assumption unless \
the spec names one.

MULTI-SCENARIO / SET OPERATIONS
- When the spec has multiple mutually exclusive Report Scenarios \
requiring separate branches, default to UNION ALL over UNION unless the \
spec explicitly requires deduplication.

STRUCTURE & SYNTAX
- Write the query as a SINGLE statement -- do NOT use WITH clauses / \
CTEs. Use subqueries or direct joins instead.
- Prefer ANSI SQL. Alias every table once more than one is in scope. \
No SELECT *.

Use the submit_sql tool to return the SQL and an explanation. The \
explanation MUST state: (1) which table/column names were EXPLICIT vs \
INFERRED, (2) any ambiguity you resolved and how, and (3) that this is \
an UNVERIFIED generation -- the RM_<DOMAIN> schema has not been \
confirmed against this study's real database and must be checked before \
use."""

SQL_TOOL = {
    "name": "submit_sql",
    "description": "Submit UNVERIFIED BETA SQL and an explanation flagging assumptions.",
    "input_schema": {
        "type": "object",
        "properties": {
            "sql": {"type": "string", "description": "Single ANSI SQL statement, no CTEs"},
            "explanation": {
                "type": "string",
                "description": "Must state EXPLICIT vs INFERRED names, any resolved ambiguity, and the unverified-schema caveat",
            },
        },
        "required": ["sql", "explanation"],
    },
}


class AgentError(Exception):
    pass


def build_sql_user_prompt(spec: dict) -> str:
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

{clinical_modules.prompt_block(spec)}{spec.get('_context_block', '')}
Generate the SQL for this report spec now."""


def run_sql_generation(spec: dict) -> dict:
    """Returns {"sql": ..., "explanation": ...}. Raises AgentError on
    failure. This is the UNVERIFIED BETA tier -- callers must have
    already gone through generation_router.py's allow_unverified gate
    before calling this; this function does not re-check that itself."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)
    try:
        # See cql_agents.run_spec_review's comment for why this is
        # messages.stream() + get_final_message(), not messages.create().
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=8000,
            system=SQL_SYSTEM_PROMPT,
            tools=[SQL_TOOL],
            tool_choice={"type": "tool", "name": "submit_sql"},
            messages=[{"role": "user", "content": build_sql_user_prompt(spec)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_sql":
            return block.input

    if response.stop_reason == "max_tokens":
        raise AgentError("SQL generation was cut off before finishing (ran out of tokens).")
    raise AgentError(f"Model did not return structured SQL (stop_reason={response.stop_reason}).")
