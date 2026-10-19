"""knowledge_api.py - HTTP endpoints for the knowledge library, retrieval and rules.

There is no real authentication yet (an existing, known gap), so `X-User-Id`
is recorded as the approver label but proves nothing.
"""

import base64
import binascii

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

import db
import datetime
import os
import urllib.parse

import knowledge_fetch as kf
import knowledge_ingest as ki
import knowledge_rules as kr
import knowledge_store as ks
import models_db as m

router = APIRouter()


def tenant(x_tenant_id: str | None = Header(default=None)) -> str:
    return x_tenant_id or "default"


def user(x_user_id: str | None = Header(default=None)) -> str:
    return (x_user_id or "").strip()[:80]


def err(msg: str, code: int = 400, **extra):
    return JSONResponse(status_code=code, content={"error": msg, **extra})


def study_sponsor(session: Session, tenant_id: str, study_id: str) -> str:
    if not study_id:
        return ""
    s = session.query(m.Study).filter_by(tenant_id=tenant_id, study_id=study_id).first()
    return (s.sponsor or "") if s is not None else ""


def study_ta(session: Session, tenant_id: str, study_id: str) -> str:
    if not study_id:
        return ""
    s = session.query(m.Study).filter_by(tenant_id=tenant_id, study_id=study_id).first()
    return (s.ta or "") if s is not None else ""


# ------------------------------------------------------------------ sources

class FileIn(BaseModel):
    name: str
    data: str  # base64


class UploadIn(BaseModel):
    files: list[FileIn]
    scope: str = "global"
    scopeRef: str = ""
    docType: str = ""  # empty = suggest from content
    standardVersion: str = ""
    licenseNote: str = ""


@router.get("/api/knowledge/stats")
def stats(s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    return ks.stats(s, t)


@router.get("/api/knowledge/sources")
def sources(scope: str = "", scopeRef: str = "", docType: str = "", status: str = "", q: str = "",
            s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    return [ks.source_dict(x) for x in ks.list_sources(s, t, scope=scope, scope_ref=scopeRef, doc_type=docType, status=status, q=q)]


@router.post("/api/knowledge/sources")
def upload(body: UploadIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    try:
        ks.norm_scope(body.scope, body.scopeRef)
    except ks.KbError as e:
        return err(str(e))
    results = []
    for f in body.files[:100]:
        try:
            data = base64.b64decode(f.data, validate=False)
        except (binascii.Error, ValueError):
            results.append({"name": f.name, "error": "The file data could not be decoded."})
            continue
        try:
            results.append(ks.add_source(s, t, f.name, data, scope=body.scope, scope_ref=body.scopeRef, doc_type=body.docType,
                                         standard_version=body.standardVersion, license_note=body.licenseNote, created_by=u))
        except (ki.KnowledgeError, ks.KbError) as e:
            results.append({"name": f.name, "error": str(e)})
    if not any("sourceId" in r for r in results):
        return err("None of the files could be added.", results=results)
    return {"results": results}


class ListingIn(BaseModel):
    name: str = ""
    reportId: str = ""
    description: str = ""
    columnHeading: str = ""
    logic: str = ""
    reportScenarios: str = ""
    sorting: str = ""
    rawText: str = ""


class FromListingsIn(BaseModel):
    listings: list[ListingIn]
    # global | standard | ta | sponsor | study. "standard" = global scope, typed as a listing standard.
    scope: str = "global"
    scopeRef: str = ""
    standardVersion: str = ""
    approve: bool = False


def listing_markdown(x: ListingIn) -> str:
    rid = (x.reportId or x.name or "listing").strip()
    parts = [f"# Listing {rid}", "", "_Listing specification used as reference knowledge. It carries no verified code._", ""]
    for head, val in (("Description", x.description), ("Column heading", x.columnHeading), ("Logic", x.logic),
                      ("Scenarios", x.reportScenarios), ("Sorting", x.sorting)):
        if (val or "").strip():
            parts += [f"## {head}", val.strip(), ""]
    if len(parts) <= 4 and (x.rawText or "").strip():
        parts += ["## Specification text", x.rawText.strip(), ""]
    return "\n".join(parts)


@router.post("/api/knowledge/from-listings")
def from_listings(body: FromListingsIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    """Turns chosen listings (specs only, never code) into knowledge sources at the chosen scope. They land as drafts
    unless approve is set, so the review queue still applies."""
    scope = (body.scope or "global").strip().lower()
    doc_type = "spec"
    if scope == "standard":
        scope, doc_type = "global", "listing_standard"
    try:
        scope, ref = ks.norm_scope(scope, body.scopeRef)
    except ks.KbError as e:
        return err(str(e))
    if not body.listings:
        return err("Choose at least one listing.")
    results = []
    for x in body.listings[:500]:
        label = (x.reportId or x.name or "listing").strip() or "listing"
        text = listing_markdown(x)
        if len(text) < 120 and not (x.logic or x.description or x.rawText).strip():
            results.append({"name": label, "error": "This listing has no specification text."})
            continue
        safe = "".join(c if c.isalnum() or c in "._-" else "_" for c in label)[:80]
        try:
            r = ks.add_source(s, t, f"{safe}_listing.md", text.encode("utf-8"), scope=scope, scope_ref=ref, doc_type=doc_type,
                              standard_version=body.standardVersion, title=f"Listing {label}", created_by=u)
            r["name"] = label
            if body.approve and r.get("sourceId") and not r.get("duplicate"):
                try:
                    src = ks.get_source(s, t, r["sourceId"])
                    ks.set_status(s, src, "approved", u)
                    r["status"] = "approved"
                except ks.KbError as e:
                    r["note"] = str(e)
            results.append(r)
        except (ki.KnowledgeError, ks.KbError) as e:
            results.append({"name": label, "error": str(e)})
    added = sum(1 for r in results if r.get("sourceId") and not r.get("duplicate"))
    return {"results": results, "added": added, "duplicates": sum(1 for r in results if r.get("duplicate")),
            "failed": sum(1 for r in results if r.get("error"))}


def _src(s, t, sid):
    return ks.get_source(s, t, sid)


@router.get("/api/knowledge/sources/{sid}")
def source_get(sid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    src = _src(s, t, sid)
    if src is None:
        return err("Source not found.", 404)
    d = ks.source_dict(src)
    d["preview"] = [{"id": c.id, "position": c.position, "heading": c.heading, "text": c.text, "meta": c.meta or {}}
                    for c in sorted(src.chunks, key=lambda c: c.position)[:40]]
    return d


class SourcePatch(BaseModel):
    title: str | None = None
    docType: str | None = None
    scope: str | None = None
    scopeRef: str | None = None
    standardVersion: str | None = None
    licenseNote: str | None = None


@router.patch("/api/knowledge/sources/{sid}")
def source_patch(sid: str, body: SourcePatch, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    src = _src(s, t, sid)
    if src is None:
        return err("Source not found.", 404)
    try:
        ks.update_source(s, src, body.model_dump(exclude_none=True))
    except ks.KbError as e:
        return err(str(e))
    return ks.source_dict(src)


@router.post("/api/knowledge/sources/{sid}/{action}")
def source_action(sid: str, action: str, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    src = _src(s, t, sid)
    if src is None:
        return err("Source not found.", 404)
    target = {"approve": "approved", "retire": "retired", "restore": "draft"}.get(action)
    if target is None:
        return err("Unknown action.", 404)
    try:
        ks.set_status(s, src, target, u)
    except ks.KbError as e:
        return err(str(e))
    return ks.source_dict(src)


@router.delete("/api/knowledge/sources/{sid}")
def source_delete(sid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    src = _src(s, t, sid)
    if src is None:
        return err("Source not found.", 404)
    ks.delete_source(s, src)
    return {"deleted": True}


class SearchIn(BaseModel):
    query: str
    studyId: str = ""
    ta: str = ""
    sponsor: str = ""
    reportId: str = ""
    edcSystem: str = ""
    docTypes: list[str] = []
    topK: int = 5
    includeUnapproved: bool = False


@router.post("/api/knowledge/search")
def search(body: SearchIn, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    ta = body.ta or study_ta(s, t, body.studyId)
    sponsor = body.sponsor or study_sponsor(s, t, body.studyId)
    r = ks.search(s, t, body.query, study_id=body.studyId, ta=ta, edc=body.edcSystem, sponsor=sponsor, report=body.reportId, doc_types=body.docTypes or None,
                  top_k=body.topK, include_unapproved=body.includeUnapproved, debug=True)
    r["ta"] = ta
    return r


class ReindexIn(BaseModel):
    sourceId: str = ""


@router.post("/api/knowledge/reindex")
def reindex(body: ReindexIn, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    return ks.reindex(s, t, body.sourceId)


@router.get("/api/knowledge/review-queue")
def review_queue(s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    drafts = [ks.source_dict(x) for x in ks.list_sources(s, t, status="draft")]
    rules = [kr.rule_dict(r) for r in s.query(m.KnowledgeRule).filter_by(tenant_id=t, status="draft").order_by(m.KnowledgeRule.created_at.desc()).all()]
    return {"sources": drafts, "rules": rules,
            "problems": [d for d in drafts if d["extractStatus"] != "ok"]}


# -------------------------------------------------------------------- rules

class RuleIn(BaseModel):
    name: str
    description: str = ""
    scope: str = "global"
    scopeRef: str = ""
    appliesTo: list[str] = []
    condition: dict = {}
    actionType: str = "prompt"
    action: dict = {}
    priority: int = 100
    evidenceSourceId: str | None = None
    evidenceNote: str = ""
    tests: list[dict] = []


def _rule(s, t, rid):
    return s.query(m.KnowledgeRule).filter_by(tenant_id=t, id=rid).first()


@router.get("/api/rules")
def rules_list(status: str = "", scope: str = "", s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    qy = s.query(m.KnowledgeRule).filter_by(tenant_id=t)
    if status:
        qy = qy.filter_by(status=status)
    if scope:
        qy = qy.filter_by(scope=scope)
    return [kr.rule_dict(r) for r in qy.order_by(m.KnowledgeRule.updated_at.desc()).all()]


@router.post("/api/rules")
def rules_create(body: RuleIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    try:
        c = kr.clean(body.model_dump())
    except kr.RuleError as e:
        return err(str(e))
    r = m.KnowledgeRule(tenant_id=t, created_by=u, **c)
    s.add(r)
    s.commit()
    return kr.rule_dict(r)


@router.put("/api/rules/{rid}")
def rules_update(rid: str, body: RuleIn, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    r = _rule(s, t, rid)
    if r is None:
        return err("Rule not found.", 404)
    try:
        c = kr.clean(body.model_dump())
    except kr.RuleError as e:
        return err(str(e))
    for k, v in c.items():
        setattr(r, k, v)
    r.version += 1
    r.updated_at = kr._now()
    if r.status == "approved":  # an edit is a new, unreviewed version
        r.status, r.approved_by, r.approved_at = "draft", "", None
    s.commit()
    return kr.rule_dict(r)


@router.delete("/api/rules/{rid}")
def rules_delete(rid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    r = _rule(s, t, rid)
    if r is None:
        return err("Rule not found.", 404)
    s.delete(r)
    s.commit()
    return {"deleted": True}


@router.post("/api/rules/{rid}/run-tests")
def rules_tests(rid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    r = _rule(s, t, rid)
    if r is None:
        return err("Rule not found.", 404)
    return {"results": kr.run_tests({"scope": r.scope, "scope_ref": r.scope_ref, "condition": r.condition or {}, "tests": r.tests or []})}


@router.post("/api/rules/{rid}/{action}")
def rules_action(rid: str, action: str, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    r = _rule(s, t, rid)
    if r is None:
        return err("Rule not found.", 404)
    if action == "approve":
        try:
            res = kr.approve(s, r, u)
        except kr.RuleError as e:
            return err(str(e), tests=kr.run_tests({"scope": r.scope, "scope_ref": r.scope_ref, "condition": r.condition or {}, "tests": r.tests or []}))
        out = kr.rule_dict(r)
        out["testResults"] = res
        return out
    if action in ("retire", "restore"):
        r.status = "retired" if action == "retire" else "draft"
        s.commit()
        return kr.rule_dict(r)
    return err("Unknown action.", 404)


class DryRunIn(BaseModel):
    spec: dict
    studyId: str = ""
    ta: str = ""
    sponsor: str = ""
    edcSystem: str = ""
    language: str = ""
    agent: str = ""
    includeDraft: bool = False


class ProposeIn(BaseModel):
    sourceId: str
    limit: int = 20


@router.post("/api/rules/propose")
def rules_propose(body: ProposeIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    """Asks Claude for draft rules from one source's own text. Each must carry a quote found in that text."""
    import rule_proposer as rp
    try:
        return rp.propose(s, t, body.sourceId, limit=body.limit, created_by=u)
    except rp.ProposerError as e:
        return err(str(e))


@router.post("/api/rules/dry-run")
def dry_run(body: DryRunIn, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    ta = body.ta or study_ta(s, t, body.studyId)
    sponsor = body.sponsor or study_sponsor(s, t, body.studyId)
    ctx = kr.context(body.spec, study_id=body.studyId, ta=ta, edc=body.edcSystem, language=body.language, sponsor=sponsor)
    return {"fired": kr.evaluate(s, t, ctx, agent=body.agent, include_draft=body.includeDraft), "ta": ta}


class BacktestIn(BaseModel):
    rule: RuleIn
    studyId: str = ""
    ta: str = ""
    sponsor: str = ""


@router.post("/api/rules/backtest")
def backtest(body: BacktestIn, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    try:
        c = kr.clean(body.rule.model_dump())
    except kr.RuleError as e:
        return err(str(e))
    return kr.backtest(s, t, c, study_id=body.studyId, ta=body.ta, sponsor=body.sponsor)


# ---------------------------------------------------- shadow use in a run

def shadow(session: Session, tenant_id: str, spec: dict, *, study_id: str = "", edc: str = "", language: str = "") -> dict:
    """What the knowledge base WOULD contribute to this run. Recorded beside the
    result for the person to see; it does not change the prompt or the output."""
    try:
        ta = study_ta(session, tenant_id, study_id)
        sponsor = study_sponsor(session, tenant_id, study_id)
        query = " ".join(str(spec.get(k, "")) for k in ("description", "logic", "reportScenarios"))[:1500]
        found = ks.search(session, tenant_id, query, study_id=study_id, ta=ta, edc=edc, sponsor=sponsor, report=str(spec.get("reportId") or ""), top_k=5)
        fired = kr.evaluate(session, tenant_id, kr.context(spec, study_id=study_id, ta=ta, edc=edc, language=language, sponsor=sponsor), agent="generate")
        return {"mode": "shadow", "ta": ta, "sponsor": sponsor, "backend": found["backend"],
                "sources": [{"sourceId": r["sourceId"], "title": r["title"], "heading": r["heading"], "scope": r["scope"],
                             "docType": r["docType"], "score": r["score"]} for r in found["results"]],
                "rules": [{"id": r["id"], "name": r["name"], "actionType": r["actionType"], "scope": r["scope"], "why": r["why"]} for r in fired]}
    except Exception as e:  # noqa: BLE001 -- never let a shadow lookup break generation
        return {"mode": "shadow", "error": str(e), "sources": [], "rules": []}


# ------------------------------------------------------------ public source catalogue

def _in_library(session: Session, tenant_id: str, url: str) -> bool:
    if not url:
        return False
    return session.query(m.KnowledgeSource).filter(
        m.KnowledgeSource.tenant_id == tenant_id, m.KnowledgeSource.status != "retired",
        m.KnowledgeSource.license_note.contains(url[:200])).first() is not None


@router.get("/api/knowledge/catalog")
def catalog(session: Session = Depends(db.get_session), t: str = Depends(tenant)):
    """Public reference sources by scope, with which ones are already in this tenant's library and whether the
    app can fetch them itself (kind file) or a person has to download them (manual, pack)."""
    entries = kf.load_catalog()
    return {"hosts": sorted(kf.allowed_hosts(entries)),
            "entries": [{**e, "inLibrary": _in_library(session, t, e.get("url", "")) if e.get("kind") == "file" else False} for e in entries]}


class FetchIn(BaseModel):
    ids: list[str]


@router.post("/api/knowledge/catalog/fetch")
def catalog_fetch(b: FetchIn, session: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    """Fetch the chosen catalogue files (kind file only) and store each as a DRAFT source. Nothing is approved
    here. One entry failing never stops the rest."""
    entries = {e["id"]: e for e in kf.load_catalog()}
    hosts = kf.allowed_hosts(list(entries.values()))
    out = []
    for i in b.ids[:40]:
        e = entries.get(i)
        if e is None:
            out.append({"id": i, "ok": False, "error": "Unknown catalogue entry."})
            continue
        if e.get("kind") != "file" or not e.get("url"):
            out.append({"id": i, "ok": False, "error": "This entry is not fetched automatically. Download it by hand and use Upload."})
            continue
        try:
            data, final = kf.fetch(e["url"], hosts, e.get("format", ""))
            name = urllib.parse.unquote(os.path.basename(urllib.parse.urlsplit(final).path)) or f"{i}.{e.get('format', 'txt')}"
            note = f"Source: {e['url']} | retrieved {datetime.date.today().isoformat()} | {e.get('licence', '')}"
            r = ks.add_source(session, t, name, data, scope=e["scope"], scope_ref=e.get("scopeRef", "") if not e.get("scopeRef", "").startswith("(") else "",
                              doc_type=e.get("docType", ""), standard_version=e.get("standardVersion", ""), license_note=note, title=e["title"], created_by=u)
            out.append({"id": i, "ok": True, "sourceId": r["sourceId"], "duplicate": r["duplicate"], "chunks": r.get("chunks", 0), "note": r.get("note", "")})
        except (kf.FetchError, ki.KnowledgeError, ks.KbError) as ex:
            out.append({"id": i, "ok": False, "error": str(ex)})
    return {"results": out, "note": "Fetched files are drafts. Review and approve them in the Review queue before runs use them."}
