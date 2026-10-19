"""
synthetic_exec.py -- check generated code against a set of synthetic cases.

How a case is judged: every case uses its own subject IDs and carries an expectation. Code returns rows; the
subject column of those rows says which subjects the code selected. An include case passes when ALL of its
subjects were returned; an exclude case passes when NONE were. Same comparison whatever ran the code:
  * SQL    -- really executed here, in a throwaway in-memory SQLite database (read-only, time-limited)
  * CQL/SAS/other -- not executable here. A test pack is exported, someone runs it in the real system and uploads
              the result file, which is compared the same way.
Nothing here is an execution of CQL or SAS. An "uploaded" run is only as good as the run that produced the file.
"""
from __future__ import annotations

import csv
import io
import re
import sqlite3
import time
import zipfile

SUBJECT_COLS = {"subjectid", "subject", "usubjid", "subjid", "subjectnumber", "subjectno", "subjectidentifier", "subjectname"}
EXT = {"cql": "cql", "sql": "sql", "sas": "sas", "r": "R", "python": "py"}
MAX_ROWS = 10000
SQL_SECONDS = 5


def _norm(c: str) -> str:
    return re.sub(r"[^a-z0-9]", "", str(c).lower())


def case_keys(case: dict) -> list[str]:
    out = []
    for t in case.get("tables", []):
        for row in t.get("rows", []):
            for k, v in row.items():
                if _norm(k) in SUBJECT_COLS and str(v).strip() and str(v).strip() not in out:
                    out.append(str(v).strip())
    return out


def key_issues(cases: list[dict]) -> dict:
    """no_key: cases with no subject ID in any table. shared: subject ID -> cases using it (a case cannot be
    judged on a subject another case also uses)."""
    owner: dict = {}
    no_key = []
    for c in cases:
        ks = case_keys(c)
        if not ks:
            no_key.append(c["id"])
        for k in ks:
            owner.setdefault(k, []).append(c["id"])
    return {"noKey": no_key, "shared": {k: v for k, v in owner.items() if len(v) > 1}}


def compare(cases: list[dict], returned: set[str]) -> dict:
    issues = key_issues(cases)
    bad = set(issues["noKey"]) | {c for v in issues["shared"].values() for c in v}
    results, counts = [], {"TP": 0, "TN": 0, "FP": 0, "FN": 0, "not_judged": 0}
    for c in cases:
        ks = case_keys(c)
        if c["id"] in bad:
            why = "no subject ID in this case" if c["id"] in issues["noKey"] else "a subject ID is also used by another case"
            results.append({"caseId": c["id"], "expectation": c["expectation"], "quadrant": None, "subjects": ks, "returned": [], "detail": f"Not judged: {why}."})
            counts["not_judged"] += 1
            continue
        got = [k for k in ks if k in returned]
        if c["expectation"] == "include":
            ok = len(got) == len(ks)
            q = "TP" if ok else "FN"
            detail = "" if ok else f"Should be included but {'was not returned' if not got else 'only ' + ', '.join(got) + ' returned; missing ' + ', '.join(k for k in ks if k not in got)}."
        else:
            ok = not got
            q = "TN" if ok else "FP"
            detail = "" if ok else f"Should be excluded but {', '.join(got)} {'was' if len(got) == 1 else 'were'} returned."
        counts[q] += 1
        results.append({"caseId": c["id"], "expectation": c["expectation"], "quadrant": q, "subjects": ks, "returned": got, "detail": detail})
    return {"results": results, "counts": counts, "issues": issues}


def parse_result_csv(data: bytes) -> tuple[set[str], int, str]:
    """(subject IDs returned, row count, subject column used). Raises ValueError with a plain message."""
    text = data.decode("utf-8-sig", errors="replace")
    rows = list(csv.DictReader(io.StringIO(text)))
    if not rows and not text.strip():
        raise ValueError("The result file is empty.")
    head = rows[0].keys() if rows else csv.reader(io.StringIO(text)).__next__()
    col = next((h for h in head if _norm(h) in SUBJECT_COLS), None)
    if col is None:
        raise ValueError("The result file has no subject column (expected one of: SubjectId, Subject, USUBJID, SUBJID, SubjectNumber).")
    return {str(r[col]).strip() for r in rows if str(r.get(col, "")).strip()}, len(rows), col


def _ident(name: str) -> str:
    n = re.sub(r"[^A-Za-z0-9_]", "_", str(name).strip()) or "T"
    return n if not n[0].isdigit() else f"T_{n}"


def tables_of(cases: list[dict]) -> dict:
    """form -> (columns, rows) merged across cases; the case ID is not stored (the code must not see it)."""
    out: dict = {}
    for c in cases:
        for t in c.get("tables", []):
            cols, rows = out.setdefault(_ident(t["form"]), ([], []))
            for r in t["rows"]:
                for k in r:
                    if k not in cols:
                        cols.append(k)
                rows.append(r)
    return out


def run_sql(cases: list[dict], code: str) -> dict:
    """Execute `code` against the cases' tables. Returns {"status": "executed", "returned": set, "rows": n,
    "column": name} or {"status": "could_not_execute", "error": ...}. Never raises on bad SQL."""
    sql = (code or "").strip().rstrip(";").strip()
    if not sql:
        return {"status": "could_not_execute", "error": "No SQL to run."}
    if not re.match(r"(?is)^(select|with)\b", sql):
        return {"status": "could_not_execute", "error": "Only a single SELECT (or WITH ... SELECT) statement is run."}
    conn = sqlite3.connect(":memory:")
    try:
        for name, (cols, rows) in tables_of(cases).items():
            q = ", ".join(f'"{_ident(c)}"' for c in cols)
            conn.execute(f'CREATE TABLE "{name}" ({", ".join(chr(34) + _ident(c) + chr(34) + " TEXT" for c in cols)})')
            conn.executemany(f'INSERT INTO "{name}" ({q}) VALUES ({", ".join("?" * len(cols))})',
                             [[(r.get(c) if r.get(c, "") != "" else None) for c in cols] for r in rows])
        conn.commit()
        conn.execute("PRAGMA query_only = ON")
        deadline = time.monotonic() + SQL_SECONDS
        conn.set_progress_handler(lambda: 1 if time.monotonic() > deadline else 0, 10000)
        cur = conn.execute(sql)
        names = [d[0] for d in cur.description or []]
        col = next((n for n in names if _norm(n) in SUBJECT_COLS), None)
        if col is None:
            return {"status": "could_not_execute", "error": f"The query ran but returned no subject column (columns: {', '.join(names) or 'none'})."}
        i = names.index(col)
        fetched = cur.fetchmany(MAX_ROWS + 1)
        if len(fetched) > MAX_ROWS:
            return {"status": "could_not_execute", "error": f"More than {MAX_ROWS} rows returned."}
        return {"status": "executed", "returned": {str(r[i]).strip() for r in fetched if r[i] is not None}, "rows": len(fetched), "column": col}
    except sqlite3.Error as e:
        msg = "Query took longer than the time limit." if "interrupted" in str(e).lower() else str(e)
        return {"status": "could_not_execute", "error": f"{msg} (Run here in SQLite; the generated SQL may use another dialect or other table names.)"}
    except Warning as e:  # sqlite3 raises Warning for multiple statements
        return {"status": "could_not_execute", "error": str(e)}
    finally:
        conn.close()


def testpack(report_id: str, version: int, cases: list[dict], code: str, language: str) -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        for name, (cols, rows) in tables_of(cases).items():
            o = io.StringIO()
            w = csv.writer(o)
            w.writerow(cols)
            for r in rows:
                w.writerow([r.get(c, "") for c in cols])
            z.writestr(f"data/{name}.csv", o.getvalue())
        o = io.StringIO()
        w = csv.writer(o)
        w.writerow(["case_id", "expectation", "boundary", "subject_ids", "scenario"])
        for c in cases:
            w.writerow([c["id"], c["expectation"], "yes" if c.get("boundary") else "", ";".join(case_keys(c)), c.get("scenario", "")])
        z.writestr("expected.csv", o.getvalue())
        if code.strip():
            z.writestr(f"code/{report_id}.{EXT.get(language, 'txt')}", code)
        z.writestr("README.txt", (
            f"Spec2Code test pack: {report_id}, synthetic data version {version}\n\n"
            "1. Load every file in data/ as a table named after the file (empty cells are missing values).\n"
            f"2. Run the code in code/ against those tables in the real system ({language.upper() or 'target'}).\n"
            "3. Save the rows it returns as a CSV that includes the subject column (SubjectId, USUBJID or similar).\n"
            "4. Upload that CSV on the Synthetic data page (Run against code, Upload result).\n\n"
            "expected.csv lists what each case should do. Do not edit the data: every case uses its own subject IDs,\n"
            "and the comparison depends on them.\n"))
    return buf.getvalue()
