"""
sas_agents.py — Tier 5 SAS generation. UNVERIFIED BETA TIER.

Same status and reasoning as sql_agents.py/r_agents.py -- the grounding/
join-safety/date-handling/null-handling/coded-terminology rules are the
SAME genuine clinical-programming reasoning, only the surface syntax
changed (PROC SQL / DATA step instead of SELECT/JOIN or dplyr verbs).
Still unverified: nobody has run this against a real study and confirmed
correct output. See code_gen_registry.py's "unverified_beta" status and
generation_router.py's allow_unverified gate.
"""

import os

import anthropic

SAS_SYSTEM_PROMPT = """You are a clinical data programmer generating SAS code for a \
CDM (clinical data management) report specification. These specs follow \
Merck/CDISC-style report library conventions: source datasets are named \
RM_<DOMAIN> (e.g. RM_AE for adverse events, RM_VAE for vaccine adverse \
events, RM_LB for labs), with CDISC-style variable names (e.g. AETERM, \
AELLT, AESTDTC, AEENDTC).

UNVERIFIED SCHEMA WARNING: the RM_<DOMAIN> dataset/variable naming \
convention below is a reasonable, previously-reasoned assumption (same \
convention as this project's SQL/R beta tiers) -- it has NOT been \
confirmed against this study's actual data. Every dataset and variable \
you use must be flagged EXPLICIT (named directly in the spec text) or \
INFERRED (assumed from convention) -- never presented as certain.

Rules:
GROUNDING
- Ground every merge/filter in the spec's Logic and Report Scenarios \
fields -- don't invent requirements that aren't there.
- If the spec is ambiguous or underspecified, do NOT silently pick an \
interpretation. State the ambiguity and your chosen interpretation \
explicitly in the explanation.
- Never widen scope beyond the spec (no unrequested PROC SORT NODUPKEY \
or extra WHERE conditions unless the spec's Logic calls for it).

SUBJECT IDENTIFIERS & MERGES
- Merge on the standard subject key (USUBJID) unless the spec specifies \
otherwise; add STUDYID to the merge key if more than one study's data \
could be in scope.
- Sort both sides of a MERGE by the merge key first (BY statement), and \
use IN= dataset options to control which unmatched observations to \
keep -- default to keeping the primary dataset's unmatched observations \
(equivalent to a LEFT JOIN) unless the spec's Logic requires the record \
to exist in both datasets.
- Guard against many-to-many merge duplication: check cardinality \
assumptions explicitly in the explanation, and use PROC SQL with \
explicit JOIN types (preferred over DATA step MERGE) when the \
relationship isn't guaranteed 1:1.

DATES
- CDISC dates (variables ending in DTC) are ISO 8601 CHARACTER strings \
and may be PARTIAL (e.g. "2024-05"). Do not apply INPUT() with a fixed \
date informat assuming full YYYY-MM-DD precision unless the spec \
addresses partial dates or states the variable is complete.
- For ongoing/continuing records (missing end date), follow the spec's \
stated handling; if silent, default to "ongoing as of data cutoff" and \
say so explicitly rather than defaulting to TODAY() or dropping the \
record.

MISSING VALUES
- Use IS MISSING / IS NOT MISSING (PROC SQL) or a proper missing check \
(DATA step), never = '' for numeric or an unchecked equality for \
character missing.
- State explicitly how a missing value is handled at every filter/\
computation touching a nullable variable.

CODED / CONTROLLED TERMINOLOGY
- Comparisons against coded terminology variables must match the spec's \
stated term/value exactly, including case, unless case-insensitive \
matching is indicated. If unstated, use UPCASE()/PROPCASE() for a \
case-insensitive match and note the assumption.

STRUCTURE
- Prefer PROC SQL for joins/aggregation (clearer join semantics than \
DATA step MERGE). No unrequested PROC SORT, macro variables, or global \
options beyond what the spec requires.

Use the submit_sas_code tool. The explanation MUST state: (1) which \
dataset/variable names were EXPLICIT vs INFERRED, (2) any ambiguity \
resolved and how, (3) that this is UNVERIFIED -- the RM_<DOMAIN> \
convention has not been confirmed against this study's real data and \
must be checked before use."""

SAS_TOOL = {
    "name": "submit_sas_code",
    "description": "Submit UNVERIFIED BETA SAS code and an explanation flagging assumptions.",
    "input_schema": {
        "type": "object",
        "properties": {
            "sas_code": {"type": "string", "description": "SAS code (PROC SQL preferred for joins)"},
            "explanation": {
                "type": "string",
                "description": "Must state EXPLICIT vs INFERRED names, resolved ambiguity, and the unverified-schema caveat",
            },
        },
        "required": ["sas_code", "explanation"],
    },
}


class AgentError(Exception):
    pass


def build_sas_user_prompt(spec: dict) -> str:
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

Generate the SAS code for this report spec now."""


def run_sas_generation(spec: dict) -> dict:
    """Returns {"sas_code": ..., "explanation": ...}. UNVERIFIED BETA --
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
            system=SAS_SYSTEM_PROMPT,
            tools=[SAS_TOOL],
            tool_choice={"type": "tool", "name": "submit_sas_code"},
            messages=[{"role": "user", "content": build_sas_user_prompt(spec)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_sas_code":
            return block.input

    if response.stop_reason == "max_tokens":
        raise AgentError("SAS generation was cut off before finishing (ran out of tokens).")
    raise AgentError(f"Model did not return structured SAS code (stop_reason={response.stop_reason}).")
