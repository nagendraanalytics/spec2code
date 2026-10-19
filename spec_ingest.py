"""
spec_ingest.py — turn files and folders into candidate listings for a batch.

Supported inputs (one file may yield many listings):
  .json        one spec object, a list of specs, or {"specs": [...]}
  .csv .xlsx   one row = one listing; columns are matched by name (see ALIASES)
  .txt .md     raw spec text -> becomes a "raw" listing, extracted by the model at run time
  .docx        paragraph and table text -> raw listing (read with the standard library, no extra dependency)

Anything else is reported as skipped with a reason, never silently dropped.

Server-side folder scanning is only allowed under the roots named in the
SPEC2CODE_SPEC_ROOTS environment variable (os.pathsep-separated). Without it
the endpoint refuses, because a multi-user deployment must not let a request
read arbitrary paths on the server.
"""

from __future__ import annotations

import base64
import csv
import io
import json
import os
import re
import zipfile
from xml.etree import ElementTree

MAX_FILES = 2000
MAX_FILE_BYTES = 5 * 1024 * 1024
MAX_TOTAL_BYTES = 60 * 1024 * 1024

FIELDS = ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting", "studyId"]

ALIASES = {
    "reportId": ["reportid", "report_id", "id", "listingid", "listing", "specid", "reportname", "name", "listingname"],
    "description": ["description", "desc", "reportdescription", "purpose"],
    "columnHeading": ["columnheading", "columnheadings", "columns", "outputcolumns", "column"],
    "logic": ["logic", "reportlogic", "specification", "rules"],
    "reportScenarios": ["reportscenarios", "scenarios", "scenario"],
    "sorting": ["sorting", "sort", "sortorder"],
    "studyId": ["studyid", "study", "protocol", "protocolid", "protocolnumber"],
}
_ALIAS_LOOKUP = {a: field for field, names in ALIASES.items() for a in names}

RAW_EXT = {".txt", ".md"}
TABLE_EXT = {".csv", ".xlsx"}
SUPPORTED = {".json", ".docx"} | RAW_EXT | TABLE_EXT


class IngestError(Exception):
    pass


def _key(name: object) -> str:
    return re.sub(r"[^a-z0-9]", "", str(name).lower())


def _stem(name: str) -> str:
    base = re.split(r"[\\/]", name)[-1]
    return os.path.splitext(base)[0]


def _normalize(row: dict) -> dict:
    """Map arbitrary column/field names onto the six spec fields."""
    out = {f: "" for f in FIELDS}
    for k, v in row.items():
        field = _ALIAS_LOOKUP.get(_key(k))
        if field and v is not None and str(v).strip().lower() != "nan":
            if not out[field]:
                out[field] = str(v).strip()
    return out


def _spec_item(name: str, spec: dict, label: str | None = None) -> dict:
    spec = _normalize(spec)
    err = None
    if not spec["reportId"]:
        err = "No report ID found."
    elif not spec["description"]:
        err = "No description found."
    return {"name": label or name, "source": name, "kind": "spec", "spec": spec, "rawText": None,
            "reportId": spec["reportId"] or _stem(name), "error": err}


def _raw_item(name: str, text: str) -> dict:
    if not text.strip():
        return {"name": name, "source": name, "kind": "raw", "spec": None, "rawText": "",
                "reportId": _stem(name), "error": "File is empty."}
    return {"name": name, "source": name, "kind": "raw", "spec": None, "rawText": text,
            "reportId": _stem(name), "error": None}


def _docx_text(data: bytes) -> str:
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            xml = z.read("word/document.xml")
    except (zipfile.BadZipFile, KeyError) as e:
        raise IngestError(f"Not a readable .docx file ({e}).") from e
    ns = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    root = ElementTree.fromstring(xml)
    lines = []
    for p in root.iter(f"{ns}p"):
        text = "".join(t.text or "" for t in p.iter(f"{ns}t"))
        if text.strip():
            lines.append(text)
    return "\n".join(lines)


def _decode_text(data: bytes) -> str:
    for enc in ("utf-8-sig", "utf-16", "cp1252"):
        try:
            return data.decode(enc)
        except UnicodeError:
            continue
    return data.decode("utf-8", errors="replace")


def parse_bytes(name: str, data: bytes) -> list[dict]:
    """Returns one item per listing found in the file, or a single item with
    `error` set when the file cannot be used."""
    ext = os.path.splitext(name)[1].lower()
    try:
        if len(data) > MAX_FILE_BYTES:
            raise IngestError(f"File is larger than {MAX_FILE_BYTES // (1024 * 1024)} MB.")
        if ext == ".json":
            payload = json.loads(_decode_text(data))
            if isinstance(payload, dict) and isinstance(payload.get("specs"), list):
                payload = payload["specs"]
            if isinstance(payload, dict):
                payload = [payload]
            if not isinstance(payload, list) or not all(isinstance(x, dict) for x in payload):
                raise IngestError("JSON must be a spec object or a list of spec objects.")
            multi = len(payload) > 1
            return [_spec_item(name, s, f"{name} #{i + 1}" if multi else None) for i, s in enumerate(payload)]
        if ext == ".csv":
            rows = list(csv.DictReader(io.StringIO(_decode_text(data))))
            if not rows:
                raise IngestError("CSV has no data rows.")
            return [_spec_item(name, r, f"{name} row {i + 2}") for i, r in enumerate(rows)]
        if ext == ".xlsx":
            try:
                import pandas as pd

                sheets = pd.read_excel(io.BytesIO(data), sheet_name=None, dtype=str)
            except ImportError as e:
                raise IngestError("Reading .xlsx needs the 'openpyxl' package (pip install openpyxl).") from e
            items = []
            for sheet, df in sheets.items():
                for i, r in enumerate(df.fillna("").to_dict(orient="records")):
                    if any(str(v).strip() for v in r.values()):
                        items.append(_spec_item(name, r, f"{name} [{sheet}] row {i + 2}"))
            if not items:
                raise IngestError("Workbook has no data rows.")
            return items
        if ext == ".docx":
            return [_raw_item(name, _docx_text(data))]
        if ext in RAW_EXT:
            return [_raw_item(name, _decode_text(data))]
        raise IngestError(f"Unsupported file type '{ext or 'none'}'. Use .json, .csv, .xlsx, .docx, .txt or .md.")
    except IngestError as e:
        return [{"name": name, "source": name, "kind": "error", "spec": None, "rawText": None,
                 "reportId": _stem(name), "error": str(e)}]
    except (ValueError, csv.Error) as e:
        return [{"name": name, "source": name, "kind": "error", "spec": None, "rawText": None,
                 "reportId": _stem(name), "error": f"Could not parse file: {e}"}]


def parse_uploads(files: list[dict]) -> dict:
    """files: [{"name": relative path, "data": base64}]"""
    if len(files) > MAX_FILES:
        raise IngestError(f"Too many files ({len(files)}). The limit is {MAX_FILES} per request.")
    items, skipped, total = [], [], 0
    for f in files:
        name = str(f.get("name", "")).replace("\\", "/")
        ext = os.path.splitext(name)[1].lower()
        if ext not in SUPPORTED:
            skipped.append({"name": name, "reason": f"unsupported type '{ext or 'none'}'"})
            continue
        try:
            data = base64.b64decode(f.get("data", ""), validate=False)
        except ValueError:
            items.append({"name": name, "source": name, "kind": "error", "spec": None, "rawText": None,
                          "reportId": _stem(name), "error": "File data was not valid base64."})
            continue
        total += len(data)
        if total > MAX_TOTAL_BYTES:
            raise IngestError(f"Upload is larger than {MAX_TOTAL_BYTES // (1024 * 1024)} MB in total.")
        items.extend(parse_bytes(name, data))
    return {"items": items, "skipped": skipped}


def allowed_roots() -> list[str]:
    raw = os.environ.get("SPEC2CODE_SPEC_ROOTS", "")
    return [os.path.realpath(p) for p in raw.split(os.pathsep) if p.strip()]


def scan_folder(path: str, recursive: bool = True) -> dict:
    roots = allowed_roots()
    if not roots:
        raise IngestError(
            "Server folder scanning is disabled. Set SPEC2CODE_SPEC_ROOTS to the folder(s) the server may read "
            "(for example C:\\specs), restart the API, or use the Upload folder option instead."
        )
    real = os.path.realpath(path)
    norm = os.path.normcase(real)
    if not any(norm == os.path.normcase(r) or norm.startswith(os.path.normcase(r) + os.sep) for r in roots):
        raise IngestError("That folder is outside the locations the server is allowed to read (SPEC2CODE_SPEC_ROOTS).")
    if not os.path.isdir(real):
        raise IngestError("Folder not found on the server.")

    names = []
    if recursive:
        for dirpath, _dirs, files in os.walk(real):
            names.extend(os.path.join(dirpath, f) for f in files)
    else:
        names = [os.path.join(real, f) for f in os.listdir(real) if os.path.isfile(os.path.join(real, f))]
    names.sort()
    if len(names) > MAX_FILES:
        raise IngestError(f"Folder has {len(names)} files; the limit is {MAX_FILES}. Scan a sub-folder instead.")

    items, skipped, total = [], [], 0
    for full in names:
        rel = os.path.relpath(full, real).replace("\\", "/")
        ext = os.path.splitext(full)[1].lower()
        if ext not in SUPPORTED:
            skipped.append({"name": rel, "reason": f"unsupported type '{ext or 'none'}'"})
            continue
        size = os.path.getsize(full)
        total += size
        if total > MAX_TOTAL_BYTES:
            raise IngestError(f"Folder is larger than {MAX_TOTAL_BYTES // (1024 * 1024)} MB of supported files.")
        with open(full, "rb") as fh:
            items.extend(parse_bytes(rel, fh.read(MAX_FILE_BYTES + 1)))
    return {"items": items, "skipped": skipped, "root": real}
