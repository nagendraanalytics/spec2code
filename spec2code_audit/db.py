import os
import contextlib
import psycopg
from psycopg.rows import dict_row


def get_dsn() -> str:
    dsn = os.environ.get("SPEC2CODE_AUDIT_DSN")
    if not dsn:
        raise RuntimeError(
            "SPEC2CODE_AUDIT_DSN environment variable is not set. "
            "Set it to your Postgres connection string before using this module."
        )
    return dsn


@contextlib.contextmanager
def get_connection():
    conn = psycopg.connect(get_dsn(), row_factory=dict_row)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()