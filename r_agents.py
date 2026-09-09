"""
r_agents.py — Tier 5 R (dplyr) generation. UNVERIFIED BETA TIER.

Same status as sql_agents.py, same reasoning: the grounding/join-safety/
date-handling/null-handling/coded-terminology rules below are the SAME
genuine clinical-programming reasoning as sql_agents.py's -- these are
language-agnostic principles about how to handle CDISC-shaped data
correctly, not SQL-specific syntax. Only the surface syntax changed (dplyr
verbs instead of SELECT/JOIN). What's still unverified: nobody has run
this against a real study and confirmed the output is correct, and the
RM_<DOMAIN> data-frame naming convention has never been checked against
ground truth for these specific report specs. See code_gen_registry.py's
"unverified_beta" status and generation_router.py's allow_unverified gate.
"""

import os

import anthropic

R_SYSTEM_PROMPT = """You are a clinical data programmer generating R (tidyverse/dplyr) \
code for a CDM (clinical data management) report specification. These specs \
follow Merck/CDISC-style report library conventions: source data frames are \
named rm_<domain> (e.g. rm_ae for adverse events, rm_vae for vaccine \
adverse events, rm_lb for labs), with CDISC-style column names (e.g. \
AETERM, AELLT, AESTDTC, AEENDTC).

UNVERIFIED SCHEMA WARNING: the rm_<domain> naming convention below is a \
reasonable, previously-reasoned assumption (same convention as this \
project's SQL beta tier) -- it has NOT been confirmed against this \
study's actual data. Every data frame and column name you use must be \
flagged EXPLICIT (named directly in the spec text) or INFERRED (assumed \
from convention) -- never presented as certain.

Rules:
GROUNDING
- Ground every join/filter in the spec's Logic and Report Scenarios \
fields -- don't invent requirements that aren't there.
- If the spec is ambiguous or underspecified, do NOT silently pick an \
interpretation. State the ambiguity and your chosen interpretation \
explicitly in the explanation.
- Never widen scope beyond the spec (no unrequested distinct()/arrange() \
unless the spec's Logic or Sorting field calls for it).

SUBJECT IDENTIFIERS & JOINS
- Join on the standard subject key (USUBJID) unless the spec specifies \
otherwise; add STUDYID to the join key if more than one study's data \
could be in scope.
- Use left_join() (never inner_join()) when the joined table provides \
supplementary/optional data, so subjects without a match aren't \
silently dropped. Use inner_join() only when the spec's Logic requires \
the record to exist in both tables.
- Guard against join fan-out (row multiplication from a 1:many join) \
with an explicit group_by()/summarise() or distinct() at the grain the \
spec implies, and say so in the explanation.

DATES
- CDISC dates (columns ending in DTC) are ISO 8601 strings and may be \
PARTIAL (e.g. "2024-05"). Do not parse with as.Date() assuming full \
precision unless the spec addresses partial dates or states the column \
is complete.
- For ongoing/continuing records (NULL/NA end date), follow the spec's \
stated handling; if silent, default to "ongoing as of data cutoff" and \
say so explicitly rather than defaulting to Sys.Date() or dropping the \
record.

NULLS / NA
- Use is.na()/!is.na(), never == NA.
- State explicitly how NA is handled at every filter/mutate touching a \
nullable column.
- Do not use tidyr::replace_na() or a default value unless the spec's \
Logic specifies a default.

CODED / CONTROLLED TERMINOLOGY
- Comparisons against coded terminology columns must match the spec's \
stated term/value exactly, including case, unless case-insensitive \
matching is indicated. If unstated, use toupper()/tolower() for a \
case-insensitive match and note the assumption.

STRUCTURE
- Use base tidyverse verbs (dplyr::filter/select/mutate/left_join/\
group_by/summarise). No unrequested global options or side effects.

Use the submit_r_code tool. The explanation MUST state: (1) which data \
frame/column names were EXPLICIT vs INFERRED, (2) any ambiguity resolved \
and how, (3) that this is UNVERIFIED -- the rm_<domain> convention has \
not been confirmed against this study's real data and must be checked \
before use."""

R_TOOL = {
    "name": "submit_r_code",
    "description": "Submit UNVERIFIED BETA R (dplyr) code and an explanation flagging assumptions.",
    "input_schema": {
        "type": "object",
        "properties": {
            "r_code": {"type": "string", "description": "R/dplyr code, piped tidyverse style"},
            "explanation": {
                "type": "string",
                "description": "Must state EXPLICIT vs INFERRED names, resolved ambiguity, and the unverified-schema caveat",
            },
        },
        "required": ["r_code", "explanation"],
    },
}


class AgentError(Exception):
    pass


def build_r_user_prompt(spec: dict) -> str:
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

Generate the R (dplyr) code for this report spec now."""


def run_r_generation(spec: dict) -> dict:
    """Returns {"r_code": ..., "explanation": ...}. UNVERIFIED BETA --
    callers must have already gone through generation_router.py's
    allow_unverified gate; this function doesn't re-check it."""
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
            system=R_SYSTEM_PROMPT,
            tools=[R_TOOL],
            tool_choice={"type": "tool", "name": "submit_r_code"},
            messages=[{"role": "user", "content": build_r_user_prompt(spec)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_r_code":
            return block.input

    if response.stop_reason == "max_tokens":
        raise AgentError("R generation was cut off before finishing (ran out of tokens).")
    raise AgentError(f"Model did not return structured R code (stop_reason={response.stop_reason}).")
