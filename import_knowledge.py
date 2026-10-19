import sqlite3, sys, shutil, time
db = sys.argv[1]                     # server database path
shutil.copy2(db, f"{db}.bak-{int(time.time())}")
con = sqlite3.connect(db)
con.execute("attach '/tmp/export/knowledge_export.db' as ex")
for t in ("knowledge_sources", "knowledge_chunks", "knowledge_rules"):
    have = [c[1] for c in con.execute(f"pragma main.table_info({t})")]
    exc = [c[1] for c in con.execute(f"pragma ex.table_info({t})")]
    cols = [c for c in have if c in exc]
    missing = [c for c in have if c not in exc]
    before = con.execute(f"select count(*) from main.{t}").fetchone()[0]
    con.execute(f"insert or ignore into main.{t} ({','.join(cols)}) select {','.join(cols)} from ex.{t}")
    print(t, before, "->", con.execute(f"select count(*) from main.{t}").fetchone()[0],
          "| server-only columns left default:", missing or "none")
con.commit()