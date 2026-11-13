"""Ask the language model (via llm_client; needs the GENAI_* settings in .env) for draft rules from one source in the library.
  python scripts/propose_rules_from_source.py --tenant default --source "SDTM Implementation Guide v3.4" --limit 20 [--dry-run]

--source is a source id or part of its title. Only that source's text is sent to the model. Every rule must carry a
quote found in the passage it came from; others are dropped and listed. Rules are created as drafts for programmer approval.
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--source", required=True)
    ap.add_argument("--limit", type=int, default=20, help="how many passages to send (default 20)")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    import db
    import models_db as m
    import rule_proposer as rp
    db.init_db()
    s = db.SessionLocal()
    rows = s.query(m.KnowledgeSource).filter_by(tenant_id=a.tenant).all()
    hit = [r for r in rows if r.id == a.source] or [r for r in rows if a.source.lower() in (r.title or "").lower()]
    if len(hit) != 1:
        sys.exit(f"{len(hit)} sources match '{a.source}'. Give the id or a more exact title.")
    res = rp.propose(s, a.tenant, hit[0].id, limit=a.limit, dry_run=a.dry_run)
    print(f"{res['source']}: {res['passages']} passages sent.")
    for r in res["created"]:
        print("  draft  ", r["name"])
    for r in res["dropped"]:
        print("  dropped", r["name"], "-", r["reason"])
    print(f"{len(res['created'])} {'would be ' if a.dry_run else ''}created, {len(res['dropped'])} dropped.")


if __name__ == "__main__":
    main()
