"""Single-file FastAPI app: serves the static UI and the API endpoints
that call Claude. No Node, no build step -- `pip install -r
requirements.txt && uvicorn main:app --reload` is the entire setup.

Shared prompts/tool schemas/Claude-calling logic live in cql_agents.py
(also used by orchestration/graph.py's LangGraph nodes) -- this file
should stay a thin FastAPI wrapper around that, not duplicate it.

Multi-tenant: every request is scoped by the X-Tenant-Id header (defaults
to "default" if absent, so the existing UI keeps working unmodified).
Specs, reviews, and generation runs are persisted via store.py, which
filters every query by tenant_id at the database level -- see
test_multitenancy.py for the isolation guarantees this actually proves,
not just claims.
"""
from __future__ import annotations

import json
import os

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session

import clinical_modules
import edc_registry
import study_setup
import spec_history_import
import code_gen_registry
import cql_agents
import db
import generation_router
import logic_understanding_agent
import spec_suggestion_agent
import synthetic_validation_agent
import spec_gap_chat_agent
import spec_code_crossref_agent
import guardrails as guardrails_module
import spec_extraction_agent
import spec_templates
import store
from orchestration import graph
from rag_retriever import PrecedentStore

load_dotenv(encoding="utf-8-sig")  # utf-8-sig strips a leading BOM if present (and is
# harmless if not) -- Windows tools (PowerShell's Out-File, older Notepad versions) often
# save "UTF-8" files WITH a BOM, which otherwise silently breaks the very first key in
# the file by prepending an invisible character to its name.

app = FastAPI(title="Spec -> SQL")
import knowledge_api  # noqa: E402
import knowledge_binding  # noqa: E402  (router registered below, once the app exists)
app.include_router(knowledge_api.router)
import synthetic_api  # noqa: E402
app.include_router(synthetic_api.router)

# CORS: the Next.js frontend (static/ vanilla JS is same-origin, doesn't need
# this) runs on its own dev-server port. Restricted to localhost dev ports --
# tighten this before any real deployment beyond local development.
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db.init_db()


@app.middleware("http")
async def request_logging_middleware(request, call_next):
    """Lightweight, in-database observability (see RequestLog's
    docstring in models_db.py). CRITICAL property, worth stating
    explicitly: a failure logging a request must NEVER break the
    request itself -- this always calls call_next() first and returns
    its response regardless of what happens in the logging step, and
    the logging step is wrapped in its own try/except so a missing
    request_log table (e.g. an old SQLite file predating this feature --
    the same class of issue that's bitten this project before) degrades
    to silently skipped logging, not a broken app."""
    import time
    start = time.monotonic()
    response = await call_next(request)
    latency_ms = int((time.monotonic() - start) * 1000)

    try:
        tenant_id = request.headers.get("x-tenant-id") or "default"
        session = db.SessionLocal()
        try:
            store.log_request(
                session, tenant_id, endpoint=request.url.path, method=request.method,
                status_code=response.status_code, latency_ms=latency_ms,
            )
        finally:
            session.close()
    except Exception:  # noqa: BLE001 -- observability must never break the actual request
        pass

    return response


@app.exception_handler(Exception)
async def unhandled_exception_handler(request, exc: Exception):
    """Guarantees every response is valid JSON, even when something
    fails outside the try/except AgentError blocks each agent-calling
    endpoint already has (a database error, a bug, anything genuinely
    unexpected). Without this, FastAPI's default behavior sends a raw
    HTML/plain-text error page for an unhandled exception -- the
    frontend always does `await res.json()` unconditionally, so that
    page becomes a confusing "Unexpected token 'I', 'Internal S'... is
    not valid JSON" crash instead of a readable error message. This is
    a safety net, not a replacement for handling errors properly at the
    source -- each endpoint's own try/except still fires first when it
    applies; this only catches what slips past all of them.
    A likely real cause of hitting this, worth logging clearly: a schema
    change (a new table/column) not present in an existing local SQLite
    file, since there's no Alembic migration tooling yet -- see the
    project's known gaps. The fix in that case is deleting the local
    .db file so it recreates cleanly, not something this handler can
    fix on its own."""
    import logging
    logging.exception("Unhandled exception in %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"error": f"Internal server error: {exc}. If this mentions a missing table/column, delete the local .db file and restart -- there's no migration tooling yet, so schema changes need a fresh database."},
    )


def get_tenant_id(x_tenant_id: str | None = Header(default=None)) -> str:
    return x_tenant_id or "default"


PRECEDENTS_SEED_PATH = os.environ.get("PRECEDENTS_PATH", "precedents.jsonl")
RAG_TOP_K = int(os.environ.get("RAG_TOP_K", "3"))
RAG_MIN_SCORE = float(os.environ.get("RAG_MIN_SCORE", "0.15"))


def _seed_default_tenant_precedents_if_empty() -> None:
    """One-time migration: if the "default" tenant has zero precedents in
    the DB and the legacy precedents.jsonl file exists, load it in. This
    only ever seeds the default tenant -- other tenants start with an
    empty corpus and grow it via POST /api/precedents, they don't
    inherit the file's contents (that would be a cross-tenant data
    decision made silently, which isn't this migration's call to make)."""
    if not os.path.exists(PRECEDENTS_SEED_PATH):
        return
    session = db.SessionLocal()
    try:
        existing = store.list_precedents(session, "default")
        if existing:
            return
        with open(PRECEDENTS_SEED_PATH, "r", encoding="utf-8") as f:
            count = 0
            for line in f:
                line = line.strip()
                if not line:
                    continue
                precedent = json.loads(line)
                store.create_precedent(session, "default", precedent)
                count += 1
        if count:
            print(f"[startup] Seeded {count} precedent(s) into 'default' tenant from {PRECEDENTS_SEED_PATH}")
    finally:
        session.close()


_seed_default_tenant_precedents_if_empty()


def _get_precedent_store_for_tenant(db_session: Session, tenant_id: str) -> PrecedentStore | None:
    """Built fresh per request from that tenant's DB rows. Rebuilding the
    TF-IDF fit on every call is fine at current corpus sizes; worth
    caching per-tenant once a corpus grows large enough for the refit
    cost to matter."""
    rows = store.list_precedents(db_session, tenant_id)
    if not rows:
        return None
    return PrecedentStore([store.precedent_to_retriever_dict(r) for r in rows])


class ReportSpec(BaseModel):
    reportId: str
    description: str
    columnHeading: str = ""
    logic: str = ""
    reportScenarios: str = ""
    sorting: str = ""
    specTemplate: str = "merck_cdisc_report_library"
    edcSystem: str = "veeva"
    language: str = "cql"
    studyId: str = ""
    specType: str = clinical_modules.DEFAULT_MODULE_ID
    listingType: str = ""  # optional: a specific listing inside the spec type's family
    metadataVersion: int | None = None  # pin a study metadata version; None = the study's active version
    useKnowledge: bool = False  # inject approved knowledge and rules into the review/understand/generate prompts

    def as_dict(self) -> dict:
        return self.model_dump()


LANGUAGE_LABELS = {"cql": "CQL", "sql": "SQL", "sas": "SAS", "r": "R", "python": "Python"}
EDC_LABELS = {e["id"]: e["label"] for e in edc_registry.EDC_SYSTEMS}


@app.get("/api/health")
def health():
    """Liveness probe for Kubernetes and the UI's status indicator. Reports
    only whether the process is up and whether a model key is configured --
    never the key itself."""
    return {"status": "ok", "modelKeyConfigured": bool(os.environ.get("ANTHROPIC_API_KEY"))}


@app.get("/api/modules")
def list_clinical_modules():
    """The clinical spec types the platform understands, each with an honest
    status ("verified" vs "template") and a starting example spec."""
    return {"defaultModule": clinical_modules.DEFAULT_MODULE_ID, "modules": clinical_modules.list_modules()}


@app.get("/api/edc-systems")
def list_edc_systems():
    return {"edcSystems": edc_registry.list_public()}


@app.get("/api/targets")
def list_generation_targets(studyId: str = "", db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """The (EDC system x language) support matrix, straight from
    code_gen_registry.MATRIX plus the EDC registry, so the UI can never claim
    more than the backend will actually attempt. optInRequired marks
    unverified cells, which only run when the caller sets allow_unverified.
    With ?studyId=, systems that have no checked generator become
    metadata-grounded drafts (SQL, SAS, R) when that study has metadata."""
    has_metadata = study_setup.resolve(db_session, tenant_id, studyId) is not None if studyId.strip() else False
    cells = []
    for edc in edc_registry.EDC_SYSTEMS:
        for lang in LANGUAGE_LABELS:
            cell = code_gen_registry.MATRIX.get((edc["id"], lang)) or {
                "status": "needs_precedent",
                "detail": "CQL is Veeva-specific." if lang == "cql" else
                          f"No confirmed {edc['label']} example exists yet. A draft is possible once a study's metadata is loaded (SQL, SAS, R).",
            }
            status, detail, coverage = cell["status"], cell["detail"], generation_router.coverage(edc["id"], lang)
            if cell["status"] not in ("verified", "built", "unverified_beta") and generation_router.grounded_draft_possible(edc["id"], lang, has_metadata):
                status, coverage = "unverified_beta", "draft"
                detail = f"Metadata-grounded draft from study {studyId.strip()}: names come from the loaded metadata. Never checked against a confirmed result."
            cells.append({
                "edcSystem": edc["id"],
                "edcLabel": edc["label"],
                "language": lang,
                "languageLabel": LANGUAGE_LABELS[lang],
                "status": status,
                "detail": detail,
                "coverage": coverage,
                "available": status in ("verified", "built"),
                "optInRequired": status == "unverified_beta",
            })
    return {"targets": cells}


@app.post("/api/extract")
def extract(body: dict):
    """Extracts structured spec fields from raw, unstructured text (e.g.
    pasted from Notepad/Word/a PDF). Does NOT persist anything -- this is
    a pure transformation the client then shows for human review/editing
    before it's ever submitted as a real spec via /api/review."""
    raw_text = (body or {}).get("rawText", "")
    try:
        result = spec_extraction_agent.run_spec_extraction(raw_text)
    except spec_extraction_agent.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 400
        return JSONResponse(status_code=status_code, content={"error": str(e)})
    return result


@app.post("/api/spec-gap-chat")
def spec_gap_chat(body: dict):
    """One turn of the gap-filling conversation, reachable right after
    extraction. Stateless -- the client resends the full spec, the
    extraction notes, and the running transcript each turn; this
    endpoint does not persist a conversation of its own. Body:
    {"spec": {...}, "extractionNotes": "...", "transcript": [{"question":
    "...", "answer": "..."}]}. Does NOT persist anything -- same as
    /api/extract, this is a pure step the client shows for human
    review before the resulting spec is ever submitted as real via
    /api/review."""
    spec = body.get("spec")
    extraction_notes = body.get("extractionNotes", "")
    transcript = body.get("transcript", [])
    if not isinstance(spec, dict):
        return JSONResponse(status_code=400, content={"error": "A spec is required."})
    if not isinstance(transcript, list):
        transcript = []
    try:
        result = spec_gap_chat_agent.run_gap_chat_turn(spec, extraction_notes, transcript)
    except spec_gap_chat_agent.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 502
        return JSONResponse(status_code=status_code, content={"error": str(e)})
    return result


@app.post("/api/understand")
def understand(spec: ReportSpec, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    return _understand_core(spec, db_session, tenant_id)


def _understand_core(spec: ReportSpec, db_session: Session, tenant_id: str):
    """Logic understanding step -- runs BEFORE review/generate, not
    instead of either. Returns a plain-language, step-by-step
    walkthrough of how the spec's logic is understood, so a
    misunderstanding is caught by a human before a Review or Generate
    call is spent building on top of it. Does NOT persist anything --
    this is a pure comprehension check, not a gated/reviewable artifact
    like a Spec or SpecReview row.

    Looks up any supporting document already uploaded for this
    reportId -- deliberately keyed by reportId, not a generated spec
    row's id, since no Spec row exists yet at this point in the flow.
    See SpecSupportingDocItem's docstring in models_db.py."""
    if not spec.reportId.strip() or not spec.description.strip():
        return JSONResponse(status_code=400, content={"error": "Report ID and Description are required."})
    supporting_doc_rows = [
        store.spec_supporting_doc_to_dict(r)
        for r in store.get_spec_supporting_doc(db_session, tenant_id, spec.reportId.strip())
    ]
    supporting_doc_block = cql_agents.format_supporting_doc_block(supporting_doc_rows)
    agent_spec, kb = spec.as_dict(), None
    if spec.useKnowledge:
        kb = knowledge_binding.build(db_session, tenant_id, agent_spec, "understand", study_id=spec.studyId, edc=spec.edcSystem, language=spec.language)
        agent_spec["_knowledge_block"] = kb["block"]
    try:
        result = logic_understanding_agent.run_logic_understanding(agent_spec, supporting_doc_block)
    except logic_understanding_agent.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 502
        return JSONResponse(status_code=status_code, content={"error": str(e)})
    if kb is not None:
        result["knowledge"] = knowledge_binding.summary(kb, applied=True)
    return result


@app.post("/api/suggest-spec")
def suggest_spec(body: dict):
    """Optional step, reachable from Review: given the spec and Review's
    OWN prior findings (passed in by the client -- this endpoint doesn't
    re-run review), proposes a revised spec resolving those specific
    issues. Does NOT persist anything and does NOT re-run review itself
    -- this is a pure suggestion the client shows for human accept/edit/
    discard before Generate. 'spec' and 'review' are both required in
    the request body; 'review' is whatever /api/review already
    returned, so the client must have called that first."""
    spec = body.get("spec")
    review = body.get("review")
    if not isinstance(spec, dict) or not spec.get("reportId", "").strip() or not spec.get("description", "").strip():
        return JSONResponse(status_code=400, content={"error": "A spec with Report ID and Description is required."})
    if not isinstance(review, dict):
        return JSONResponse(status_code=400, content={"error": "A prior review result is required -- call /api/review first."})
    try:
        result = spec_suggestion_agent.run_spec_suggestion(spec, review)
    except spec_suggestion_agent.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 502
        return JSONResponse(status_code=status_code, content={"error": str(e)})
    return result


@app.post("/api/synthetic-validation")
def synthetic_validation(
    body: dict,
    db_session: Session = Depends(db.get_session),
    tenant_id: str = Depends(get_tenant_id),
):
    """Optional step, reachable after Generate: systematically constructs
    a TP/TN/FP/FN test matrix covering every distinct condition the
    generated code's logic depends on (not just the scenarios the spec's
    own Report Scenarios field happens to mention), and traces the
    ACTUAL generated code's logic against each case. This is a reasoned
    trace, not a real execution against a real system -- that
    distinction is enforced in the UI, not just this docstring, and
    nothing here should be read as "the code was tested and confirmed
    correct."
    Body: {"spec": {...}, "generatedCode": "...", "language": "cql"}."""
    spec = body.get("spec")
    generated_code = body.get("generatedCode")
    language = body.get("language", "cql")
    if not isinstance(spec, dict) or not spec.get("reportId", "").strip():
        return JSONResponse(status_code=400, content={"error": "A spec with Report ID is required."})
    if not isinstance(generated_code, str) or not generated_code.strip():
        return JSONResponse(status_code=400, content={"error": "Generated code is required -- run Generate first."})

    metadata_block = ""
    study_id = spec.get("studyId", "").strip()
    if study_id:
        metadata_rows = store.get_study_metadata(db_session, tenant_id, study_id)
        if metadata_rows:
            metadata_lookup = store.study_metadata_to_lookup(metadata_rows)
            metadata_block = cql_agents.format_metadata_block(metadata_lookup)

    try:
        result = synthetic_validation_agent.run_synthetic_validation(spec, generated_code, language, metadata_block)
    except synthetic_validation_agent.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 502
        return JSONResponse(status_code=status_code, content={"error": str(e)})
    return result


@app.post("/api/review")
def review(spec: ReportSpec, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    return _review_core(spec, db_session, tenant_id)


def _review_core(spec: ReportSpec, db_session: Session, tenant_id: str):
    if not spec.reportId.strip() or not spec.description.strip():
        return JSONResponse(status_code=400, content={"error": "Report ID and Description are required."})

    if not spec_templates.is_supported(spec.specTemplate):
        template = spec_templates.get_template(spec.specTemplate)
        reason = (
            f"Unknown spec template '{spec.specTemplate}'."
            if template is None
            else f"Spec template '{spec.specTemplate}' is not verified: {template['detail']}"
        )
        return JSONResponse(status_code=400, content={"error": reason})

    spec_row = store.create_spec(db_session, tenant_id, spec.as_dict())

    agent_spec, kb = spec.as_dict(), None
    if spec.useKnowledge:
        kb = knowledge_binding.build(db_session, tenant_id, agent_spec, "review", study_id=spec.studyId, edc=spec.edcSystem, language=spec.language)
        agent_spec["_knowledge_block"] = kb["block"]
    try:
        result = cql_agents.run_spec_review(agent_spec)
    except cql_agents.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 502
        return JSONResponse(status_code=status_code, content={"error": str(e)})

    store.save_review(db_session, tenant_id, spec_row.id, result)
    if kb is not None:
        result["knowledge"] = knowledge_binding.summary(kb, applied=True)
    result["specId"] = spec_row.id  # so the client can pass this to /api/generate to persist against the same spec row
    return result


@app.post("/api/generate")
def generate(
    spec: ReportSpec,
    spec_id: str | None = None,
    force_generate: bool = True,
    allow_unverified: bool = False,
    db_session: Session = Depends(db.get_session),
    tenant_id: str = Depends(get_tenant_id),
):
    return _generate_core(spec, spec_id, force_generate, allow_unverified, db_session, tenant_id)


def _generate_core(
    spec: ReportSpec,
    spec_id: str | None,
    force_generate: bool,
    allow_unverified: bool,
    db_session: Session,
    tenant_id: str,
):
    """Runs the LangGraph generation-only pipeline for the verified
    Veeva/CQL path (tier1_rules -> ... -> guardrails). For any other
    (edcSystem, language) combination, generation_router.resolve() is
    checked FIRST -- languages/EDC systems without a verified path are
    refused with a specific reason, not attempted with a guessed prompt.
    allow_unverified=True unlocks "unverified_beta" combos (currently:
    Veeva SQL) -- a real prompt exists but has never been checked against
    a confirmed-correct output; the response is marked isBeta=True and
    carries the same caveat sql_agents.py bakes into its explanation.
    Spec review is NOT re-run here -- that's /api/review's job;
    force_generate defaults True because getting here at all implies the
    caller already decided to proceed."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return JSONResponse(
            status_code=500,
            content={"error": "ANTHROPIC_API_KEY is not set. Add it to .env and restart the server."},
        )
    if not spec.reportId.strip() or not spec.description.strip():
        return JSONResponse(status_code=400, content={"error": "Report ID and Description are required."})

    if not clinical_modules.is_known(spec.specType):
        return JSONResponse(status_code=400, content={
            "error": f"Unknown spec type '{spec.specType}'. Known: {list(clinical_modules.MODULES.keys())}."
        })

    if not clinical_modules.is_known_listing_type(spec.specType, spec.listingType):
        return JSONResponse(status_code=400, content={
            "error": f"Unknown listing type '{spec.listingType}' for spec type '{spec.specType}'."
        })

    meta = study_setup.resolve(db_session, tenant_id, spec.studyId, spec.metadataVersion)
    meta_info = (
        {"studyId": meta.study_id, "version": meta.version, "items": len(meta.items)} if meta is not None else None
    )
    try:
        route = generation_router.resolve(
            spec.specTemplate, spec.edcSystem, spec.language,
            allow_unverified=allow_unverified, has_metadata=meta is not None,
        )
    except generation_router.GenerationUnavailable as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

    # If the client already has a spec_id from a prior /api/review call for this
    # exact spec, reuse that row instead of creating a duplicate Spec record.
    spec_row = store.get_spec(db_session, tenant_id, spec_id) if spec_id else None
    if spec_row is None:
        spec_row = store.create_spec(db_session, tenant_id, spec.as_dict())

    # Knowledge the run asked for. Built once; whether it was really used is decided per path below.
    kb = None
    if spec.useKnowledge:
        kb = knowledge_binding.build(db_session, tenant_id, spec.as_dict(), "generate", study_id=spec.studyId, edc=spec.edcSystem, language=spec.language)

    def knowledge_out(applied: bool):
        if kb is None:
            return knowledge_api.shadow(db_session, tenant_id, spec.as_dict(), study_id=spec.studyId, edc=spec.edcSystem, language=spec.language)
        return knowledge_binding.summary(kb, applied=applied)

    # === UNVERIFIED BETA path: SQL, R, or SAS -- all require explicit opt-in ===
    if route["is_beta"]:
        try:
            beta_spec = spec.as_dict()
            spec_text = " ".join(str(beta_spec.get(k, "")) for k in ("description", "columnHeading", "logic", "reportScenarios"))
            beta_spec["_context_block"] = edc_registry.context_block(spec.edcSystem, study_setup.prompt_block(meta, spec_text))
            if kb is not None:
                beta_spec["_context_block"] += kb["block"]
            result = generation_router.run_beta_generation(route["language"], beta_spec)
        except Exception as e:  # noqa: BLE001 -- each beta module's own AgentError subclass
            store.save_generation_run(db_session, tenant_id, spec_row.id, { "language": route["language"],"status": "error", "error": str(e)})
            return JSONResponse(status_code=502, content={"error": str(e)})

        guardrail_report = guardrails_module.run_guardrails(result.get("code", ""))  # structural checks only,
        # no CQL-specific @HDR/Subject-Site rules -- those don't apply to plain relational SQL/R/SAS
        cascade_trace = [{"tier": f"claude_beta_{route['language']}", "status": "ran", "detail": "UNVERIFIED BETA -- see explanation"}]

        store.save_generation_run(db_session, tenant_id, spec_row.id, { "language": route["language"],
            "cql": result.get("code"), "explanation": result.get("explanation"),
            "cascade_trace": cascade_trace, "guardrail_reports": [guardrail_report], "status": "generated",
        })
        return {
            "cql": result.get("code"),
            "explanation": result.get("explanation"),
            "retrieved_precedents": [],
            "cascade_trace": cascade_trace,
            "guardrail_reports": [guardrail_report],
            "specId": spec_row.id,
            "isBeta": True,
            "metadata": meta_info,
            "knowledge": knowledge_out(True),
        }

    # === Verified default path: Veeva CQL, full graph (Tier1->3->4->5->guardrails) ===
    if route["edc_system"] == "veeva" and route["language"] == "cql":
        precedent_store = _get_precedent_store_for_tenant(db_session, tenant_id)
        study_metadata_lookup = meta.lookup() if meta is not None else None
        confirmed_patterns = [
            store.learned_pattern_to_dict(p)
            for p in store.list_learned_patterns(db_session, tenant_id, confirmed_only=True)
        ]
        supporting_doc_rows = [
            store.spec_supporting_doc_to_dict(r)
            for r in store.get_spec_supporting_doc(db_session, tenant_id, spec.reportId.strip())
        ]
        cql_spec = spec.as_dict()
        if kb is not None:
            cql_spec["_knowledge_block"] = kb["block"]
        result = graph.run_generation_pipeline(
            cql_spec,
            spec_id=spec_row.id,
            tenant_id=tenant_id,
            force_generate=force_generate,
            precedent_store=precedent_store,
            study_metadata_lookup=study_metadata_lookup,
            learned_patterns=confirmed_patterns,
            supporting_doc=supporting_doc_rows,
        )
        retrieved_ids = [m["spec_id"] for m in result.get("retrieved_precedents", [])]

        store.save_generation_run(db_session, tenant_id, spec_row.id, { "language": route["language"],
            "cql": result.get("cql"),
            "explanation": result.get("explanation"),
            "retrieved_precedents": retrieved_ids,
            "cascade_trace": result.get("cascade_trace", []),
            "guardrail_reports": result.get("guardrail_reports", []),
            "status": result.get("status", "error"),
            "error": result.get("generation_error"),
        })

        if result.get("status") == "error":
            return JSONResponse(status_code=502, content={"error": result.get("generation_error", "Generation failed.")})

        return {
            "cql": result.get("cql"),
            "explanation": result.get("explanation"),
            "retrieved_precedents": retrieved_ids,
            "cascade_trace": result.get("cascade_trace", []),
            "guardrail_reports": result.get("guardrail_reports", []),
            "specId": spec_row.id,
            "metadata": meta_info,
            "knowledge": knowledge_out(any(str(t.get("tier", "")).startswith("claude") and t.get("status") == "ran" for t in result.get("cascade_trace", []))),
        }

    # === Any other verified-but-Tier1-only combo (currently: Veeva Python) ===
    # No Tier5 fallback exists here -- if the one Tier1 rule doesn't match,
    # there is genuinely nothing to generate from, and that's reported
    # honestly rather than silently falling through to a guessed prompt.
    if route["has_tier1"]:
        match = generation_router.apply_tier1(route["language"], spec.as_dict())
        cascade_trace = [{
            "tier": "rules",
            "status": "ran" if match else "not_matched",
            "detail": f"matched rule '{match['rule_name']}'" if match else "no deterministic rule matched this spec",
        }]
        if match is None:
            store.save_generation_run(db_session, tenant_id, spec_row.id, { "language": route["language"],
                "cascade_trace": cascade_trace, "status": "blocked_needs_review",
                "error": f"No Tier 1 rule matched, and language '{route['language']}' has no Tier 5 (Claude) fallback yet.",
            })
            return JSONResponse(status_code=200, content={
                "cql": None,
                "explanation": (
                    f"No deterministic rule matched this spec, and '{route['language']}' generation for "
                    f"'{route['edc_system']}' has no Claude-based fallback yet -- only a Tier 1 rule exists "
                    f"for this language today. See code_gen_registry.py."
                ),
                "cascade_trace": cascade_trace,
                "guardrail_reports": [],
                "specId": spec_row.id,
            })

        store.save_generation_run(db_session, tenant_id, spec_row.id, { "language": route["language"],
            "cql": match["cql"], "explanation": match["explanation"],
            "cascade_trace": cascade_trace, "status": "generated",
        })
        return {
            "cql": match["cql"],
            "explanation": match["explanation"],
            "retrieved_precedents": [],
            "cascade_trace": cascade_trace,
            "guardrail_reports": [],
            "specId": spec_row.id,
        }

    # generation_router.resolve() should have already refused anything reaching
    # here, but never silently generate with no matched path.
    return JSONResponse(status_code=500, content={"error": "Internal routing error -- no handler for a resolved route."})


@app.get("/api/specs")
def list_specs(db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = store.list_specs(db_session, tenant_id)
    ov = store.spec_overview(db_session, tenant_id, [r.id for r in rows])
    return [{**store.spec_to_dict(r), **ov[r.id]} for r in rows]


class HistoryImportIn(BaseModel):
    files: list[dict]
    dryRun: bool = True


@app.post("/api/specs/import")
def import_executed_specs(body: HistoryImportIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Executed-elsewhere specs with their review and code. dryRun (default) only reports what would be written."""
    try:
        rows = spec_history_import.parse_files(body.files)
    except spec_ingest.IngestError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if body.dryRun:
        return {"dryRun": True, "rows": [{"label": r["label"], "reportId": (r["spec"] or {}).get("reportId", ""), "hasReview": bool(r["review"]),
                                          "language": (r["code"] or {}).get("language", ""), "hasCode": bool(r["code"]), "error": r["error"]} for r in rows]}
    return {"dryRun": False, **spec_history_import.save(db_session, tenant_id, rows, store)}


@app.get("/api/specs/{spec_id}")
def get_spec(spec_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    row = store.get_spec(db_session, tenant_id, spec_id)
    if row is None:
        # Deliberately identical whether spec_id doesn't exist at all or belongs to
        # a different tenant -- a distinguishing error message would let a caller
        # probe for the existence of other tenants' spec_ids.
        raise HTTPException(status_code=404, detail="Spec not found.")
    return store.spec_to_dict(row)


@app.get("/api/specs/{spec_id}/reviews")
def get_spec_reviews(spec_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    return [store.review_to_dict(r) for r in store.list_reviews(db_session, tenant_id, spec_id)]


@app.get("/api/specs/{spec_id}/runs")
def get_spec_runs(spec_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    runs = store.list_generation_runs(db_session, tenant_id, spec_id)
    return [store.run_to_dict(r) for r in runs]


class PrecedentIn(BaseModel):
    spec_id: str
    description: str
    logic: str = ""
    report_scenarios: str = ""
    column_heading: str = ""
    cql: str
    notes: str = ""


@app.get("/api/training-corpus")
def training_corpus_endpoint(db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """The accumulated, confirmed-good training corpus for this tenant --
    see TrainingCorpusEntry's docstring for scope (populated only from
    explicit confirmation sources, never a raw generation attempt)."""
    rows = store.list_training_corpus(db_session, tenant_id)
    return [
        {
            "id": r.id, "spec_id": r.spec_id, "spec_features": r.spec_features,
            "chosen_tier": r.chosen_tier, "outcome_label": r.outcome_label,
            "guardrails_passed": r.guardrails_passed, "confirmation_source": r.confirmation_source,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in rows
    ]


class ModelRegisterIn(BaseModel):
    model_name: str
    metrics: dict = {}
    training_data_snapshot: dict = {}
    artifact_path: str = ""
    notes: str = ""


def _model_to_dict(m) -> dict:
    return {
        "id": m.id, "model_name": m.model_name, "version": m.version, "status": m.status,
        "metrics": m.metrics, "training_data_snapshot": m.training_data_snapshot,
        "artifact_path": m.artifact_path, "notes": m.notes,
        "trained_at": m.trained_at.isoformat() if m.trained_at else None,
        "promoted_at": m.promoted_at.isoformat() if m.promoted_at else None,
    }


@app.post("/api/models")
def register_model_endpoint(body: ModelRegisterIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Registers a new model version -- always starts in 'shadow'
    status. See store.register_model's docstring: promotion is a
    separate, explicit action, never automatic here."""
    if not body.model_name.strip():
        return JSONResponse(status_code=400, content={"error": "model_name is required."})
    row = store.register_model(
        db_session, tenant_id, body.model_name, body.metrics,
        body.training_data_snapshot, body.artifact_path, body.notes,
    )
    return _model_to_dict(row)


@app.get("/api/models")
def list_models_endpoint(model_name: str | None = None, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = store.list_models(db_session, tenant_id, model_name)
    return [_model_to_dict(r) for r in rows]


class ModelPromoteIn(BaseModel):
    status: str


@app.post("/api/models/{model_id}/promote")
def promote_model_endpoint(model_id: str, body: ModelPromoteIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """The explicit, audited governance action that changes a model's
    status -- same discipline as confirming a learned pattern. Promoting
    to 'active' atomically retires whatever version was previously
    active for the same model_name (see store.promote_model)."""
    try:
        row = store.promote_model(db_session, tenant_id, model_id, body.status)
    except ValueError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    if row is None:
        return JSONResponse(status_code=404, content={"error": "Model not found for this tenant."})
    return _model_to_dict(row)


@app.get("/api/observability/summary")
def observability_summary_endpoint(since_hours: int = 24, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Per-endpoint request counts, average latency, and error rate --
    see RequestLog's docstring for scope (a complement to a real APM
    like Application Insights, not a replacement)."""
    return store.get_observability_summary(db_session, tenant_id, since_hours)


@app.get("/api/audit-log/{table_name}/{record_id}")
def audit_log_history(
    table_name: str,
    record_id: str,
    db_session: Session = Depends(db.get_session),
    tenant_id: str = Depends(get_tenant_id),
):
    """Full chronological history of one record from the real,
    trigger-populated Postgres audit trail (see audit_trail.sql). Only
    meaningful once that script has been applied and the app is
    connecting as the least-privilege spec2code_app role -- against
    plain SQLite (local dev default) or a superuser connection, this
    just returns an empty list, since no triggers/audit_log exist there."""
    allowed_tables = {"specs", "spec_reviews", "generation_runs", "precedents", "learned_patterns"}
    if table_name not in allowed_tables:
        return JSONResponse(status_code=400, content={"error": f"table_name must be one of {sorted(allowed_tables)}"})
    try:
        history = store.get_audit_history(db_session, tenant_id, table_name, record_id)
    except Exception as e:  # noqa: BLE001 -- audit_log may not exist yet (SQLite, or script not applied)
        return JSONResponse(status_code=404, content={"error": f"Audit history unavailable: {e}. Has audit_trail.sql been applied to this database?"})
    return history


@app.get("/api/precedents")
def list_precedents_endpoint(db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = store.list_precedents(db_session, tenant_id)
    return [store.precedent_to_dict(r) for r in rows]


@app.post("/api/precedents")
def create_precedent_endpoint(precedent: PrecedentIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id), x_user_id: str | None = Header(default=None)):
    """Promotes a human-verified (spec, CQL) pair into this tenant's RAG
    corpus. There is deliberately no automatic path from a generation
    run to a precedent -- a human must call this endpoint, confirming
    the CQL is actually correct first. See rag_retriever.py's module
    docstring for why: feeding back unverified model output would let
    errors compound across future specs that happen to look similar.

    GUARDRAIL: the submitted CQL must pass the same structural checks
    generated output does (guardrails.py) before it can be saved. A
    "verified precedent" that itself violates the no-CTE/no-bare-table
    rules would get injected as a TRUSTED few-shot example into every
    future generation -- this is the single most important place to
    check, since one bad precedent can poison many future outputs, not
    just the one generation run it originally came from."""
    if not precedent.spec_id.strip() or not precedent.cql.strip():
        return JSONResponse(status_code=400, content={"error": "spec_id and cql are required."})

    guardrail_report = guardrails_module.run_guardrails(precedent.cql)
    if not guardrail_report["passed"]:
        failed = [c["check"] for c in guardrail_report["checks"] if not c["passed"]]
        return JSONResponse(
            status_code=400,
            content={
                "error": f"CQL failed guardrail checks and cannot be saved as a precedent: {failed}",
                "guardrail_report": guardrail_report,
            },
        )

    row = store.create_precedent(db_session, tenant_id, precedent.model_dump())

    # Automatic training-corpus population -- this IS the confirmation
    # signal (a human just verified this spec+code pair is correct), so
    # it's the right, and only automatic, place this table gets written
    # from a precedent. See TrainingCorpusEntry's docstring for why this
    # never happens from an unconfirmed generation run.
    spec_features = store.extract_spec_features({
        "description": precedent.description, "logic": precedent.logic,
        "reportScenarios": precedent.report_scenarios, "columnHeading": precedent.column_heading,
    })
    store.add_to_training_corpus(
        db_session, tenant_id, spec_id=precedent.spec_id, spec_features=spec_features,
        confirmation_source="precedent", outcome_label="verified_correct", guardrails_passed=True,
    )

    out = store.precedent_to_dict(row)
    # The same confirmation also puts the pair into the knowledge library (report scope), so it is found by similarity.
    try:
        import report_knowledge
        out["reportKnowledge"] = report_knowledge.save_verified(
            db_session, tenant_id, precedent.spec_id.strip(), precedent.description, precedent.column_heading, precedent.logic,
            precedent.report_scenarios, precedent.cql, precedent.notes, (x_user_id or "").strip()[:80] or "programmer")
    except Exception as e:  # noqa: BLE001 -- the precedent is saved either way; say what happened to the library copy
        out["reportKnowledge"] = {"error": str(e)}
    return out


@app.post("/api/crossref-spec-code")
def crossref_spec_code(body: dict):
    """Cross-references a spec against EXISTING, CONFIRMED-WORKING
    legacy code for that same report -- the systematic version of the
    manual pattern-extraction done once by hand earlier in this
    project. Returns proposed report-specific Logic enrichment plus any
    candidate GENERAL patterns found. Does NOT persist anything itself
    -- the client shows this for human review, then calls
    /api/learned-patterns to actually save a candidate pattern (still
    unconfirmed at that point -- see that endpoint's docstring)."""
    spec = body.get("spec")
    legacy_code = body.get("legacyCode", "")
    if not isinstance(spec, dict) or not spec.get("reportId", "").strip():
        return JSONResponse(status_code=400, content={"error": "A spec with Report ID is required."})
    if not legacy_code.strip():
        return JSONResponse(status_code=400, content={"error": "Paste or upload the existing legacy code for this report first."})
    try:
        result = spec_code_crossref_agent.run_crossref(spec, legacy_code)
    except spec_code_crossref_agent.AgentError as e:
        status_code = 500 if "ANTHROPIC_API_KEY" in str(e) else 502
        return JSONResponse(status_code=status_code, content={"error": str(e)})
    return result


class LearnedPatternIn(BaseModel):
    category: str = ""
    pattern_text: str
    source_report_id: str = ""


@app.get("/api/learned-patterns")
def list_learned_patterns_endpoint(db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = store.list_learned_patterns(db_session, tenant_id)
    return [store.learned_pattern_to_dict(r) for r in rows]


@app.post("/api/learned-patterns")
def create_learned_pattern_endpoint(pattern: LearnedPatternIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Saves a CANDIDATE pattern, always unconfirmed (confirmed=False).
    A candidate from /api/crossref-spec-code is not trusted just because
    the model proposed it -- it must be explicitly confirmed via
    /api/learned-patterns/{id}/confirm before generation prompts ever
    see it. This mirrors Save as Precedent's discipline exactly: nothing
    joins a trusted, generation-affecting corpus without an explicit,
    separate human action."""
    if not pattern.pattern_text.strip():
        return JSONResponse(status_code=400, content={"error": "pattern_text is required."})
    row = store.create_learned_pattern(db_session, tenant_id, pattern.model_dump())
    return store.learned_pattern_to_dict(row)


@app.post("/api/learned-patterns/{pattern_id}/confirm")
def confirm_learned_pattern_endpoint(pattern_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """The explicit human action that promotes a candidate pattern into
    one future generation prompts actually include (see
    cql_agents.build_generation_user_prompt and
    store.format_learned_patterns_block). This is the step that makes a
    pattern live -- everything before this is just a stored proposal."""
    row = store.confirm_learned_pattern(db_session, tenant_id, pattern_id)
    if row is None:
        return JSONResponse(status_code=404, content={"error": "Pattern not found for this tenant."})
    return store.learned_pattern_to_dict(row)


class StudyMetadataRow(BaseModel):
    form: str
    item: str
    label: str = ""
    data_type: str = ""


class StudyMetadataIn(BaseModel):
    study_id: str
    rows: list[StudyMetadataRow]


@app.post("/api/study-metadata")
def upload_study_metadata(
    body: StudyMetadataIn,
    db_session: Session = Depends(db.get_session),
    tenant_id: str = Depends(get_tenant_id),
):
    """Replaces ALL metadata for this tenant+study_id with the given
    rows -- re-uploading a corrected export doesn't accumulate
    duplicates. Once loaded, generation for any spec with a matching
    studyId gets grounded in these real Form/Item names instead of
    inferring from CDISC convention, and guardrails can check Form
    existence (see guardrails.py's run_guardrails_with_metadata)."""
    if not body.study_id.strip():
        return JSONResponse(status_code=400, content={"error": "study_id is required."})
    if not body.rows:
        return JSONResponse(status_code=400, content={"error": "At least one metadata row is required."})

    count = store.replace_study_metadata(
        db_session, tenant_id, body.study_id, [r.model_dump() for r in body.rows]
    )
    return {"study_id": body.study_id, "rows_loaded": count}


@app.post("/api/study-metadata/upload-csv")
def upload_study_metadata_csv(
    body: dict,
    db_session: Session = Depends(db.get_session),
    tenant_id: str = Depends(get_tenant_id),
):
    """Same as /api/study-metadata but accepts raw CSV text (the shape a
    real EDC metadata export or a pasted spreadsheet copy would actually
    be in) instead of pre-structured JSON rows. Expects a header row with
    columns named (case-insensitively) form/item, and optionally label/
    data_type -- extra columns are ignored rather than rejected, since a
    real export will usually have more columns than we need."""
    import csv
    import io

    study_id = (body.get("study_id") or "").strip()
    csv_text = body.get("csv_text") or ""
    if not study_id:
        return JSONResponse(status_code=400, content={"error": "study_id is required."})
    if not csv_text.strip():
        return JSONResponse(status_code=400, content={"error": "csv_text is required."})

    try:
        reader = csv.DictReader(io.StringIO(csv_text))
        if reader.fieldnames is None:
            return JSONResponse(status_code=400, content={"error": "Could not parse a header row from the CSV text."})
        field_map = {name.strip().lower(): name for name in reader.fieldnames}
        if "form" not in field_map or "item" not in field_map:
            return JSONResponse(
                status_code=400,
                content={"error": f"CSV must have 'form' and 'item' columns. Found: {reader.fieldnames}"},
            )
        rows = []
        for raw_row in reader:
            rows.append({
                "form": raw_row.get(field_map["form"], ""),
                "item": raw_row.get(field_map["item"], ""),
                "label": raw_row.get(field_map.get("label", ""), "") or "",
                "data_type": raw_row.get(field_map.get("data_type", field_map.get("type", "")), "") or "",
            })
    except csv.Error as e:
        return JSONResponse(status_code=400, content={"error": f"CSV parsing failed: {e}"})

    count = store.replace_study_metadata(db_session, tenant_id, study_id, rows)
    return {"study_id": study_id, "rows_loaded": count}


@app.get("/api/study-metadata/{study_id}")
def get_study_metadata_endpoint(study_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = store.get_study_metadata(db_session, tenant_id, study_id)
    return [store.study_metadata_to_dict(r) for r in rows]


@app.post("/api/report/{report_id}/supporting-doc/upload-csv")
def upload_spec_supporting_doc_csv(
    report_id: str,
    body: dict,
    db_session: Session = Depends(db.get_session),
    tenant_id: str = Depends(get_tenant_id),
):
    """Per-report supporting document upload (e.g. RID418_supp_doc.csv)
    -- complementary to /api/study-metadata/upload-csv, not a
    replacement. See SpecSupportingDocItem's docstring in models_db.py
    for the real column shape this is built against.

    Keyed by report_id (the Report ID field on the spec itself), NOT a
    generated spec row's id -- so it can be uploaded and used starting
    at Understand Logic, before any Review ever creates a persisted
    Spec row.

    Expects a header row with columns named (case-insensitively, spaces
    and underscores both tolerated) viewname/columnname, and optionally
    itemquestion/original itemquestion/controllevel/prefix -- extra
    columns are ignored rather than rejected, same discipline as the
    study-metadata upload."""
    import csv
    import io

    csv_text = body.get("csv_text") or ""
    if not csv_text.strip():
        return JSONResponse(status_code=400, content={"error": "csv_text is required."})

    def _norm(name: str) -> str:
        return name.strip().lower().replace(" ", "").replace("_", "")

    try:
        reader = csv.DictReader(io.StringIO(csv_text))
        if reader.fieldnames is None:
            return JSONResponse(status_code=400, content={"error": "Could not parse a header row from the CSV text."})
        field_map = {_norm(name): name for name in reader.fieldnames}
        if "viewname" not in field_map or "columnname" not in field_map:
            return JSONResponse(
                status_code=400,
                content={"error": f"CSV must have 'VIEWNAME' and 'COLUMNNAME' columns. Found: {reader.fieldnames}"},
            )
        rows = []
        for raw_row in reader:
            rows.append({
                "viewName": raw_row.get(field_map["viewname"], ""),
                "columnName": raw_row.get(field_map["columnname"], ""),
                "itemQuestion": raw_row.get(field_map.get("itemquestion", ""), "") or "",
                "originalItemQuestion": raw_row.get(field_map.get("originalitemquestion", ""), "") or "",
                "controlLevel": raw_row.get(field_map.get("controllevel", ""), "") or "",
                "prefix": raw_row.get(field_map.get("prefix", ""), "") or "",
            })
    except csv.Error as e:
        return JSONResponse(status_code=400, content={"error": f"CSV parsing failed: {e}"})

    count = store.replace_spec_supporting_doc(db_session, tenant_id, report_id, rows)
    return {"report_id": report_id, "rows_loaded": count}


@app.get("/api/report/{report_id}/supporting-doc")
def get_spec_supporting_doc_endpoint(report_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = store.get_spec_supporting_doc(db_session, tenant_id, report_id)
    return [store.spec_supporting_doc_to_dict(r) for r in rows]


# =====================================================================
# Study setup: studies, versioned metadata, completeness checks, pre-flight.
# =====================================================================
class StudyIn(BaseModel):
    studyId: str
    name: str = ""
    edcSystem: str = edc_registry.DEFAULT_EDC
    ta: str = ""
    sponsor: str = ""


class StudyPatch(BaseModel):
    name: str | None = None
    ta: str | None = None
    sponsor: str | None = None


class MetadataUpload(BaseModel):
    files: list[dict]
    notes: str = ""
    carryOver: bool = True


def _study_or_404(db_session: Session, tenant_id: str, study_id: str):
    s = study_setup._get_study(db_session, tenant_id, study_id)
    if s is None:
        raise HTTPException(status_code=404, detail="Study not found.")
    return s


@app.get("/api/studies")
def studies_list(db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    rows = db_session.query(study_setup.m.Study).filter_by(tenant_id=tenant_id).order_by(study_setup.m.Study.study_id).all()
    return [study_setup.study_summary(s) for s in rows]


@app.post("/api/studies")
def studies_create(body: StudyIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    if not edc_registry.is_known(body.edcSystem):
        return JSONResponse(status_code=400, content={"error": f"Unknown EDC system '{body.edcSystem}'."})
    try:
        s = study_setup.create_study(db_session, tenant_id, body.studyId, body.name, body.edcSystem, body.ta, body.sponsor)
    except study_setup.StudyError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    return study_setup.study_summary(s)


def _dropped(v) -> int:
    try:
        return int(json.loads(v.counts_json or "{}").get("duplicatesDropped", 0))
    except Exception:
        return 0


@app.get("/api/studies/{study_id}")
def studies_get(study_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    s = _study_or_404(db_session, tenant_id, study_id)
    out = study_setup.study_summary(s)
    out["versionList"] = [study_setup.version_summary(v, v.version == s.active_version)
                          for v in sorted(s.versions, key=lambda v: -v.version)]
    v = study_setup.get_version(s)
    if v is not None:
        rows = study_setup._version_rows(v)
        out["checks"] = study_setup.checks(rows["items"], rows["visits"], rows["codelists"], _dropped(v))
    return out


@app.patch("/api/studies/{study_id}")
def studies_patch(study_id: str, body: StudyPatch, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    s = _study_or_404(db_session, tenant_id, study_id)
    if body.name is not None:
        s.name = body.name.strip()[:200]
    if body.ta is not None:
        s.ta = body.ta.strip()[:100]
    if body.sponsor is not None:
        s.sponsor = body.sponsor.strip()[:100]
    db_session.commit()
    return study_setup.study_summary(s)


@app.delete("/api/studies/{study_id}")
def studies_delete(study_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    s = _study_or_404(db_session, tenant_id, study_id)
    db_session.delete(s)
    db_session.commit()
    return {"deleted": True}


@app.post("/api/studies/{study_id}/metadata")
def studies_upload_metadata(study_id: str, body: MetadataUpload, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Reads uploaded CSV/XLSX files and stores them as a NEW version. Nothing is
    stored when no items can be read from the upload and no earlier version exists."""
    s = _study_or_404(db_session, tenant_id, study_id)
    try:
        parsed = study_setup.parse_files(body.files)
    except study_setup.StudyError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    if not any(parsed[k] for k in ("items", "visits", "codelists")):
        return JSONResponse(status_code=400, content={"error": "Nothing usable was read from the upload.", "messages": parsed["messages"]})
    v = study_setup.add_version(db_session, s, parsed, body.notes, [str(f.get("name", "")) for f in body.files], body.carryOver)
    rows = study_setup._version_rows(v)
    return {"version": study_setup.version_summary(v, True), "messages": parsed["messages"],
            "checks": study_setup.checks(rows["items"], rows["visits"], rows["codelists"], _dropped(v))}


@app.post("/api/studies/{study_id}/versions/{version}/activate")
def studies_activate(study_id: str, version: int, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    s = _study_or_404(db_session, tenant_id, study_id)
    if study_setup.get_version(s, version) is None:
        raise HTTPException(status_code=404, detail="Version not found.")
    s.active_version = version
    db_session.commit()
    return study_setup.study_summary(s)


@app.get("/api/studies/{study_id}/items")
def studies_items(study_id: str, version: int | None = None, form: str = "", q: str = "", limit: int = 300,
                  db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Browse a version: the form list always, and the items for one form or a search."""
    s = _study_or_404(db_session, tenant_id, study_id)
    v = study_setup.get_version(s, version)
    if v is None:
        return {"version": None, "forms": [], "items": []}
    items = study_setup._version_rows(v)["items"]
    forms: dict = {}
    for i in items:
        f = forms.setdefault(i["form"], {"form": i["form"], "label": i["form_label"], "items": 0})
        f["items"] += 1
    ql = q.strip().lower()
    shown = [i for i in items if (not form or i["form"] == form) and
             (not ql or ql in i["item"].lower() or ql in i["label"].lower() or ql in i["form"].lower())]
    return {"version": v.version, "forms": sorted(forms.values(), key=lambda f: f["form"]),
            "items": shown[: max(1, min(limit, 2000))], "total": len(shown)}


class PreflightListing(BaseModel):
    key: str
    studyId: str = ""
    spec: dict | None = None
    rawText: str | None = None


class PreflightIn(BaseModel):
    studyId: str = ""
    metadataVersion: int | None = None
    listings: list[PreflightListing]


@app.post("/api/preflight")
def preflight(body: PreflightIn, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Heuristic check of FORM.Item references against study metadata, BEFORE any
    model call is spent. Never blocks anything."""
    cache: dict = {}
    out = []
    for l in body.listings[:2000]:
        sid = (l.studyId or body.studyId).strip()
        if sid not in cache:
            cache[sid] = study_setup.resolve(db_session, tenant_id, sid, body.metadataVersion if sid == body.studyId.strip() else None) if sid else None
        spec = l.spec or {}
        text = l.rawText or " ".join(str(spec.get(k, "")) for k in ("description", "columnHeading", "logic", "reportScenarios"))
        res = study_setup.preflight(cache[sid], text)
        res.update({"key": l.key, "studyId": sid})
        out.append(res)
    return {"results": out}


# =====================================================================
# Batch runs: many listings through the pipeline in parallel.
# The engine lives in batch_engine.py; these endpoints are a thin wrapper,
# and the three registered stage functions below are the SAME cores the
# single-listing endpoints use, so batch output matches the Workspace.
# =====================================================================
import batch_engine  # noqa: E402
import spec_ingest  # noqa: E402


def _unwrap(resp):
    """Cores return either a dict or a JSONResponse (their error path)."""
    if isinstance(resp, JSONResponse):
        body = json.loads(resp.body or b"{}")
        if resp.status_code >= 400:
            raise batch_engine.StageError(body.get("error") or f"Request failed ({resp.status_code}).")
        return body
    return resp


def _batch_extract(raw_text: str) -> dict:
    try:
        return spec_extraction_agent.run_spec_extraction(raw_text)
    except spec_extraction_agent.AgentError as e:
        raise batch_engine.StageError(str(e)) from e


def _batch_understand(spec: dict, session: Session, tenant_id: str) -> dict:
    return _unwrap(_understand_core(ReportSpec(**spec), session, tenant_id))


def _batch_review(spec: dict, session: Session, tenant_id: str) -> dict:
    return _unwrap(_review_core(ReportSpec(**spec), session, tenant_id))


def _batch_generate(spec: dict, spec_id: str | None, allow_unverified: bool, session: Session, tenant_id: str) -> dict:
    return _unwrap(_generate_core(ReportSpec(**spec), spec_id, True, allow_unverified, session, tenant_id))


batch_engine.register_pipeline(
    extract=_batch_extract, understand=_batch_understand, review=_batch_review, generate=_batch_generate,
)
batch_engine.recover_interrupted()


class BatchOptions(BaseModel):
    language: str = "cql"
    edcSystem: str = "veeva"
    specType: str = clinical_modules.DEFAULT_MODULE_ID
    listingType: str = ""
    specTemplate: str = "merck_cdisc_report_library"
    studyId: str = ""
    metadataVersion: int | None = None
    allowUnverified: bool = False
    concurrency: int = 4
    runUnderstanding: bool = False
    runReview: bool = True
    useKnowledge: bool = False
    onBlocked: str = "skip"  # "skip" | "generate"
    autoRetry: bool = True


class BatchItemIn(BaseModel):
    name: str = ""
    studyId: str = ""  # report-wise metadata: overrides the batch's study for this listing
    spec: dict | None = None
    rawText: str | None = None


class BatchCreate(BaseModel):
    name: str = ""
    options: BatchOptions = BatchOptions()
    items: list[BatchItemIn]


class UploadFiles(BaseModel):
    files: list[dict]


class ScanFolder(BaseModel):
    path: str
    recursive: bool = True


@app.post("/api/batch/parse")
def batch_parse(body: UploadFiles):
    """Reads uploaded files (sent base64 in JSON, so no extra multipart
    dependency) into candidate listings. Creates nothing."""
    try:
        return spec_ingest.parse_uploads(body.files)
    except spec_ingest.IngestError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


@app.post("/api/batch/scan")
def batch_scan(body: ScanFolder):
    """Reads a folder on the SERVER. Disabled unless SPEC2CODE_SPEC_ROOTS names the allowed roots."""
    try:
        return spec_ingest.scan_folder(body.path, body.recursive)
    except spec_ingest.IngestError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


@app.post("/api/batch")
def batch_create(body: BatchCreate, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    opts = body.options
    if not os.environ.get("ANTHROPIC_API_KEY"):
        return JSONResponse(status_code=500, content={"error": "ANTHROPIC_API_KEY is not set. Add it to .env and restart the server."})
    if not clinical_modules.is_known(opts.specType):
        return JSONResponse(status_code=400, content={"error": f"Unknown spec type '{opts.specType}'."})
    if not clinical_modules.is_known_listing_type(opts.specType, opts.listingType):
        return JSONResponse(status_code=400, content={"error": f"Unknown listing type '{opts.listingType}' for spec type '{opts.specType}'."})
    if opts.onBlocked not in ("skip", "generate"):
        return JSONResponse(status_code=400, content={"error": "onBlocked must be 'skip' or 'generate'."})
    items = [i.model_dump() for i in body.items if i.spec or (i.rawText and i.rawText.strip())]
    for i in items:  # a study column in a spec file is a report-wise override too
        i["studyId"] = (i["studyId"] or (i["spec"] or {}).get("studyId") or "").strip()
    # Which studies have metadata? A listing's study is its own override, else the batch's.
    study_ids = {opts.studyId.strip()} | {(i["studyId"] or "").strip() for i in items}
    resolved = {sid: study_setup.resolve(db_session, tenant_id, sid) for sid in study_ids if sid}
    batch_meta = resolved.get(opts.studyId.strip())
    missing = [i for i in items if not resolved.get((i["studyId"] or opts.studyId).strip())]
    grounded_needed = generation_router.grounded_draft_possible(opts.edcSystem, opts.language, True)
    try:
        generation_router.resolve(
            opts.specTemplate, opts.edcSystem, opts.language, allow_unverified=opts.allowUnverified,
            has_metadata=grounded_needed and not missing and bool(items),
        )
    except generation_router.GenerationUnavailable as e:
        extra = (f" {len(missing)} listing(s) have no study metadata. Pick a study with metadata for the batch, or per listing."
                 if grounded_needed and missing else "")
        return JSONResponse(status_code=400, content={"error": str(e) + extra})
    options = opts.model_dump()
    options["concurrency"] = max(1, min(batch_engine.MAX_JOB_CONCURRENCY, opts.concurrency))
    if batch_meta is not None and options.get("metadataVersion") is None:
        options["metadataVersion"] = batch_meta.version  # pin: later uploads do not change a run in progress
    try:
        job = batch_engine.create_job(db_session, tenant_id, body.name, options, items)
    except ValueError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    batch_engine.start(job.id, tenant_id)
    return batch_engine.job_summary(job)


@app.get("/api/batch")
def batch_list(db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    return [batch_engine.job_summary(j) for j in batch_engine.list_jobs(db_session, tenant_id)]


def _job_or_404(db_session: Session, tenant_id: str, job_id: str):
    job = batch_engine.get_job(db_session, tenant_id, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Batch not found.")
    return job


@app.get("/api/batch/{job_id}")
def batch_get(job_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    return batch_engine.job_detail(_job_or_404(db_session, tenant_id, job_id))


@app.get("/api/batch/{job_id}/items/{item_id}")
def batch_item(job_id: str, item_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    job = _job_or_404(db_session, tenant_id, job_id)
    row = next((r for r in job.items if r.id == item_id), None)
    if row is None:
        raise HTTPException(status_code=404, detail="Listing not found.")
    return batch_engine.item_detail(row, batch_engine._load(job.options_json).get("language", ""))


class BatchRetry(BaseModel):
    itemIds: list[str] | None = None
    generateAnyway: bool = False


@app.post("/api/batch/{job_id}/retry")
def batch_retry(job_id: str, body: BatchRetry = BatchRetry(), db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    """Re-queues failed, cancelled, interrupted and blocked listings (or just the ids given)."""
    job = _job_or_404(db_session, tenant_id, job_id)
    if batch_engine.is_active(job_id):
        return JSONResponse(status_code=409, content={"error": "This batch is still running. Cancel it first, or wait for it to finish."})
    if body.generateAnyway:
        options = batch_engine._load(job.options_json) or {}
        options["onBlocked"] = "generate"
        job.options_json = json.dumps(options)
    ids = batch_engine.prepare_retry(db_session, job, body.itemIds)
    if not ids:
        return JSONResponse(status_code=400, content={"error": "Nothing to retry."})
    batch_engine.start(job_id, tenant_id, ids)
    return {"queued": len(ids)}


@app.post("/api/batch/{job_id}/cancel")
def batch_cancel(job_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    _job_or_404(db_session, tenant_id, job_id)
    batch_engine.cancel(job_id)
    return {"cancelling": True}


@app.delete("/api/batch/{job_id}")
def batch_delete(job_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    job = _job_or_404(db_session, tenant_id, job_id)
    batch_engine.delete_job(db_session, job)
    return {"deleted": True}


@app.get("/api/batch/{job_id}/download")
def batch_download(job_id: str, db_session: Session = Depends(db.get_session), tenant_id: str = Depends(get_tenant_id)):
    from fastapi.responses import Response

    job = _job_or_404(db_session, tenant_id, job_id)
    safe = batch_engine._safe_name(job.name or "batch")
    return Response(
        content=batch_engine.build_zip(job), media_type="application/zip",
        headers={"Content-Disposition": f'attachment; filename="{safe}.zip"'},
    )


# Serve the static UI. Mounted last so it doesn't shadow /api/generate or /api/review.
app.mount("/", StaticFiles(directory="static", html=True), name="static")
