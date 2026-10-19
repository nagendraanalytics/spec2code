"""
db.py — engine/session setup. Same pattern as the ADaM/TLF framework's
backend/db.py: SQLite locally by default, swaps to Postgres via
DATABASE_URL with no other code changes needed anywhere else.
"""

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./cdm_spec_to_cql.db")

_connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=_connect_args)

if DATABASE_URL.startswith("sqlite"):
    # Batch runs write from many worker threads at once. WAL lets readers
    # (the UI polling progress) proceed during writes, and busy_timeout makes
    # a writer wait for the lock instead of failing with "database is locked".
    from sqlalchemy import event

    @event.listens_for(engine, "connect")
    def _sqlite_pragmas(dbapi_conn, _record):  # noqa: ANN001
        cur = dbapi_conn.cursor()
        cur.execute("PRAGMA journal_mode=WAL")
        cur.execute("PRAGMA busy_timeout=30000")
        cur.close()


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Columns added after a table first shipped. create_all() never alters an
# existing table, so a database created by an older version would be missing
# these. Only additive, nullable columns belong here.
ADDED_COLUMNS = {
    "batch_items": [("study_id", "VARCHAR")],
    "studies": [("ta", "VARCHAR"), ("sponsor", "VARCHAR")],
    "specs": [("source", "VARCHAR")],
    "generation_runs": [("language", "VARCHAR"), ("source", "VARCHAR")],
}


def ensure_columns(eng=None) -> None:
    from sqlalchemy import inspect, text

    eng = eng or engine
    insp = inspect(eng)
    with eng.begin() as conn:
        for table, cols in ADDED_COLUMNS.items():
            if not insp.has_table(table):
                continue
            have = {c["name"] for c in insp.get_columns(table)}
            for name, sql_type in cols:
                if name not in have:
                    conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {name} {sql_type}"))


def init_db() -> None:
    """Create all tables. Safe to call on every startup -- create_all is
    a no-op for tables that already exist."""
    import models_db  # noqa: F401 -- ensures models are registered on Base before create_all
    Base.metadata.create_all(bind=engine)
    ensure_columns()


def get_session():
    """FastAPI dependency: yields a session, always closes it."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
