"""Checks that the database matches the code and that the API answers.
Run from the app folder:  python scripts/diagnose.py
Prints ok/FAIL per check. Paste the FAIL lines when asking for help."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
failures = 0


def check(label, fn):
    global failures
    try:
        out = fn()
        print(f"ok    {label}" + (f"  {out}" if out else ""))
    except Exception as e:  # noqa: BLE001
        failures += 1
        print(f"FAIL  {label}: {type(e).__name__}: {e}")


import db  # noqa: E402
import models_db as m  # noqa: E402
from sqlalchemy import inspect, text  # noqa: E402

print("Database:", os.environ.get("DATABASE_URL", "sqlite:///./cdm_spec_to_cql.db"))
check("init_db", lambda: db.init_db())


def columns():
    insp = inspect(db.engine)
    missing = []
    for t in m.Base.metadata.sorted_tables:
        if not insp.has_table(t.name):
            missing.append(t.name)
            continue
        have = {c["name"] for c in insp.get_columns(t.name)}
        missing += [f"{t.name}.{c.name}" for c in t.columns if c.name not in have]
    if missing:
        raise RuntimeError("missing: " + ", ".join(missing))


check("tables and columns match the code", columns)


def read_all():
    with db.engine.connect() as c:
        for t in m.Base.metadata.sorted_tables:
            c.execute(text(f'SELECT * FROM "{t.name}" LIMIT 1'))


check("every table is readable", read_all)

from fastapi.testclient import TestClient  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app, raise_server_exceptions=False)
for path in ("/api/health", "/api/studies", "/api/targets", "/api/edc-systems", "/api/knowledge/stats", "/api/specs"):
    def go(p=path):
        r = client.get(p, headers={"X-Tenant-Id": "default"})
        if r.status_code != 200:
            raise RuntimeError(f"HTTP {r.status_code}: {r.text[:300]}")
    check(f"GET {path}", go)

print("\nAll checks passed." if not failures else f"\n{failures} check(s) failed.")
sys.exit(1 if failures else 0)
