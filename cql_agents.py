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

# ---------------------------------------------------------------------
# CONFIRMED PRODUCTION PATTERNS
#
# A structured, appendable library of business-logic patterns verified
# against REAL, confirmed-working legacy code -- not freeform prose
# hand-edited into the system prompt every time something new is found.
# This exists because that approach doesn't scale: every future
# migration will surface more patterns like these, and each one needs a
# clear, auditable home with its own provenance, not a paragraph buried
# in a growing wall of text. To add a new confirmed pattern: append one
# entry here. Nothing else needs to change -- format_confirmed_patterns()
# renders the whole list into the prompt automatically.
#
# Each entry's "confidence" reflects how many INDEPENDENT real sources
# confirmed it -- a single example is a hypothesis, not a pattern; the
# entries below all cleared that bar (see "provenance").
# ---------------------------------------------------------------------

CONFIRMED_PATTERNS = [
    {
        "topic": "Randomized Only filtering",
        "pattern": (
            "A \"Randomized Only\" prompt/filter (report-level parameter restricting to "
            "randomized subjects) is implemented as a check on the Subject Number string "
            "itself containing a double dash: Subject.Name LIKE '%--%' (or NOT LIKE, to "
            "exclude non-randomized subjects). Randomized subjects' IDs contain \"--\" as "
            "part of their real ID format. Use this when a spec's Prompts field mentions "
            "\"Randomized Only\" as an option."
        ),
        "provenance": "Confirmed independently in 3 separate real SAS programs (ONC_LSN_012, ONC_ODB_010, ONC_OEFU_001), each with an explicit /*Randomized Only*/ comment on the same instr(subjectnumberstr,'--')>0 check.",
    },
    {
        "topic": "Deleted records + erroneous visits, paired exclusion",
        "pattern": (
            "\"Deleted records\" and \"erroneous visits\" are very commonly excluded TOGETHER "
            "as a pair, not independently -- when a spec mentions one, check whether it also "
            "implies the other. A real, confirmed Item for erroneous-visit flagging is a "
            "Boolean item labeled \"Erroneous Visit\" on a visit-level Form (e.g. DOVFM). "
            "Infer a similarly-named item on the relevant Form when no real metadata is "
            "loaded, and flag it as inferred."
        ),
        "provenance": "The pairing appears in 5 of 10 real specs sampled (ONC_LSN_003, ONC_LSN_012, ONC_ODB_002, ONC_ODB_010, ONC_OEFU_001), each phrased differently but stating the same rule. The Erroneous Visit item name is confirmed from a real 66-Form study metadata export (DOVFM.DOVSERRORVIT).",
    },
    {
        "topic": "UNK (partial) date imputation -- deliberately NOT a single rule",
        "pattern": (
            "CDISC dates ending in DTC may have an UNK (unknown) day or month component "
            "(e.g. \"2020-09-UNK\"). This requires an EXPLICIT imputation decision. Real "
            "production reports use BOTH conventions depending on context: some impute UNK "
            "to the FIRST of the period (day -> 01, month -> January), others to the LAST "
            "(day -> last day of that month, month -> December). Neither is universally "
            "correct -- it depends on whether the date is a lower or upper bound in a range "
            "comparison. If the spec doesn't state which convention to use, pick one, state "
            "the choice and reasoning explicitly in the explanation, and flag it as an "
            "assumption -- never silently assume one direction is standard."
        ),
        "provenance": "ONC_LSN_003 imputes to the LAST of the period (explicit comment). ONC_ODB_002's actual code (tranwrd(...,'UNK','01')) imputes to the FIRST. Two independent real examples showing genuinely different conventions -- this entry exists specifically to prevent a false single rule from being written from only one of them.",
    },
    {
        "topic": "Explicit zero-result handling",
        "pattern": (
            "Real production reports commonly handle the ZERO-RESULT case explicitly "
            "(checking a row count and, when zero, noting no matching records were found) "
            "rather than silently returning an empty table. Mention this in the explanation "
            "if the spec's Report Scenarios implies a \"no results\" case should be handled "
            "distinctly."
        ),
        "provenance": "The %obscnt row-count-check pattern (checking &nobs=0) appears in all 10 real SAS programs sampled, each followed by explicit zero-result handling.",
    },
]


def format_confirmed_patterns() -> str:
    lines = ["CONFIRMED PRODUCTION PATTERNS (verified against real, confirmed-working legacy code -- apply these when the spec's content matches what they describe):\n"]
    for p in CONFIRMED_PATTERNS:
        lines.append(f"- {p['topic']}: {p['pattern']} [Provenance: {p['provenance']}]")
    return "\n".join(lines)


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
- The @ prefix is RESERVED for the two real context references confirmed \
above -- @HDR (subject/site/event context) and @Form (the current Form's \
own status/name). Never invent a new @something token for any other data \
point. For example, a subject's randomization status is clinical data \
like any other -- it lives on a real Form/Item (e.g. a randomization \
Form's own item), NOT an invented `` `@Randomized` `` or similar context \
reference. If the spec needs a value like this and you don't know the \
real Form/Item name for it, infer a plausible one the same way you would \
for any other Item and flag it as an assumption -- don't invent a new @ \
context token to sidestep naming it.
- Report-level runtime parameters (a value the report prompts the user for \
when it runs, e.g. a "timeframe" the spec says the user must choose) are \
referenced as @ParamName -- a single @ prefix directly on the parameter \
name, no braces, no quotes of any kind around it. Use this when the spec \
explicitly states a value must be user-supplied at runtime (e.g. "the \
timeframe parameter must be chosen to continue to run the report") -- \
don't hardcode a literal number in that case, and don't invent a \
parameter the spec didn't ask for.
- The ONLY confirmed @-prefixed system tokens are @HDR, @Form (and its \
`.Status`/`.Name` properties above), and @ParamName for a spec-declared \
runtime parameter. `` @RandomizedOnly `` is CONFIRMED NOT to work -- do \
not use it. More generally: do not invent another plausible-sounding \
@-prefixed token (a "just filters to X automatically" shortcut) for \
anything not listed above, even if it would be convenient and even if it \
matches the naming style of the confirmed ones. If a spec needs to \
filter to a specific subject population (e.g. randomized subjects only), \
that must be done via a real Item on a real Form (e.g. a Randomization \
Status/Date item), grounded in the spec's Form.Item Names field or a \
provided study-metadata block -- there is no built-in system-level \
shortcut for population filtering beyond what's confirmed above.
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
- To RECONCILE/COMBINE data across two Forms (not just check whether a \
related record exists, but actually pull fields from both into one row), \
build each Form's own derived table independently -- its own FROM, its \
own `` `@Form`.`Status` `` filter, its own WHERE conditions and computed \
columns -- then INNER JOIN the two derived tables on `@HDR`.`Subject`.`ID` (add \
`@HDR`.`Studyid` to the join key too if more than one study's data could \
be in scope). Wrap that join in an outer SELECT that applies \
the report's final display aliases. This is a different shape from the \
NOT EXISTS pattern above -- use it when the spec needs values from BOTH \
Forms side by side, not just a presence/absence check.
- RAWDATE(Item) and DATE_FORMAT(Item, format) are often used TOGETHER on \
the SAME source item, as two separate working columns: a raw version \
(e.g. EventDateRaw) for date comparisons/logic in a WHERE clause, and a \
formatted version (e.g. EventDate) for the value actually shown in the \
report. Don't assume you need only one or the other -- a report that both \
compares dates AND displays them typically wants both computed from the \
same source item.
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
- See the CONFIRMED PRODUCTION PATTERNS block below for additional \
patterns verified against real, confirmed-working legacy code -- apply \
them when the spec's content matches what they describe.
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
including spaces, slashes, commas, and punctuation (e.g. \
`` AS `Site Number` ``, `` AS `AE/VAE 1 Seq` ``, or even a full-sentence \
heading like `` AS `Was the Discontinued Status ... Associated With \
COVID-19?` `` if that's the literal heading text). INNER/working-only \
aliases, inside a derived subquery and never shown to the user, use \
plain names with no backticks -- underscore-style (AE_SEQ, \
Subject_Number) and PascalCase (CauseOfDeath, DeathDateRaw) are both \
real, valid conventions seen in production queries; what matters is \
picking ONE style and using it CONSISTENTLY within a single query, not \
which specific style. Never use double quotes for either alias style, \
and never wrap a column NAME/alias in single quotes -- single quotes are \
for STRING VALUES only (e.g. 'LLT', 'submitted__v'), never for an \
identifier.
- When an outer/main query references a column that a subquery/derived \
table already defined (via AS), the reference in the outer query MUST \
use the EXACT same spelling and letter case the subquery used -- CQL \
identifier matching can be case-sensitive, and a mismatched case (e.g. \
subquery defines "AE_SEQ", outer query writes "ae_seq" or "Ae_Seq") is a \
real, common cause of a column silently not resolving. If the subquery's \
column was backtick-quoted, reference it backtick-quoted in the outer \
query too, with the identical text inside the backticks -- don't re-wrap \
it in single quotes, don't retype it with different spacing/case, and \
don't shorten or rephrase it.

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
- CQL does NOT support several constructs that look like standard SQL but \
fail in the real editor -- never use them, regardless of how natural they \
seem for the logic:
  * ROW_NUMBER() / OVER (...) / PARTITION BY -- no window functions at \
all. For "find the first/last/earliest/latest record per subject" logic \
(exactly what these would normally be used for), use the SAME self-join \
pattern already verified working: join the Form to itself on the \
grouping key (e.g. Subject.ID) with a comparison on the ordering column \
(e.g. a1.AESEQ < a2.AESEQ, or a date comparison), combined with a \
correlated NOT EXISTS to exclude any row that isn't the extreme value in \
its group. This needs no new syntax -- it's the same shape as the \
verified AE/VAE self-join pattern, just with the comparison direction \
matching what "first" or "last" means for that field.
  * CROSS JOIN -- not supported. If the logic seems to call for combining \
every row of one set with every row of another, that's almost always a \
sign the actual need is a JOIN with a real correlating condition (on \
Subject.ID, or another shared key) or a NOT EXISTS/EXISTS check -- \
reconsider what the spec actually needs rather than reaching for a true \
cartesian product.
  * CAST -- not supported as a general SQL-style type conversion. Items \
carry their type from the Form's own Item definition; don't wrap a value \
in CAST(...) to change its type. If a spec's comparison seems to need an \
explicit conversion, flag this specifically as an assumption/gap in the \
explanation rather than emitting CAST syntax that will fail.
  * Regex functions (REGEXP_EXTRACT, REGEXP_REPLACE, or similar) -- not \
supported. Don't use them for string extraction/matching; flag the need \
for pattern-based string extraction as an assumption/gap in the \
explanation rather than emitting a function that will fail.
- The "cql" value must never be an empty string -- always return the full \
generated query, even if you had to make assumptions to produce it.
- Use the submit_cql tool. The explanation should be 2-4 sentences on the \
approach and any assumptions made about Form/Item names, since these \
can't be verified without the study's actual metadata -- recommend the \
user confirm via DESCRIBE FORM before running.

""" + format_confirmed_patterns()

CQL_TOOL = {
    "name": "submit_cql",
    "description": "Submit the generated CQL query and an explanation of the approach and any assumptions.",
    "input_schema": {
        "type": "object",
        "properties": {
            "cql": {"type": "string", "description": "The complete, single-statement CQL query -- never empty"},
            "explanation": {
                "type": "string",
                "description": "2-4 sentences on approach and any Form/Item name assumptions made",
            },
        },
        "required": ["cql", "explanation"],
    },
}

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


def build_generation_user_prompt(spec: dict, few_shot_block: str = "", metadata_block: str = "", learned_patterns_block: str = "", supporting_doc_block: str = "") -> str:
    metadata_section = f"\n{metadata_block}\n" if metadata_block else ""
    few_shot_section = f"\n{few_shot_block}\n" if few_shot_block else ""
    # Confirmed learned patterns (store.format_learned_patterns_block) --
    # real conventions discovered by cross-referencing a spec against
    # confirmed-working legacy code (spec_code_crossref_agent.py), for
    # THIS tenant, confirmed by a human. This is what makes patterns
    # discovered in one migration apply to every future generation for
    # this tenant without a source-code edit -- see that agent's module
    # docstring for the full reasoning.
    patterns_section = f"\n{learned_patterns_block}\n" if learned_patterns_block else ""
    # Per-spec supporting document (store.format_supporting_doc_block) --
    # more targeted than metadata_section's study-wide list: the exact
    # View/Column pairs THIS report actually touches, when a real
    # supporting doc has been uploaded for this spec. See
    # SpecSupportingDocItem's docstring in models_db.py.
    supporting_doc_section = f"\n{supporting_doc_block}\n" if supporting_doc_block else ""
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}
{metadata_section}{few_shot_section}{patterns_section}{supporting_doc_section}
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


def format_learned_patterns_block(patterns: list) -> str:
    """Formats confirmed learned patterns (store.list_learned_patterns
    with confirmed_only=True, converted via store.learned_pattern_to_dict)
    into the prompt block build_generation_user_prompt injects. Same
    shape/discipline as format_metadata_block: empty list -> empty
    string, so callers never need a separate empty check. See
    spec_code_crossref_agent.py's module docstring for why this exists
    -- this is the actual mechanism that makes a pattern discovered in
    one spec+code migration apply to every future generation for this
    tenant, without a source-code edit."""
    if not patterns:
        return ""
    lines = ["Learned patterns from prior spec+code migrations for this tenant (confirmed real conventions -- apply where relevant to this spec):"]
    for p in patterns:
        cat = f"[{p.get('category')}] " if p.get("category") else ""
        lines.append(f"- {cat}{p.get('pattern_text', '')}")
    return "\n".join(lines)


def format_supporting_doc_block(rows: list) -> str:
    """Formats a spec's per-spec supporting document (store.
    get_spec_supporting_doc, converted via store.spec_supporting_doc_to_dict)
    into the prompt block build_generation_user_prompt injects. Same
    empty-list -> empty-string discipline as format_metadata_block and
    format_learned_patterns_block.

    This is MORE targeted grounding than format_metadata_block's
    study-wide Form/Item list: it's the exact View/Column pairs THIS
    report actually touches, straight from a real supporting-doc export
    (see SpecSupportingDocItem's docstring in models_db.py). control_level
    is deliberately NOT included in this prompt block -- its meaning was
    never confirmed, and including an unexplained field in a grounding
    prompt risks the model treating it as meaningful when nothing here
    knows that it is."""
    if not rows:
        return ""
    lines = ["Real View/Column mapping for THIS report, from its supporting document (use ONLY these column names, not inferred ones):"]
    for r in rows:
        question = r.get("itemQuestion") or r.get("originalItemQuestion") or ""
        q_part = f" -- \"{question}\"" if question else ""
        lines.append(f"- {r.get('viewName', '')}.{r.get('columnName', '')}{q_part}")
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


def run_cql_generation(spec: dict, few_shot_block: str = "", metadata_block: str = "", learned_patterns_block: str = "", supporting_doc_block: str = "") -> dict:
    """Returns {"cql": ..., "explanation": ...}. Raises AgentError on
    genuine failure (network/API error, or a truncated/malformed tool
    call). Previously used plain-text JSON parsing instead of
    tool_choice -- the ONE agent in this project that didn't. That meant
    a truncated response fell back to showing the ENTIRE raw model
    output (JSON wrapper syntax included, e.g. a partial `{"cql": "SELECT...`
    string) as if it were the CQL itself -- not just incomplete, but not
    valid CQL syntax at all, which is what a real "formatting is broken"
    report traced back to. Switched to the same tool_choice pattern every
    other agent uses: block.input is already a properly-typed dict on
    success, and a truncated/malformed response now fails cleanly with a
    clear AgentError instead of leaking a JSON fragment as pseudo-CQL."""
    client = _get_client()
    try:
        # See run_spec_review's comment on why this is messages.stream() +
        # get_final_message() rather than messages.create().
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=32000,  # bumped from 24000 -- confirmed via docs Sonnet 5 supports up to
            # 128k output tokens, so there's still large headroom. Repeated real-world truncation
            # reports even at 24000 confirm at least some real specs need more than that; the
            # switch to tool_choice above also means a truncation now fails cleanly rather than
            # leaking a JSON fragment, so a higher budget is pure upside with no new downside.
            system=CQL_SYSTEM_PROMPT,
            tools=[CQL_TOOL],
            tool_choice={"type": "tool", "name": "submit_cql"},
            messages=[{"role": "user", "content": build_generation_user_prompt(spec, few_shot_block, metadata_block, learned_patterns_block, supporting_doc_block)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_cql":
            result = block.input
            if not isinstance(result, dict) or not result.get("cql"):
                raise AgentError("Model returned an empty or malformed CQL result.")
            return result

    if response.stop_reason == "max_tokens":
        raise AgentError(
            "Response was cut off before finishing (ran out of tokens) -- this spec may need "
            "an even higher token budget, or may be complex enough to need breaking into "
            "smaller pieces. Try again; if it keeps happening on this exact spec, that's a "
            "useful signal to report."
        )
    raise AgentError(f"Model did not return a structured CQL result (stop_reason={response.stop_reason}).")
