"""
guardrails.py — post-generation checks, run regardless of which tier
produced the CQL (Tier 1 rule or Tier 5 Claude).

Two tiers of check here now:
  - run_guardrails(): structural checks only -- balanced parens, no CTEs
    (the system prompt explicitly forbids them), no invented Subject/Site
    table joins (the system prompt explicitly says @HDR is implicit,
    never a joined table). These never needed live study data.
  - run_guardrails_with_metadata(): adds check_metadata_grounding(),
    which DOES verify a referenced Form actually exists -- but only
    against real study metadata a human loaded via
    POST /api/study-metadata (store.py's StudyMetadataItem), never a
    live connection to Veeva (this pipeline still has none). When no
    metadata has been loaded for a study, that check honestly reports
    "skipped, unverifiable" rather than silently passing or fabricating
    a verification it can't back up -- callers should not treat a skip
    the same as a pass.
"""

import re
from typing import Callable, TypedDict


class CheckResult(TypedDict):
    check: str
    passed: bool
    detail: str


def check_non_empty(cql: str) -> tuple:
    if not cql or not cql.strip():
        return False, "Generated CQL is empty."
    return True, ""


def check_no_cte(cql: str) -> tuple:
    if re.search(r"\bWITH\s+\w+\s+AS\s*\(", cql, re.IGNORECASE):
        return False, "CQL appears to use a CTE (WITH ... AS (...)), which the generation rules explicitly disallow -- should be a single statement using subqueries instead."
    return True, ""


# CQL does not support these standard-SQL-looking constructs -- a real,
# reported failure in the actual Vault CQL editor (CAST, CROSS JOIN,
# ROW_NUMBER/OVER/PARTITION BY, and regex functions all fail there even
# though they look natural to reach for). This is a mechanical safety
# net alongside the system-prompt instruction, same "defense in depth"
# reasoning as check_no_invented_at_context -- a prompt instruction
# doesn't always get followed, and this catches it by shape regardless.
def check_no_unsupported_sql_constructs(cql: str) -> tuple:
    checks = [
        (r"\bCROSS\s+JOIN\b", "CROSS JOIN"),
        (r"\bROW_NUMBER\s*\(", "ROW_NUMBER()"),
        (r"\bOVER\s*\(\s*PARTITION\s+BY\b", "OVER (PARTITION BY ...)"),
        (r"\bCAST\s*\(", "CAST(...)"),
        (r"\bREGEXP?_(EXTRACT|REPLACE|MATCH|LIKE)\s*\(", "a regex function"),
    ]
    found = [label for pattern, label in checks if re.search(pattern, cql, re.IGNORECASE)]
    if found:
        return False, (
            f"CQL uses unsupported construct(s) not available in the real Vault CQL editor: "
            f"{', '.join(found)}. See cql_agents.py's system prompt for the working substitute pattern."
        )
    return True, ""


def check_no_bare_subject_site_table(cql: str) -> tuple:
    m = re.search(r"\b(FROM|JOIN)\s+(Subject|Site)\b", cql, re.IGNORECASE)
    if m:
        return False, f"CQL references a raw '{m.group(2)}' table via {m.group(1)} -- Subject/Site fields should come from the implicit @HDR context, not a joined table."
    return True, ""


def check_balanced_parens(cql: str) -> tuple:
    opens, closes = cql.count("("), cql.count(")")
    if opens != closes:
        return False, f"Unbalanced parentheses: {opens} open vs {closes} close."
    return True, ""


def check_has_from(cql: str) -> tuple:
    if not re.search(r"\bFROM\b", cql, re.IGNORECASE):
        return False, "No FROM clause found -- CQL must reference at least one Form."
    return True, ""


# The @ prefix is reserved for exactly two real, confirmed context
# references -- @HDR (subject/site/event context) and @Form (the current
# Form's own status/name). Anything else is an invented context token --
# a real, observed mistake was `@Randomized` used as if randomization
# status were part of the header context, when it's actually clinical
# data that belongs on a real Form/Item like any other. This check is a
# mechanical safety net alongside the system-prompt instruction, not a
# replacement for it -- prompt instructions don't always get followed.
_ALLOWED_AT_TOKENS = {"@HDR", "@Form"}


def check_no_invented_at_context(cql: str) -> tuple:
    found = set(re.findall(r"@[A-Za-z_][A-Za-z0-9_]*", cql))
    invented = found - _ALLOWED_AT_TOKENS
    if invented:
        return False, (
            f"Invented @ context token(s) not recognized: {', '.join(sorted(invented))}. "
            f"The @ prefix is reserved for @HDR and @Form only -- any other data point "
            f"(e.g. randomization status) must come from a real Form/Item reference instead."
        )
    return True, ""


CHECKS: list = [
    ("non_empty", check_non_empty),
    ("has_from", check_has_from),
    ("no_cte", check_no_cte),
    ("no_bare_subject_site_table", check_no_bare_subject_site_table),
    ("balanced_parens", check_balanced_parens),
    ("no_invented_at_context", check_no_invented_at_context),
    ("no_unsupported_sql_constructs", check_no_unsupported_sql_constructs),
]


def run_guardrails(cql: str) -> dict:
    """Returns {"passed": bool, "checks": [CheckResult, ...]}. Runs every
    check even after one fails, so the caller sees the full picture
    rather than stopping at the first problem."""
    cql = cql or ""
    checks: list = []
    all_passed = True
    for name, fn in CHECKS:
        passed, detail = fn(cql)
        checks.append({"check": name, "passed": passed, "detail": detail})
        if not passed:
            all_passed = False
    return {"passed": all_passed, "checks": checks}


def check_metadata_grounding(cql: str, metadata_lookup: dict) -> tuple:
    """The check the module docstring above says this file COULDN'T do
    without a live Veeva connection: verify referenced Forms and Items
    actually exist, using real loaded study metadata as the source of
    truth instead of a live connection. Only meaningful when
    metadata_lookup is non-empty -- callers should skip this check
    entirely for a study with no metadata loaded (that's the normal
    case today, not a failure)."""
    if not metadata_lookup:
        return True, "no study metadata loaded -- skipped (not a failure, just unverifiable)"

    known_forms = set(metadata_lookup.keys())
    issues = []

    # Form references: FROM <Form> or JOIN <Form>
    for m in re.finditer(r"\b(?:FROM|JOIN)\s+([A-Za-z_][A-Za-z0-9_]*)\b", cql):
        form = m.group(1)
        if form.upper() in ("SUBJECT", "SITE"):
            continue  # already covered by check_no_bare_subject_site_table
        if form not in known_forms:
            issues.append(f"Form '{form}' not found in loaded study metadata")

    # Item references: <alias>.<FORM_ITEM_STYLE_TOKEN> is too ambiguous to check
    # reliably (alias could be anything) -- this check is intentionally scoped
    # to Form names only, which are unambiguous keywords right after FROM/JOIN.
    # Item-level checking would need real alias resolution to avoid false
    # positives, which is a larger, separate piece of work.

    if issues:
        return False, "; ".join(sorted(set(issues)))
    return True, "all referenced Forms found in loaded study metadata"


def run_guardrails_with_metadata(cql: str, metadata_lookup: dict = None) -> dict:
    """Same as run_guardrails(), plus the metadata-grounding check when
    metadata_lookup is provided. A separate function, not a parameter
    silently defaulting run_guardrails() itself, so every existing
    caller's behavior is unchanged unless they explicitly opt in."""
    result = run_guardrails(cql)
    passed, detail = check_metadata_grounding(cql, metadata_lookup or {})
    result["checks"].append({"check": "metadata_grounding", "passed": passed, "detail": detail})
    if not passed:
        result["passed"] = False
    return result
