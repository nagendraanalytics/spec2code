"""
tsql_agents.py -- Tier 5 T-SQL generation (Microsoft SQL Server dialect) for SQL objects such as the ones
used on the eClinical Elluminate platform. UNVERIFIED BETA TIER.

What is solid here: the T-SQL dialect rules (functions, NULL behaviour of concatenation, view and
inline-function restrictions, date handling). What is NOT known to this project: Elluminate's real schema,
object naming and deployment conventions. Those are never guessed silently: names come from the spec's
own dataset.column wording or the loaded study metadata, and anything else is reported as INFERRED.
Nothing here has been run against a real Elluminate environment.

One model call per listing (see cot_generation.py for the cost controls).
"""

import os
import re

import clinical_modules
import cot_generation

OBJECT_TYPES = ("view", "function", "procedure", "query")
DEFAULT_OBJECT_TYPE = "view"

COMPAT_MODES = ("conservative", "modern")
DEFAULT_COMPAT = "conservative"

_HEAD = """You are a clinical data programmer writing T-SQL (Microsoft SQL Server) for a clinical data report \
specification. The result is a SQL OBJECT for the eClinical Elluminate platform, so it must be a complete, \
deployable object of the requested type that runs in Elluminate's SQL editor without edits.

UNVERIFIED SCHEMA WARNING: nothing here knows Elluminate's real schema names, table names or object-naming \
rules. Every schema, table, column and object name you use must be flagged EXPLICIT (written in the spec, or \
listed in the study metadata block) or INFERRED (assumed). Never present an inferred name as certain.

NEVER WRITE ORACLE, ANSI OR POSTGRES SYNTAX. These fail in Elluminate and have already been reported as broken: \
the || operator, CURRENT_DATE, SYSDATE, NOW(), FROM DUAL, NVL, DECODE, TO_DATE, TO_CHAR, SUBSTR (use SUBSTRING), \
LENGTH (use LEN), INSTR (use CHARINDEX), LISTAGG, LIMIT, FETCH FIRST, ILIKE, the :: cast operator, boolean TRUE/FALSE.

NAMING
- When the spec writes a source as DATASET.DOMAIN.COLUMN or DOMAIN.COLUMN (for example SRDM.DM.ARM, \
SDTM.SUPPDM.QVAL), use those names literally as [schema].[table].[column] and mark them EXPLICIT. If a study \
metadata block is given, its form and item names win over any guess.
- If the spec gives no source for a column, use the standard CDISC-style column name and mark it INFERRED.
- Put the object's schema and name in ONE place at the top, on a line that starts with "-- NAME:" so a \
programmer can change it. Default schema [dbo]; default object name = the Report ID with non-alphanumeric \
characters replaced by underscores. Both are INFERRED unless the spec states them.
- Quote identifiers with [brackets]. Alias every table once more than one is in scope. No SELECT *.

OBJECT TYPE (the user prompt says which)
- view: CREATE OR ALTER VIEW [schema].[name] AS SELECT ... (a view cannot take parameters).
- function: CREATE OR ALTER FUNCTION [schema].[name](@StudyId varchar(50) = NULL) RETURNS TABLE AS RETURN \
(SELECT ...). An inline table-valued function is a single SELECT; filter by @StudyId on STUDYID when the table \
has it and the parameter is not NULL.
- procedure: CREATE OR ALTER PROCEDURE [schema].[name] @StudyId varchar(50) = NULL AS BEGIN SET NOCOUNT ON; \
SELECT ... END
- query: a plain SELECT with no wrapper.
"""

_CONSERVATIVE = """
COMPATIBILITY MODE: CONSERVATIVE. Write only syntax that works on SQL Server 2008 and later, because \
Elluminate has rejected newer syntax and date casts.
- Allowed functions: ISNULL, COALESCE, NULLIF, CASE, LEN, LEFT, RIGHT, SUBSTRING, CHARINDEX, REPLACE, LTRIM, \
RTRIM, UPPER, LOWER, CONVERT, CAST (never to DATE from text, see DATES), DATEDIFF, DATEADD, GETDATE, ISDATE, \
ROW_NUMBER() OVER, STUFF, FOR XML PATH, COUNT, MIN, MAX, SUM, EXISTS. Do NOT use TRIM, STRING_AGG, CONCAT, \
CONCAT_WS, TRY_CONVERT, TRY_CAST, FORMAT, IIF, the DATE or DATETIME2 types, or OFFSET/FETCH.
- STRINGS: join text with the + operator and wrap every nullable part in ISNULL(x, '') so one NULL does not \
blank the whole string. Build a comma list of several optional parts like \
STUFF(CASE WHEN a = 'Yes' THEN ', Death' ELSE '' END + CASE WHEN b = 'Yes' THEN ', Hospitalization' ELSE '' END, 1, 2, '') \
(STUFF returns NULL when the list is empty, which is the "blank" the spec usually wants). For a list across rows \
use STUFF((SELECT ', ' + x FROM ... FOR XML PATH('')), 1, 2, '').
- CURRENT DATE: use GETDATE() (a datetime). Never CURRENT_DATE, SYSDATE, NOW() or SYSDATETIME().
- DATES: --DTC columns are ISO 8601 text and may be partial (2024, 2024-05) or invalid. NEVER write CAST(x AS \
DATE), CAST/CONVERT of raw text to datetime, or TRY_CONVERT: one bad value stops the whole query. Parse every \
date through this guarded pattern, defined ONCE per column in an OUTER APPLY and then reused:
    OUTER APPLY (SELECT CASE WHEN LEN(ae.AESTDTC) >= 10 AND ISDATE(REPLACE(LEFT(ae.AESTDTC, 10), '-', '')) = 1 \
THEN CONVERT(datetime, REPLACE(LEFT(ae.AESTDTC, 10), '-', ''), 112) END AS StartDt) sd
  (the yyyymmdd form with style 112 does not depend on the server's language or DATEFORMAT). Partial dates give \
NULL; say so. Day difference: DATEDIFF(day, sd.StartDt, ed.EndDt); against today: DATEDIFF(day, sd.StartDt, \
GETDATE()). To SHOW a date, output LEFT(col, 10) as text with no conversion.
- ORDER BY: do NOT write ORDER BY in a view, function or query object (Elluminate rejects it). Instead write \
one comment line "-- SORT BY: <the spec's sort keys>" at the end and make sure the sort columns are in the \
output. A procedure may use ORDER BY. Never TOP 100 PERCENT.
"""

_MODERN = """
COMPATIBILITY MODE: MODERN (SQL Server 2017 features; no 2019/2022-only functions such as DATETRUNC, GREATEST, LEAST).
- STRINGS: still use the + operator with ISNULL(x, ''), or CONCAT()/CONCAT_WS() which treat NULL as empty. \
STRING_AGG(x, ', ') WITHIN GROUP (ORDER BY ...) and TRIM() are available. Never ||.
- CURRENT DATE: CAST(GETDATE() AS date) or GETDATE(); never CURRENT_DATE, SYSDATE, NOW().
- DATES: --DTC columns may be partial. Parse with TRY_CONVERT(date, LEFT(col, 10)) only when LEN(col) >= 10 \
(partial values give NULL; say so). Day difference: DATEDIFF(day, start, end). Show a date as LEFT(col, 10).
- ORDER BY: a view or inline function may only use ORDER BY with TOP or OFFSET 0 ROWS, and the order is only \
guaranteed when the caller sorts too (add a comment saying so). A procedure or query may use ORDER BY directly.
"""

_TAIL = """
T-SQL RULES (both modes)
- No boolean type: use CASE. Use <> for not-equal. LEN ignores trailing spaces. Integer division truncates: \
CAST one side to decimal. Compare numbers stored as text only after an explicit CAST to int or decimal.
- Comparisons on coded values follow the spec's wording; the default collation is case-insensitive, but if you \
wrap one comparison in UPPER() wrap all of them.
- NULLs: use IS NULL / IS NOT NULL; NOT IN returns no match when the list or column contains NULL. State how NULL \
is handled wherever a filter or CASE touches a nullable column. Do not COALESCE a value into existence unless \
the spec gives a default.

GROUNDING AND JOINS
- Implement every requirement the spec states; do not add requirements it does not state. If the spec is \
ambiguous, say which reading you took.
- Join on USUBJID, add STUDYID to the join when more than one study could be present. LEFT JOIN supplementary \
tables; INNER JOIN only when the spec's logic requires the record to exist in both. Guard against fan-out when \
the spec implies one row per subject.
- Several scenarios that need separate branches: UNION ALL unless the spec asks for de-duplication.

Use the submit_tsql tool. The explanation MUST state (1) which names were EXPLICIT and which INFERRED, \
(2) each ambiguity you resolved and how, (3) the object type, compatibility mode and the -- NAME: line, and \
(4) that this is an UNVERIFIED generation never run against a real Elluminate environment and must be \
reviewed by a programmer."""


def normalize_compat(v) -> str:
    v = str(v or "").strip().lower()
    return v if v in COMPAT_MODES else DEFAULT_COMPAT


def build_system_prompt(compat: str = DEFAULT_COMPAT) -> str:
    mode = _MODERN if normalize_compat(compat) == "modern" else _CONSERVATIVE
    return _HEAD + mode + _TAIL + cot_generation.COT_PROCEDURE


TSQL_SYSTEM_PROMPT = build_system_prompt(DEFAULT_COMPAT)

TSQL_TOOL = cot_generation.build_tool(
    "submit_tsql", "tsql", "Complete T-SQL object (CREATE OR ALTER ...) or query, as requested", "T-SQL object"
)


class AgentError(Exception):
    pass


def normalize_object_type(v) -> str:
    v = str(v or "").strip().lower()
    return v if v in OBJECT_TYPES else DEFAULT_OBJECT_TYPE


def build_tsql_user_prompt(spec: dict) -> str:
    return f"""REPORT SPEC
Report ID: {spec.get('reportId', '')}
Object type requested: {normalize_object_type(spec.get('objectType'))}
Compatibility mode: {normalize_compat(spec.get('tsqlCompat'))}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

{clinical_modules.prompt_block(spec)}{spec.get('_context_block', '')}
Write the T-SQL object for this report spec now."""


_STRING = re.compile(r"'(?:[^']|'')*'")
_LINE_COMMENT = re.compile(r"--[^\n]*")
_BLOCK_COMMENT = re.compile(r"/\*.*?\*/", re.S)
_OVER = re.compile(r"\bOVER\s*\([^()]*(?:\([^()]*\)[^()]*)*\)", re.I)


def _bare(code: str) -> str:
    """Code with comments, string literals and window specifications removed, for the lint below."""
    code = _BLOCK_COMMENT.sub(" ", code or "")
    code = _STRING.sub("''", code)
    code = _LINE_COMMENT.sub(" ", code)
    return _OVER.sub("OVER()", code)


_ALWAYS = [
    (r"\|\|", "uses || (not valid in T-SQL); join text with + and wrap nullable parts in ISNULL(x, '')"),
    (r"\bCURRENT_DATE\b", "uses CURRENT_DATE (not valid in T-SQL); use GETDATE()"),
    (r"\bSYSDATE\b", "uses SYSDATE (Oracle); use GETDATE()"),
    (r"\bNOW\s*\(", "uses NOW() (not valid in T-SQL); use GETDATE()"),
    (r"\bFROM\s+DUAL\b", "uses FROM DUAL (Oracle); a SELECT needs no FROM"),
    (r"\b(?:NVL|DECODE|TO_DATE|TO_CHAR|LISTAGG|ILIKE)\s*\(?", "uses an Oracle or Postgres function (NVL, DECODE, TO_DATE, TO_CHAR, LISTAGG, ILIKE); use ISNULL, CASE, CONVERT, STUFF"),
    (r"\bSUBSTR\s*\(", "uses SUBSTR( (not in T-SQL); use SUBSTRING("),
    (r"\bLENGTH\s*\(", "uses LENGTH( (not in T-SQL); use LEN("),
    (r"\bINSTR\s*\(", "uses INSTR( (not in T-SQL); use CHARINDEX("),
    (r"\bLIMIT\s+\d", "uses LIMIT (not in T-SQL); use TOP"),
    (r"\bFETCH\s+FIRST\b", "uses FETCH FIRST (not in T-SQL); use TOP"),
    (r"::\s*[A-Za-z]", "uses the :: cast operator (Postgres); use CAST or CONVERT"),
]
_CONSERVATIVE_ONLY = [
    (r"\bAS\s+DATE\s*\)", "casts to DATE; use the guarded ISDATE + CONVERT(datetime, ..., 112) pattern"),
    (r"\bCONVERT\s*\(\s*DATE\b", "converts to DATE; use the guarded ISDATE + CONVERT(datetime, ..., 112) pattern"),
    (r"\bTRY_(?:CONVERT|CAST)\s*\(", "uses TRY_CONVERT / TRY_CAST; use the guarded ISDATE + CONVERT(datetime, ..., 112) pattern"),
    (r"\b(?:STRING_AGG|CONCAT_WS|TRIM|FORMAT|IIF)\s*\(", "uses a function newer than SQL Server 2008 (STRING_AGG, CONCAT_WS, TRIM, FORMAT, IIF); use STUFF/FOR XML PATH, + with ISNULL, LTRIM(RTRIM())"),
    (r"\bCONCAT\s*\(", "uses CONCAT( (SQL Server 2012+); join with + and ISNULL"),
    (r"\bOFFSET\s+\d+\s+ROWS\b", "uses OFFSET ... ROWS (SQL Server 2012+)"),
    (r"\bDATETIME2\b", "uses DATETIME2 (SQL Server 2008+ only newer type); use datetime"),
]


def lint(code: str, object_type: str = DEFAULT_OBJECT_TYPE, compat: str = DEFAULT_COMPAT) -> list:
    """Free check (no model call) for the T-SQL that Elluminate has rejected. Returns gap messages."""
    bare = _bare(code)
    gaps = []
    rules = list(_ALWAYS)
    conservative = normalize_compat(compat) == "conservative"
    if conservative:
        rules += _CONSERVATIVE_ONLY
    for pat, msg in rules:
        if re.search(pat, bare, flags=re.I):
            gaps.append(f"T-SQL check: the code {msg}.")
    if conservative and normalize_object_type(object_type) != "procedure" and re.search(r"\bORDER\s+BY\b", bare, flags=re.I):
        gaps.append("T-SQL check: the code has ORDER BY in a view, function or query, which Elluminate rejects; "
                    "remove it and write a '-- SORT BY:' comment instead.")
    return gaps


def run_tsql_generation(spec: dict) -> dict:
    """Returns {"tsql": ..., "explanation": ..., plus the reasoning fields}. UNVERIFIED BETA -- callers must
    already have passed generation_router.py's allow_unverified gate."""
    compat = normalize_compat(spec.get("tsqlCompat"))
    otype = normalize_object_type(spec.get("objectType"))
    return cot_generation.generate(
        spec, build_system_prompt(compat), build_tsql_user_prompt(spec), TSQL_TOOL, "tsql", AgentError,
        lint=lambda code: lint(code, otype, compat),
    )
