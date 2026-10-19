"""synthetic_api.py - manage synthetic test data for listings and batches.

Generate per listing (from a library spec, a batch item, or an inline spec), read and correct the cases, see
which conditions are covered, sign a set off, export it. Programmer sign-off only; X-User-Id is a label, not
authentication (a known gap). Generation is one model call per listing; the UI runs a batch as parallel calls.
"""
import csv
import io
import json
from datetime import datetime

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session

import db
import knowledge_binding
import models_db as m
import store
import study_setup
import synthetic_data_agent as agent
import synthetic_exec as ex
import base64
import binascii
from knowledge_api import err, tenant, user

router = APIRouter(prefix="/api/synthetic")


def coverage(conditions: list, cases: list) -> dict:
    """Per condition: how many include / exclude / boundary cases. A condition is covered when it has at least
    one include and one exclude case. Cases pointing at no known condition are reported separately."""
    by = {c["id"]: {"id": c["id"], "text": c["text"], "include": 0, "exclude": 0, "boundary": 0} for c in conditions}
    orphan = []
    for k in cases:
        row = by.get(k.get("conditionId"))
        if row is None:
            orphan.append(k["id"])
            continue
        row[k["expectation"]] += 1
        row["boundary"] += 1 if k.get("boundary") else 0
    rows = list(by.values())
    for r in rows:
        r["covered"] = r["include"] > 0 and r["exclude"] > 0
        r["gap"] = "no include case" if r["include"] == 0 and r["exclude"] > 0 else "no exclude case" if r["exclude"] == 0 and r["include"] > 0 else "no cases" if not (r["include"] or r["exclude"]) else ""
    return {"conditions": rows, "uncovered": [r["id"] for r in rows if not r["covered"]], "orphanCases": orphan,
            "covered": sum(1 for r in rows if r["covered"]), "total": len(rows)}


def to_dict(r: m.SyntheticSet, full: bool = True) -> dict:
    conds, cases = json.loads(r.conditions_json or "[]"), json.loads(r.cases_json or "[]")
    d = {"id": r.id, "reportId": r.report_id, "version": r.version, "status": r.status, "edited": bool(r.edited),
         "specId": r.spec_id, "batchId": r.batch_id, "batchItemId": r.batch_item_id, "studyId": r.study_id,
         "summary": r.summary, "usedKnowledge": bool(r.used_knowledge), "createdBy": r.created_by,
         "reviewedBy": r.reviewed_by, "reviewedAt": r.reviewed_at.isoformat() if r.reviewed_at else None,
         "createdAt": r.created_at.isoformat() if r.created_at else None,
         "updatedAt": r.updated_at.isoformat() if r.updated_at else None,
         "caseCount": len(cases), "include": sum(1 for c in cases if c["expectation"] == "include"),
         "exclude": sum(1 for c in cases if c["expectation"] == "exclude"), "coverage": coverage(conds, cases), "keyIssues": ex.key_issues(cases)}
    if full:
        d.update({"spec": json.loads(r.spec_json or "{}"), "conditions": conds, "cases": cases,
                  "openQuestions": json.loads(r.open_questions_json or "[]")})
    return d


def _get(s: Session, t: str, sid: str):
    return s.query(m.SyntheticSet).filter_by(id=sid, tenant_id=t).first()


class GenIn(BaseModel):
    specId: str = ""
    batchId: str = ""
    batchItemId: str = ""
    spec: dict | None = None
    studyId: str = ""
    useKnowledge: bool = False


def _resolve_spec(s: Session, t: str, b: GenIn):
    if b.batchId and b.batchItemId:
        it = s.query(m.BatchItem).filter_by(id=b.batchItemId, job_id=b.batchId, tenant_id=t).first()
        if it is None:
            return None, "Batch item not found."
        try:
            spec = json.loads(it.spec_json or "{}")
        except ValueError:
            spec = {}
        if not spec.get("description"):
            return None, "That batch item has no extracted spec yet (it has not passed the extract stage)."
        return {**spec, "studyId": b.studyId or it.study_id or spec.get("studyId", "")}, ""
    if b.specId:
        row = store.get_spec(s, t, b.specId)
        if row is None:
            return None, "Spec not found."
        return {**store.spec_to_dict(row), "studyId": b.studyId}, ""
    if b.spec and str(b.spec.get("reportId", "")).strip() and str(b.spec.get("description", "")).strip():
        return {**b.spec, "studyId": b.studyId or b.spec.get("studyId", "")}, ""
    return None, "Give a specId, a batchId with batchItemId, or a spec with Report ID and Description."


@router.post("/generate")
def generate(b: GenIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    spec, why = _resolve_spec(s, t, b)
    if spec is None:
        return err(why, 404 if "not found" in why else 400)
    text = " ".join(str(spec.get(k, "")) for k in ("description", "columnHeading", "logic", "reportScenarios"))
    meta = study_setup.resolve(s, t, spec.get("studyId", ""), None)
    meta_block = study_setup.prompt_block(meta, text)
    kb_block = ""
    if b.useKnowledge:
        kb = knowledge_binding.build(s, t, spec, "generate", study_id=spec.get("studyId", ""), edc="", language="")
        kb_block = kb["block"]
    try:
        out = agent.run_synthetic_generation(spec, meta_block, kb_block)
    except agent.AgentError as e:
        return err(str(e), 500 if "ANTHROPIC_API_KEY" in str(e) else 502)
    rid = str(spec.get("reportId", "")).strip()
    last = s.query(m.SyntheticSet).filter_by(tenant_id=t, report_id=rid).order_by(m.SyntheticSet.version.desc()).first()
    if last is not None and last.status != "retired":  # a new version replaces the live one; keep the old one as history
        last.status = "retired"
    row = m.SyntheticSet(
        tenant_id=t, report_id=rid, version=(last.version + 1) if last else 1, spec_id=b.specId or "", batch_id=b.batchId,
        batch_item_id=b.batchItemId, study_id=spec.get("studyId", ""), spec_json=json.dumps({k: spec.get(k, "") for k in ("reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting")}),
        conditions_json=json.dumps(out["conditions"]), cases_json=json.dumps(out["cases"]),
        open_questions_json=json.dumps(out["openQuestions"]), summary=out["summary"],
        used_knowledge=bool(kb_block), created_by=u)
    s.add(row)
    s.commit()
    s.refresh(row)
    return to_dict(row)


@router.get("")
def list_sets(reportId: str = "", status: str = "", batchId: str = "", s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    q = s.query(m.SyntheticSet).filter_by(tenant_id=t)
    if reportId:
        q = q.filter_by(report_id=reportId)
    if batchId:
        q = q.filter_by(batch_id=batchId)
    if status:
        q = q.filter_by(status=status)
    return [to_dict(r, full=False) for r in q.order_by(m.SyntheticSet.updated_at.desc()).limit(500).all()]


@router.get("/{sid}")
def get_set(sid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    r = _get(s, t, sid)
    return to_dict(r) if r else err("Synthetic set not found.", 404)


class EditIn(BaseModel):
    conditions: list[dict] | None = None
    cases: list[dict] | None = None


@router.patch("/{sid}")
def edit_set(sid: str, b: EditIn, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    """Replace conditions and/or cases (the reviewer corrected an expectation, added or removed a case). Goes
    through the same sanitiser as model output, so a hand edit cannot break the shape. Returns to draft."""
    r = _get(s, t, sid)
    if r is None:
        return err("Synthetic set not found.", 404)
    if r.status == "retired":
        return err("A retired version cannot be edited. Edit the current version.", 409)
    conds = b.conditions if b.conditions is not None else json.loads(r.conditions_json)
    cases = b.cases if b.cases is not None else json.loads(r.cases_json)
    try:
        clean = agent.sanitize({"conditions": conds, "cases": cases})
    except agent.AgentError:
        return err("A set needs at least one valid case (expectation include or exclude).")
    notes = {c.get("id"): str(c.get("note", "")) for c in cases if isinstance(c, dict)}
    for c in clean["cases"]:
        c["note"] = notes.get(c["id"], "")
    r.conditions_json, r.cases_json = json.dumps(clean["conditions"]), json.dumps(clean["cases"])
    r.edited, r.status, r.reviewed_by, r.reviewed_at, r.updated_at = True, "draft", "", None, datetime.utcnow()
    s.commit()
    return to_dict(r)


class ReviewIn(BaseModel):
    acknowledgeGaps: bool = False


@router.post("/{sid}/approve")
def approve(sid: str, b: ReviewIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    r = _get(s, t, sid)
    if r is None:
        return err("Synthetic set not found.", 404)
    if r.status == "retired":
        return err("A retired version cannot be signed off.", 409)
    if not u:
        return err("Sign-off needs a reviewer name (X-User-Id).", 400)
    cov = coverage(json.loads(r.conditions_json), json.loads(r.cases_json))
    if (cov["uncovered"] or cov["orphanCases"]) and not b.acknowledgeGaps:
        return err("Some conditions lack an include or an exclude case. Fix them, or sign off with the gaps acknowledged.", 409, coverage=cov)
    r.status, r.reviewed_by, r.reviewed_at, r.updated_at = "reviewed", u, datetime.utcnow(), datetime.utcnow()
    s.commit()
    return to_dict(r)


@router.post("/{sid}/reopen")
def reopen(sid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    r = _get(s, t, sid)
    if r is None:
        return err("Synthetic set not found.", 404)
    if r.status == "reviewed":
        r.status, r.reviewed_by, r.reviewed_at, r.updated_at = "draft", "", None, datetime.utcnow()
        s.commit()
    return to_dict(r)


@router.delete("/{sid}")
def delete_set(sid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    r = _get(s, t, sid)
    if r is None:
        return err("Synthetic set not found.", 404)
    s.delete(r)
    s.commit()
    return {"deleted": sid}


def _flat(r: m.SyntheticSet):
    cases = json.loads(r.cases_json or "[]")
    cols: list = []
    for c in cases:
        for tb in c["tables"]:
            for row in tb["rows"]:
                for k in row:
                    if k not in cols:
                        cols.append(k)
    return cases, cols


@router.get("/{sid}/export")
def export(sid: str, format: str = "csv", s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    """csv: one row per data row with case id, condition, expectation and form first, then the union of columns.
    json: the whole set."""
    r = _get(s, t, sid)
    if r is None:
        return err("Synthetic set not found.", 404)
    name = f"{r.report_id}_synthetic_v{r.version}"
    if format == "json":
        return Response(json.dumps(to_dict(r), indent=2), media_type="application/json",
                        headers={"Content-Disposition": f'attachment; filename="{name}.json"'})
    cases, cols = _flat(r)
    out = io.StringIO()
    w = csv.writer(out)
    w.writerow(["case_id", "condition_id", "expectation", "boundary", "form"] + cols)
    for c in cases:
        for tb in c["tables"]:
            for row in tb["rows"]:
                w.writerow([c["id"], c["conditionId"], c["expectation"], "yes" if c["boundary"] else "", tb["form"]] + [row.get(k, "") for k in cols])
    return Response(out.getvalue(), media_type="text/csv", headers={"Content-Disposition": f'attachment; filename="{name}.csv"'})


# ------------------------------------------------------------ run code against a set

def run_to_dict(r: m.SyntheticRun, st: m.SyntheticSet | None = None) -> dict:
    return {"id": r.id, "setId": r.set_id, "setVersion": r.set_version, "language": r.language, "method": r.method,
            "status": r.status, "code": r.code, "results": json.loads(r.results_json or "[]"), "counts": json.loads(r.counts_json or "{}"),
            "issues": json.loads(r.issues_json or "{}"), "rowsReturned": r.rows_returned, "sourceName": r.source_name,
            "error": r.error, "createdBy": r.created_by, "createdAt": r.created_at.isoformat() if r.created_at else None,
            # the set was edited or re-signed after this run, so the result may no longer describe the current cases
            "stale": bool(st is not None and st.updated_at and r.created_at and st.updated_at > r.created_at)}


def latest_code(s: Session, t: str, report_id: str):
    """(code, language) of the newest stored generation run for this report ID, or ("", "")."""
    row = (s.query(m.GenerationRun).join(m.Spec, m.Spec.id == m.GenerationRun.spec_id)
           .filter(m.Spec.tenant_id == t, m.Spec.report_id == report_id, m.GenerationRun.tenant_id == t, m.GenerationRun.cql.isnot(None))
           .order_by(m.GenerationRun.created_at.desc()).first())
    return (row.cql, row.language or "") if row else ("", "")


class RunIn(BaseModel):
    code: str = ""
    language: str = ""
    files: list[dict] = []


def _save_run(s, t, u, st, **kw):
    cases = json.loads(st.cases_json)
    returned = kw.pop("returned")
    cmp_ = ex.compare(cases, returned) if returned is not None else None
    row = m.SyntheticRun(tenant_id=t, set_id=st.id, set_version=st.version, created_by=u,
                         results_json=json.dumps(cmp_["results"] if cmp_ else []), counts_json=json.dumps(cmp_["counts"] if cmp_ else {}),
                         issues_json=json.dumps(cmp_["issues"] if cmp_ else ex.key_issues(cases)), **kw)
    s.add(row)
    s.commit()
    s.refresh(row)
    return run_to_dict(row, st)


@router.post("/{sid}/runs/sql")
def run_sql(sid: str, b: RunIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    """Execute generated SQL against the set in a throwaway read-only SQLite database. Empty `code` uses the
    newest stored SQL generation for this Report ID."""
    st = _get(s, t, sid)
    if st is None:
        return err("Synthetic set not found.", 404)
    code, lang = (b.code, "sql") if b.code.strip() else latest_code(s, t, st.report_id)
    if not code.strip():
        return err("No code given and no generated code stored for this Report ID. Paste SQL or run Generate first.")
    if lang and lang != "sql":
        return err(f"The newest stored code for {st.report_id} is {lang.upper()}, which cannot run here. Use the test pack and upload the result, or paste SQL.", 400)
    res = ex.run_sql(json.loads(st.cases_json), code)
    if res["status"] != "executed":
        return _save_run(s, t, u, st, returned=None, language="sql", method="executed", status="could_not_execute", code=code, error=res["error"])
    return _save_run(s, t, u, st, returned=res["returned"], language="sql", method="executed", status="executed", code=code, rows_returned=res["rows"])


@router.post("/{sid}/runs/upload")
def upload_result(sid: str, b: RunIn, s: Session = Depends(db.get_session), t: str = Depends(tenant), u: str = Depends(user)):
    """Compare a result file produced by running the code in the real system (CQL, SAS, anything)."""
    st = _get(s, t, sid)
    if st is None:
        return err("Synthetic set not found.", 404)
    if len(b.files) != 1:
        return err("Upload exactly one result CSV.")
    try:
        data = base64.b64decode(b.files[0].get("data", ""), validate=False)
        returned, n, col = ex.parse_result_csv(data)
    except (binascii.Error, ValueError) as e:
        return err(str(e) or "Could not read the result file.")
    code, lang = (b.code, b.language) if b.code.strip() else latest_code(s, t, st.report_id)
    return _save_run(s, t, u, st, returned=returned, language=(b.language or lang or "").lower(), method="uploaded", status="uploaded",
                     code=code, rows_returned=n, source_name=str(b.files[0].get("name", ""))[:200])


@router.get("/{sid}/runs")
def list_runs(sid: str, s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    st = _get(s, t, sid)
    if st is None:
        return err("Synthetic set not found.", 404)
    rows = s.query(m.SyntheticRun).filter_by(set_id=sid, tenant_id=t).order_by(m.SyntheticRun.created_at.desc()).limit(50).all()
    return [run_to_dict(r, st) for r in rows]


@router.get("/{sid}/testpack")
def testpack(sid: str, language: str = "", s: Session = Depends(db.get_session), t: str = Depends(tenant)):
    st = _get(s, t, sid)
    if st is None:
        return err("Synthetic set not found.", 404)
    code, lang = latest_code(s, t, st.report_id)
    lang = (language or lang or "").lower()
    z = ex.testpack(st.report_id, st.version, json.loads(st.cases_json), code, lang)
    return Response(z, media_type="application/zip", headers={"Content-Disposition": f'attachment; filename="{st.report_id}_testpack_v{st.version}.zip"'})
