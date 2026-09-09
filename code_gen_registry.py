"""
code_gen_registry.py — the (edc_system, language) support matrix, and an
honest status for each cell. This exists so "what's actually built" is a
queryable fact, not something buried in comments across five files.

Status meanings:
  "verified"   — has a real precedent (human-confirmed correct output)
                 that a rule or generation prompt was checked against.
  "built"      — a generation prompt/rule exists and has been exercised,
                 but not against a human-confirmed-correct real example
                 for that exact spec.
  "unverified_beta" — a real, reasoned generation prompt exists (grounded
                 in genuine prior engineering, not a blind guess), but has
                 NEVER been checked against a human-confirmed-correct
                 output for this schema convention. Different from
                 "planned": there's actually something to run. Different
                 from "verified": nobody has confirmed it's right.
                 is_available() does NOT treat this as safe-by-default --
                 callers must explicitly opt in (see generation_router.py's
                 allow_unverified parameter) and the UI must show an
                 explicit warning before use, never silently enable it.
  "planned"    — designed for, not started. Nothing to run yet.
  "needs_precedent" — cannot be responsibly built yet. Writing a prompt
                 here would be inference from general knowledge with no
                 real example to check it against -- the thing this
                 whole project has been explicitly avoiding for CQL/SQL.
                 Needs at least one real (spec, correct-output) pair from
                 someone who knows the target system before this can
                 move to "built" or "unverified_beta".
"""

from typing import Optional, TypedDict


class MatrixCell(TypedDict):
    status: str  # verified | built | unverified_beta | planned | needs_precedent
    detail: str


# (edc_system, language) -> MatrixCell
MATRIX: dict = {
    ("veeva", "cql"): {
        "status": "verified",
        "detail": "rules_engine.py's ae_vae_overlap_self_join rule, byte-for-byte verified against precedents.jsonl:ABC002_JR",
    },
    ("veeva", "python"): {
        "status": "verified",
        "detail": "code_templates.py's ae_vae_overlap pandas rule, verified against synthetic AE data with known overlap/non-overlap/ongoing cases",
    },
    ("veeva", "sql"): {
        "status": "unverified_beta",
        "detail": (
            "sql_agents.py -- reuses the RM_<DOMAIN> relational-table SQL prompt developed and "
            "iteratively refined earlier in this project (grounding/join-safety/date-handling/"
            "null-handling/coded-terminology rules), NOT a fresh guess. But the underlying schema "
            "convention (RM_ table naming) has never been checked against a real, confirmed-correct "
            "query for these specific report specs -- opt-in required, see generation_router.py."
        ),
    },
    ("veeva", "sas"): {
        "status": "unverified_beta",
        "detail": (
            "sas_agents.py -- reuses the same grounding/join-safety/date-handling/null-handling/"
            "coded-terminology reasoning as the SQL beta tier, adapted to PROC SQL/DATA step syntax "
            "against the RM_<DOMAIN> convention. Never checked against a real, confirmed-correct "
            "program -- opt-in required, see generation_router.py."
        ),
    },
    ("veeva", "r"): {
        "status": "unverified_beta",
        "detail": (
            "r_agents.py -- reuses the same grounding/join-safety/date-handling/null-handling/"
            "coded-terminology reasoning as the SQL beta tier, adapted to dplyr syntax against the "
            "rm_<domain> convention. Never checked against a real, confirmed-correct script -- "
            "opt-in required, see generation_router.py."
        ),
    },

    ("rave", "cql"): {"status": "needs_precedent", "detail": "CQL is Veeva-specific; not applicable to Rave"},
    ("rave", "sql"): {"status": "needs_precedent", "detail": "no verified Rave query example exists in this project yet"},
    ("rave", "sas"): {"status": "needs_precedent", "detail": "no verified Rave query example exists in this project yet"},
    ("rave", "r"): {"status": "needs_precedent", "detail": "no verified Rave query example exists in this project yet"},
    ("rave", "python"): {"status": "needs_precedent", "detail": "no verified Rave query example exists in this project yet"},

    ("oracle_clinical_one", "cql"): {"status": "needs_precedent", "detail": "CQL is Veeva-specific; not applicable to Oracle Clinical One"},
    ("oracle_clinical_one", "sql"): {"status": "needs_precedent", "detail": "no verified Oracle Clinical One query example exists in this project yet"},
    ("oracle_clinical_one", "sas"): {"status": "needs_precedent", "detail": "no verified Oracle Clinical One query example exists in this project yet"},
    ("oracle_clinical_one", "r"): {"status": "needs_precedent", "detail": "no verified Oracle Clinical One query example exists in this project yet"},
    ("oracle_clinical_one", "python"): {"status": "needs_precedent", "detail": "no verified Oracle Clinical One query example exists in this project yet"},
}


def get_status(edc_system: str, language: str) -> MatrixCell:
    return MATRIX.get(
        (edc_system, language),
        {"status": "planned", "detail": f"({edc_system}, {language}) not yet designed"},
    )


def is_available(edc_system: str, language: str) -> bool:
    """Whether generation should even be attempted for this combination
    WITHOUT explicit opt-in. "needs_precedent" and "unverified_beta"
    combinations are both deliberately excluded from the safe default --
    the former has nothing real to run, the latter has something real
    but unconfirmed, and neither should be attempted silently."""
    return get_status(edc_system, language)["status"] in ("verified", "built")


def is_available_with_opt_in(edc_system: str, language: str) -> bool:
    """Whether generation is possible AT ALL for this combination if the
    caller explicitly acknowledges the unverified status. True for
    verified/built (opt-in irrelevant, already safe) AND unverified_beta.
    Still False for planned/needs_precedent -- opting in doesn't conjure
    a prompt that doesn't exist."""
    return get_status(edc_system, language)["status"] in ("verified", "built", "unverified_beta")
