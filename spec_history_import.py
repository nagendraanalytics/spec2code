"""
spec_history_import.py -- bring specs that were executed OUTSIDE this tool into the Spec library,
together with their review and their code.

Input: .csv / .xlsx / .json, one row = one executed spec. Columns are matched by name:
  spec fields   Report ID, Description, Column Heading, Logic, Report Scenarios, Sorting
  review        Readiness (ready / ready with notes / needs revision), Review Summary, Review Notes
  code          Code (or CQL / SAS / SQL / R / Python), Language, Status

Imported rows are stored with source="imported" and run status "imported". They are history for people to
read. They are NOT added to the trusted precedent store: that still needs a programmer to approve the code.
"""
from __future__ import annotations

import base64
import csv
import io
import json
import os
import re

from spec_ingest import ALIASES, IngestError, MAX_FILE_BYTES, MAX_FILES, _decode_text, _key

LANGS = {"cql", "sql", "sas", "r", "python"}
READINESS = {"ready": "ready", "readywithnotes": "ready_with_notes", "readywithcomments": "ready_with_notes",
             "notes": "ready_with_notes", "needsrevision": "needs_revision", "revision": "needs_revision",
             "notready": "needs_revision", "rejected": "needs_revision", "approved": "ready", "pass": "ready"}
EXTRA = {
    "readiness": ["readiness", "reviewstatus", "reviewresult", "reviewoutcome"],
    "summary": ["reviewsummary", "summary"],
    "notes": ["reviewnotes", "reviewcomments", "comments", "findings", "reviewfindings"],
    "code": ["code", "generatedcode", "finalcode", "program", "query"],
    "language": ["language", "lang", "codelanguage", "codetype"],
    "status": ["status", "runstatus", "executionstatus"],
}
for _lang in LANGS:
    EXTRA["code"].append(_lang)
_LOOKUP = {a: f for f, names in {**{k: v for k, v in ALIASES.items() if k != "studyId"}, **EXTRA}.items() for a in names}
SPEC_FIELDS = ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting"]


def _norm_lang(v: str) -> str:
    v = re.sub(r"[^a-z]", "", (v or "").lower())
    return v if v in LANGS else ""


def _row(raw: dict, source: str, label: str) -> dict:
    out = {f: "" for f in SPEC_FIELDS + list(EXTRA)}
    code_col_lang = ""
    for k, v in raw.items():
        if v is None or str(v).strip().lower() in ("", "nan"):
            continue
        key = _key(k)
        f = _LOOKUP.get(key)
        if not f:
            continue
        if f == "code" and key in LANGS and not code_col_lang:
            code_col_lang = key  # a column literally named "SAS" says what language the code is
        if not out[f]:
            out[f] = str(v).strip() if f != "code" else str(v)
    lang = _norm_lang(out["language"]) or code_col_lang
    ready = READINESS.get(re.sub(r"[^a-z]", "", out["readiness"].lower()), "")
    problems = []
    if not out["reportId"]:
        problems.append("No report ID.")
    if not out["description"]:
        problems.append("No description.")
    if out["readiness"] and not ready:
        problems.append(f"Readiness '{out['readiness']}' is not ready / ready with notes / needs revision.")
    if out["language"] and not _norm_lang(out["language"]):
        problems.append(f"Language '{out['language']}' is not one of cql, sql, sas, r, python.")
    if out["code"] and not lang:
        problems.append("Code given without a language (add a Language column).")
    return {"label": label, "source": source, "spec": {f: out[f] for f in SPEC_FIELDS},
            "review": {"readiness": ready, "summary": out["summary"], "notes": out["notes"]} if (ready or out["summary"] or out["notes"]) else None,
            "code": {"text": out["code"], "language": lang, "status": out["status"]} if out["code"] else None,
            "error": " ".join(problems) or None}


def parse_bytes(name: str, data: bytes) -> list[dict]:
    ext = os.path.splitext(name)[1].lower()
    try:
        if len(data) > MAX_FILE_BYTES:
            raise IngestError(f"File is larger than {MAX_FILE_BYTES // (1024 * 1024)} MB.")
        if ext == ".json":
            p = json.loads(_decode_text(data))
            if isinstance(p, dict) and isinstance(p.get("specs"), list):
                p = p["specs"]
            if isinstance(p, dict):
                p = [p]
            if not isinstance(p, list) or not all(isinstance(x, dict) for x in p):
                raise IngestError("JSON must be an object or a list of objects.")
            rows = p
        elif ext == ".csv":
            rows = list(csv.DictReader(io.StringIO(_decode_text(data))))
        elif ext == ".xlsx":
            try:
                import pandas as pd
                sheets = pd.read_excel(io.BytesIO(data), sheet_name=None, dtype=str)
            except ImportError as e:
                raise IngestError("Reading .xlsx needs the 'openpyxl' package.") from e
            rows = [r for df in sheets.values() for r in df.fillna("").to_dict(orient="records")]
        else:
            raise IngestError(f"Unsupported type '{ext or 'none'}'. Use .csv, .xlsx or .json.")
        rows = [r for r in rows if any(str(v).strip() for v in r.values())]
        if not rows:
            raise IngestError("No data rows found.")
        return [_row(r, name, f"{name} row {i + 2}") for i, r in enumerate(rows)]
    except IngestError as e:
        return [{"label": name, "source": name, "spec": None, "review": None, "code": None, "error": str(e)}]
    except (ValueError, csv.Error) as e:
        return [{"label": name, "source": name, "spec": None, "review": None, "code": None, "error": f"Could not parse: {e}"}]


def parse_files(files: list[dict]) -> list[dict]:
    if len(files) > MAX_FILES:
        raise IngestError(f"Too many files ({len(files)}).")
    out = []
    for f in files:
        name = str(f.get("name", "")).replace("\\", "/")
        try:
            data = base64.b64decode(f.get("data", ""), validate=False)
        except ValueError:
            out.append({"label": name, "source": name, "spec": None, "review": None, "code": None, "error": "Invalid base64."})
            continue
        out.extend(parse_bytes(name, data))
    return out


def save(db, tenant_id: str, rows: list[dict], store) -> dict:
    """Writes every row without an error. A report ID already in the library for this tenant is skipped
    (never overwritten), so re-importing the same file is safe."""
    from models_db import Spec
    have = {r for (r,) in db.query(Spec.report_id).filter(Spec.tenant_id == tenant_id).all()}
    created, skipped, failed = [], [], []
    for r in rows:
        rid = (r.get("spec") or {}).get("reportId", "")
        if r.get("error"):
            failed.append({"label": r["label"], "error": r["error"]})
        elif rid in have:
            skipped.append({"label": r["label"], "reportId": rid, "reason": "already in the library"})
        else:
            spec = store.create_spec(db, tenant_id, {**r["spec"], "source": "imported"})
            if r["review"]:
                rv = r["review"]
                insights = [{"category": "imported", "severity": "info", "finding": rv["notes"], "suggestion": ""}] if rv["notes"] else []
                store.save_review(db, tenant_id, spec.id, {"readiness": rv["readiness"] or "ready_with_notes", "insights": insights, "summary": rv["summary"]})
            if r["code"]:
                c = r["code"]
                store.save_generation_run(db, tenant_id, spec.id, {
                    "cql": c["text"], "language": c["language"], "source": "imported", "status": "imported",
                    "explanation": f"Imported from {r['source']}." + (f" Original status: {c['status']}." if c["status"] else ""),
                })
            have.add(rid)
            created.append({"reportId": rid, "specId": spec.id, "review": bool(r["review"]), "code": bool(r["code"])})
    return {"created": created, "skipped": skipped, "failed": failed}
