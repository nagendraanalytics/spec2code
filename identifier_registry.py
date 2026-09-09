"""
Identifier registry: persists known proprietary terms per study, so
`identifiers` dicts for masking.mask_spec() no longer need to be built
by hand for every run.

Registering a term is still a deliberate human action (register_identifier),
by design — auto-detection (see candidate_detection.py) only ever *suggests*
candidates for a human to confirm into this registry.
"""

from typing import Dict
from uuid import UUID

from .db import get_connection


def get_identifiers_for_study(study_key: str) -> Dict[str, str]:
    """Returns {real_term: placeholder} for use directly with mask_spec()."""
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT term, placeholder FROM spec2code_audit.identifier_registry
                WHERE study_key = %s
                """,
                (study_key,),
            )
            return {row["term"]: row["placeholder"] for row in cur.fetchall()}


def register_identifier(
    study_key: str, term: str, placeholder: str, term_type: str, added_by: str
) -> UUID:
    """
    Deliberately add a new term to the registry. Call this after a human
    has confirmed a candidate (from candidate_detection.py) or when
    onboarding a new study's identifiers manually.
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.identifier_registry
                    (study_key, term, placeholder, term_type, added_by)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (study_key, term) DO UPDATE SET placeholder = EXCLUDED.placeholder
                RETURNING registry_id
                """,
                (study_key, term, placeholder, term_type, added_by),
            )
            return cur.fetchone()["registry_id"]


def next_placeholder(term_type: str, existing_count: int) -> str:
    """Simple deterministic placeholder generator, e.g. DRUG_X, STUDY_B."""
    prefixes = {
        "study_id": "STUDY",
        "compound_name": "DRUG",
        "protocol_id": "PROTOCOL",
        "sponsor_name": "SPONSOR",
        "site_id": "SITE",
        "other": "TERM",
    }
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    suffix = letters[existing_count] if existing_count < len(letters) else str(existing_count)
    return f"{prefixes.get(term_type, 'TERM')}_{suffix}"
