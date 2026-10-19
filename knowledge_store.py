"""knowledge_store.py - the knowledge library and its retrieval.

Trust model: a source starts as a DRAFT and is invisible to retrieval until a
person approves it. Retrieval honours the scope chain (global, then the
study's therapeutic area, then the study) and prefers the more specific scope.

Search here is hybrid (vector plus keyword) computed in Python over the
candidate chunks, which is fine at library scale. At production scale the same
filter-then-rank is done in Postgres with pgvector and full-text search; see
schema_knowledge_postgres.sql.
"""

import hashlib
import math
import os
import re
from datetime import datetime, timezone
from typing import Optional

import numpy as np
from sqlalchemy import func
from sqlalchemy.orm import Session

import embeddings
import holdout
import knowledge_ingest as ki
import models_db as m

SCOPES = ("global", "sponsor", "ta", "study", "report")
STATUSES = ("draft", "approved", "retired")
SCOPE_BOOST = {"report": 1.25, "study": 1.15, "ta": 1.07, "sponsor": 1.10, "global": 1.0}
KB_DIR = os.environ.get("SPEC2CODE_KB_DIR", "kb_files")
_STOP = set("the a an of to in on for and or is are be by with from as at it this that these those not no if then than into its their which when where who whom what".split())


def _now():
    return datetime.now(timezone.utc)


def _tokens(text: str) -> list:
    return [t for t in re.findall(r"[a-z0-9_.]{2,}", (text or "").lower()) if t not in _STOP]


class KbError(Exception):
    pass


# ---------------------------------------------------------------- report context

def report_context(db: Session, tenant_id: str, ref: str) -> str:
    """The spec text of the report a source belongs to, taken from the Spec library when that report is there.
    It is added to the text that is embedded and keyword-matched, so a report's code and notes are found by
    specs that describe the same thing, whatever the new spec's Report ID is. Empty when the report is unknown."""
    if not ref:
        return ""
    s = (db.query(m.Spec).filter(m.Spec.tenant_id == tenant_id, func.lower(m.Spec.report_id) == ref.strip().lower())
         .order_by(m.Spec.created_at.desc()).first())
    if s is None:
        return ""
    return " ".join(x for x in (f"Report {ref}:", s.description, s.column_heading, s.logic) if x)[:700]


def _embed_text(heading: str, text: str, ctx: str = "") -> str:
    return (ctx + "\n" if ctx else "") + (heading + "\n" if heading else "") + text


# ---------------------------------------------------------------- sources

def norm_scope(scope: str, scope_ref: str) -> tuple:
    scope = (scope or "global").strip().lower()
    if scope not in SCOPES:
        raise KbError(f"Scope must be one of {', '.join(SCOPES)}.")
    ref = (scope_ref or "").strip()
    if scope in ("sponsor", "ta", "study", "report") and not ref:
        raise KbError("A sponsor, therapeutic-area, study or report scope needs a name, study ID or report ID.")
    if scope == "global" and not ref:
        ref = ""
    return scope, ref


def add_source(db: Session, tenant_id: str, name: str, data: bytes, *, scope: str, scope_ref: str = "",
               doc_type: str = "", standard_version: str = "", license_note: str = "", title: str = "",
               created_by: str = "") -> dict:
    """Reads, chunks and embeds one file and stores it as a DRAFT. Returns a
    result dict; an unreadable file stores nothing and says why."""
    scope, ref = norm_scope(scope, scope_ref)
    digest = hashlib.sha256(data).hexdigest()
    dup = db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, file_hash=digest, scope=scope, scope_ref=ref).first()
    if dup is not None and dup.status != "retired":
        return {"name": name, "sourceId": dup.id, "duplicate": True, "status": dup.status,
                "note": "This exact file is already in the library at this scope."}
    ex = ki.extract(name, data)  # raises KnowledgeError for unsupported or unreadable files
    text_all = "\n".join(b.text for b in ex.blocks)
    if doc_type and doc_type not in ki.DOC_TYPES:
        raise KbError(f"Unknown document type '{doc_type}'.")
    reason = "Chosen by you"
    if not doc_type:
        doc_type, reason = ki.classify(name, text_all)
    chunks = ki.chunk(ex, doc_type) if ex.status == "ok" else []

    os.makedirs(os.path.join(KB_DIR, re.sub(r"[^A-Za-z0-9._-]", "_", tenant_id)), exist_ok=True)
    raw_path = os.path.join(KB_DIR, re.sub(r"[^A-Za-z0-9._-]", "_", tenant_id), digest[:24] + os.path.splitext(name)[1].lower())
    if not os.path.exists(raw_path):
        open(raw_path, "wb").write(data)

    src = m.KnowledgeSource(
        tenant_id=tenant_id, title=(title or os.path.splitext(os.path.basename(name))[0])[:200], filename=os.path.basename(name)[:250],
        file_hash=digest, size_bytes=len(data), raw_path=raw_path, doc_type=doc_type, doc_type_reason=reason,
        scope=scope, scope_ref=ref, standard_version=standard_version.strip()[:100], license_note=license_note.strip()[:300],
        status="draft", extract_status=ex.status, extract_note=ex.note, text_chars=ex.chars, chunk_count=len(chunks),
        created_by=created_by)
    if chunks:
        ctx = report_context(db, tenant_id, ref) if scope == "report" else ""
        vecs, backend = embeddings.embed([_embed_text(c.heading, c.text, ctx) for c in chunks])
        src.embed_backend = backend
        src.chunks = [m.KnowledgeChunk(tenant_id=tenant_id, position=i, heading=c.heading[:250], text=c.text, meta=c.meta,
                                       embedding=embeddings.to_blob(vecs[i]), embed_backend=backend) for i, c in enumerate(chunks)]
    db.add(src)
    db.commit()
    return {"name": name, "sourceId": src.id, "duplicate": False, "status": src.status, "extractStatus": ex.status,
            "note": ex.note, "chunks": len(chunks), "docType": doc_type, "docTypeReason": reason}


def get_source(db: Session, tenant_id: str, source_id: str) -> Optional[m.KnowledgeSource]:
    return db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, id=source_id).first()


def source_dict(s: m.KnowledgeSource) -> dict:
    return {"id": s.id, "title": s.title, "filename": s.filename, "docType": s.doc_type, "docTypeReason": s.doc_type_reason,
            "scope": s.scope, "scopeRef": s.scope_ref, "standardVersion": s.standard_version, "licenseNote": s.license_note,
            "status": s.status, "extractStatus": s.extract_status, "extractNote": s.extract_note, "textChars": s.text_chars,
            "chunks": s.chunk_count, "embedBackend": s.embed_backend, "sizeBytes": s.size_bytes,
            "createdAt": s.created_at.isoformat() if s.created_at else None, "createdBy": s.created_by,
            "approvedAt": s.approved_at.isoformat() if s.approved_at else None, "approvedBy": s.approved_by}


def list_sources(db: Session, tenant_id: str, *, scope: str = "", scope_ref: str = "", doc_type: str = "", status: str = "", q: str = "") -> list:
    qy = db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id)
    if scope:
        qy = qy.filter_by(scope=scope)
    if scope_ref:
        qy = qy.filter(m.KnowledgeSource.scope_ref.ilike(scope_ref))
    if doc_type:
        qy = qy.filter_by(doc_type=doc_type)
    if status:
        qy = qy.filter_by(status=status)
    if q:
        like = f"%{q}%"
        qy = qy.filter(m.KnowledgeSource.title.ilike(like) | m.KnowledgeSource.filename.ilike(like))
    return qy.order_by(m.KnowledgeSource.created_at.desc()).limit(1000).all()


def set_status(db: Session, s: m.KnowledgeSource, status: str, by: str = "") -> None:
    if status not in STATUSES:
        raise KbError("Unknown status.")
    if status == "approved":
        if s.extract_status != "ok" or s.chunk_count == 0:
            raise KbError("Nothing was read from this file, so there is nothing to approve. Fix the file and upload it again.")
        s.approved_by, s.approved_at = by, _now()
    s.status = status
    db.commit()


def update_source(db: Session, s: m.KnowledgeSource, patch: dict) -> None:
    if "docType" in patch:
        if patch["docType"] not in ki.DOC_TYPES:
            raise KbError("Unknown document type.")
        s.doc_type, s.doc_type_reason = patch["docType"], "Changed by you"
    if "scope" in patch or "scopeRef" in patch:
        s.scope, s.scope_ref = norm_scope(patch.get("scope", s.scope), patch.get("scopeRef", s.scope_ref))
    for k, col, n in (("title", "title", 200), ("standardVersion", "standard_version", 100), ("licenseNote", "license_note", 300)):
        if k in patch:
            setattr(s, col, str(patch[k])[:n])
    if s.status == "approved" and ("scope" in patch or "scopeRef" in patch or "docType" in patch):
        s.status = "draft"  # a change of scope or type changes what retrieval would return: review again
    db.commit()


def delete_source(db: Session, s: m.KnowledgeSource) -> None:
    db.delete(s)
    db.commit()


def reindex(db: Session, tenant_id: str, source_id: str = "") -> dict:
    """Re-embeds chunks with the current backend, so a switch to a better model takes effect."""
    qy = db.query(m.KnowledgeChunk).filter_by(tenant_id=tenant_id)
    if source_id:
        qy = qy.filter_by(source_id=source_id)
    chunks = qy.all()
    backend = embeddings.backend_name()
    srcs = {s.id: s for s in db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id).all()}
    ctxs = {}
    for s in srcs.values():
        if s.scope == "report":
            ctxs[s.id] = report_context(db, tenant_id, s.scope_ref)
    done = 0
    for i in range(0, len(chunks), 64):
        part = chunks[i:i + 64]
        vecs, backend = embeddings.embed([_embed_text(c.heading, c.text, ctxs.get(c.source_id, "")) for c in part])
        for c, v in zip(part, vecs):
            c.embedding, c.embed_backend = embeddings.to_blob(v), backend
        done += len(part)
    for s in db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id).all():
        if not source_id or s.id == source_id:
            s.embed_backend = backend
    db.commit()
    return {"chunks": done, "backend": backend}


def stats(db: Session, tenant_id: str) -> dict:
    rows = db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id).all()
    by = lambda f: {k: sum(1 for r in rows if f(r) == k) for k in sorted({f(r) for r in rows})}  # noqa: E731
    return {"sources": len(rows), "chunks": sum(r.chunk_count for r in rows), "byStatus": by(lambda r: r.status),
            "byScope": by(lambda r: r.scope), "byType": by(lambda r: r.doc_type),
            "tas": sorted({r.scope_ref for r in rows if r.scope == "ta"}),
            "sponsors": sorted({r.scope_ref for r in rows if r.scope == "sponsor"}),
            "reports": sorted({r.scope_ref for r in rows if r.scope == "report"})[:500],
            "embedBackend": embeddings.backend_name(),
            "lexicalOnly": embeddings.backend_name().startswith("hashing")}


# ---------------------------------------------------------------- retrieval

def _boost(src: m.KnowledgeSource, report: str) -> float:
    """Scope boost. A report source is boosted only when its Report ID is the run's own; another report's source
    competes on similarity alone, like any global source."""
    if src.scope == "report":
        return SCOPE_BOOST["report"] if report and src.scope_ref.lower() == report.strip().lower() else 1.0
    return SCOPE_BOOST.get(src.scope, 1.0)


def _in_scope(src: m.KnowledgeSource, study_id: str, ta: str, edc: str, sponsor: str = "", report: str = "") -> Optional[str]:
    """None when the source applies to this run, else the reason it does not."""
    if holdout.scope_excluded(src.scope):
        return f"{src.scope} scope switched off for this evaluation"
    if src.scope == "report" and holdout.is_held_out(src.scope_ref):
        return f"Report '{src.scope_ref}' is held out for this evaluation"
    if src.scope == "global":
        if src.doc_type == "edc_guide" and src.scope_ref and edc and src.scope_ref.lower() != edc.lower():
            return f"EDC guide for {src.scope_ref}, run uses {edc}"
        return None
    if src.scope == "report":
        return None  # every report is a reference for similar specs; an exact Report ID match only ranks it higher
    if src.scope == "sponsor":
        if not sponsor:
            return f"Sponsor '{src.scope_ref}' source, and no sponsor is set for this run"
        return None if src.scope_ref.lower() == sponsor.lower() else f"Sponsor '{src.scope_ref}', run is {sponsor}"
    if src.scope == "ta":
        if not ta:
            return f"TA '{src.scope_ref}' source, and no therapeutic area is set for this run"
        return None if src.scope_ref.lower() == ta.lower() else f"TA '{src.scope_ref}', run is {ta}"
    if src.scope == "study":
        if not study_id:
            return f"Study '{src.scope_ref}' source, and no study is set for this run"
        return None if src.scope_ref.lower() == study_id.lower() else f"Study '{src.scope_ref}', run is {study_id}"
    return "unknown scope"


def search(db: Session, tenant_id: str, query: str, *, study_id: str = "", ta: str = "", edc: str = "", sponsor: str = "", report: str = "",
           doc_types: Optional[list] = None, top_k: int = 5, include_unapproved: bool = False, debug: bool = False) -> dict:
    """Filter by approval and scope, then rank by vector plus keyword score."""
    query = (query or "").strip()
    if not query:
        return {"results": [], "excluded": [], "backend": embeddings.backend_name(), "candidates": 0}
    rows = (db.query(m.KnowledgeChunk, m.KnowledgeSource).join(m.KnowledgeSource, m.KnowledgeChunk.source_id == m.KnowledgeSource.id)
            .filter(m.KnowledgeChunk.tenant_id == tenant_id).all())
    excluded, cands = {}, []
    for ch, src in rows:
        why = None
        if src.status != "approved" and not include_unapproved:
            why = f"Source is {src.status}, not approved"
        elif src.status == "retired":
            why = "Source is retired"
        elif doc_types and src.doc_type not in doc_types:
            why = f"Document type {src.doc_type} was not requested"
        else:
            why = _in_scope(src, study_id, ta, edc, sponsor, report)
        if why:
            if debug and src.id not in excluded:
                excluded[src.id] = {"sourceId": src.id, "title": src.title, "scope": src.scope, "scopeRef": src.scope_ref, "reason": why}
            continue
        cands.append((ch, src))
    if not cands:
        return {"results": [], "excluded": list(excluded.values())[:50], "backend": embeddings.backend_name(), "candidates": 0}

    qvec, backend = embeddings.embed([query])
    qv = qvec[0]
    vec = np.array([float(np.dot(qv, embeddings.from_blob(c.embedding))) if (c.embedding and c.embed_backend == backend) else 0.0 for c, _ in cands])
    stale = sum(1 for c, _ in cands if c.embed_backend != backend)

    qt = list(dict.fromkeys(_tokens(query)))
    rctx = {}
    for _, src in cands:
        if src.scope == "report" and src.id not in rctx:
            rctx[src.id] = report_context(db, tenant_id, src.scope_ref)
    docs = [_tokens(rctx.get(src.id, "") + " " + c.heading + " " + c.text) for c, src in cands]
    n = len(docs)
    df = {t: sum(1 for d in docs if t in d) for t in qt}
    avg = sum(len(d) for d in docs) / max(n, 1)
    kw = np.zeros(n)
    for i, d in enumerate(docs):
        L = len(d) or 1
        tf = {}
        for t in d:
            if t in df:
                tf[t] = tf.get(t, 0) + 1
        for t, f in tf.items():
            idf = math.log(1 + (n - df[t] + 0.5) / (df[t] + 0.5))
            kw[i] += idf * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * L / max(avg, 1)))
    kwn = kw / kw.max() if kw.max() > 0 else kw
    cover = np.array([len(set(d) & set(qt)) / len(qt) if qt else 0.0 for d in docs])
    vmax = vec.max() if vec.max() > 0 else 1.0
    score = (0.55 * (vec / vmax) + 0.45 * kwn)
    score = np.array([s * _boost(src, report) for s, (_, src) in zip(score, cands)])
    order = [i for i in np.argsort(-score) if (kw[i] > 0 or vec[i] > 0.05)][:max(1, min(top_k, 50))]
    results = []
    for i in order:
        ch, src = cands[i]
        results.append({"chunkId": ch.id, "sourceId": src.id, "title": src.title, "docType": src.doc_type, "scope": src.scope,
                        "scopeRef": src.scope_ref, "status": src.status, "standardVersion": src.standard_version,
                        "heading": ch.heading, "text": ch.text, "meta": ch.meta or {}, "score": round(float(score[i]), 4),
                        "vectorScore": round(float(vec[i]), 4), "keywordScore": round(float(kwn[i]), 4),
                        "coverage": round(float(cover[i]), 4),
                        "reportMatch": bool(src.scope == "report" and report and src.scope_ref.lower() == report.strip().lower())})
    out = {"results": results, "excluded": list(excluded.values())[:50], "backend": backend, "candidates": len(cands)}
    if stale:
        out["warning"] = f"{stale} chunk(s) were embedded with a different backend and match by keyword only. Run Reindex."
    return out
