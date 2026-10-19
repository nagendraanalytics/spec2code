"""
models_db.py — ORM models. tenant_id is a real column on every table,
not an assumption enforced only at the API layer -- store.py filters by
it on every query, and the cross-tenant test in test_store.py proves
that isolation actually holds, not just that the column exists.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, LargeBinary, String, Text
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
    source = Column(String, default="app")  # app = run in this tool | imported = executed elsewhere
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
    language = Column(String)  # cql | sql | sas | r | python (None on rows from before v2.10)
    source = Column(String, default="app")  # app | imported
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


class BatchJob(Base):
    """One batch run: many listings pushed through the pipeline in parallel.
    Persisted (not just held in memory) so a 100-listing run survives a
    server reload and its results stay downloadable afterwards."""
    __tablename__ = "batch_jobs"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    name = Column(String, default="")
    status = Column(String, nullable=False, default="running")  # running | finished | cancelled | interrupted
    options_json = Column(Text, default="{}")
    created_at = Column(DateTime, default=_now)
    finished_at = Column(DateTime, nullable=True)

    items = relationship("BatchItem", back_populates="job", cascade="all, delete-orphan")


class BatchItem(Base):
    """One listing inside a batch. Each result field is stored as JSON text,
    same convention as the other tables here."""
    __tablename__ = "batch_items"

    id = Column(String, primary_key=True, default=_uuid)
    job_id = Column(String, ForeignKey("batch_jobs.id"), nullable=False, index=True)
    tenant_id = Column(String, nullable=False, index=True)  # denormalized, same reason as SpecReview
    position = Column(Integer, default=0)
    name = Column(String, default="")  # file name / label shown in the UI
    report_id = Column(String, default="")
    status = Column(String, nullable=False, default="pending")
    # pending | running | done | needs_attention | failed | cancelled | interrupted
    stage = Column(String, default="")  # extract | understand | review | generate
    spec_json = Column(Text, default="")
    raw_text = Column(Text, default="")
    understanding_json = Column(Text, default="")
    review_json = Column(Text, default="")
    result_json = Column(Text, default="")
    error = Column(Text, default="")
    attempts = Column(Integer, default=0)
    started_at = Column(DateTime, nullable=True)
    finished_at = Column(DateTime, nullable=True)
    study_id = Column(String, default="")  # per-listing study override (report-wise metadata)

    job = relationship("BatchJob", back_populates="items")


class Study(Base):
    """A study registered for metadata-driven runs. `study_id` is the user's
    own code for the study (unique per tenant, enforced in study_setup)."""
    __tablename__ = "studies"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    study_id = Column(String, nullable=False, index=True)
    name = Column(String, default="")
    edc_system = Column(String, default="veeva")
    ta = Column(String, default="")  # therapeutic area; selects which TA knowledge applies to this study
    sponsor = Column(String, default="")  # sponsor; selects which sponsor knowledge applies to this study
    active_version = Column(Integer, nullable=True)  # the version runs use unless one is pinned
    created_at = Column(DateTime, default=_now)

    versions = relationship("StudyMetadataVersion", back_populates="study", cascade="all, delete-orphan")


class StudyMetadataVersion(Base):
    """An immutable snapshot of a study's metadata. Re-uploading creates a new
    version instead of overwriting, so a run can say exactly which metadata it
    used and a bad upload can be rolled back by activating an older version."""
    __tablename__ = "study_metadata_versions"

    id = Column(String, primary_key=True, default=_uuid)
    study_pk = Column(String, ForeignKey("studies.id"), nullable=False, index=True)
    tenant_id = Column(String, nullable=False, index=True)
    version = Column(Integer, nullable=False)
    source_files = Column(Text, default="[]")  # JSON list of uploaded file names
    notes = Column(Text, default="")
    counts_json = Column(Text, default="{}")
    created_at = Column(DateTime, default=_now)

    study = relationship("Study", back_populates="versions")
    items = relationship("StudyItemRow", cascade="all, delete-orphan")
    visits = relationship("StudyVisitRow", cascade="all, delete-orphan")
    codelists = relationship("StudyCodelistRow", cascade="all, delete-orphan")


class StudyItemRow(Base):
    __tablename__ = "study_item_rows"

    id = Column(Integer, primary_key=True, autoincrement=True)
    version_id = Column(String, ForeignKey("study_metadata_versions.id"), nullable=False, index=True)
    form = Column(String, nullable=False)
    form_label = Column(String, default="")
    item = Column(String, nullable=False)
    label = Column(Text, default="")
    data_type = Column(String, default="")
    codelist = Column(String, default="")


class StudyVisitRow(Base):
    __tablename__ = "study_visit_rows"

    id = Column(Integer, primary_key=True, autoincrement=True)
    version_id = Column(String, ForeignKey("study_metadata_versions.id"), nullable=False, index=True)
    position = Column(Integer, default=0)
    name = Column(String, nullable=False)
    label = Column(String, default="")


class StudyCodelistRow(Base):
    __tablename__ = "study_codelist_rows"

    id = Column(Integer, primary_key=True, autoincrement=True)
    version_id = Column(String, ForeignKey("study_metadata_versions.id"), nullable=False, index=True)
    codelist = Column(String, nullable=False)
    value = Column(String, default="")
    label = Column(String, default="")


# ---------------------------------------------------------------------------
# Knowledge base: sources (any uploaded document), their chunks (the RAG
# store) and rules. Nothing here influences generation until a person
# approves it: status is draft -> approved -> retired.
# ---------------------------------------------------------------------------

class KnowledgeSource(Base):
    __tablename__ = "knowledge_sources"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    title = Column(String, default="")
    filename = Column(String, default="")
    file_hash = Column(String, index=True, default="")
    size_bytes = Column(Integer, default=0)
    raw_path = Column(String, default="")  # the original file, kept so a re-extract never needs a re-upload
    # standard | protocol | spec | sas_program | history | edc_guide | listing_standard | other
    doc_type = Column(String, default="other", index=True)
    doc_type_reason = Column(String, default="")
    # global | ta | study. scope_ref is the TA name or study id (empty for global).
    # For doc_type edc_guide on global scope, scope_ref may name one EDC system id.
    scope = Column(String, default="global", index=True)
    scope_ref = Column(String, default="", index=True)
    standard_version = Column(String, default="")  # e.g. "SDTM IG 3.4"
    license_note = Column(String, default="")
    status = Column(String, default="draft", index=True)  # draft | approved | retired
    extract_status = Column(String, default="ok")  # ok | needs_ocr | empty | error
    extract_note = Column(Text, default="")
    text_chars = Column(Integer, default=0)
    chunk_count = Column(Integer, default=0)
    embed_backend = Column(String, default="")
    created_by = Column(String, default="")
    created_at = Column(DateTime, default=_now)
    approved_by = Column(String, default="")
    approved_at = Column(DateTime, nullable=True)

    chunks = relationship("KnowledgeChunk", back_populates="source", cascade="all, delete-orphan")


class KnowledgeChunk(Base):
    __tablename__ = "knowledge_chunks"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    source_id = Column(String, ForeignKey("knowledge_sources.id", ondelete="CASCADE"), nullable=False, index=True)
    position = Column(Integer, default=0)
    heading = Column(String, default="")
    text = Column(Text, default="")
    meta = Column(JSON, default=dict)  # page, sheet, kind (text|table|code), ...
    embedding = Column(LargeBinary, nullable=True)  # float32 vector; pgvector replaces this column in Postgres
    embed_backend = Column(String, default="")

    source = relationship("KnowledgeSource", back_populates="chunks")


class KnowledgeRule(Base):
    __tablename__ = "knowledge_rules"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, default="")
    scope = Column(String, default="global")  # global | ta | study
    scope_ref = Column(String, default="")
    applies_to = Column(JSON, default=list)  # agents: extract | understand | review | generate
    condition = Column(JSON, default=dict)  # edcSystem[], listingType[], specType[], language[], forms[], textPattern
    action_type = Column(String, default="prompt")  # pattern | prompt | guardrail | name_map
    action = Column(JSON, default=dict)
    priority = Column(Integer, default=100)  # higher wins among equally specific rules
    status = Column(String, default="draft", index=True)  # draft | approved | retired
    evidence_source_id = Column(String, nullable=True)
    evidence_note = Column(Text, default="")
    tests = Column(JSON, default=list)  # [{"spec": {...}, "expect": "fires" | "not_fires"}]
    version = Column(Integer, default=1)
    created_by = Column(String, default="")
    created_at = Column(DateTime, default=_now)
    updated_at = Column(DateTime, default=_now)
    approved_by = Column(String, default="")
    approved_at = Column(DateTime, nullable=True)


class SyntheticSet(Base):
    """Synthetic test data for one listing: conditions found in its logic and cases (small multi-form datasets,
    each with an expected include/exclude). One row per version; editing a reviewed set returns it to draft."""
    __tablename__ = "synthetic_sets"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    report_id = Column(String, nullable=False, index=True)
    version = Column(Integer, default=1)
    spec_id = Column(String, default="")  # library spec it came from, if any
    batch_id = Column(String, default="")
    batch_item_id = Column(String, default="")
    study_id = Column(String, default="")
    status = Column(String, default="draft")  # draft | reviewed | retired
    edited = Column(Boolean, default=False)
    spec_json = Column(Text, default="{}")  # snapshot of the spec the data was built from
    conditions_json = Column(Text, default="[]")
    cases_json = Column(Text, default="[]")
    open_questions_json = Column(Text, default="[]")
    summary = Column(Text, default="")
    used_knowledge = Column(Boolean, default=False)
    created_by = Column(String, default="")
    reviewed_by = Column(String, default="")
    reviewed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=_now)
    updated_at = Column(DateTime, default=_now)


class SyntheticRun(Base):
    """One check of code against a synthetic set: executed here (SQL), uploaded from a real system, or could not run."""
    __tablename__ = "synthetic_runs"

    id = Column(String, primary_key=True, default=_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    set_id = Column(String, nullable=False, index=True)
    set_version = Column(Integer, default=1)
    language = Column(String, default="")
    method = Column(String, default="")  # executed | uploaded
    status = Column(String, default="")  # executed | uploaded | could_not_execute
    code = Column(Text, default="")
    results_json = Column(Text, default="[]")
    counts_json = Column(Text, default="{}")
    issues_json = Column(Text, default="{}")
    rows_returned = Column(Integer, default=0)
    source_name = Column(String, default="")  # uploaded file name
    error = Column(Text, default="")
    created_by = Column(String, default="")
    created_at = Column(DateTime, default=_now)
