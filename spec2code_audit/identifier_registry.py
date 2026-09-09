from typing import Dict
from uuid import UUID

from .db import get_connection


def get_identifiers_for_study(study_key: str) -> Dict[str, str]:
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