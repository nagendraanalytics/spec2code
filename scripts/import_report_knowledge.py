"""Load report-specific files (SAS programs used for a migration, supporting documents, notes) as DRAFT sources
scoped to one Report ID. They are used only when a run's spec has that Report ID.

  python scripts/import_report_knowledge.py <folder-or-zip> --tenant default [--dry-run]

The Report ID of each file is taken, in this order, from:
  1. --map FILE.csv  (columns: file, reportId)
  2. --report-id ID  (everything in the folder belongs to this one report)
  3. the file name, then its folder names, matched with --pattern (default: RID followed by digits, e.g. RID002)
A file with no Report ID is stored under its file name as the label (printed as "label from name"). Retrieval does not
depend on the label: every report file is searched by similarity to the spec being generated, and the label only adds
a ranking boost when it equals the spec's own Report ID. Everything is stored as a draft.
A .sas file becomes a SAS program source; other files are typed by their content. Re-running is safe.
"""
import argparse
import csv
import os
import re
import sys
import tempfile

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from import_knowledge_folder import collect  # noqa: E402


def report_id_for(path: str, name: str, pattern, display_parts=()):
    for text in (name, *reversed(display_parts)):
        m = pattern.search(text)
        if m:
            return m.group(0).upper()
    return ""


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source")
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--created-by", default="report-import")
    ap.add_argument("--map", default="")
    ap.add_argument("--report-id", default="")
    ap.add_argument("--pattern", default=r"RID\d+")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    pattern = re.compile(a.pattern, re.I)
    mapping = {}
    if a.map:
        with open(a.map, newline="", encoding="utf-8") as f:
            mapping = {r["file"]: r["reportId"].strip() for r in csv.DictReader(f)}
    work = tempfile.mkdtemp()
    files = collect(a.source, work)
    if not files:
        sys.exit("No usable documents found.")
    folders = {}
    if os.path.isdir(a.source):
        for root, _, fs in os.walk(a.source):
            rel = os.path.relpath(root, a.source).replace("\\", "/")
            for f in fs:
                folders.setdefault(f, []).append([p for p in rel.split("/") if p not in (".", "")])
    session = None
    if not a.dry_run:
        import db
        db.init_db()
        session = db.SessionLocal()
    import knowledge_ingest as ki
    import knowledge_store as ks
    stored = dup = bad = skipped = 0
    for path, name in files:
        rid = mapping.get(name) or a.report_id.strip() or report_id_for(path, name, pattern, tuple((folders.get(name) or [[]])[0]))
        labelled = False
        if not rid:
            rid = re.sub(r"[^A-Za-z0-9._-]+", "_", os.path.splitext(name)[0])[:60] or "unlabelled"
            labelled = True
            skipped += 1
        if a.dry_run:
            print(f"{'would store':<14} {rid:<12} {name}" + ("  (label from name)" if labelled else ""))
            continue
        try:
            r = ks.add_source(session, a.tenant, name, open(path, "rb").read(), scope="report", scope_ref=rid,
                              doc_type="sas_program" if name.lower().endswith(".sas") else "", title=f"{rid}: {os.path.splitext(name)[0]}",
                              license_note="Report-specific file supplied by the customer.", created_by=a.created_by)
            dup += bool(r["duplicate"])
            stored += not r["duplicate"]
            print(f"{'duplicate' if r['duplicate'] else 'stored draft':<14} {rid:<12} {name}  ({r.get('chunks', '')} chunks)" + ("  (label from name)" if labelled else ""))
        except (ki.KnowledgeError, ks.KbError) as e:
            bad += 1
            print(f"{'FAILED':<14} {rid:<12} {name}: {e}")
    print(f"\n{stored} stored as drafts, {dup} duplicates, {bad} failed, {skipped} labelled from the file name. "
          "Approve them in the Review queue after reading.")


if __name__ == "__main__":
    main()
