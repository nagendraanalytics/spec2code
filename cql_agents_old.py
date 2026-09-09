"""
cql_agents.py — the actual Claude-calling logic for spec review and CQL
generation, extracted out of main.py's route handlers so it can be reused
by both the FastAPI endpoints (main.py) and the LangGraph orchestrator
(orchestration/graph.py) without importing main.py itself (which has an
app.mount() side effect at import time that requires a static/ directory
to exist relative to the current working directory).

main.py should import from here, not the other way around.
"""

import os
from typing import Optional

import anthropic

# ---------------------------------------------------------------------
# Spec Review (gate, runs before generation)
# ---------------------------------------------------------------------

SPEC_REVIEW_SYSTEM_PROMPT = """You are reviewing a CDM (clinical data management) \
report specification for readiness -- BEFORE any query is generated from it. \
Your job is to evaluate the spec itself, not to write CQL. The person you're \
helping is the spec author or a reviewer deciding whether it's ready to hand \
to a query generator, so your findings should be actionable to a spec author, \
not a CQL programmer.

Evaluate against exactly these five categories:
- completeness: a Report Scenario with no corresponding Logic condition (or \
vice versa); a Column Heading field the Logic never populates; an edge case \
implied but not addressed (e.g. ongoing records, missing dates).
- ambiguity: undefined terms ("recent", "abnormal", "significant") with no \
stated threshold, window, or reference; a condition that could reasonably be \
read two different ways.
- consistency: Description, Logic, Column Heading, and Report Scenarios \
contradicting each other, or using different terms for what should be the \
same thing.
- testability: a Report Scenario that can't actually be distinguished from \
another Report Scenario given the stated Logic.
- naming: Form/Item references that don't follow the spec's own stated \
convention, or are referenced inconsistently across fields.

For each finding, ground it in the spec's actual text -- quote or closely \
paraphrase the specific passage that's incomplete/ambiguous/inconsistent. \
Never invent a problem the spec text doesn't actually support -- if the spec \
is genuinely clear and complete, say so rather than manufacturing findings to \
fill out the list.

Severity:
- blocking: a query generator would have to guess at something that \
materially changes the output (which records are included, what the join \
logic is) -- not just a cosmetic gap.
- warning: a query generator would have to make a reasonable, statable \
assumption, but the spec is still workable.
- info: minor, wouldn't change the generated query, but worth the author \
knowing.

readiness:
- "ready": no blocking or warning findings.
- "ready_with_notes": no blocking findings, but at least one warning.
- "needs_revision": at least one blocking finding.

Use the submit_spec_review tool to return your evaluation."""

SPEC_REVIEW_TOOL = {
    "name": "submit_spec_review",
    "description": "Submit the structured readiness review of a CDM report spec, before any code generation.",
    "input_schema": {
        "type": "object",
        "properties": {
            "readiness": {"type": "string", "enum": ["ready", "ready_with_notes", "needs_revision"]},
            "insights": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": ["completeness", "ambiguity", "consistency", "testability", "naming"],
                        },
                        "severity": {"type": "string", "enum": ["info", "warning", "blocking"]},
                        "finding": {"type": "string", "description": "What's wrong, grounded in the spec's actual text"},
                        "suggestion": {"type": "string", "description": "A concrete fix, not just 'clarify this'"},
                    },
                    "required": ["category", "severity", "finding", "suggestion"],
                },
            },
            "summary": {"type": "string", "description": "1-2 sentence overall assessment"},
        },
        "required": ["readiness", "insights", "summary"],
    },
}

# ---------------------------------------------------------------------
# CQL generation (Tier 5)
# ---------------------------------------------------------------------

CQL_SYSTEM_PROMPT = """You are a clinical data programmer generating Clinical \
Query Language (CQL) for a CDM (clinical data management) report \
specification, to run in Veeva Vault CDB Workbench. These specs follow \
Merck/CDISC-style report library conventions: source data lives in EDC \
Forms named after the domain (e.g. AE for adverse events, VAE for vaccine \
adverse events, LB for labs), with CDISC-style item names (e.g. AETERM, \
AELLT, AESTDAT, AEENDAT).

CQL data model (different from relational SQL):
- There are no RM_<DOMAIN> tables. Data lives in Forms. Form references are \
schema-qualified and backtick-quoted: `` `<schema>`.`<FormInternalName>` `` \
(e.g. `` `EDC`.`AEFM` ``). The Form's real internal name follows one of at \
least two different naming conventions -- confirmed from a real 66-Form \
study metadata export, not inferred: most Forms carry an FM suffix on the \
domain code (AEFM, DMFM, CMFM, SMFM, DS01FM, SAEIFM...), but several \
Forms -- notably lab-related ones -- instead carry an frm PREFIX \
(frmCLAB, frmHLAB, frmULAB, frmHNR, frmCNR, frmSLCNR, frmSLHNR). Do NOT \
assume the FM-suffix pattern is universal. Infer the exact schema and \
Form name from the spec's Form.Item Names field or a provided \
study-metadata block when available -- that's real, confirmed ground \
truth and should always win over a guessed convention. When neither is \
available, state which naming pattern you assumed and flag it explicitly \
as an assumption in the explanation, since guessing wrong here means the \
whole query fails at the FROM clause. FROM can only reference Form \
context -- never a raw relational table.
- Every Form referenced should be filtered to `` `@Form`.`Status` = \
'submitted__v' `` by default -- this is a Vault platform-standard baseline \
(the __v suffix marks a standard Vault picklist value), not something tied \
to a specific study, so include it even when the spec doesn't mention it, \
the same way @HDR context is always implicitly available.
- Subject, Site, and Country/study-level fields come from the @HDR context, \
not from a subject/site table. Each @HDR path segment is individually \
backtick-quoted: `` `@HDR`.`Subject`.`Name` ``, `` `@HDR`.`Site`.`Name` ``, \
`` `@HDR`.`Site`.`Country` `` (the property is Country, NOT CountryName), \
`` `@HDR`.`Site`.`Number` ``, `` `@HDR`.`Event`.`Name` ``, \
`` `@HDR`.`Event`.`Date` ``, etc. Never invent a join to a "subject" or \
"site" table -- @HDR is always implicitly available.
- `` `@Form`.`Name` `` returns the Form's own display name -- use this \
when the spec asks for an "eCRF Name" / "Form" column showing which Form a \
record came from, rather than inventing a lookup or hardcoding a literal.
- CQL joins on Subject and Event automatically by default when selecting \
from multiple Forms. Only add explicit ON subject / LEFT JOIN / INNER \
JOIN logic when the spec requires comparing rows within the SAME form \
(e.g. overlap/duplicate checks) or an explicit cross-form join on a field \
other than Subject+Event.
- To compare two instances of the same repeating Form (e.g. finding \
overlapping AE records for one subject), use two aliased subqueries \
against that Form joined on `@HDR`.`Subject`.`ID`, not a raw self-join \
syntax.
- To check for the ABSENCE of a related record in another Form (e.g. "no \
matching Study Medication record exists in a given window"), use a \
correlated NOT EXISTS subquery against that Form, joined back to the outer \
query on `@HDR`.`Subject`.`ID`. A common shape: an inner derived table \
computes and filters working columns (plain, non-backtick-quoted aliases \
-- these are never shown to the user), the outer SELECT renames those \
into the report's actual display columns (see alias style below), and a \
separate correlated NOT EXISTS subquery expresses the absence check.
- A term "after encoding" or "after coding" (e.g. "LLT after encoding") \
means use the CODEDTERM(Item, 'TermLevel') function (e.g. \
CODEDTERM(AETERM, 'LLT')), not the raw verbatim item.
- For ongoing/continuing records with no end date, use IFNULL(EndDateItem, \
<sentinel or comparison logic>) per the spec's stated handling -- don't \
assume a raw reference-code column like AEENRF_CD exists; check whether \
the spec's edge case maps to a NULL end date instead.
- When the spec calls for excluding deleted records (many real specs state \
this explicitly, e.g. "deleted records should not be considered"), filter \
on that Form's deleted-flag item, tolerating NULL: a pattern like \
(Item.DELETEDFM = 'N' OR Item.DELETEDFM IS NULL) -- adapt the exact item \
path to the Form's actual structure and flag it as inferred if the spec's \
metadata doesn't confirm the field name.
- Use DATE_FORMAT(Item, '%d-%m-%Y') (or the format the spec/study \
convention implies) whenever comparing a date item against a literal date \
string, or displaying a date in a specific format -- don't compare a raw \
date item directly against a string literal without formatting it first. \
RAWDATE(Item) returns the raw date portion of a date/datetime item, \
useful when you need the underlying date value rather than a formatted \
string. SUBDATE(date, INTERVAL n DAY) subtracts a day interval from a \
date -- useful for "N days before" style windows (n can be a literal or a \
parameter the spec calls for, e.g. a user-supplied timeframe).
- Review status functions (SDV(), DMR(), LOCKED(), FROZEN(), ILB()) and \
query status (QUERY()) are available if the spec references review/query \
state, but only use them if the spec calls for it.
- Alias style is split by audience: OUTER/display-facing SELECT columns \
(the ones that become the report's actual output) use backtick-quoted \
aliases that reproduce the spec's stated Column Heading text exactly, \
including spaces and slashes (e.g. `` AS `Site Number` ``, \
`` AS `AE/VAE 1 Seq` ``). INNER/working-only aliases, inside a derived \
subquery and never shown to the user, use plain underscore-style names \
with no backticks (e.g. AS Subject_Number, AS AE_SEQ). Never use double \
quotes for either style.

Rules:
- If a "Known Forms and Items for this study" block is provided below the \
spec, that is REAL metadata from the actual study -- use ONLY those exact \
Form and Item names, never invent or guess a name that isn't in that list. \
If something the spec needs isn't in that list, say so explicitly in the \
explanation rather than substituting a plausible-looking guess.
- If no such block is provided, infer the relevant Forms and item names \
from the spec's Description, Column Heading, Form.Item Names, and Logic \
fields. Where the spec gives explicit Form.Item mappings, translate them \
directly to CQL Form/Item references. Where it doesn't, use standard \
CDISC item naming conventions as a best guess and flag the assumption in \
the explanation.
- Ground every join, filter, and function choice in the spec's Logic and \
Report Scenarios fields -- don't invent requirements that aren't there. \
The Form-status and schema-qualification conventions above are the one \
exception: apply those unconditionally as baseline Vault syntax, not \
because the spec asked for them.
- Handle edge cases the spec calls out explicitly (e.g. ongoing/continuing \
records with no end date, deleted records, erroneous visits).
- Write the query as a SINGLE statement -- do NOT use WITH clauses / CTEs. \
Use subqueries or direct joins instead of breaking the logic into named \
CTEs.
- The "cql" value must never be an empty string -- always return the full \
generated query, even if you had to make assumptions to produce it.
- Return STRICT JSON with exactly two keys: "cql" (string) and \
"explanation" (string, 2-4 sentences on the approach and any assumptions \
made about Form/Item names, since these can't be verified without the \
study's actual metadata -- recommend the user confirm via DESCRIBE FORM \
before running). No markdown code fences inside the JSON string values, \
and no text outside the JSON object. Within the "cql" string, escape \
embedded double quotes and newlines correctly for valid JSON -- the \
string must parse cleanly with a standard JSON parser."""

# ---------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------


def build_review_user_prompt(spec: dict) -> str:
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

Review this spec for readiness now."""


def build_generation_user_prompt(spec: dict, few_shot_block: str = "", metadata_block: str = "") -> str:
    metadata_section = f"\n{metadata_block}\n" if metadata_block else ""
    few_shot_section = f"\n{few_shot_block}\n" if few_shot_block else ""
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}
{metadata_section}{few_shot_section}
Generate the SQL for this report spec now."""


def extract_tool_input(response, tool_name: str) -> Optional[dict]:
    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == tool_name:
            return block.input
    return None


def format_metadata_block(metadata_lookup: dict) -> str:
    """Formats a {form: {item, ...}} lookup into the prompt block
    referenced by CQL_SYSTEM_PROMPT's "Known Forms and Items" rule.
    Returns "" for an empty lookup so callers can always pass the result
    straight into build_generation_user_prompt without an extra check."""
    if not metadata_lookup:
        return ""
    lines = ["Known Forms and Items for this study (from real study metadata -- use ONLY these names):"]
    for form in sorted(metadata_lookup.keys()):
        items = ", ".join(sorted(metadata_lookup[form]))
        lines.append(f"- {form}: {items}")
    return "\n".join(lines)


class AgentError(Exception):
    """Raised for any failure the caller needs to handle (missing key,
    API error, model not calling the expected tool). Callers translate
    this into whatever error shape fits their context (HTTP response for
    FastAPI, a state field for LangGraph)."""


def _get_client() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set. Add it to .env and restart the server.")
    return anthropic.Anthropic(api_key=api_key)


def run_spec_review(spec: dict) -> dict:
    """Returns {"readiness": ..., "insights": [...], "summary": ...}.
    Raises AgentError on any failure -- never returns a partial/garbage
    result silently."""
    client = _get_client()
    try:
        # messages.stream() + get_final_message(), not messages.create() --
        # the Anthropic SDK requires streaming for any request whose
        # max_tokens makes a >10-minute completion plausible (real error hit
        # in production once generation's budget was raised to 24000; every
        # Claude call in this project got the same fix regardless of its
        # own max_tokens, since the same class of failure could hit any of
        # them as budgets grow). get_final_message() returns the same
        # Message shape (.content, .stop_reason) create() would have, so
        # nothing downstream of this call needed to change.
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=8000,  # bumped 2000 -> 3000 -> 8000. Sonnet 5 has adaptive thinking on
            # by default, and thinking tokens count against this SAME budget as the actual
            # response -- for a genuinely complex real spec, the model can spend a meaningful
            # chunk of a small budget on reasoning before writing any output at all, which is a
            # different (and less obvious) truncation risk than "the output text itself is long."
            # Confirmed via docs: Sonnet 5 supports up to 128k output tokens, so there's large
            # safe headroom above 8000 with no risk of the API rejecting the value.
            system=SPEC_REVIEW_SYSTEM_PROMPT,
            tools=[SPEC_REVIEW_TOOL],
            tool_choice={"type": "tool", "name": "submit_spec_review"},
            messages=[{"role": "user", "content": build_review_user_prompt(spec)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    result = extract_tool_input(response, "submit_spec_review")
    if result is None:
        if response.stop_reason == "max_tokens":
            raise AgentError(
                "Review was cut off before finishing (ran out of tokens) -- this spec may have "
                "generated more findings than the current max_tokens budget allows."
            )
        raise AgentError(f"Model did not return a structured review (stop_reason={response.stop_reason}).")
    return result


def run_cql_generation(spec: dict, few_shot_block: str = "", metadata_block: str = "") -> dict:
    """Returns {"cql": ..., "explanation": ...}. Raises AgentError only
    for genuine failures (network/API error, or JSON with no "cql" key
    at all). Truncation and markdown-fence/parse issues degrade
    gracefully -- returns the raw text as "cql" with an explanatory
    "explanation" rather than raising, so a partially-generated query
    isn't thrown away. This does NOT use tool_choice (unlike spec
    review), so truncation is a real, expected risk here -- this
    function's whole contract is built around handling that gracefully,
    not around never encountering it."""
    client = _get_client()
    try:
        # See run_spec_review's comment on why this is messages.stream() +
        # get_final_message() rather than messages.create() -- this call in
        # particular is the one that actually hit the real "streaming is
        # required" error, at max_tokens=24000.
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=24000,  # bumped from 8000 -- confirmed via docs Sonnet 5 supports up to
            # 128k output tokens, and adaptive thinking (on by default) shares this same budget
            # with the actual response. A genuinely complex spec (many branching conditions,
            # like ACDC001_JR_STD) can need real thinking before writing CQL, which was eating
            # into a budget sized only for the output text itself -- this is what a real
            # "response was cut off" report traced back to, not the CQL text being too long on
            # its own.
            system=CQL_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": build_generation_user_prompt(spec, few_shot_block, metadata_block)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    import json
    import re

    raw_text = "".join(block.text for block in response.content if block.type == "text")
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", raw_text)
    json_text = (fence_match.group(1) if fence_match else raw_text).strip()

    try:
        parsed = json.loads(json_text, strict=False)
    except json.JSONDecodeError:
        if response.stop_reason == "max_tokens":
            explanation = (
                "Response was cut off before finishing (ran out of tokens). Raw partial "
                "output shown below -- if this keeps happening, the spec may need an "
                "even higher max_tokens."
            )
        else:
            explanation = "Model did not return structured JSON; raw output shown as-is."
        return {"cql": raw_text, "explanation": explanation}

    if "cql" not in parsed:
        raise AgentError("Response JSON is missing the 'cql' key.")
    return parsed
