import hashlib
import json
from datetime import datetime
from typing import Optional
from uuid import UUID

from .db import get_connection


def hash_spec(masked_spec_text: str) -> str:
    return hashlib.sha256(masked_spec_text.encode("utf-8")).hexdigest()


def get_or_create_prompt_template(
    template_name: str, version: str, template_text: str, created_by: str
) -> UUID:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT template_id FROM spec2code_audit.prompt_templates
                WHERE template_name = %s AND version = %s
                """,
                (template_name, version),
            )
            row = cur.fetchone()
            if row:
                return row["template_id"]

            cur.execute(
                """
                INSERT INTO spec2code_audit.prompt_templates
                    (template_name, version, template_text, created_by)
                VALUES (%s, %s, %s, %s)
                RETURNING template_id
                """,
                (template_name, version, template_text, created_by),
            )
            return cur.fetchone()["template_id"]


def record_spec(
    masked_spec_text: str,
    domain: str,
    ingested_by: str,
    spec_version: Optional[str] = None,
) -> UUID:
    spec_hash = hash_spec(masked_spec_text)
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.specs
                    (spec_hash, spec_version, masked_spec_text, domain, ingested_by)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING spec_id
                """,
                (spec_hash, spec_version, masked_spec_text, domain, ingested_by),
            )
            return cur.fetchone()["spec_id"]


def record_token_map(spec_id: UUID, token_map: dict, created_by: str) -> UUID:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.token_maps (spec_id, token_map, created_by)
                VALUES (%s, %s, %s)
                RETURNING map_id
                """,
                (spec_id, json.dumps(token_map), created_by),
            )
            return cur.fetchone()["map_id"]



def record_run(
    spec_id: UUID,
    prompt_template_id: UUID,
    model_name: str,
    model_params: dict,
    pipeline_stage: str,
    generated_output: str,
    started_at: datetime,
    completed_at: datetime,
) -> UUID:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.runs
                    (spec_id, prompt_template_id, model_name, model_params,
                     pipeline_stage, generated_output, started_at, completed_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING run_id
                """,
                (
                    spec_id,
                    prompt_template_id,
                    model_name,
                    json.dumps(model_params),
                    pipeline_stage,
                    generated_output,
                    started_at,
                    completed_at,
                ),
            )
            return cur.fetchone()["run_id"]


def assign_review(
    run_id: UUID,
    assigned_to: str,
    assigned_role: str,
    assigned_by: str,
    due_at: Optional[datetime] = None,
) -> UUID:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.review_assignments
                    (run_id, assigned_to, assigned_role, assigned_by, due_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING assignment_id
                """,
                (run_id, assigned_to, assigned_role, assigned_by, due_at),
            )
            return cur.fetchone()["assignment_id"]


def record_review(
    run_id: UUID,
    reviewer: str,
    reviewer_role: str,
    review_status: str,
    comments: Optional[str] = None,
    final_code: Optional[str] = None,
    round_number: int = 1,
    checklist: Optional[list] = None,
    assignment_id: Optional[UUID] = None,
) -> UUID:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.reviews
                    (run_id, reviewer, reviewer_role, review_status,
                     comments, final_code, round_number)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING review_id
                """,
                (
                    run_id,
                    reviewer,
                    reviewer_role,
                    review_status,
                    comments,
                    final_code,
                    round_number,
                ),
            )
            review_id = cur.fetchone()["review_id"]

            for item in checklist or []:
                cur.execute(
                    """
                    INSERT INTO spec2code_audit.review_checklist_items
                        (review_id, checklist_item, category, passed, notes)
                    VALUES (%s, %s, %s, %s, %s)
                    """,
                    (
                        review_id,
                        item["checklist_item"],
                        item.get("category"),
                        item["passed"],
                        item.get("notes"),
                    ),
                )

            if assignment_id is not None:
                cur.execute(
                    """
                    UPDATE spec2code_audit.review_assignments
                    SET status = 'completed', completed_review_id = %s
                    WHERE assignment_id = %s
                    """,
                    (review_id, assignment_id),
                )

            return review_id


def is_run_deployable(run_id: UUID) -> bool:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT 1 FROM spec2code_audit.run_deployable WHERE run_id = %s",
                (run_id,),
            )
            return cur.fetchone() is not None


def get_final_code(run_id: UUID) -> Optional[str]:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT final_code FROM spec2code_audit.run_deployable WHERE run_id = %s",
                (run_id,),
            )
            row = cur.fetchone()
            return row["final_code"] if row else None


def record_known_limitation(
    description: str, category: str, affected_domain: str, added_by: str
) -> UUID:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO spec2code_audit.known_limitations
                    (description, category, affected_domain, added_by)
                VALUES (%s, %s, %s, %s)
                RETURNING limitation_id
                """,
                (description, category, affected_domain, added_by),
            )
            return cur.fetchone()["limitation_id"]

