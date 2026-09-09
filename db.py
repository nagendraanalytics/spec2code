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
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def init_db() -> None:
    """Create all tables. Safe to call on every startup -- create_all is
    a no-op for tables that already exist."""
    import models_db  # noqa: F401 -- ensures models are registered on Base before create_all
    Base.metadata.create_all(bind=engine)


def get_session():
    """FastAPI dependency: yields a session, always closes it."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
