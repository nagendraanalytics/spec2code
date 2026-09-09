from datetime import datetime, timezone
from typing import Callable, Dict, Optional
from uuid import UUID

from . import repository, identifier_registry
from .masking import mask_spec, validate_no_leakage
from .candidate_detection import detect_candidates, record_candidate_flags
from .config import PRODUCTION_MODEL


def run_stage_with_audit(
    raw_spec_text: str,
    domain: str,
    pipeline_stage: str,
    prompt_template_name: str,
    prompt_template_version: str,
    prompt_template_text: str,
    call_model_fn: Callable[[str], str],
    actor: str,
    study_key: Optional[str] = None,
    identifiers: Optional[Dict[str, str]] = None,
    run_candidate_detection: bool = True,
    spec_version: Optional[str] = None,
    spec_id: Optional[UUID] = None,
) -> UUID:
    resolved_identifiers: Dict[str, str] = {}
    if study_key:
        resolved_identifiers.update(identifier_registry.get_identifiers_for_study(study_key))
    if identifiers:
        resolved_identifiers.update(identifiers)

    masked_text, token_map = mask_spec(raw_spec_text, resolved_identifiers)
    leaked = validate_no_leakage(masked_text, resolved_identifiers)
    if leaked:
        raise ValueError(
            f"Masking failed to remove {len(leaked)} identifier(s) - "
            f"refusing to send to model. Leaked: {leaked}"
        )

    if spec_id is None:
        spec_id = repository.record_spec(
            masked_spec_text=masked_text,
            domain=domain,
            ingested_by=actor,
            spec_version=spec_version,
        )
        if token_map:
            repository.record_token_map(spec_id, token_map, created_by=actor)

        if run_candidate_detection:
            candidates = detect_candidates(
                raw_spec_text, known_terms=resolved_identifiers.keys()
            )
            record_candidate_flags(spec_id, candidates)

    template_id = repository.get_or_create_prompt_template(
        template_name=prompt_template_name,
        version=prompt_template_version,
        template_text=prompt_template_text,
        created_by=actor,
    )

    started_at = datetime.now(timezone.utc)
    generated_output = call_model_fn(masked_text)
    completed_at = datetime.now(timezone.utc)

    run_id = repository.record_run(
        spec_id=spec_id,
        prompt_template_id=template_id,
        model_name=PRODUCTION_MODEL.model_name,
        model_params={
            "temperature": PRODUCTION_MODEL.temperature,
            "max_tokens": PRODUCTION_MODEL.max_tokens,
        },
        pipeline_stage=pipeline_stage,
        generated_output=generated_output,
        started_at=started_at,
        completed_at=completed_at,
    )

    return run_id


def request_programmer_review(
    run_id: UUID, assigned_to: str, assigned_by: str, due_at: Optional[datetime] = None
) -> UUID:
    return repository.assign_review(
        run_id=run_id,
        assigned_to=assigned_to,
        assigned_role="programmer",
        assigned_by=assigned_by,
        due_at=due_at,
    )


DEFAULT_CHECKLIST = [
    {"checklist_item": "Derivation logic matches spec rule", "category": "logic_correctness"},
    {"checklist_item": "Output passes Pinnacle 21 / CDISC conformance checks", "category": "cdisc_conformance"},
    {"checklist_item": "No unmasked proprietary identifiers present", "category": "no_proprietary_leak"},
    {"checklist_item": "AST / static analysis clean", "category": "syntax_safety"},
    {"checklist_item": "Missing-data and edge cases handled", "category": "edge_case_handling"},
]


def submit_programmer_review(
    run_id: UUID,
    reviewer: str,
    approved: bool,
    final_code_masked: str,
    token_map: Dict[str, str],
    checklist_results: Dict[str, bool],
    comments: Optional[str] = None,
    assignment_id: Optional[UUID] = None,
) -> UUID:
    from .masking import unmask_code

    final_code = unmask_code(final_code_masked, token_map) if approved else None

    checklist = [
        {
            "checklist_item": item["checklist_item"],
            "category": item["category"],
            "passed": checklist_results.get(item["category"], False),
        }
        for item in DEFAULT_CHECKLIST
    ]

    return repository.record_review(
        run_id=run_id,
        reviewer=reviewer,
        reviewer_role="programmer",
        review_status="approved" if approved else "rejected",
        comments=comments,
        final_code=final_code,
        checklist=checklist,
        assignment_id=assignment_id,
    )