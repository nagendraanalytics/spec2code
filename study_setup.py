"""
study_setup.py — studies, versioned metadata, the loader, completeness checks
and the pre-flight reference check.

Metadata a run can use:
  items      form, item, label, data type, code list   (the core)
  visits     visit / event names                        (optional)
  code lists code list name, value, decode              (optional)

Every upload creates a NEW immutable version. Kinds the upload does not
contain are carried over from the previous version unless carry_over is off.
A run uses the study's active version unless one is pinned, and records which
version it used.

Column names are matched by name (case, spaces and punctuation ignored)
against the alias lists below. These aliases were written from how these
systems commonly name their export columns; no real export from most of them
has been tested here, which is why the loader reports exactly what it matched
and what it could not.
"""

from __future__ import annotations

import base64
import csv
import difflib
import io
import json
import re
from typing import Optional

from sqlalchemy.orm import Session

import models_db as m

MAX_ROWS = 200_000

# field -> header aliases in priority order (normalized: lowercase, a-z0-9 only)
ITEM_ALIASES = {
    "form": ["form", "formname", "formoid", "formid", "formcode", "draftformname", "crfname", "crf", "formdefinition", "dataset", "table", "domain"],
    "form_label": ["formlabel", "formtitle", "formdescription", "formdisplayname"],
    "item": ["item", "itemname", "itemoid", "itemid", "fieldoid", "fieldname", "variablefieldname", "variablename", "variable", "variableoid", "columnname", "field"],
    "label": ["label", "itemlabel", "fieldlabel", "questiontext", "question", "descriptionlabel", "pretext", "prompt", "description"],
    "data_type": ["datatype", "dataformat", "fieldtype", "type", "validationtype", "textvalidationtype"],
    "codelist": ["codelist", "codelistname", "datadictionaryname", "dictionary", "codelistid", "responsesetlabel", "responselabel", "optiongroup"],
}
VISIT_ALIASES = {
    "name": ["visit", "visitname", "visitoid", "event", "eventname", "eventoid", "folder", "foldername", "folderoid", "epoch"],
    "label": ["visitlabel", "eventlabel", "label", "description", "displayname"],
    "order": ["order", "ordinal", "visitorder", "sequence", "seq", "position"],
}
CODELIST_ALIASES = {
    "codelist": ["codelist", "codelistname", "datadictionaryname", "dictionary", "codelistid", "name"],
    "value": ["codedvalue", "code", "codevalue", "value", "coded", "submissionvalue"],
    "label": ["decode", "decodedvalue", "label", "text", "meaning", "userdatastring"],
}


class StudyError(Exception):
    pass


def _norm(h: object) -> str:
    return re.sub(r"[^a-z0-9]", "", str(h).lower())


def _pick(headers: dict, aliases: list) -> Optional[str]:
    for a in aliases:
        if a in headers:
            return headers[a]
    return None


def _decode(data: bytes) -> str:
    for enc in ("utf-8-sig", "utf-16", "cp1252"):
        try:
            return data.decode(enc)
        except UnicodeError:
            continue
    return data.decode("utf-8", errors="replace")


# --------------------------------------------------------------------- parse

def _classify(rows: list, columns: list) -> tuple:
    """Returns (kind, column_map) or (None, reason)."""
    headers = {}
    for c in columns:
        headers.setdefault(_norm(c), c)
    cm = {f: _pick(headers, a) for f, a in ITEM_ALIASES.items()}
    if cm["form"] and cm["item"]:
        return "items", cm
    cl = {f: _pick(headers, a) for f, a in CODELIST_ALIASES.items()}
    if cl["codelist"] and cl["value"]:
        return "codelists", cl
    vm = {f: _pick(headers, a) for f, a in VISIT_ALIASES.items()}
    if vm["name"]:
        return "visits", vm
    return None, f"Could not tell what these columns hold: {', '.join(map(str, columns[:8]))}."


def _rows_to_kind(kind: str, cm: dict, rows: list) -> list:
    out = []
    get = lambda r, k: str(r.get(cm[k], "") or "").strip() if cm.get(k) else ""  # noqa: E731
    nan = lambda v: "" if v.lower() == "nan" else v  # noqa: E731
    for i, r in enumerate(rows):
        if kind == "items":
            form, item = nan(get(r, "form")), nan(get(r, "item"))
            if form and item:
                out.append({"form": form, "form_label": nan(get(r, "form_label")), "item": item,
                            "label": nan(get(r, "label")), "data_type": nan(get(r, "data_type")),
                            "codelist": nan(get(r, "codelist"))})
        elif kind == "codelists":
            cl = nan(get(r, "codelist"))
            if cl:
                out.append({"codelist": cl, "value": nan(get(r, "value")), "label": nan(get(r, "label"))})
        else:
            name = nan(get(r, "name"))
            if name:
                order = get(r, "order")
                out.append({"name": name, "label": nan(get(r, "label")),
                            "position": int(float(order)) if re.fullmatch(r"-?\d+(\.0+)?", order or "") else i})
    return out


def parse_files(files: list) -> dict:
    """files: [{"name", "data": base64}] -> {"items": [...], "visits": [...],
    "codelists": [...], "messages": [{level, text}]}"""
    result = {"items": [], "visits": [], "codelists": [], "messages": []}
    msg = lambda level, text: result["messages"].append({"level": level, "text": text})  # noqa: E731
    for f in files:
        name = str(f.get("name", "file"))
        low = name.lower()
        try:
            data = base64.b64decode(f.get("data", ""), validate=False)
        except ValueError:
            msg("error", f"{name}: could not decode the upload.")
            continue
        tables = []  # (label, rows, columns)
        try:
            if low.endswith(".csv") or low.endswith(".txt"):
                reader = csv.DictReader(io.StringIO(_decode(data)))
                rows = list(reader)
                tables.append((name, rows, list(reader.fieldnames or [])))
            elif low.endswith(".xlsx"):
                import pandas as pd

                for sheet, df in pd.read_excel(io.BytesIO(data), sheet_name=None, dtype=str).items():
                    df = df.fillna("")
                    tables.append((f"{name} [{sheet}]", df.to_dict(orient="records"), [str(c) for c in df.columns]))
            else:
                msg("error", f"{name}: unsupported file type. Use .csv or .xlsx.")
                continue
        except ImportError:
            msg("error", f"{name}: reading .xlsx needs the 'openpyxl' package (pip install openpyxl).")
            continue
        except Exception as e:  # noqa: BLE001
            msg("error", f"{name}: could not be read ({e}).")
            continue
        for label, rows, columns in tables:
            if not rows:
                msg("warning", f"{label}: no data rows.")
                continue
            kind, cm = _classify(rows, columns)
            if kind is None:
                msg("warning", f"{label}: {cm}")
                continue
            parsed = _rows_to_kind(kind, cm, rows)
            result[kind].extend(parsed)
            used = ", ".join(f"{k} <- {v}" for k, v in cm.items() if v)
            msg("info", f"{label}: {len(parsed)} {kind} read. Matched columns: {used}.")
        if sum(len(result[k]) for k in ("items", "visits", "codelists")) > MAX_ROWS:
            raise StudyError(f"Too many rows (limit {MAX_ROWS}).")
    return result


# -------------------------------------------------------------------- checks

def checks(items: list, visits: list, codelists: list, dropped: int = 0) -> list:
    out = []
    add = lambda sev, text, n=None: out.append({"severity": sev, "text": text, "count": n})  # noqa: E731
    if not items:
        add("error", "No items loaded. Runs cannot use this version for grounding.")
        return out
    forms = {i["form"] for i in items}
    add("info", f"{len(items)} items across {len(forms)} forms.")
    dup = dropped
    if dup:
        add("warning", "Duplicate form and item pairs. Only the first of each is used.", dup)
    nolabel = sum(1 for i in items if not i["label"])
    if nolabel / len(items) > 0.2:
        add("warning", "Many items have no label. Labels are what let the generator match spec wording to items.", nolabel)
    notype = sum(1 for i in items if not i["data_type"])
    if notype / len(items) > 0.2:
        add("info", "Many items have no data type.", notype)
    if codelists:
        known = {c["codelist"].lower() for c in codelists}
        missing = {i["codelist"] for i in items if i["codelist"] and i["codelist"].lower() not in known}
        if missing:
            add("warning", "Items refer to code lists that were not loaded: " + ", ".join(sorted(missing)[:5]) + ("..." if len(missing) > 5 else ""), len(missing))
    else:
        add("info", "No code lists loaded (optional).")
    add("info", f"{len(visits)} visits loaded." if visits else "No visit schedule loaded (optional).")
    return out


# ----------------------------------------------------------------- persistence

def _get_study(db: Session, tenant_id: str, study_id: str) -> Optional[m.Study]:
    return db.query(m.Study).filter_by(tenant_id=tenant_id, study_id=study_id).first()


def create_study(db: Session, tenant_id: str, study_id: str, name: str, edc_system: str, ta: str = "", sponsor: str = "") -> m.Study:
    study_id = study_id.strip()
    if not study_id:
        raise StudyError("Study ID is required.")
    if not re.fullmatch(r"[A-Za-z0-9._-]{1,64}", study_id):
        raise StudyError("Study ID may use letters, digits, dot, dash and underscore (up to 64 characters).")
    if _get_study(db, tenant_id, study_id):
        raise StudyError(f"Study '{study_id}' already exists.")
    s = m.Study(tenant_id=tenant_id, study_id=study_id, name=name.strip(), edc_system=edc_system, ta=(ta or "").strip()[:100],
               sponsor=(sponsor or "").strip()[:100])
    db.add(s)
    db.commit()
    return s


def _version_rows(v: m.StudyMetadataVersion) -> dict:
    return {
        "items": [{"form": r.form, "form_label": r.form_label or "", "item": r.item, "label": r.label or "",
                   "data_type": r.data_type or "", "codelist": r.codelist or ""} for r in v.items],
        "visits": [{"name": r.name, "label": r.label or "", "position": r.position} for r in sorted(v.visits, key=lambda x: x.position)],
        "codelists": [{"codelist": r.codelist, "value": r.value or "", "label": r.label or ""} for r in v.codelists],
    }


def get_version(study: m.Study, version: Optional[int] = None) -> Optional[m.StudyMetadataVersion]:
    want = version if version is not None else study.active_version
    if want is None:
        return None
    return next((v for v in study.versions if v.version == want), None)


def add_version(db: Session, study: m.Study, parsed: dict, notes: str, source_files: list, carry_over: bool) -> m.StudyMetadataVersion:
    prev = get_version(study)
    prev_rows = _version_rows(prev) if (prev and carry_over) else {"items": [], "visits": [], "codelists": []}
    final = {k: (parsed[k] if parsed[k] else prev_rows[k]) for k in ("items", "visits", "codelists")}
    carried = [k for k in final if not parsed[k] and final[k]]
    # first row wins for duplicate form+item pairs
    seen, items = set(), []
    for i in final["items"]:
        key = (i["form"].lower(), i["item"].lower())
        if key not in seen:
            seen.add(key)
            items.append(i)
    dropped = len(final["items"]) - len(items)
    final["items"] = items
    n = max([v.version for v in study.versions], default=0) + 1
    counts = {"items": len(items), "forms": len({i["form"] for i in items}), "visits": len(final["visits"]),
              "codelists": len({c["codelist"] for c in final["codelists"]}), "carriedOver": carried, "duplicatesDropped": dropped}
    v = m.StudyMetadataVersion(study_pk=study.id, tenant_id=study.tenant_id, version=n,
                               source_files=json.dumps(source_files), notes=notes, counts_json=json.dumps(counts))
    db.add(v)
    db.flush()
    db.add_all([m.StudyItemRow(version_id=v.id, **i) for i in items])
    db.add_all([m.StudyVisitRow(version_id=v.id, position=x["position"], name=x["name"], label=x["label"]) for x in final["visits"]])
    db.add_all([m.StudyCodelistRow(version_id=v.id, **c) for c in final["codelists"]])
    study.active_version = n
    db.commit()
    return v


def version_summary(v: m.StudyMetadataVersion, active: bool = False) -> dict:
    return {"version": v.version, "createdAt": v.created_at.isoformat() if v.created_at else None,
            "notes": v.notes or "", "sourceFiles": json.loads(v.source_files or "[]"),
            "counts": json.loads(v.counts_json or "{}"), "active": active}


def study_summary(s: m.Study) -> dict:
    v = get_version(s)
    return {"studyId": s.study_id, "name": s.name, "edcSystem": s.edc_system, "ta": s.ta or "", "sponsor": s.sponsor or "", "activeVersion": s.active_version,
            "versions": len(s.versions), "counts": json.loads(v.counts_json) if v else None,
            "createdAt": s.created_at.isoformat() if s.created_at else None}


# ---------------------------------------------------------------- resolution

class Resolved:
    """What a run gets for one study: rows plus the version it came from."""

    def __init__(self, study_id: str, version: Optional[int], items: list, edc_system: str, legacy: bool = False):
        self.study_id, self.version, self.items, self.edc_system, self.legacy = study_id, version, items, edc_system, legacy

    def lookup(self) -> dict:
        out: dict = {}
        for i in self.items:
            out.setdefault(i["form"], set()).add(i["item"])
        return out


def resolve(db: Session, tenant_id: str, study_id: str, version: Optional[int] = None) -> Optional[Resolved]:
    """The study's metadata for a run, or None when nothing is loaded. Falls
    back to the older flat metadata table for studies loaded before study
    setup existed."""
    study_id = (study_id or "").strip()
    if not study_id:
        return None
    s = _get_study(db, tenant_id, study_id)
    if s is not None:
        v = get_version(s, version)
        if v is not None:
            return Resolved(study_id, v.version, _version_rows(v)["items"], s.edc_system)
    import store

    legacy = store.get_study_metadata(db, tenant_id, study_id)
    if legacy:
        return Resolved(study_id, None, [{"form": r.form, "form_label": "", "item": r.item, "label": r.label or "",
                                           "data_type": r.data_type or "", "codelist": ""} for r in legacy],
                        s.edc_system if s else "veeva", legacy=True)
    return None


def _tokens(text: str) -> set:
    return {t for t in re.findall(r"[a-z0-9]{3,}", text.lower())}


def prompt_block(res: Optional[Resolved], spec_text: str, max_items: int = 600) -> str:
    """Study metadata as prompt text. Forms the spec mentions come first, so a
    large study still shows the forms that matter."""
    if res is None or not res.items:
        return ""
    low = spec_text.lower()
    by_form: dict = {}
    for i in res.items:
        by_form.setdefault(i["form"], []).append(i)
    def relevant(form: str, rows: list) -> bool:
        label = rows[0]["form_label"].lower()
        return bool(re.search(rf"\b{re.escape(form.lower())}\b", low) or (label and label in low))
    forms = sorted(by_form, key=lambda f: (not relevant(f, by_form[f]), f))
    lines = [f"Study metadata for {res.study_id}" + (f" (version {res.version})" if res.version else "") +
             " -- use ONLY these form and item names. Format: FORM [label]: ITEM (item label, data type)"]
    shown = 0
    for f in forms:
        if shown >= max_items:
            lines.append(f"... {len(forms) - forms.index(f)} more forms not shown (limit reached).")
            break
        head = f"- {f}" + (f" [{by_form[f][0]['form_label']}]" if by_form[f][0]["form_label"] else "")
        parts = []
        for i in by_form[f]:
            extra = ", ".join(x for x in (i["label"], i["data_type"]) if x)
            parts.append(i["item"] + (f" ({extra})" if extra else ""))
            shown += 1
        lines.append(head + ": " + "; ".join(parts))
    return "\n".join(lines)


# ------------------------------------------------------------------ preflight

_REF = re.compile(
    r"\b([A-Za-z][A-Za-z0-9_]{1,24})\s*\.\s*([A-Za-z][^\n<>=;()]*?)(?=\s*(?:<>|!=|>=|<=|=|<|>|\bAND\b|\bOR\b|\bIS\b|\bIN\b|\bNOT\b|\n|$|[()?]))"
)
_STOP = {"AND", "OR", "NOT", "NULL", "IS", "IN", "THE", "AE", "E", "I"}


def _n(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def preflight(res: Optional[Resolved], text: str) -> dict:
    """Heuristic check of FORM.Item references in a spec against the study
    metadata. Never blocks a run: it exists so the user can see unresolved
    names BEFORE spending model calls."""
    if res is None:
        return {"status": "no_metadata", "references": 0, "resolved": 0, "unresolved": []}
    form_names = {_n(i["form"]): i["form"] for i in res.items}
    for i in res.items:
        if i["form_label"]:
            form_names.setdefault(_n(i["form_label"]), i["form"])
    items_by_form: dict = {}
    for i in res.items:
        items_by_form.setdefault(i["form"], []).append(i)
    refs, resolved, unresolved, seen = 0, 0, [], set()
    for fm, it in _REF.findall(text or ""):
        it = it.strip().rstrip(".,:").strip()
        if not it or fm.upper() in _STOP or len(it) < 2:
            continue
        key = (fm.lower(), it.lower())
        if key in seen:
            continue
        seen.add(key)
        form = form_names.get(_n(fm))
        if form is None:
            if fm.isupper() or re.search(r"\d", fm):  # looks like a form code the metadata lacks
                refs += 1
                unresolved.append({"ref": f"{fm}.{it}", "problem": f"Form '{fm}' is not in the metadata"})
            continue
        refs += 1
        want = _n(it)
        cands = items_by_form[form]
        hit = any(want == _n(c["item"]) or want == _n(c["label"]) or
                  (len(want) >= 8 and (want in _n(c["label"]) or (c["label"] and _n(c["label"]) in want)))
                  for c in cands)
        if hit:
            resolved += 1
        else:
            names = [c["label"] or c["item"] for c in cands]
            close = difflib.get_close_matches(it, names, n=1, cutoff=0.6)
            unresolved.append({"ref": f"{fm}.{it}", "problem": f"No item in '{form}' matches" + (f". Closest: {close[0]}" if close else "")})
    status = "ok" if refs and not unresolved else ("none_found" if not refs else "unresolved")
    return {"status": status, "references": refs, "resolved": resolved, "unresolved": unresolved[:25]}
