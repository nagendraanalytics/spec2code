"""Add the verified precedents you already confirmed to Report knowledge.

  python scripts/backfill_report_knowledge.py --tenant default [--dry-run]

Precedents confirmed before v2.25 are in the precedent store but not in the knowledge library. Each one is a spec and CQL
that a programmer confirmed, so it is stored as an approved report-scope source (approved as --by). Safe to re-run: an
identical source is reported as a duplicate.
"""
import argparse
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, ROOT)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--by", default="backfill", help="name recorded as the approver")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    import db
    import report_knowledge
    import store
    db.init_db()
    s = db.SessionLocal()
    rows = store.list_precedents(s, a.tenant)
    done = dup = bad = 0
    for r in rows:
        p = store.precedent_to_dict(r)
        rid = (p.get("spec_id") or "").strip()
        if not rid or not (p.get("cql") or "").strip():
            bad += 1
            continue
        if a.dry_run:
            print(f"would store   {rid}")
            continue
        out = report_knowledge.save_verified(s, a.tenant, rid, p.get("description", ""), p.get("column_heading", ""), p.get("logic", ""),
                                             p.get("report_scenarios", ""), p["cql"], p.get("notes", ""), a.by)
        dup += bool(out["duplicate"])
        done += not out["duplicate"]
        print(f"{'duplicate' if out['duplicate'] else 'stored':<10} {rid}")
    print(f"\n{len(rows)} precedents: {done} stored, {dup} duplicates, {bad} skipped (no report ID or code).")


if __name__ == "__main__":
    main()
