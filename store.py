"""
store.py — tenant-scoped data access. Every function takes tenant_id as
its first argument and filters by it in the query itself (.filter(Model.
tenant_id == tenant_id, ...)) -- never fetch-then-check-in-Python, since
that pattern is one refactor away from a real cross-tenant leak. A
lookup for a record that exists but belongs to a different tenant
returns None, the same as a record that doesn't exist at all -- callers
(main.py) should turn that into a 404, not distinguish "not found" from
"not yours to see."
"""

import json
from datetime import timedelta
from typing import Optional

from sqlalchemy.orm import Session
from sqlalchemy import Integer as SAInteger, func

from models_db import GenerationRun, LearnedPattern, ModelRegistryEntry, Precedent, RequestLog, Spec, SpecReview, SpecSupportingDocItem, StudyMetadataItem, TrainingCorpusEntry, _now


def create_spec(db: Session, tenant_id: str, spec: dict) -> Spec:
    row = Spec(
        tenant_id=tenant_id,
        report_id=spec.get("reportId", ""),
        description=spec.get("description", ""),
        column_heading=spec.get("columnHeading", ""),
        logic=spec.get("logic", ""),
        report_scenarios=spec.get("reportScenarios", ""),
        sorting=spec.get("sorting", ""),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def get_audit_history(db: Session, tenant_id: str, table_name: str, record_id: str) -> list:
    """Full chronological history of one record, from the trigger-populated
    audit_log table (see audit_trail.sql). Deliberately raw SQL, not an
    ORM model -- audit_log is intentionally NOT something app code writes
    to directly (see the SQL script's SECURITY DEFINER design); it has no
    SQLAlchemy model for the same reason app code should never construct
    an INSERT/UPDATE/DELETE against it. tenant_id is enforced here the
    same way every other tenant-scoped read is, even though the audit
    table itself doesn't have row-level security -- this is app-level
    tenant isolation on top of the same audit_log all tenants' triggers
    write into."""
    from sqlalchemy import text
    rows = db.execute(
        text(
            "SELECT id, action, old_data, new_data, changed_at, app_user "
            "FROM audit_log "
            "WHERE table_name = :table_name AND record_id = :record_id AND tenant_id = :tenant_id "
            "ORDER BY changed_at ASC"
        ),
        {"table_name": table_name, "record_id": record_id, "tenant_id": tenant_id},
    ).mappings().all()
    return [dict(r) for r in rows]


def get_spec(db: Session, tenant_id: str, spec_id: str) -> Optional[Spec]:
    return (
        db.query(Spec)
        .filter(Spec.id == spec_id, Spec.tenant_id == tenant_id)
        .first()
    )


def list_specs(db: Session, tenant_id: str, limit: int = 100) -> list:
    return (
        db.query(Spec)
        .filter(Spec.tenant_id == tenant_id)
        .order_by(Spec.created_at.desc())
        .limit(limit)
        .all()
    )


def save_review(db: Session, tenant_id: str, spec_id: str, review: dict) -> Optional[SpecReview]:
    """Returns None (does not write) if spec_id doesn't belong to
    tenant_id -- this is the check that actually enforces isolation for
    writes, not just reads."""
    spec = get_spec(db, tenant_id, spec_id)
    if spec is None:
        return None

    row = SpecReview(
        spec_id=spec_id,
        tenant_id=tenant_id,
        readiness=review.get("readiness", ""),
        insights_json=json.dumps(review.get("insights", [])),
        summary=review.get("summary", ""),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def save_generation_run(db: Session, tenant_id: str, spec_id: str, run: dict) -> Optional[GenerationRun]:
    """Returns None (does not write) if spec_id doesn't belong to tenant_id."""
    spec = get_spec(db, tenant_id, spec_id)
    if spec is None:
        return None

    row = GenerationRun(
        spec_id=spec_id,
        tenant_id=tenant_id,
        cql=run.get("cql"),
        explanation=run.get("explanation"),
        retrieved_precedents_json=json.dumps(run.get("retrieved_precedents", [])),
        cascade_trace_json=json.dumps(run.get("cascade_trace", [])),
        guardrail_reports_json=json.dumps(run.get("guardrail_reports", [])),
        status=run.get("status", "error"),
        error=run.get("error"),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def list_generation_runs(db: Session, tenant_id: str, spec_id: str) -> list:
    """Returns [] both when the spec doesn't exist and when it belongs to
    a different tenant -- same "don't distinguish not-found from
    not-yours" principle as get_spec."""
    spec = get_spec(db, tenant_id, spec_id)
    if spec is None:
        return []
    return (
        db.query(GenerationRun)
        .filter(GenerationRun.spec_id == spec_id, GenerationRun.tenant_id == tenant_id)
        .order_by(GenerationRun.created_at.desc())
        .all()
    )


def spec_to_dict(spec: Spec) -> dict:
    return {
        "id": spec.id,
        "reportId": spec.report_id,
        "description": spec.description,
        "columnHeading": spec.column_heading,
        "logic": spec.logic,
        "reportScenarios": spec.report_scenarios,
        "sorting": spec.sorting,
        "createdAt": spec.created_at.isoformat() if spec.created_at else None,
    }


def review_to_dict(review: SpecReview) -> dict:
    return {
        "id": review.id,
        "readiness": review.readiness,
        "insights": json.loads(review.insights_json or "[]"),
        "summary": review.summary,
        "createdAt": review.created_at.isoformat() if review.created_at else None,
    }


def run_to_dict(run: GenerationRun) -> dict:
    return {
        "id": run.id,
        "cql": run.cql,
        "explanation": run.explanation,
        "retrievedPrecedents": json.loads(run.retrieved_precedents_json or "[]"),
        "cascadeTrace": json.loads(run.cascade_trace_json or "[]"),
        "guardrailReports": json.loads(run.guardrail_reports_json or "[]"),
        "status": run.status,
        "error": run.error,
        "createdAt": run.created_at.isoformat() if run.created_at else None,
    }


def create_precedent(db: Session, tenant_id: str, precedent: dict) -> Precedent:
    row = Precedent(
        tenant_id=tenant_id,
        external_spec_id=precedent.get("spec_id", ""),
        description=precedent.get("description", ""),
        logic=precedent.get("logic", ""),
        report_scenarios=precedent.get("report_scenarios", ""),
        column_heading=precedent.get("column_heading", ""),
        cql=precedent.get("cql", ""),
        notes=precedent.get("notes", ""),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def list_precedents(db: Session, tenant_id: str) -> list:
    """Every precedent belonging to this tenant -- no cross-tenant
    leakage, same as every other list_* function in this module."""
    return (
        db.query(Precedent)
        .filter(Precedent.tenant_id == tenant_id)
        .order_by(Precedent.created_at.desc())
        .all()
    )


# ---------------------------------------------------------------------
# Training corpus -- confirmed-good (spec, outcome) pairs only. See
# TrainingCorpusEntry's docstring in models_db.py for why this is
# separate from GenerationRun and what "confirmation_source" guards
# against.
# ---------------------------------------------------------------------

def add_to_training_corpus(
    db: Session,
    tenant_id: str,
    spec_id: str,
    spec_features: dict,
    confirmation_source: str,
    generation_run_id: str = "",
    chosen_tier: str = "",
    outcome_label: str = "",
    guardrails_passed: bool = False,
    synthetic_validation_summary: dict | None = None,
) -> TrainingCorpusEntry:
    if confirmation_source not in ("precedent", "learned_pattern"):
        raise ValueError(f"confirmation_source must be 'precedent' or 'learned_pattern', got {confirmation_source!r}")
    entry = TrainingCorpusEntry(
        tenant_id=tenant_id,
        spec_id=spec_id,
        generation_run_id=generation_run_id,
        spec_features=spec_features,
        chosen_tier=chosen_tier,
        outcome_label=outcome_label,
        guardrails_passed=guardrails_passed,
        synthetic_validation_summary=synthetic_validation_summary or {},
        confirmation_source=confirmation_source,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def list_training_corpus(db: Session, tenant_id: str, limit: int = 500) -> list:
    return (
        db.query(TrainingCorpusEntry)
        .filter(TrainingCorpusEntry.tenant_id == tenant_id)
        .order_by(TrainingCorpusEntry.created_at.desc())
        .limit(limit)
        .all()
    )


def extract_spec_features(spec: dict) -> dict:
    """A small, defensible, non-clever feature extraction from a spec --
    exactly the kind of structured signal a Tier 3 classifier would
    train on. Deliberately simple: counts and flags, not embeddings or
    anything requiring a model call. This can grow later without
    changing the training_corpus schema, since spec_features is JSON."""
    logic = spec.get("logic", "") or ""
    description = spec.get("description", "") or ""
    return {
        "edc_system": spec.get("edcSystem", ""),
        "language": spec.get("language", ""),
        "description_length": len(description),
        "logic_length": len(logic),
        "has_report_scenarios": bool((spec.get("reportScenarios") or "").strip()),
        "has_sorting": bool((spec.get("sorting") or "").strip()),
        "mentions_deleted_records": "delet" in logic.lower(),
        "mentions_randomized": "random" in logic.lower(),
        "mentions_cross_domain": any(
            kw in logic.lower() for kw in ["reconcil", "cross-domain", "cross domain", "another form", "other form"]
        ),
    }


# ---------------------------------------------------------------------
# Model registry -- see ModelRegistryEntry's docstring in models_db.py.
# promote_model is the one function that needs to be transactional: only
# one row per model_name should be 'active' at a time, and demoting the
# previous active version must happen atomically with promoting the new
# one, not as two separate calls a caller could interleave incorrectly.
# ---------------------------------------------------------------------

def register_model(
    db: Session,
    tenant_id: str,
    model_name: str,
    metrics: dict,
    training_data_snapshot: dict,
    artifact_path: str = "",
    notes: str = "",
) -> ModelRegistryEntry:
    """Registers a new version -- always starts in 'shadow' status.
    Promotion to candidate/active is a separate, explicit, audited
    action (see promote_model), never automatic on registration --
    same discipline as every other "human confirms before it's trusted"
    step in this project."""
    latest = (
        db.query(ModelRegistryEntry)
        .filter(ModelRegistryEntry.tenant_id == tenant_id, ModelRegistryEntry.model_name == model_name)
        .order_by(ModelRegistryEntry.version.desc())
        .first()
    )
    next_version = (latest.version + 1) if latest else 1
    entry = ModelRegistryEntry(
        tenant_id=tenant_id,
        model_name=model_name,
        version=next_version,
        status="shadow",
        training_data_snapshot=training_data_snapshot,
        metrics=metrics,
        artifact_path=artifact_path,
        notes=notes,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def promote_model(db: Session, tenant_id: str, model_id: str, new_status: str) -> ModelRegistryEntry | None:
    """Returns None if the model doesn't exist or belongs to a different
    tenant -- callers should treat that as a 404. If promoting to
    'active', atomically retires any other currently-active version of
    the SAME model_name first, in the same transaction, so there is
    never a moment with two active versions or a gap with none."""
    if new_status not in ("shadow", "candidate", "active", "retired"):
        raise ValueError(f"Invalid status: {new_status!r}")

    row = (
        db.query(ModelRegistryEntry)
        .filter(ModelRegistryEntry.tenant_id == tenant_id, ModelRegistryEntry.id == model_id)
        .first()
    )
    if row is None:
        return None

    if new_status == "active":
        db.query(ModelRegistryEntry).filter(
            ModelRegistryEntry.tenant_id == tenant_id,
            ModelRegistryEntry.model_name == row.model_name,
            ModelRegistryEntry.status == "active",
            ModelRegistryEntry.id != row.id,
        ).update({"status": "retired"}, synchronize_session=False)

    row.status = new_status
    if new_status in ("active", "candidate"):
        row.promoted_at = _now()
    db.commit()
    db.refresh(row)
    return row


def list_models(db: Session, tenant_id: str, model_name: str | None = None) -> list:
    q = db.query(ModelRegistryEntry).filter(ModelRegistryEntry.tenant_id == tenant_id)
    if model_name:
        q = q.filter(ModelRegistryEntry.model_name == model_name)
    return q.order_by(ModelRegistryEntry.model_name, ModelRegistryEntry.version.desc()).all()


# ---------------------------------------------------------------------
# Observability -- lightweight, in-database request logging. See
# RequestLog's docstring in models_db.py for scope (complement to a real
# APM, not a replacement).
# ---------------------------------------------------------------------

def log_request(db: Session, tenant_id: str, endpoint: str, method: str, status_code: int, latency_ms: int, error: str = "") -> None:
    db.add(RequestLog(
        tenant_id=tenant_id, endpoint=endpoint, method=method,
        status_code=status_code, latency_ms=latency_ms, error=error,
    ))
    db.commit()


def get_observability_summary(db: Session, tenant_id: str, since_hours: int = 24) -> list:
    """Per-endpoint request counts, average latency, and error rate over
    the given window -- the "show me error rate by endpoint today" query
    this table exists for."""
    cutoff = _now() - timedelta(hours=since_hours)
    rows = (
        db.query(
            RequestLog.endpoint,
            func.count(RequestLog.id).label("request_count"),
            func.avg(RequestLog.latency_ms).label("avg_latency_ms"),
            func.sum(func.cast(RequestLog.status_code >= 400, SAInteger)).label("error_count"),
        )
        .filter(RequestLog.tenant_id == tenant_id, RequestLog.created_at >= cutoff)
        .group_by(RequestLog.endpoint)
        .all()
    )
    return [
        {
            "endpoint": r.endpoint,
            "request_count": r.request_count,
            "avg_latency_ms": round(float(r.avg_latency_ms or 0), 1),
            "error_count": int(r.error_count or 0),
        }
        for r in rows
    ]


def create_learned_pattern(db: Session, tenant_id: str, pattern: dict) -> LearnedPattern:
    """Always created with confirmed=False -- a candidate pattern from a
    cross-reference run is never trusted until a human explicitly
    confirms it (see confirm_learned_pattern below). Mirrors
    create_precedent's shape/discipline exactly."""
    row = LearnedPattern(
        tenant_id=tenant_id,
        category=pattern.get("category", ""),
        pattern_text=pattern.get("pattern_text", ""),
        source_report_id=pattern.get("source_report_id", ""),
        confirmed=False,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def confirm_learned_pattern(db: Session, tenant_id: str, pattern_id: str) -> LearnedPattern | None:
    """The explicit human action that promotes a candidate pattern into
    one generation prompts actually see. Returns None if the pattern
    doesn't exist or belongs to a different tenant -- callers should
    treat that as a 404, not silently succeed."""
    row = (
        db.query(LearnedPattern)
        .filter(LearnedPattern.tenant_id == tenant_id, LearnedPattern.id == pattern_id)
        .first()
    )
    if row is None:
        return None
    row.confirmed = True
    db.commit()
    db.refresh(row)
    return row


def list_learned_patterns(db: Session, tenant_id: str, confirmed_only: bool = False) -> list:
    q = db.query(LearnedPattern).filter(LearnedPattern.tenant_id == tenant_id)
    if confirmed_only:
        q = q.filter(LearnedPattern.confirmed == True)  # noqa: E712
    return q.order_by(LearnedPattern.created_at.desc()).all()


def learned_pattern_to_dict(p: LearnedPattern) -> dict:
    return {
        "id": p.id,
        "category": p.category,
        "pattern_text": p.pattern_text,
        "source_report_id": p.source_report_id,
        "confirmed": p.confirmed,
    }


def precedent_to_retriever_dict(p: Precedent) -> dict:
    """Shape expected by rag_retriever.PrecedentStore (same keys as the
    JSONL format it was originally built to read)."""
    return {
        "spec_id": p.external_spec_id,
        "description": p.description,
        "logic": p.logic,
        "report_scenarios": p.report_scenarios,
        "column_heading": p.column_heading,
        "cql": p.cql,
        "notes": p.notes,
    }


def precedent_to_dict(p: Precedent) -> dict:
    d = precedent_to_retriever_dict(p)
    d["id"] = p.id
    d["createdAt"] = p.created_at.isoformat() if p.created_at else None
    return d


def replace_study_metadata(db: Session, tenant_id: str, study_id: str, rows: list) -> int:
    """Replaces ALL metadata for this tenant+study with the given rows --
    re-uploading a corrected/updated export doesn't accumulate duplicates
    or leave stale rows behind. rows: list of dicts with form/item/label/
    data_type keys. Returns the count written."""
    db.query(StudyMetadataItem).filter(
        StudyMetadataItem.tenant_id == tenant_id, StudyMetadataItem.study_id == study_id
    ).delete()

    count = 0
    for row in rows:
        form = (row.get("form") or "").strip()
        item = (row.get("item") or "").strip()
        if not form or not item:
            continue  # a row missing either half of the identity isn't a usable metadata entry
        db.add(StudyMetadataItem(
            tenant_id=tenant_id, study_id=study_id, form=form, item=item,
            label=row.get("label", ""), data_type=row.get("data_type", ""),
        ))
        count += 1
    db.commit()
    return count


def get_study_metadata(db: Session, tenant_id: str, study_id: str) -> list:
    """Every metadata row for this tenant+study -- [] if none loaded
    (the normal, expected state for most studies right now; callers
    must treat that as 'no grounding available', not an error)."""
    return (
        db.query(StudyMetadataItem)
        .filter(StudyMetadataItem.tenant_id == tenant_id, StudyMetadataItem.study_id == study_id)
        .order_by(StudyMetadataItem.form, StudyMetadataItem.item)
        .all()
    )


def study_metadata_to_lookup(rows: list) -> dict:
    """{form: {item, item, ...}} -- the shape guardrail/grounding checks
    actually want, not raw ORM rows."""
    lookup = {}
    for r in rows:
        lookup.setdefault(r.form, set()).add(r.item)
    return lookup


def study_metadata_to_dict(r: StudyMetadataItem) -> dict:
    return {"form": r.form, "item": r.item, "label": r.label, "dataType": r.data_type}


# ---------------------------------------------------------------------
# Per-spec supporting document -- complementary to study-wide metadata
# above, not a replacement. See SpecSupportingDocItem's docstring in
# models_db.py for the real column shape and the deliberate choice not
# to interpret control_level's meaning.
# ---------------------------------------------------------------------

def replace_spec_supporting_doc(db: Session, tenant_id: str, report_id: str, rows: list) -> int:
    """Replaces ALL supporting-doc rows for this tenant+report with the
    given rows -- same re-upload discipline as replace_study_metadata:
    a corrected CSV doesn't accumulate duplicates or leave stale rows
    behind. Keyed by report_id, not a generated spec row's id -- see
    SpecSupportingDocItem's docstring in models_db.py for why: a spec
    row doesn't exist yet at the point this needs to be usable (during
    Understand Logic). rows: list of dicts with viewName/columnName/
    itemQuestion/originalItemQuestion/controlLevel/prefix keys. Returns
    the count written."""
    db.query(SpecSupportingDocItem).filter(
        SpecSupportingDocItem.tenant_id == tenant_id, SpecSupportingDocItem.report_id == report_id
    ).delete()

    count = 0
    for row in rows:
        view_name = (row.get("viewName") or "").strip()
        column_name = (row.get("columnName") or "").strip()
        if not view_name or not column_name:
            continue  # a row missing either half of the identity isn't a usable entry
        db.add(SpecSupportingDocItem(
            tenant_id=tenant_id, report_id=report_id, view_name=view_name, column_name=column_name,
            item_question=row.get("itemQuestion", ""), original_item_question=row.get("originalItemQuestion", ""),
            control_level=str(row.get("controlLevel", "")), prefix=row.get("prefix", ""),
        ))
        count += 1
    db.commit()
    return count


def get_spec_supporting_doc(db: Session, tenant_id: str, report_id: str) -> list:
    """Every supporting-doc row for this tenant+report -- [] if none
    uploaded (the normal state for a report without one; callers must
    treat that as 'no grounding available', not an error). Keyed by
    report_id -- see replace_spec_supporting_doc's docstring."""
    return (
        db.query(SpecSupportingDocItem)
        .filter(SpecSupportingDocItem.tenant_id == tenant_id, SpecSupportingDocItem.report_id == report_id)
        .order_by(SpecSupportingDocItem.view_name, SpecSupportingDocItem.column_name)
        .all()
    )


def spec_supporting_doc_to_dict(r: SpecSupportingDocItem) -> dict:
    return {
        "viewName": r.view_name, "columnName": r.column_name,
        "itemQuestion": r.item_question, "originalItemQuestion": r.original_item_question,
        "controlLevel": r.control_level, "prefix": r.prefix,
    }
