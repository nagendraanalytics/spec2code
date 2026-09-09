"""
Heuristic detection of terms in a raw spec that MIGHT be proprietary
identifiers not yet in the identifier_registry — e.g. a new study ID
format, a compound code that hasn't been registered yet.

This is advisory only. A false negative (missing a real identifier) is
the dangerous failure mode for masking, so detection here is intentionally
broad/noisy — it flags candidates into `identifier_candidate_flags` for a
human to confirm or dismiss, rather than ever masking automatically based
on a regex match alone.

Recommended flow:
    candidates = detect_candidates(raw_spec_text, known_terms=registry_terms)
    # -> persist candidates via record_candidate_flags()
    # -> human reviews identifier_candidate_flags table, confirms real ones
    # -> confirmed ones get added via identifier_registry.register_identifier()
"""

import re
from typing import Iterable, List, Tuple
from uuid import UUID

from .db import get_connection

# Heuristic patterns — tuned for typical clinical-trial identifier shapes.
# Adjust/extend these based on your sponsors' actual naming conventions.
PATTERNS = [
    ("study_id_like", re.compile(r"\b[A-Z]{2,6}-\d{2,6}(?:-[A-Z0-9]+)?\b")),      # e.g. ACME-401, ACME-401-EXT
    ("protocol_id_like", re.compile(r"\b(?:Protocol|PROTOCOL)\s*[:#]?\s*[A-Z0-9\-]{4,}\b")),
    ("compound_code_like", re.compile(r"\b[A-Z]{2,4}-\d{3,6}\b")),                # e.g. AB-1234
    ("all_caps_multiword", re.compile(r"\b[A-Z][a-zA-Z]{3,}(?:[A-Z][a-zA-Z]{3,})+\b")),  # CamelCase compound-ish names
]


def detect_candidates(
    raw_spec_text: str, known_terms: Iterable[str] = ()
) -> List[Tuple[str, str]]:
    """
    Returns list of (candidate_text, detection_reason) for terms matching
    heuristic patterns and NOT already in known_terms (i.e. already
    registered). Deduplicated.
    """
    known = set(known_terms)
    seen = set()
    results: List[Tuple[str, str]] = []

    for reason, pattern in PATTERNS:
        for match in pattern.finditer(raw_spec_text):
            candidate = match.group(0)
            if candidate in known or candidate in seen:
                continue
            seen.add(candidate)
            results.append((candidate, reason))

    return results


def record_candidate_flags(spec_id: UUID, candidates: List[Tuple[str, str]]) -> None:
    if not candidates:
        return
    with get_connection() as conn:
        with conn.cursor() as cur:
            for candidate_text, reason in candidates:
                cur.execute(
                    """
                    INSERT INTO spec2code_audit.identifier_candidate_flags
                        (spec_id, candidate_text, detection_reason)
                    VALUES (%s, %s, %s)
                    """,
                    (spec_id, candidate_text, reason),
                )


def review_candidate_flag(
    flag_id: UUID, status: str, reviewed_by: str
) -> None:
    """status: 'confirmed' or 'dismissed'."""
    if status not in ("confirmed", "dismissed"):
        raise ValueError("status must be 'confirmed' or 'dismissed'")
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE spec2code_audit.identifier_candidate_flags
                SET status = %s, reviewed_by = %s, reviewed_at = now()
                WHERE flag_id = %s
                """,
                (status, reviewed_by, flag_id),
            )
