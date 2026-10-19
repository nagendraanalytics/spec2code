"""
batch_engine.py — run many listings through the pipeline in parallel.

Shape of the design:
  * Several batch jobs can run at once. Every job has its own concurrency cap
    (how many of ITS listings are in flight), and all jobs share one worker
    pool (BATCH_MAX_WORKERS, default 8) so the server as a whole stays bounded.
  * A job is persisted (BatchJob / BatchItem rows). Progress is read from the
    database, so the UI can poll, and a server reload cannot lose finished work.
  * Each listing runs: [extract] -> [understand] -> [review] -> generate.
    Extract is only for raw-text listings, understand and review are optional.
    A review with blocking findings can either skip generation (default,
    status "needs_attention") or be overridden by the run options.
  * The pipeline itself is NOT reimplemented here. main.py registers the same
    functions the single-listing endpoints use (register_pipeline), so a batch
    result is exactly what the Workspace would have produced for that listing.

Nothing here writes to the trusted precedent store: generated code stays a
draft until a programmer confirms it, same rule as the single-listing flow.
"""

from __future__ import annotations

import csv
import io
import json
import os
import re
import threading
import time
import zipfile
from concurrent.futures import ThreadPoolExecutor, wait
from datetime import datetime, timezone
from typing import Callable, Optional

from sqlalchemy.orm import Session

import db
import models_db

MAX_WORKERS = max(1, int(os.environ.get("BATCH_MAX_WORKERS", "8")))
MAX_ITEMS_PER_JOB = int(os.environ.get("BATCH_MAX_ITEMS", "1000"))
MAX_JOB_CONCURRENCY = 16

ACTIVE_ITEM = {"pending", "running"}
RETRYABLE = {"failed", "cancelled", "interrupted", "pending", "needs_attention"}
FILE_EXT = {"cql": "cql", "sql": "sql", "sas": "sas", "r": "R", "python": "py"}


class StageError(Exception):
    """A pipeline stage failed with a user-readable message."""


_pipeline: dict[str, Callable] = {}
_pool = ThreadPoolExecutor(max_workers=MAX_WORKERS, thread_name_prefix="batch")
_runtime: dict[str, "_Runtime"] = {}
_runtime_lock = threading.Lock()


class _Runtime:
    def __init__(self) -> None:
        self.cancel = threading.Event()
        self.thread: Optional[threading.Thread] = None


def register_pipeline(**fns: Callable) -> None:
    """extract(raw_text) -> dict; understand(spec, session, tenant) -> dict;
    review(spec, session, tenant) -> dict; generate(spec, spec_id, allow_unverified, session, tenant) -> dict.
    Each raises StageError with a readable message on failure."""
    _pipeline.update(fns)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _dump(value) -> str:
    return json.dumps(value, ensure_ascii=False)


def _load(text: str):
    if not text:
        return None
    try:
        return json.loads(text)
    except ValueError:
        return None


# ---------------------------------------------------------------- creation

def create_job(session: Session, tenant_id: str, name: str, options: dict, items: list[dict]) -> models_db.BatchJob:
    if not items:
        raise ValueError("Select at least one listing.")
    if len(items) > MAX_ITEMS_PER_JOB:
        raise ValueError(f"A batch can hold at most {MAX_ITEMS_PER_JOB} listings; got {len(items)}.")
    job = models_db.BatchJob(tenant_id=tenant_id, name=name.strip() or "Batch run", options_json=_dump(options), status="running")
    session.add(job)
    session.flush()
    for i, it in enumerate(items):
        spec = it.get("spec")
        session.add(models_db.BatchItem(
            job_id=job.id, tenant_id=tenant_id, position=i,
            name=str(it.get("name") or it.get("reportId") or f"listing {i + 1}")[:300],
            report_id=str((spec or {}).get("reportId") or it.get("reportId") or "")[:200],
            spec_json=_dump(spec) if spec else "", raw_text=it.get("rawText") or "",
            study_id=(it.get("studyId") or "").strip(), status="pending",
        ))
    session.commit()
    return job


def start(job_id: str, tenant_id: str, item_ids: Optional[list[str]] = None) -> None:
    """Start (or restart) dispatching a job's pending listings."""
    with _runtime_lock:
        existing = _runtime.get(job_id)
        if existing and existing.thread and existing.thread.is_alive():
            return
        rt = _Runtime()
        _runtime[job_id] = rt
        t = threading.Thread(target=_dispatch, args=(job_id, tenant_id, item_ids, rt), daemon=True, name=f"batch-{job_id[:8]}")
        rt.thread = t
    t.start()


def cancel(job_id: str) -> None:
    rt = _runtime.get(job_id)
    if rt:
        rt.cancel.set()


def is_active(job_id: str) -> bool:
    rt = _runtime.get(job_id)
    return bool(rt and rt.thread and rt.thread.is_alive())


# --------------------------------------------------------------- execution

def _dispatch(job_id: str, tenant_id: str, item_ids: Optional[list[str]], rt: _Runtime) -> None:
    session = db.SessionLocal()
    try:
        job = session.get(models_db.BatchJob, job_id)
        if job is None or job.tenant_id != tenant_id:
            return
        options = _load(job.options_json) or {}
        job.status = "running"
        job.finished_at = None
        q = session.query(models_db.BatchItem).filter_by(job_id=job_id, tenant_id=tenant_id)
        q = q.filter(models_db.BatchItem.status.in_(["pending", "interrupted"]))
        if item_ids:
            q = q.filter(models_db.BatchItem.id.in_(item_ids))
        todo = [r.id for r in q.order_by(models_db.BatchItem.position).all()]
        session.commit()
    finally:
        session.close()

    concurrency = max(1, min(MAX_JOB_CONCURRENCY, int(options.get("concurrency", 4))))
    sem = threading.Semaphore(concurrency)
    futures = []
    for item_id in todo:
        if rt.cancel.is_set():
            break
        sem.acquire()
        if rt.cancel.is_set():
            sem.release()
            break
        fut = _pool.submit(_run_item, item_id, tenant_id, options, rt)
        fut.add_done_callback(lambda _f: sem.release())
        futures.append(fut)
    wait(futures)

    session = db.SessionLocal()
    try:
        job = session.get(models_db.BatchJob, job_id)
        if job is None:
            return
        if rt.cancel.is_set():
            for row in session.query(models_db.BatchItem).filter(
                models_db.BatchItem.job_id == job_id, models_db.BatchItem.tenant_id == tenant_id,
                models_db.BatchItem.id.in_(todo), models_db.BatchItem.status == "pending",
            ):
                row.status = "cancelled"
                row.finished_at = _now()
            job.status = "cancelled"
        else:
            job.status = "finished"
        job.finished_at = _now()
        session.commit()
    finally:
        session.close()


def _is_transient(message: str) -> bool:
    m = message.lower()
    if "api_key" in m or "required" in m or "no verified generation path" in m:
        return False
    return any(w in m for w in ("overload", "rate", "timeout", "timed out", "connection", "502", "503", "529", "request failed", "cut off"))


def _run_item(item_id: str, tenant_id: str, options: dict, rt: _Runtime) -> None:
    session = db.SessionLocal()
    try:
        row = session.get(models_db.BatchItem, item_id)
        if row is None or row.tenant_id != tenant_id or row.status not in ("pending", "interrupted"):
            return
        if rt.cancel.is_set():
            row.status = "cancelled"
            row.finished_at = _now()
            session.commit()
            return
        row.status, row.stage, row.error, row.started_at, row.finished_at = "running", "", "", _now(), None
        row.attempts = (row.attempts or 0) + 1
        session.commit()
        try:
            _process(session, row, tenant_id, options)
        except StageError as e:
            session.rollback()
            row = session.get(models_db.BatchItem, item_id)
            row.status, row.error = "failed", str(e)
        except Exception as e:  # noqa: BLE001 - one bad listing must never take the batch down
            session.rollback()
            row = session.get(models_db.BatchItem, item_id)
            row.status, row.error = "failed", f"Unexpected error: {e}"
        row.finished_at = _now()
        session.commit()
    finally:
        session.close()


def _stage(session: Session, row: models_db.BatchItem, name: str) -> None:
    row.stage = name
    session.commit()


def _with_retry(options: dict, fn: Callable):
    try:
        return fn()
    except StageError as e:
        if options.get("autoRetry", True) and _is_transient(str(e)):
            time.sleep(3)
            return fn()
        raise


SPEC_DEFAULT_KEYS = ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting"]


def _process(session: Session, row: models_db.BatchItem, tenant_id: str, options: dict) -> None:
    spec = _load(row.spec_json)

    if spec is None:
        if not row.raw_text.strip():
            raise StageError("Listing has no content to read.")
        _stage(session, row, "extract")
        extracted = _with_retry(options, lambda: _pipeline["extract"](row.raw_text))
        spec = {k: str(extracted.get(k) or "") for k in SPEC_DEFAULT_KEYS}
        if not spec["reportId"].strip():
            spec["reportId"] = os.path.splitext(os.path.basename(row.name))[0]
        row.spec_json = _dump(spec)
        row.report_id = spec["reportId"][:200]
        session.commit()

    if not str(spec.get("reportId", "")).strip() or not str(spec.get("description", "")).strip():
        raise StageError("Report ID and description are required.")

    # Batch-level choices apply to every listing in the run.
    full = dict(spec)
    full.update({
        "specTemplate": options.get("specTemplate") or "merck_cdisc_report_library",
        "edcSystem": options.get("edcSystem") or "veeva",
        "language": options.get("language") or "cql",
        "specType": options.get("specType") or "edc_cdm_listing",
        "listingType": options.get("listingType") or "",
        "useKnowledge": bool(options.get("useKnowledge")),
        # report-wise study beats the batch's study; a pinned version only applies to the batch's own study
        "studyId": (row.study_id or "").strip() or options.get("studyId") or "",
        "metadataVersion": None if (row.study_id or "").strip() else options.get("metadataVersion"),
    })

    if options.get("runUnderstanding"):
        _stage(session, row, "understand")
        row.understanding_json = _dump(_with_retry(options, lambda: _pipeline["understand"](full, session, tenant_id)))
        session.commit()

    spec_id = None
    if options.get("runReview", True):
        _stage(session, row, "review")
        review = _with_retry(options, lambda: _pipeline["review"](full, session, tenant_id))
        row.review_json = _dump(review)
        spec_id = review.get("specId")
        session.commit()
        if review.get("readiness") == "needs_revision" and options.get("onBlocked", "skip") == "skip":
            row.status = "needs_attention"
            row.error = "Review found blocking issues, so generation was skipped. Fix the spec, or re-run with 'generate anyway'."
            return

    _stage(session, row, "generate")
    result = _with_retry(
        options,
        lambda: _pipeline["generate"](full, spec_id, bool(options.get("allowUnverified")), session, tenant_id),
    )
    row.result_json = _dump(result)
    if not result.get("cql"):
        row.status = "needs_attention"
        row.error = "No code was produced. " + str(result.get("explanation") or "")[:300]
    else:
        row.status = "done"
        row.error = ""


# ------------------------------------------------------------------- reads

def _item_summary(r: models_db.BatchItem, language: str) -> dict:
    review = _load(r.review_json) or {}
    result = _load(r.result_json) or {}
    guard = (result.get("guardrail_reports") or [None])[-1]
    return {
        "id": r.id, "position": r.position, "name": r.name, "reportId": r.report_id,
        "status": r.status, "stage": r.stage, "error": r.error or "", "attempts": r.attempts or 0,
        "readiness": review.get("readiness"),
        "studyId": (r.study_id or "") or ((_load(r.spec_json) or {}).get("studyId") or ""),
        "metadata": result.get("metadata"),
        "hasCode": bool(result.get("cql")),
        "isBeta": bool(result.get("isBeta")),
        "guardrailsPassed": (guard or {}).get("passed") if guard else None,
        "language": language,
        "durationMs": int((r.finished_at - r.started_at).total_seconds() * 1000)
        if r.finished_at and r.started_at else None,
    }


def _counts(items: list[models_db.BatchItem]) -> dict:
    c = {k: 0 for k in ("pending", "running", "done", "needs_attention", "failed", "cancelled", "interrupted")}
    for r in items:
        c[r.status] = c.get(r.status, 0) + 1
    c["total"] = len(items)
    return c


def job_summary(job: models_db.BatchJob) -> dict:
    options = _load(job.options_json) or {}
    return {
        "id": job.id, "name": job.name, "status": job.status, "options": options,
        "createdAt": job.created_at.isoformat() if job.created_at else None,
        "finishedAt": job.finished_at.isoformat() if job.finished_at else None,
        "counts": _counts(job.items),
        "active": is_active(job.id),
    }


def job_detail(job: models_db.BatchJob) -> dict:
    out = job_summary(job)
    lang = out["options"].get("language", "")
    out["items"] = [_item_summary(r, lang) for r in sorted(job.items, key=lambda r: r.position)]
    return out


def item_detail(row: models_db.BatchItem, language: str) -> dict:
    out = _item_summary(row, language)
    out.update({
        "spec": _load(row.spec_json), "understanding": _load(row.understanding_json),
        "review": _load(row.review_json), "result": _load(row.result_json),
    })
    return out


def get_job(session: Session, tenant_id: str, job_id: str) -> Optional[models_db.BatchJob]:
    job = session.get(models_db.BatchJob, job_id)
    return job if job is not None and job.tenant_id == tenant_id else None


def list_jobs(session: Session, tenant_id: str) -> list[models_db.BatchJob]:
    return (session.query(models_db.BatchJob).filter_by(tenant_id=tenant_id)
            .order_by(models_db.BatchJob.created_at.desc()).limit(100).all())


def delete_job(session: Session, job: models_db.BatchJob) -> None:
    cancel(job.id)
    session.delete(job)
    session.commit()


def prepare_retry(session: Session, job: models_db.BatchJob, item_ids: Optional[list[str]]) -> list[str]:
    """Reset failed / cancelled / interrupted / blocked listings to pending."""
    ids = []
    for r in job.items:
        if item_ids is not None and r.id not in item_ids:
            continue
        if r.status in RETRYABLE and r.status != "pending":
            r.status, r.error, r.stage, r.finished_at = "pending", "", "", None
            ids.append(r.id)
        elif r.status == "pending":
            ids.append(r.id)
    session.commit()
    return ids


def recover_interrupted() -> int:
    """Called once at startup: work that was in flight when the server stopped
    is marked interrupted so the user can resume it, never silently lost."""
    session = db.SessionLocal()
    try:
        n = 0
        for job in session.query(models_db.BatchJob).filter(models_db.BatchJob.status == "running"):
            job.status = "interrupted"
            n += 1
            for r in job.items:
                if r.status == "running":
                    r.status = "interrupted"
        session.commit()
        return n
    except Exception:  # noqa: BLE001 - e.g. tables not created yet on an old database file
        session.rollback()
        return 0
    finally:
        session.close()


# ------------------------------------------------------------------ export

def _safe_name(text: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "_", text).strip("._")
    return cleaned[:80] or "listing"


def build_zip(job: models_db.BatchJob) -> bytes:
    options = _load(job.options_json) or {}
    ext = FILE_EXT.get(options.get("language", ""), "txt")
    buf = io.BytesIO()
    manifest = io.StringIO()
    w = csv.writer(manifest)
    w.writerow(["report_id", "status", "stage", "readiness", "verified_path", "guardrails_passed", "study", "metadata_version", "file", "error"])
    used: set[str] = set()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        for r in sorted(job.items, key=lambda r: r.position):
            review = _load(r.review_json) or {}
            result = _load(r.result_json) or {}
            guard = (result.get("guardrail_reports") or [None])[-1]
            fname = ""
            if result.get("cql"):
                base = _safe_name(r.report_id or r.name)
                fname, n = f"{base}.{ext}", 2
                while fname.lower() in used:
                    fname, n = f"{base}_{n}.{ext}", n + 1
                used.add(fname.lower())
                z.writestr(fname, result["cql"])
                if result.get("explanation"):
                    z.writestr(f"notes/{fname.rsplit('.', 1)[0]}.md", str(result["explanation"]))
            w.writerow([
                r.report_id, r.status, r.stage, review.get("readiness", ""),
                "no (draft)" if result.get("isBeta") else ("yes" if result else ""),
                "" if guard is None else guard.get("passed"),
                (result.get("metadata") or {}).get("studyId", ""), (result.get("metadata") or {}).get("version", ""),
                fname, (r.error or "").replace("\n", " "),
            ])
        z.writestr("manifest.csv", manifest.getvalue())
    return buf.getvalue()
