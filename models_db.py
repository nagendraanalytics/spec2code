"""
models_db.py — ORM models. tenant_id is a real column on every table,
not an assumption enforced only at the API layer -- store.py filters by
it on every query, and the cross-tenant test in test_store.py proves
that isolation actually holds, not just that the column exists.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship

from db import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class Spec(Base):
    __tablename__ = "specs"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    report_id = Column(String, nullable=False)  # user-facing report ID (e.g. "ABC002_JR") -- NOT
    # globally unique, only meaningful within a tenant; two tenants can each have their own "ABC002_JR"
    description = Column(Text, nullable=False)
    column_heading = Column(Text, default="")
    logic = Column(Text, default="")
    report_scenarios = Column(Text, default="")
    sorting = Column(Text, default="")
    created_at = Column(DateTime, default=_now)

    reviews = relationship("SpecReview", back_populates="spec", cascade="all, delete-orphan")
    runs = relationship("GenerationRun", back_populates="spec", cascade="all, delete-orphan")


class SpecReview(Base):
    __tablename__ = "spec_reviews"

    id = Column(String, primary_key=True, default=_uuid)
    spec_id = Column(String, ForeignKey("specs.id"), nullable=False)
    tenant_id = Column(String, nullable=False, index=True)  # denormalized on purpose: lets store.py
    # filter this table directly by tenant_id without a join, and is the field the cross-tenant
    # test checks first -- a query that forgot to filter here would show up immediately.
    readiness = Column(String, nullable=False)  # ready | ready_with_notes | needs_revision
    insights_json = Column(Text, default="[]")  # JSON-encoded list of insight dicts
    summary = Column(Text, default="")
    created_at = Column(DateTime, default=_now)

    spec = relationship("Spec", back_populates="reviews")


class GenerationRun(Base):
    __tablename__ = "generation_runs"

    id = Column(String, primary_key=True, default=_uuid)
    spec_id = Column(String, ForeignKey("specs.id"), nullable=False)
    tenant_id = Column(String, nullable=False, index=True)
    cql = Column(Text)
    explanation = Column(Text)
    retrieved_precedents_json = Column(Text, default="[]")
    cascade_trace_json = Column(Text, default="[]")
    guardrail_reports_json = Column(Text, default="[]")
    status = Column(String, nullable=False)  # generated | generated_with_override | blocked_needs_review | error
    error = Column(Text)
    created_at = Column(DateTime, default=_now)

    spec = relationship("Spec", back_populates="runs")


class Precedent(Base):
    """A human-verified (spec, correct CQL) pair used for RAG few-shot
    retrieval (rag_retriever.py). tenant_id-scoped like everything else --
    each tenant grows their own precedent corpus rather than sharing one
    global file. embedding_json is reserved for a future real embedding
    vector (e.g. pgvector) -- unused today, retrieval still runs on
    TF-IDF over the text fields, computed at query time, not stored."""

    __tablename__ = "precedents"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    external_spec_id = Column(String, nullable=False)  # human-facing label, e.g. "ABC002_JR" -- not a DB foreign key
    description = Column(Text, nullable=False)
    logic = Column(Text, default="")
    report_scenarios = Column(Text, default="")
    column_heading = Column(Text, default="")
    cql = Column(Text, nullable=False)
    notes = Column(Text, default="")
    embedding_json = Column(Text)  # reserved for a real embedding vector once model-hub access exists
    created_at = Column(DateTime, default=_now)


class LearnedPattern(Base):
    """A general, reusable generation convention discovered by cross-
    referencing a written spec against EXISTING, CONFIRMED-WORKING legacy
    code for that same report (e.g. real SAS code from a migration) --
    NOT a report-specific fact, and not something invented by an LLM
    call on its own. This is what makes "the system gets smarter from
    spec+code migrations" a real, live, runtime capability rather than
    something that needs a source-code edit and redeploy every time a
    new migration surfaces a new convention (see
    spec_code_crossref_agent.py's module docstring for the full
    reasoning, and cql_agents.py's build_generation_user_prompt for
    where these get pulled into the actual generation prompt).

    confirmed=False rows are candidates a human hasn't reviewed yet --
    they are NEVER included in generation prompts. Only confirmed=True
    rows get injected, the same "human confirms before it's trusted"
    discipline as everything else in this project (Save as Precedent
    works the same way: nothing joins the trusted corpus without an
    explicit human action)."""

    __tablename__ = "learned_patterns"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    category = Column(String, default="")  # e.g. "deleted-record handling", "date imputation" -- freeform, not an enum
    pattern_text = Column(Text, nullable=False)
    source_report_id = Column(String, default="")  # which spec+code pair revealed this, for traceability
    confirmed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=_now)


class TrainingCorpusEntry(Base):
    """A confirmed-good (spec, outcome) pair, structured specifically as
    future Tier 3/Tier 4 training data -- distinct from GenerationRun,
    which is an operational log of every attempt regardless of quality.
    This table is deliberately narrower and higher-signal: it's
    populated ONLY from sources that already went through explicit human
    confirmation (a saved precedent, a confirmed learned pattern's
    associated run) -- the same "never trust unconfirmed data" discipline
    as everything else here. This directly targets the data-volume
    blocker that's been flagged since the very first Tier 3 shadow-mode
    discussion: XGBoost had 4 training examples and 0% leave-one-out
    accuracy because there was never a real corpus, only ad hoc training
    scripts. This table is that corpus, growing from real usage instead
    of a one-time synthetic push."""

    __tablename__ = "training_corpus"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    spec_id = Column(String, nullable=False, index=True)
    generation_run_id = Column(String, default="")
    spec_features = Column(JSON, nullable=False)  # structured features extracted from the spec
    # (domain, language, complexity indicators) -- what a classifier would actually train on
    chosen_tier = Column(String, default="")  # which tier's output this entry represents
    outcome_label = Column(String, default="")  # the actual training target/label
    guardrails_passed = Column(Boolean, default=False)
    synthetic_validation_summary = Column(JSON, default=dict)  # TP/TN/FP/FN counts, if run
    confirmation_source = Column(String, nullable=False)  # "precedent" | "learned_pattern" --
    # NEVER populated from an unconfirmed run; this column exists so a future query can always
    # answer "why do we trust this row" without guessing
    created_at = Column(DateTime, default=_now)


class ModelRegistryEntry(Base):
    """Tracks every trained model version -- which is currently deployed,
    its full lineage, and an explicit, audited promotion action, the same
    governance discipline as LearnedPattern's confirm step. Before this,
    there was no record of a model's training data snapshot or metrics
    once the training script exited -- this closes that gap without
    introducing MLflow as a separate service, consistent with keeping
    this in the same already-verified Postgres database rather than
    adding infrastructure for its own sake.

    status transitions: shadow -> candidate -> active -> retired. Only
    ONE row per model_name should be 'active' at a time -- enforced at
    the application layer (store.promote_model), not a DB constraint,
    since the "demote the previous active version" step needs to happen
    atomically with the promotion, which a CHECK constraint can't express
    on its own."""

    __tablename__ = "model_registry"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    model_name = Column(String, nullable=False, index=True)  # e.g. "xgboost_tier_classifier"
    version = Column(Integer, nullable=False)
    status = Column(String, nullable=False, default="shadow")  # shadow | candidate | active | retired
    training_data_snapshot = Column(JSON, default=dict)  # corpus row count, id range/hash --
    # enough to answer "what data trained this version" without duplicating the whole corpus here
    metrics = Column(JSON, default=dict)  # accuracy, precision/recall, LOO accuracy, etc.
    artifact_path = Column(String, default="")  # where the serialized model file actually lives
    notes = Column(Text, default="")
    trained_at = Column(DateTime, default=_now)
    promoted_at = Column(DateTime, nullable=True)


class RequestLog(Base):
    """Lightweight, in-database observability: one row per API request,
    queryable alongside every other tenant-scoped table without needing
    an external APM. This is a complement to real production monitoring
    (Application Insights, per the Azure deployment discussion), not a
    replacement for it -- this table answers "show me error rate by
    tenant this week" from a SQL query; alerting, dashboards, and
    real-time paging still belong to a dedicated APM tool."""

    __tablename__ = "request_log"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    endpoint = Column(String, nullable=False, index=True)
    method = Column(String, default="")
    status_code = Column(Integer, default=0)
    latency_ms = Column(Integer, default=0)
    error = Column(Text, default="")
    created_at = Column(DateTime, default=_now, index=True)


class StudyMetadataItem(Base):
    """One real Form.Item pair from an actual study's EDC metadata export
    (Veeva Vault CDB, or whatever system the tenant's studies run on).

    This is what closes the "Form/Item names are inferred from CDISC
    convention, not verified" gap that's been in every generation
    explanation since the start of this project. Once real metadata is
    loaded for a study_id, generation prompts get grounded in it instead
    of guessing, and guardrails.py gains the ability to check Form/Item
    EXISTENCE, not just structure -- something it explicitly could not do
    before (see guardrails.py's own module docstring).

    tenant_id + study_id scoped: one tenant may run multiple studies,
    each with its own Form/Item set -- metadata for one study must never
    leak into generation for another, same isolation discipline as every
    other tenant-scoped table here."""

    __tablename__ = "study_metadata_items"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    study_id = Column(String, nullable=False, index=True)
    form = Column(String, nullable=False)
    item = Column(String, nullable=False)
    label = Column(Text, default="")
    data_type = Column(String, default="")
    created_at = Column(DateTime, default=_now)


class SpecSupportingDocItem(Base):
    """One row of a per-REPORT supporting document (e.g.
    RID418_supp_doc.csv) -- a real Form/View-to-column mapping specific
    to ONE report, richer than StudyMetadataItem's study-wide (form,
    item, label, data_type) shape and complementary to it, not a
    replacement.

    Keyed by report_id (the spec's own reportId field), NOT the
    generated spec row's id -- deliberately, because a spec row doesn't
    exist yet at the point this needs to be usable. The real sequence is:
    a user types a Report ID, then runs Understand Logic, before any
    Review ever creates a persisted Spec row. Keying this table to a
    not-yet-existing spec_id would make it structurally impossible to
    use during Understand -- report_id is stable and known from the
    very first step, so every stage (Understand, Review, Suggest,
    Generate) can look the same document up the same way.

    Real columns, from the actual supporting-doc format observed:
      view_name              -- the Form/View this item belongs to
                                 (e.g. "CV_SM01FM")
      column_name             -- the real, physical column name backing
                                 this item (e.g. "DT_SM01EXSTDTC1IT") --
                                 the exact thing generation should stop
                                 guessing at once this is loaded
      item_question            -- the question text as shown on THIS form
      original_item_question    -- the master/original question text,
                                 which can differ from item_question when
                                 a form customizes the wording
      control_level            -- captured verbatim, NOT semantically
                                 interpreted anywhere in this codebase.
                                 Its real meaning (repeat-instance number?
                                 UI nesting level? something else?) was
                                 not confirmed when this table was built --
                                 stored faithfully and displayed, but no
                                 guardrail or generation logic makes any
                                 decision based on assuming what it means.
      prefix                  -- short type code as given in the source
                                 (e.g. "dt", "c", "cd") -- captured as-is,
                                 not mapped to StudyMetadataItem's
                                 data_type vocabulary, since that mapping
                                 was never confirmed either.

    tenant_id + report_id scoped -- one report's supporting doc must
    never leak into generation for a different report, same isolation
    discipline as every other tenant-scoped table here."""

    __tablename__ = "spec_supporting_doc_items"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    report_id = Column(String, nullable=False, index=True)
    view_name = Column(String, nullable=False)
    column_name = Column(String, nullable=False)
    item_question = Column(Text, default="")
    original_item_question = Column(Text, default="")
    control_level = Column(String, default="")
    prefix = Column(String, default="")
    created_at = Column(DateTime, default=_now)
