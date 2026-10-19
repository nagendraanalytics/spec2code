"""Load a folder or zip of reference documents (for example the CDISC publications) into the knowledge library.

  python scripts/import_knowledge_folder.py knowledge_sources.zip --tenant default --manifest manifest.csv
  python scripts/import_knowledge_folder.py ./folder --dry-run

Why a script: a full CDISC set is well over 100 MB, more than a browser upload should carry. It writes straight to the
database named by DATABASE_URL (the same one the app uses) and keeps the original files under SPEC2CODE_KB_DIR.

Everything is stored as a DRAFT. A programmer approves it in the Review queue, or, having read the manifest, passes
--approve-as NAME to approve the whole load in one go. Re-running is safe: a file already in the library at the same
scope is reported as a duplicate, not stored twice. Files with no CDISC naming rule go in at global scope as
"other" and are flagged in the manifest. Scripts, styles, images and saved-page asset folders are skipped.
"""
import argparse
import csv
import hashlib
import os
import sys
import tempfile
import zipfile

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

KEEP = {".pdf", ".docx", ".doc", ".rtf", ".odt", ".xlsx", ".csv", ".txt", ".md", ".html", ".htm", ".sas", ".sql", ".json", ".xml"}


def collect(src: str, work: str) -> list:
    """[(path, display_name)] of candidate files. Zip members are checked for unsafe paths before extracting."""
    out = []
    if zipfile.is_zipfile(src):
        with zipfile.ZipFile(src) as z:
            for i in z.infolist():
                parts = i.filename.replace("\\", "/").split("/")
                if i.is_dir() or i.filename.startswith("/") or ".." in parts:
                    continue
                if any(p.endswith("_files") for p in parts[:-1]):
                    continue  # assets saved next to a web page
                if os.path.splitext(parts[-1])[1].lower() not in KEEP:
                    continue
                dest = os.path.join(work, hashlib.sha1(i.filename.encode()).hexdigest() + os.path.splitext(parts[-1])[1].lower())
                with z.open(i) as fin, open(dest, "wb") as fout:
                    fout.write(fin.read())
                out.append((dest, parts[-1]))
    else:
        for root, dirs, files in os.walk(src):
            dirs[:] = [d for d in dirs if not d.endswith("_files")]
            for f in files:
                if os.path.splitext(f)[1].lower() in KEEP:
                    out.append((os.path.join(root, f), f))
    return sorted(out, key=lambda x: x[1].lower())


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source")
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--created-by", default="import-script")
    ap.add_argument("--manifest", default="knowledge_import_manifest.csv")
    ap.add_argument("--scope", default="global", choices=["global", "sponsor", "ta", "study"], help="scope for files without a built-in rule (default global), e.g. sponsor for a sponsor's own SAS programs")
    ap.add_argument("--scope-ref", default="", help="the sponsor, therapeutic area or study ID the --scope applies to")
    ap.add_argument("--overrides", default="", help="a manifest CSV (as written by a previous run) whose title, scope, scopeRef and standardVersion replace the built-in rules, matched by file name")
    ap.add_argument("--approve-as", default="", help="approve everything stored, as this person (default: leave as drafts)")
    ap.add_argument("--dry-run", action="store_true", help="show what would be stored, write nothing")
    a = ap.parse_args()

    import cdisc_files
    import db
    import knowledge_ingest as ki
    import knowledge_store as ks

    over = {}
    if a.overrides:
        with open(a.overrides, newline="", encoding="utf-8") as f:
            over = {r["file"]: r for r in csv.DictReader(f)}
    work = tempfile.mkdtemp()
    files = collect(a.source, work)
    if not files:
        sys.exit("No usable documents found.")
    rows, session = [], None
    if not a.dry_run:
        db.init_db()
        session = db.SessionLocal()
    for path, name in files:
        meta = cdisc_files.identify(name)
        if name in over:
            o = over[name]
            meta = (o["title"], o["scope"], o["scopeRef"], o["standardVersion"])
        title, scope, ref, ver = meta if meta else (os.path.splitext(name)[0], a.scope, a.scope_ref, "")
        row = {"file": name, "title": title, "scope": scope, "scopeRef": ref, "standardVersion": ver,
               "recognised": "yes" if meta else "NO: stored as global/other, check", "result": "", "chunks": "", "note": ""}
        if a.dry_run:
            row["result"] = "would store"
        else:
            try:
                r = ks.add_source(session, a.tenant, name, open(path, "rb").read(), scope=scope, scope_ref=ref,
                                  doc_type="standard" if meta else "other", standard_version=ver, title=title,
                                  license_note="CDISC publication supplied by the customer. Check CDISC terms before sharing.", created_by=a.created_by)
                row.update(result="duplicate" if r["duplicate"] else "stored draft", chunks=r.get("chunks", ""), note=r.get("note", "")[:90])
                if a.approve_as and not r["duplicate"]:
                    ks.set_status(session, ks.get_source(session, a.tenant, r["sourceId"]), "approved", a.approve_as)
                    row["result"] = "stored and approved"
            except (ki.KnowledgeError, ks.KbError) as e:
                row.update(result="FAILED", note=str(e)[:120])
        rows.append(row)
        print(f"{row['result']:<20} {name}", flush=True)
    with open(a.manifest, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    n = lambda k: sum(1 for r in rows if r["result"].startswith(k))  # noqa: E731
    print(f"\n{len(rows)} files: {n('stored')} stored, {n('duplicate')} duplicates, {n('FAILED')} failed, "
          f"{sum(1 for r in rows if r['recognised'] != 'yes')} not recognised. Manifest: {a.manifest}")


if __name__ == "__main__":
    main()
