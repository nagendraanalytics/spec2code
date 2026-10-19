"""Evaluate whether the knowledge library improves generated code.

  python scripts/run_eval.py run --from-library --tenant default --out eval_runs/first --sample 30 --study STUDY1
  python scripts/run_eval.py run --cases eval/golden.csv --tenant default --out eval_runs/first
  python scripts/run_eval.py score eval_runs/first          # after programmers grade review_sheet.xlsx
  python scripts/run_eval.py retrieval --from-library --tenant default --out eval_runs/first

run        Generates every held-out case in each arm through the real /api/generate (this CALLS THE MODEL and uses your
           API key), scores what can be scored automatically, and writes a blinded review_sheet.xlsx.
score      Reads the graded sheet and writes report.md with accuracy per arm and the paired comparison.
retrieval  No model calls. Checks whether retrieval returns useful material for each case and how a relevance floor
           would trade precision against coverage.

Cases come from a CSV/JSON/JSONL file (columns: reportId, description, columnHeading, logic, reportScenarios, sorting,
studyId, edcSystem, language, referenceCode, referenceLanguage) or from the Spec library (reports that have approved SAS
programs in report scope). Each case's own report-scope sources and precedent are hidden while it runs.
"""
import argparse
import json
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, ROOT)

import eval_harness as eh  # noqa: E402


def get_cases(a, db):
    defaults = {k: v for k, v in (("edcSystem", a.edc), ("language", a.language), ("studyId", a.study)) if v}
    if a.cases:
        cases = eh.load_cases(a.cases, defaults)
    elif a.from_library:
        statuses = ("approved", "draft") if a.include_draft_reference else ("approved",)
        cases = eh.cases_from_library(db, a.tenant, defaults, statuses, require_reference=not a.allow_no_reference)
    else:
        sys.exit("Give --cases FILE or --from-library.")
    if not cases:
        sys.exit("No cases found. For --from-library a report needs a Spec library entry and an approved SAS program in report scope.")
    return eh.sample(cases, a.sample, a.seed)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("run", "retrieval"):
        p = sub.add_parser(name)
        p.add_argument("--cases", default="")
        p.add_argument("--from-library", action="store_true")
        p.add_argument("--include-draft-reference", action="store_true", help="also use unapproved SAS programs as the reference (not recommended)")
        p.add_argument("--allow-no-reference", action="store_true")
        p.add_argument("--tenant", default="default")
        p.add_argument("--out", required=True)
        p.add_argument("--sample", type=int, default=0, help="use a random sample of this many cases")
        p.add_argument("--seed", type=int, default=42)
        p.add_argument("--edc", default="veeva")
        p.add_argument("--language", default="cql")
        p.add_argument("--study", default="", help="study ID whose metadata, TA and sponsor the cases run under")
    r = sub.choices["run"]
    r.add_argument("--arms", default=",".join(eh.DEFAULT_ARMS), help=f"comma list of: {', '.join(eh.ARMS)}")
    r.add_argument("--repeats", type=int, default=1, help="runs per case and arm (the model is not deterministic)")
    r.add_argument("--no-precedents", action="store_true", help="switch off the few-shot precedents in every arm")
    r.add_argument("--keep-specs", action="store_true", help="keep the Spec rows /api/generate creates (default: delete them)")
    r.add_argument("--yes", action="store_true", help="confirm a run of more than 20 model calls")
    r.add_argument("--dry-run", action="store_true")
    s = sub.add_parser("score")
    s.add_argument("out")
    a = ap.parse_args()

    if a.cmd == "score":
        cases = json.load(open(os.path.join(a.out, "cases.json"), encoding="utf-8"))
        results = eh.load_results(os.path.join(a.out, "results.jsonl"))
        grades = eh.read_grades(a.out)
        if not grades:
            sys.exit("No graded rows found in review_sheet.xlsx (the verdict column is empty or not one of correct, partial, wrong).")
        ret = json.load(open(os.path.join(a.out, "retrieval.json"), encoding="utf-8")) if os.path.exists(os.path.join(a.out, "retrieval.json")) else None
        print(f"{len(grades)} graded rows. Report: {eh.write_report(a.out, cases, results, grades, ret)}")
        return

    import db
    db.init_db()
    if a.cmd == "retrieval":
        with db.SessionLocal() as s0:
            cases = get_cases(a, s0)
            out = eh.retrieval_check(cases, s0, a.tenant)
        os.makedirs(a.out, exist_ok=True)
        json.dump(out, open(os.path.join(a.out, "retrieval.json"), "w", encoding="utf-8"), indent=1)
        print(f"{out['casesWithReference']} cases with reference code. Useful hit in top 1/3/5: {out['hitAt']}")
        print(f"Backend: {out['backend']}. Floor sweep written to {os.path.join(a.out, 'retrieval.json')}")
        return

    arms = [x.strip() for x in a.arms.split(",") if x.strip()]
    bad = [x for x in arms if x not in eh.ARMS]
    if bad:
        sys.exit(f"Unknown arm(s): {bad}. Known: {list(eh.ARMS)}")
    with db.SessionLocal() as s0:
        cases = get_cases(a, s0)
    calls = len(cases) * len(arms) * a.repeats
    print(f"{len(cases)} cases x {len(arms)} arms x {a.repeats} repeat(s) = {calls} generation calls.")
    if a.dry_run:
        for c in cases:
            print(f"  {c['reportId']:<16} reference code: {'yes' if c['referenceCode'] else 'no'}")
        return
    if calls > 20 and not a.yes:
        sys.exit("That is more than 20 model calls and will use your API credits. Re-run with --yes to confirm.")
    if not os.environ.get("ANTHROPIC_API_KEY"):
        try:
            from dotenv import load_dotenv
            load_dotenv()
        except ImportError:
            pass
    from fastapi.testclient import TestClient
    import main
    client = TestClient(main.app)
    results = eh.run(cases, arms, client, db.SessionLocal, a.tenant, a.out, repeats=a.repeats, no_precedents=a.no_precedents, keep_specs=a.keep_specs)
    sheet = eh.write_sheet(cases, results, a.out)
    print(f"\nGrade the rows in {sheet}, then run: python scripts/run_eval.py score {a.out}")
    print(f"Interim report (automatic measures only): {eh.write_report(a.out, cases, results)}")


if __name__ == "__main__":
    main()
