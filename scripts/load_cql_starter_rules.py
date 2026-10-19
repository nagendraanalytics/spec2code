"""Create the draft CQL rules for Veeva CDB as drafts.   python scripts/load_cql_starter_rules.py --tenant default [--dry-run]

Run after scripts/import_knowledge_folder.py. Needs the Veeva CDB reference in the library. Every rule is checked against the stored
text first, and is created only if its evidence quote is found there. Rules are drafts: approve them in the Rules tab.
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    import cql_starter_rules as sr
    import db
    db.init_db()
    s = db.SessionLocal()
    res = sr.load(s, a.tenant, dry_run=a.dry_run)
    for r in res:
        print(f"{r['result']:<15} {r['name']}  {r['note']}")
    print(f"\n{sum(1 for r in res if r['result'].startswith(('created', 'would')))} of {len(res)} rules {'would be ' if a.dry_run else ''}created as drafts.")


if __name__ == "__main__":
    main()
