"""knowledge_ingest.py - turn an uploaded file of any common format into
text blocks, then into chunks fit for retrieval.

Extraction never pretends: a scanned PDF with no text layer is reported as
`needs_ocr` (OCR is not run here), a legacy .doc is converted only when
LibreOffice is installed, and every result carries a note saying what
happened so the review queue can show it.
"""

import csv
import io
import os
import re
import shutil
import subprocess
import tempfile
import zipfile
from dataclasses import dataclass, field
from html.parser import HTMLParser
from xml.etree import ElementTree

MAX_FILE_BYTES = 40 * 1024 * 1024
CHUNK_CHARS = 1400  # target upper size of a text chunk
CHUNK_OVERLAP = 150
TABLE_CHARS = 1500
DOC_TYPES = ("standard", "protocol", "spec", "sas_program", "history", "edc_guide", "listing_standard", "other")


class KnowledgeError(Exception):
    pass


@dataclass
class Block:
    text: str
    heading: str = ""
    kind: str = "text"  # text | table | code
    meta: dict = field(default_factory=dict)


@dataclass
class Extracted:
    blocks: list
    status: str = "ok"  # ok | needs_ocr | empty | error
    note: str = ""

    @property
    def chars(self) -> int:
        return sum(len(b.text) for b in self.blocks)


# ------------------------------------------------------------------ readers

def _decode(data: bytes) -> str:
    for enc in ("utf-8-sig", "utf-16", "cp1252"):
        try:
            return data.decode(enc)
        except UnicodeError:
            continue
    return data.decode("utf-8", errors="replace")


_W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def _docx_blocks(data: bytes) -> list:
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            root = ElementTree.fromstring(z.read("word/document.xml"))
    except (zipfile.BadZipFile, KeyError) as e:
        raise KnowledgeError(f"Not a readable .docx file ({e}).") from e
    body = root.find(f"{_W}body")
    if body is None:
        return []
    blocks, heading = [], ""

    def para_text(p):
        return "".join(t.text or "" for t in p.iter(f"{_W}t")).strip()

    for el in body:
        if el.tag == f"{_W}p":
            text = para_text(el)
            if not text:
                continue
            style = el.find(f"{_W}pPr/{_W}pStyle")
            sval = (style.get(f"{_W}val") if style is not None else "") or ""
            if re.match(r"(?i)^(heading|title)\s*\d*$", sval) or re.match(r"(?i)^heading", sval):
                heading = text
                continue
            blocks.append(Block(text, heading, "text"))
        elif el.tag == f"{_W}tbl":
            rows = []
            for tr in el.iter(f"{_W}tr"):
                cells = [" ".join(para_text(p) for p in tc.iter(f"{_W}p")).strip() for tc in tr.iter(f"{_W}tc")]
                if any(cells):
                    rows.append(cells)
            if rows:
                blocks.append(Block(_rows_to_text(rows), heading, "table", {"rows": len(rows)}))
    return blocks


def _rows_to_text(rows: list) -> str:
    return "\n".join(" | ".join(c.strip() for c in r) for r in rows)


def _pdf_blocks(data: bytes) -> Extracted:
    pages = []
    err = ""
    try:
        from pypdf import PdfReader

        reader = PdfReader(io.BytesIO(data))
        if reader.is_encrypted:
            try:
                reader.decrypt("")
            except Exception:
                pass
        pages = [(p.extract_text() or "") for p in reader.pages]
    except ImportError as e:
        pages, err = [], f"pypdf is not installed ({e})"
    except Exception as e:
        pages, err = [], f"{type(e).__name__}: {e}"
    if sum(len(p.strip()) for p in pages) < 40 and shutil.which("pdftotext"):
        with tempfile.TemporaryDirectory() as d:
            src = os.path.join(d, "in.pdf")
            open(src, "wb").write(data)
            try:
                out = subprocess.run(["pdftotext", "-layout", src, "-"], capture_output=True, timeout=120).stdout
                pages = _decode(out).split("\f")
            except Exception:
                pass
    total = sum(len(p.strip()) for p in pages)
    if total < 40 and err:
        hint = " This PDF is encrypted. Run: pip install cryptography" if "crypt" in err.lower() or "aes" in err.lower() else ""
        return Extracted([], "error", f"The PDF could not be read: {err[:200]}.{hint} Then delete this source and import again.")
    if total < 40:
        return Extracted([], "needs_ocr",
                         "No text layer was found. This looks like a scanned PDF. OCR is not run here: "
                         "run OCR on it first and upload the result.")
    blocks = []
    for n, txt in enumerate(pages, 1):
        txt = txt.strip()
        if txt:
            blocks.append(Block(txt, "", "text", {"page": n}))
    return Extracted(blocks, "ok", f"{len(pages)} pages read. Tables in PDFs are read as plain text and can lose their structure.")


def _sheet_blocks(name: str, rows: list) -> list:
    rows = [r for r in rows if any(str(c).strip() for c in r)]
    if not rows:
        return []
    head, body = [str(c).strip() for c in rows[0]], rows[1:]
    out, cur, size = [], [], 0
    for r in body:
        line = " | ".join(f"{h}: {str(v).strip()}" if h else str(v).strip() for h, v in zip(head, r) if str(v).strip())
        if not line:
            continue
        if size + len(line) > TABLE_CHARS and cur:
            out.append(Block("\n".join(cur), name, "table", {"sheet": name}))
            cur, size = [], 0
        cur.append(line)
        size += len(line) + 1
    if cur:
        out.append(Block("\n".join(cur), name, "table", {"sheet": name}))
    if not body:  # a header-only sheet is still worth keeping as text
        out.append(Block(" | ".join(head), name, "table", {"sheet": name}))
    return out


def _xlsx_blocks(data: bytes) -> list:
    try:
        import openpyxl

        wb = openpyxl.load_workbook(io.BytesIO(data), read_only=True, data_only=True)
    except Exception as e:
        raise KnowledgeError(f"Not a readable .xlsx file ({e}).") from e
    blocks = []
    for ws in wb.worksheets:
        rows = [["" if c is None else str(c) for c in r] for r in ws.iter_rows(values_only=True)]
        blocks += _sheet_blocks(ws.title, rows)
    return blocks


class _Strip(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts, self.skip = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
        if tag in ("p", "br", "div", "li", "tr", "h1", "h2", "h3", "h4"):
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self.skip:
            self.skip -= 1

    def handle_data(self, d):
        if not self.skip:
            self.parts.append(d)


def _legacy_to_docx(name: str, data: bytes) -> bytes:
    exe = shutil.which("soffice") or shutil.which("libreoffice")
    if not exe:
        raise KnowledgeError(f"{os.path.splitext(name)[1]} files need LibreOffice to convert, and it is not installed here. Save the file as .docx and upload that.")
    with tempfile.TemporaryDirectory() as d:
        src = os.path.join(d, "in" + os.path.splitext(name)[1].lower())
        open(src, "wb").write(data)
        try:
            subprocess.run([exe, "--headless", "--convert-to", "docx", "--outdir", d, src], capture_output=True, timeout=180)
            return open(os.path.join(d, "in.docx"), "rb").read()
        except Exception as e:
            raise KnowledgeError(f"Could not convert {name} to .docx ({e}). Save it as .docx and upload that.") from e


def extract(name: str, data: bytes) -> Extracted:
    ext = os.path.splitext(name)[1].lower()
    if len(data) > MAX_FILE_BYTES:
        raise KnowledgeError(f"File is larger than {MAX_FILE_BYTES // (1024 * 1024)} MB.")
    if not data:
        return Extracted([], "empty", "File is empty.")
    try:
        if ext == ".pdf":
            r = _pdf_blocks(data)
        elif ext == ".docx":
            r = Extracted(_docx_blocks(data))
        elif ext in (".doc", ".rtf", ".odt"):
            r = Extracted(_docx_blocks(_legacy_to_docx(name, data)), note="Converted to .docx with LibreOffice first.")
        elif ext in (".xlsx", ".xlsm"):
            r = Extracted(_xlsx_blocks(data))
        elif ext == ".csv":
            text = _decode(data)
            rows = list(csv.reader(io.StringIO(text)))
            r = Extracted(_sheet_blocks(os.path.basename(name), rows))
        elif ext in (".html", ".htm"):
            p = _Strip()
            p.feed(_decode(data))
            r = Extracted([Block(re.sub(r"\n\s*\n+", "\n\n", "".join(p.parts)).strip())])
        elif ext in (".txt", ".md", ".sas", ".sql", ".r", ".py", ".json", ".xml", ".log", ".cql", ".yaml", ".yml"):
            text = _decode(data).strip()
            kind = "code" if ext in (".sas", ".sql", ".r", ".py", ".cql") else "text"
            r = Extracted([Block(text, "", kind)] if text else [])
        else:
            raise KnowledgeError(f"Unsupported file type '{ext or name}'. Use PDF, Word, Excel, CSV, text, Markdown, HTML, SAS, JSON or XML.")
    except KnowledgeError:
        raise
    except Exception as e:
        raise KnowledgeError(f"Could not read {name}: {e}") from e
    if r.status == "ok" and r.chars < 20:
        r.status, r.note = "empty", (r.note + " No readable text found.").strip()
    return r


# ----------------------------------------------------------------- chunking

_SAS_SPLIT = re.compile(r"(?im)^\s*(?=%macro\b|proc\s+\w+|data\s+[\w.]+\s*[;(])")


def _split_long(text: str, heading: str, kind: str, meta: dict) -> list:
    if len(text) <= CHUNK_CHARS:
        return [Block(text, heading, kind, dict(meta))]
    paras = re.split(r"\n\s*\n|\n(?=\s*(?:\d+(?:\.\d+)*[.)]?\s|[-*•]\s))", text)
    out, cur = [], ""
    for p in paras:
        p = p.strip()
        if not p:
            continue
        if len(p) > CHUNK_CHARS:  # one huge paragraph: cut at sentence ends
            for s in re.split(r"(?<=[.;:])\s+", p):
                if len(cur) + len(s) > CHUNK_CHARS and cur:
                    out.append(cur)
                    cur = cur[-CHUNK_OVERLAP:] + " "
                cur += s + " "
            continue
        if len(cur) + len(p) > CHUNK_CHARS and cur:
            out.append(cur.strip())
            cur = cur[-CHUNK_OVERLAP:] + "\n"
        cur += p + "\n"
    if cur.strip():
        out.append(cur.strip())
    return [Block(t, heading, kind, dict(meta)) for t in out if t.strip()]


def _guess_heading(text: str) -> str:
    """Infers a section heading from a plain-text line such as '4.2 Study Design'."""
    first = text.strip().split("\n", 1)[0].strip()
    if 3 <= len(first) <= 90 and re.match(r"^(\d+(\.\d+){0,4}[.)]?\s+[A-Z]|[A-Z][A-Z0-9 ,&/-]{4,})", first) and not first.endswith("."):
        return first
    return ""


def chunk(extracted: Extracted, doc_type: str = "other") -> list:
    """Chunks by content: code by macro or step, tables by row groups with the
    header repeated, prose by heading section then paragraph."""
    out = []
    for b in extracted.blocks:
        if b.kind == "code" or doc_type == "sas_program":
            parts = [p for p in _SAS_SPLIT.split(b.text) if p.strip()] or [b.text]
            for p in parts:
                out += _split_long(p.strip(), b.heading, "code", b.meta)
        elif b.kind == "table":
            out += _split_long(b.text, b.heading, "table", b.meta)
        else:
            heading = b.heading
            # plain text keeps its structure in lines: start a new section at a numbered heading line,
            # or at a markdown '#' heading. Lines inside a ``` fence are never taken for headings.
            sections, cur, cur_h, fenced = [], [], "", False
            for line in b.text.split("\n"):
                if line.strip().startswith("```"):
                    fenced = not fenced
                md = re.match(r"^#{1,4}\s+(.{2,90})$", line) if not fenced else None
                h = md.group(1).strip() if md else (_guess_heading(line) if not (b.heading or fenced) else "")
                if h and cur and (md or len("\n".join(cur)) > 200):
                    sections.append((cur_h, cur))
                    cur = []
                if h and (md or not cur_h):
                    cur_h = h if md else cur_h
                cur.append(line)
            sections.append((cur_h, cur))
            for sh, sec in sections:
                text = "\n".join(sec).strip()
                if not text:
                    continue
                h = heading or sh or _guess_heading(text)
                out += _split_long(text, h, "text", b.meta)
    return [c for c in out if len(c.text.strip()) >= 15]


# ---------------------------------------------------------- classification

_RULES = [
    ("sas_program", [r"\bproc\s+(sql|sort|freq|print|means)\b", r"%macro\b", r"\blibname\b", r"\bdata\s+\w+;"], 2),
    ("protocol", [r"\bschedule of (assessments|activities|events)\b", r"\binclusion criteria\b", r"\bexclusion criteria\b", r"\bprimary (objective|endpoint)\b", r"\bprotocol (number|title)\b", r"\bstudy design\b"], 3),
    ("standard", [r"\bSDTM\b", r"\bADaM\b", r"\bCDASH\b", r"\bimplementation guide\b", r"\bcontrolled terminology\b", r"\bdefine[-.]?xml\b", r"\bUSUBJID\b.*\bSTUDYID\b"], 2),
    ("edc_guide", [r"\bvault cdms\b", r"\bmedidata rave\b", r"\bclinical one\b", r"\bopenclinica\b", r"\bedit check", r"\bcrf completion\b", r"\bform (definition|library)\b"], 2),
    ("listing_standard", [r"\blisting\b.*\b(logic|scenario|column heading)\b", r"\breport id\b", r"\bcolumn heading\b", r"\bscenario\s*\d"], 2),
    ("spec", [r"\bspecification\b", r"\bmapping\b.*\bderivation\b", r"\bsource variable\b"], 2),
    ("history", [r"\bcreated by\b", r"\bdate created\b", r"\bprevious (run|version)\b", r"\bchange log\b", r"\blessons learned\b"], 2),
]


def classify(name: str, blocks_text: str) -> tuple:
    """A transparent keyword heuristic, NOT a model: returns (doc_type, reason).
    The person confirms or changes it at upload."""
    ext = os.path.splitext(name)[1].lower()
    low = (name + "\n" + blocks_text[:20000])
    if ext == ".sas":
        return "sas_program", "File extension .sas"
    scores = []
    for t, pats, need in _RULES:
        hits = [p for p in pats if re.search(p, low, re.I)]
        if len(hits) >= need:
            scores.append((len(hits), t, hits))
    if not scores:
        return "other", "No document-type keywords found"
    scores.sort(reverse=True)
    n, t, hits = scores[0]
    return t, f"Matched {n} {t.replace('_', ' ')} keyword pattern{'s' if n != 1 else ''}"
