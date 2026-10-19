"""Evaluation harness: does the knowledge library make generated code more accurate?

It runs held-out reports through the real /api/generate endpoint in several ARMS (for example no knowledge, all
knowledge, knowledge without report-scope material), scores what it can automatically, and writes a blinded sheet
for programmers to grade. Accuracy comes from that grading. The automatic numbers are proxies and are labelled so.

Leakage control: while a report runs, its own report-scope sources, report-scope rules and precedent are hidden
(holdout.py). Reference code that lives in other scopes (global, sponsor, study) is NOT hidden: keep the reference
code of the cases in report scope, or exclude it from the library, before evaluating.
"""
from __future__ import annotations

import csv
import json
import math
import os
import random
import re
import statistics
import time
from datetime import datetime, timezone

import holdout

# --------------------------------------------------------------------------- arms

ARMS = {
    "baseline": {"useKnowledge": False, "scopes_off": []},
    "knowledge": {"useKnowledge": True, "scopes_off": []},
    "knowledge_no_report": {"useKnowledge": True, "scopes_off": ["report"]},
}
DEFAULT_ARMS = ["baseline", "knowledge"]

# --------------------------------------------------------------------------- cases

CASE_FIELDS = ("reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting", "studyId", "edcSystem",
               "language", "specType", "listingType", "referenceCode", "referenceLanguage", "notes")


def _clean_case(row: dict, defaults: dict) -> dict:
    c = {k: str(row.get(k, "") or "").strip() for k in CASE_FIELDS}
    for k, v in defaults.items():
        if not c.get(k):
            c[k] = v
    if not c["reportId"] or not c["description"]:
        raise ValueError(f"a case needs reportId and description: {row.get('reportId', '?')}")
    return c


def load_cases(path: str, defaults: dict | None = None) -> list:
    """JSON (a list), JSONL, or CSV with the CASE_FIELDS as column names."""
    defaults = defaults or {}
    if path.lower().endswith(".csv"):
        with open(path, newline="", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
    else:
        text = open(path, encoding="utf-8-sig").read().strip()
        rows = json.loads(text) if text.startswith("[") else [json.loads(x) for x in text.splitlines() if x.strip()]
    cases = [_clean_case(r, defaults) for r in rows]
    ids = [c["reportId"].lower() for c in cases]
    if len(ids) != len(set(ids)):
        raise ValueError("reportId must be unique within the evaluation set")
    return cases


def cases_from_library(db, tenant_id: str, defaults: dict | None = None, reference_statuses=("approved",), require_reference=True) -> list:
    """One case per report in the Spec library. The reference code is the text of that report's SAS-program sources
    in report scope (approved ones by default: unreviewed code is not a fair answer key)."""
    import models_db as m
    defaults = defaults or {}
    latest = {}
    for s in db.query(m.Spec).filter_by(tenant_id=tenant_id).order_by(m.Spec.created_at.asc()).all():
        latest[s.report_id.strip().lower()] = s
    refs = {}
    q = db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, scope="report", doc_type="sas_program")
    for src in q.all():
        if src.status in reference_statuses:
            text = "\n".join(c.text for c in sorted(src.chunks, key=lambda c: c.position))
            refs.setdefault(src.scope_ref.strip().lower(), []).append(text)
    cases = []
    for key, s in latest.items():
        ref = "\n\n".join(refs.get(key, []))
        if require_reference and not ref:
            continue
        cases.append(_clean_case({"reportId": s.report_id, "description": s.description, "columnHeading": s.column_heading,
                                  "logic": s.logic, "reportScenarios": s.report_scenarios, "sorting": s.sorting,
                                  "referenceCode": ref, "referenceLanguage": "sas" if ref else ""}, defaults))
    return cases


def sample(cases: list, n: int, seed: int) -> list:
    if not n or n >= len(cases):
        return list(cases)
    return sorted(random.Random(seed).sample(cases, n), key=lambda c: c["reportId"].lower())


# --------------------------------------------------------------------------- automatic scoring (proxies)

_STOP = set("""select from where order by and or not null exists join left right inner outer on as in is case when then else end desc asc group having
distinct union all limit top with into values insert update delete create table view drop alter set data run quit proc sql merge if do while put input
format informat length label keep drop retain output by first last sort nodupkey out noprint title footnote options libname work form item subject site
event header date today now count sum min max avg true false like between cast coalesce substr trim upper lower year month day this that has have""".split())


def identifiers(code: str) -> set:
    """Name-like words of the code, lower-cased, without comments, quoted strings, short words and common keywords.
    A rough proxy: it cannot tell a data item from any other word, and SAS and CQL often name the same item differently."""
    text = re.sub(r"/\*.*?\*/", " ", code or "", flags=re.S)
    text = re.sub(r"--[^\n]*", " ", text)
    text = re.sub(r"'[^']*'|\"[^\"]*\"", " ", text)
    return {t.lower() for t in re.findall(r"[A-Za-z][A-Za-z0-9_]*", text) if len(t) >= 3 and t.lower() not in _STOP}


def identifier_overlap(generated: str, reference: str) -> dict | None:
    ref, gen = identifiers(reference), identifiers(generated)
    if not ref:
        return None
    hit = ref & gen
    return {"recall": round(len(hit) / len(ref), 3), "precision": round(len(hit) / len(gen), 3) if gen else 0.0,
            "nRef": len(ref), "nGen": len(gen), "missing": sorted(ref - gen)[:25]}


# Known failure patterns seen in earlier real runs. Flags are cues for the reviewer, not verdicts.
FLAGS = [
    ("date_compared_as_text", re.compile(r"(?is)\b(raw_?date)\b[^;\n]{0,60}?(<=|>=|<>|!=|=|<|>)\s*'[^']*'"),
     "a RawDate value is compared with a quoted literal (RawDate returns text)"),
    ("hdr_event_date_proxy", re.compile(r"@HDR\.Event\.Date", re.I), "@HDR.Event.Date used as a date source (an invented proxy in earlier runs)"),
    ("not_exists_unverified", re.compile(r"\bnot\s+exists\b", re.I), "NOT EXISTS used (not yet verified as supported by CQL)"),
    ("order_by_formatted_date", re.compile(r"(?is)order\s+by[^;]{0,120}\b(format|to_char|strftime|date_format)\s*\("), "sorting on a formatted date, which sorts as text"),
]


def flags_for(code: str) -> list:
    return [name for name, rx, _ in FLAGS if rx.search(code or "")]


# --------------------------------------------------------------------------- running

def _knowledge_summary(resp: dict) -> dict:
    k = resp.get("knowledge") or {}
    if k.get("mode") != "applied":  # "shadow" is a preview of what the library would add: it was not given to the model
        return {"mode": k.get("mode", ""), "sources": 0, "rules": 0, "scopes": [], "similarReports": 0, "titles": []}
    srcs = k.get("sources") or []
    return {"mode": k.get("mode", ""), "sources": len(srcs), "rules": len(k.get("rules") or []),
            "scopes": sorted({s.get("scope", "") for s in srcs}),
            "similarReports": sum(1 for s in srcs if s.get("scope") == "report"),
            "titles": [s.get("title", "") for s in srcs][:8]}


def _guardrail(resp: dict) -> tuple:
    reps = resp.get("guardrail_reports") or []
    failed = [c.get("check", "?") for r in reps for c in (r.get("checks") or []) if not c.get("passed", True)]
    return (all(r.get("passed", True) for r in reps) if reps else None), failed


def load_results(path: str) -> list:
    if not os.path.exists(path):
        return []
    return [json.loads(x) for x in open(path, encoding="utf-8") if x.strip()]


def run(cases: list, arms: list, client, db_factory, tenant_id: str, out_dir: str, *, repeats: int = 1,
        no_precedents: bool = False, keep_specs: bool = False, headers: dict | None = None, progress=print) -> list:
    """Runs every (case, arm, repeat) not already in results.jsonl. Resumable: stop and start again at any time."""
    import models_db as m
    os.makedirs(out_dir, exist_ok=True)
    res_path = os.path.join(out_dir, "results.jsonl")
    json.dump(cases, open(os.path.join(out_dir, "cases.json"), "w", encoding="utf-8"), indent=1)
    done = {(r["caseId"], r["arm"], r["repeat"]) for r in load_results(res_path)}
    headers = {"X-Tenant-Id": tenant_id, **(headers or {})}
    total = len(cases) * len(arms) * repeats
    n = 0
    for case in cases:
        for arm in arms:
            cfg = ARMS[arm]
            for rep in range(1, repeats + 1):
                n += 1
                key = (case["reportId"], arm, rep)
                if key in done:
                    continue
                spec = {k: case[k] for k in ("reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting",
                                             "studyId", "edcSystem", "language", "specType", "listingType") if case.get(k)}
                spec["useKnowledge"] = cfg["useKnowledge"]
                with db_factory() as s0:
                    before = {r.id for r in s0.query(m.Spec).filter_by(tenant_id=tenant_id).all()}
                t0 = time.time()
                rec = {"caseId": case["reportId"], "arm": arm, "repeat": rep, "ts": datetime.now(timezone.utc).isoformat()}
                with holdout.active(reports=[case["reportId"]], scopes=cfg["scopes_off"], no_precedents=no_precedents):
                    try:
                        r = client.post("/api/generate?allow_unverified=true", json=spec, headers=headers)
                        body = r.json() if r.headers.get("content-type", "").startswith("application/json") else {}
                        rec["httpStatus"] = r.status_code
                    except Exception as e:  # noqa: BLE001 -- one failed run must not stop the batch
                        body, rec["httpStatus"] = {"error": str(e)}, 0
                rec["seconds"] = round(time.time() - t0, 2)
                code = body.get("cql") or body.get("code") or ""
                rec["ok"] = bool(code) and rec["httpStatus"] == 200
                rec["code"], rec["explanation"], rec["error"] = code, body.get("explanation", "") or "", body.get("error", "") or ""
                rec["guardrailPassed"], rec["guardrailFailed"] = _guardrail(body)
                rec["knowledge"] = _knowledge_summary(body)
                rec["precedents"] = len(body.get("retrieved_precedents") or [])
                rec["flags"] = flags_for(code)
                rec["overlap"] = identifier_overlap(code, case.get("referenceCode", ""))
                if not keep_specs:  # /api/generate saves a Spec row per run; do not leave test rows in the library
                    with db_factory() as s1:
                        for row in s1.query(m.Spec).filter_by(tenant_id=tenant_id).all():
                            if row.id not in before:
                                s1.delete(row)
                        s1.commit()
                with open(res_path, "a", encoding="utf-8") as f:
                    f.write(json.dumps(rec) + "\n")
                progress(f"[{n}/{total}] {case['reportId']:<14} {arm:<20} {'ok' if rec['ok'] else 'FAILED ' + (rec['error'] or '')[:60]}")
    return load_results(res_path)


# --------------------------------------------------------------------------- blinded grading sheet

VERDICTS = ("correct", "partial", "wrong")


def write_sheet(cases: list, results: list, out_dir: str, seed: int = 1) -> str:
    """One row per generated result, shuffled, with the arm hidden. The key linking rows to arms is a separate file
    that graders should not open until grading is done."""
    import openpyxl
    from openpyxl.styles import Alignment
    from openpyxl.worksheet.datavalidation import DataValidation
    byid = {c["reportId"]: c for c in cases}
    rows = [r for r in results if r.get("ok")]
    rnd = random.Random(seed)
    rnd.shuffle(rows)
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Grade"
    head = ["item", "reportId", "description", "logic", "reference code", "generated code", "verdict", "conditions correct", "conditions total", "notes"]
    ws.append(head)
    key = {}
    for i, r in enumerate(rows, 1):
        c = byid.get(r["caseId"], {})
        item = f"G{i:04d}"
        key[item] = {"caseId": r["caseId"], "arm": r["arm"], "repeat": r["repeat"]}
        ws.append([item, r["caseId"], c.get("description", ""), c.get("logic", ""), c.get("referenceCode", ""), r["code"], "", "", "", ""])
    for col, w in zip("ABCDEFGHIJ", (8, 14, 40, 50, 60, 60, 12, 12, 12, 40)):
        ws.column_dimensions[col].width = w
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.alignment = Alignment(wrap_text=True, vertical="top")
    dv = DataValidation(type="list", formula1='"' + ",".join(VERDICTS) + '"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f"G2:G{max(len(rows) + 1, 2)}")
    ws.freeze_panes = "A2"
    note = wb.create_sheet("How to grade")
    for line in ["Grade each row against the spec (and the reference code if present).",
                 "verdict: correct = would pass review as written; partial = right idea, needs edits; wrong = misses the spec's intent.",
                 "conditions correct / total: optional. Count the spec's conditions (scenarios) the code handles correctly.",
                 "Do not look at review_key.json until all rows are graded. Rows are shuffled and do not show which setting produced them."]:
        note.append([line])
    path = os.path.join(out_dir, "review_sheet.xlsx")
    wb.save(path)
    json.dump(key, open(os.path.join(out_dir, "review_key.json"), "w", encoding="utf-8"), indent=1)
    return path


def read_grades(out_dir: str) -> list:
    import openpyxl
    key = json.load(open(os.path.join(out_dir, "review_key.json"), encoding="utf-8"))
    ws = openpyxl.load_workbook(os.path.join(out_dir, "review_sheet.xlsx"), data_only=True)["Grade"]
    out = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        item, verdict = row[0], str(row[6] or "").strip().lower()
        if not item or item not in key:
            continue
        if verdict not in VERDICTS:
            continue
        num = lambda v: int(v) if str(v or "").strip().isdigit() else None  # noqa: E731
        out.append({**key[item], "verdict": verdict, "condCorrect": num(row[7]), "condTotal": num(row[8])})
    return out


# --------------------------------------------------------------------------- statistics

def wilson(k: int, n: int, z: float = 1.96) -> tuple:
    if n == 0:
        return (0.0, 0.0)
    p = k / n
    d = 1 + z * z / n
    c = p + z * z / (2 * n)
    h = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))
    return (round((c - h) / d, 3), round((c + h) / d, 3))


def sign_test_p(wins: int, losses: int) -> float:
    n = wins + losses
    if n == 0:
        return 1.0
    k = min(wins, losses)
    p = sum(math.comb(n, i) for i in range(0, k + 1)) / 2 ** n
    return round(min(1.0, 2 * p), 4)


def bootstrap_ci(diffs: list, seed: int = 7, n: int = 2000) -> tuple:
    if not diffs:
        return (0.0, 0.0)
    rnd = random.Random(seed)
    means = sorted(sum(rnd.choice(diffs) for _ in diffs) / len(diffs) for _ in range(n))
    return (round(means[int(0.025 * n)], 3), round(means[int(0.975 * n) - 1], 3))


def grade_stats(grades: list, base_arm: str = "baseline") -> dict:
    """Per arm: strict accuracy (correct only), lenient (correct + partial), condition accuracy. Per other arm vs the
    base arm: paired wins/losses over cases (a case counts once per arm: repeats are averaged)."""
    per = {}
    for g in grades:
        per.setdefault(g["arm"], {}).setdefault(g["caseId"], []).append(g)
    out = {"arms": {}, "paired": {}}
    for arm, cases in per.items():
        strict = [sum(x["verdict"] == "correct" for x in v) / len(v) for v in cases.values()]
        lenient = [sum(x["verdict"] in ("correct", "partial") for x in v) / len(v) for v in cases.values()]
        cc = sum(x["condCorrect"] for v in cases.values() for x in v if x["condCorrect"] is not None and x["condTotal"])
        ct = sum(x["condTotal"] for v in cases.values() for x in v if x["condCorrect"] is not None and x["condTotal"])
        n = len(cases)
        k = sum(1 for s in strict if s >= 0.5)  # a case counts as correct when most of its repeats are
        out["arms"][arm] = {"cases": n, "strict": round(sum(strict) / n, 3), "strictCI": wilson(k, n),
                            "lenient": round(sum(lenient) / n, 3), "conditionAccuracy": round(cc / ct, 3) if ct else None,
                            "conditionsCounted": ct}
    base = per.get(base_arm, {})
    for arm, cases in per.items():
        if arm == base_arm or not base:
            continue
        shared = sorted(set(cases) & set(base))
        d = [(sum(x["verdict"] == "correct" for x in cases[c]) / len(cases[c])) - (sum(x["verdict"] == "correct" for x in base[c]) / len(base[c])) for c in shared]
        wins, losses = sum(1 for x in d if x > 0), sum(1 for x in d if x < 0)
        out["paired"][arm] = {"vs": base_arm, "casesCompared": len(shared), "wins": wins, "losses": losses, "ties": len(d) - wins - losses,
                              "meanDifference": round(sum(d) / len(d), 3) if d else 0.0, "meanDifferenceCI": bootstrap_ci(d), "signTestP": sign_test_p(wins, losses)}
    return out


def auto_stats(results: list) -> dict:
    per = {}
    for r in results:
        per.setdefault(r["arm"], []).append(r)
    out = {}
    for arm, rs in per.items():
        ov = [r["overlap"] for r in rs if r.get("overlap")]
        out[arm] = {"runs": len(rs), "produced code": round(sum(1 for r in rs if r["ok"]) / len(rs), 3),
                    "guardrails passed": round(sum(1 for r in rs if r.get("guardrailPassed")) / len(rs), 3),
                    "identifier recall vs reference (proxy)": round(statistics.mean(o["recall"] for o in ov), 3) if ov else None,
                    "identifier precision vs reference (proxy)": round(statistics.mean(o["precision"] for o in ov), 3) if ov else None,
                    "any knowledge used": round(sum(1 for r in rs if (r["knowledge"]["sources"] or r["knowledge"]["rules"])) / len(rs), 3),
                    "another report's material used": round(sum(1 for r in rs if r["knowledge"]["similarReports"]) / len(rs), 3),
                    "median seconds": round(statistics.median(r["seconds"] for r in rs), 1),
                    "flag rates": {name: round(sum(1 for r in rs if name in r["flags"]) / len(rs), 3) for name, _, _ in FLAGS}}
    return out


# --------------------------------------------------------------------------- retrieval check (no model calls)

def retrieval_check(cases: list, db, tenant_id: str, *, top_k: int = 10, useful_share: float = 0.30, useful_min: int = 2) -> dict:
    """For each case with reference code: search as the generator would (own report held out) and label a hit useful
    when it shares identifiers with the reference code. Then sweep a vector-score floor to show how many useful and
    useless hits each floor keeps. Use it to choose SPEC2CODE_KB_MIN_COSINE and the similar-report floor."""
    import knowledge_api
    import knowledge_store as ks
    rows, hits = [], {1: 0, 3: 0, 5: 0}
    scored = []
    n_ref = 0
    backend = ""
    for c in cases:
        ref = identifiers(c.get("referenceCode", ""))
        if not ref:
            continue
        n_ref += 1
        q = " ".join(c.get(k, "") for k in ("description", "columnHeading", "logic", "reportScenarios"))[:1500]
        sid = c.get("studyId", "")
        with holdout.active(reports=[c["reportId"]]):
            r = ks.search(db, tenant_id, q, study_id=sid, ta=knowledge_api.study_ta(db, tenant_id, sid), sponsor=knowledge_api.study_sponsor(db, tenant_id, sid),
                          report=c["reportId"], top_k=top_k)
        backend = r.get("backend", backend)
        flags = []
        for h in r["results"]:
            ids = identifiers(h["heading"] + " " + h["text"])
            common = ids & ref
            useful = len(common) >= useful_min and ids and len(common) / len(ids) >= useful_share
            flags.append(bool(useful))
            scored.append((h["vectorScore"], bool(useful)))
        for k in hits:
            hits[k] += 1 if any(flags[:k]) else 0
        rows.append({"reportId": c["reportId"], "returned": len(flags), "usefulInTop5": sum(flags[:5]), "firstUsefulRank": (flags.index(True) + 1) if True in flags else None})
    sweep = []
    for t in [x / 100 for x in range(10, 85, 5)]:
        kept = [u for v, u in scored if v >= t]
        sweep.append({"vectorFloor": t, "kept": len(kept), "useful": sum(kept), "precision": round(sum(kept) / len(kept), 3) if kept else None})
    return {"casesWithReference": n_ref, "backend": backend,
            "hitAt": {f"top{k}": round(v / n_ref, 3) if n_ref else None for k, v in hits.items()},
            "perCase": rows, "floorSweep": sweep,
            "note": "'Useful' means a hit shares identifiers with the reference code. It is a proxy. If the backend is hashing-v1 the vector scores are not meaningful."}


# --------------------------------------------------------------------------- report

def write_report(out_dir: str, cases: list, results: list, grades: list | None = None, retrieval: dict | None = None) -> str:
    a = auto_stats(results)
    L = [f"# Evaluation report", "", f"Cases: {len(cases)}. Runs: {len(results)}. Generated {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}.", ""]
    L += ["## Graded accuracy (the number to trust)", ""]
    if grades:
        g = grade_stats(grades)
        L += ["| Arm | Cases | Correct | 95% CI | Correct or partial | Condition accuracy |", "|---|---|---|---|---|---|"]
        for arm, s in g["arms"].items():
            ca = f"{s['conditionAccuracy']:.1%} ({s['conditionsCounted']})" if s["conditionAccuracy"] is not None else "not graded"
            L.append(f"| {arm} | {s['cases']} | {s['strict']:.1%} | {s['strictCI'][0]:.0%} to {s['strictCI'][1]:.0%} | {s['lenient']:.1%} | {ca} |")
        L += ["", "Paired against baseline (same cases):", ""]
        for arm, p in g["paired"].items():
            L.append(f"- **{arm}**: better on {p['wins']}, worse on {p['losses']}, same on {p['ties']} of {p['casesCompared']}. "
                     f"Mean difference {p['meanDifference']:+.1%} (95% bootstrap CI {p['meanDifferenceCI'][0]:+.1%} to {p['meanDifferenceCI'][1]:+.1%}). Sign test p = {p['signTestP']}.")
        L += ["", "With few cases the intervals are wide. A small difference with a CI that includes zero is not evidence either way."]
    else:
        L.append("Not graded yet. Open review_sheet.xlsx, grade every row, then run the score command.")
    L += ["", "## Automatic measures (proxies, not accuracy)", "", "| Measure | " + " | ".join(a) + " |", "|---|" + "---|" * len(a)]
    keys = [k for k in next(iter(a.values())) if k != "flag rates"] if a else []
    for k in keys:
        L.append(f"| {k} | " + " | ".join("n/a" if a[x][k] is None else str(a[x][k]) for x in a) + " |")
    for name, _, note in FLAGS:
        L.append(f"| flag: {name} | " + " | ".join(f"{a[x]['flag rates'][name]:.0%}" for x in a) + " |")
    L += ["", "Flags: " + "; ".join(f"`{n}` = {note}" for n, _, note in FLAGS) + ".", "Identifier recall and precision compare names found in the generated code with names in the reference code. They are only meaningful when both use the same naming (a SAS reference and CQL output often name items differently).", ""]
    if retrieval:
        L += ["## Retrieval check", "", f"Cases with reference code: {retrieval['casesWithReference']}. Embedding backend: {retrieval['backend']}.",
              f"A useful hit appears in the top 1 / 3 / 5 for {retrieval['hitAt']['top1']} / {retrieval['hitAt']['top3']} / {retrieval['hitAt']['top5']} of cases.", "",
              "| Vector floor | Hits kept | Useful | Precision |", "|---|---|---|---|"]
        for s in retrieval["floorSweep"]:
            L.append(f"| {s['vectorFloor']:.2f} | {s['kept']} | {s['useful']} | {'n/a' if s['precision'] is None else s['precision']} |")
        L += ["", retrieval["note"], ""]
    path = os.path.join(out_dir, "report.md")
    open(path, "w", encoding="utf-8").write("\n".join(L))
    return path
