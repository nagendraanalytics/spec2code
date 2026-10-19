"""Load the AI-drafted listing library into the knowledge library as DRAFT sources.

  python scripts/import_listing_library.py --tenant default [--dry-run]

Each file in listing_library/docs becomes one source (type Standard listing), global or scoped to a therapeutic area as
listed in listing_library/manifest.json. Everything is stored as a draft and is marked as AI-generated in its title and
text. Nothing is approved here: a programmer reads each document and approves it in the Review queue.
Re-running is safe: a file already in the library is reported as a duplicate.
"""
import argparse
import json
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, ROOT)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--created-by", default="listing-library")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    lib = os.path.join(ROOT, "listing_library")
    manifest = json.load(open(os.path.join(lib, "manifest.json"), encoding="utf-8"))
    if a.dry_run:
        for m in manifest:
            print(f"would store   {m['scope']:<7} {m['scopeRef'] or '-':<18} {m['listings']:>3} listings  {m['title']}")
        print(f"\n{len(manifest)} documents, {sum(m['listings'] for m in manifest)} listings.")
        return
    import db
    import knowledge_ingest as ki
    import knowledge_store as ks
    db.init_db()
    s = db.SessionLocal()
    stored = dup = bad = 0
    for m in manifest:
        data = open(os.path.join(lib, "docs", m["file"]), "rb").read()
        try:
            r = ks.add_source(s, a.tenant, m["file"], data, scope=m["scope"], scope_ref=m["scopeRef"], doc_type=m["docType"],
                              title=m["title"], license_note="AI-generated draft written for Spec2Code. Not verified by a CDM programmer.",
                              created_by=a.created_by)
            if r["duplicate"]:
                dup += 1
            else:
                stored += 1
            print(f"{'duplicate' if r['duplicate'] else 'stored draft':<13} {m['title']}  ({r.get('chunks', '')} chunks)")
        except (ki.KnowledgeError, ks.KbError) as e:
            bad += 1
            print(f"FAILED        {m['title']}: {e}")
    print(f"\n{stored} stored as drafts, {dup} duplicates, {bad} failed. Approve them in the Review queue after reading.")


if __name__ == "__main__":
    main()
