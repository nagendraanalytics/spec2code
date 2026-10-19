import sqlite3, os, shutil
SRC, OUT = "cdm_spec_to_cql.db", "export"
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(f"{OUT}/kb_files/default")
con = sqlite3.connect(SRC); out = sqlite3.connect(f"{OUT}/knowledge_export.db")
def clone(t):
    out.execute(con.execute("select sql from sqlite_master where type='table' and name=?", (t,)).fetchone()[0])
    return [c[1] for c in con.execute(f"pragma table_info({t})")]
def put(t, cols, rows):
    out.executemany(f"insert into {t} ({','.join(cols)}) values ({','.join('?'*len(cols))})", rows)
sc = clone("knowledge_sources")
src = con.execute("select * from knowledge_sources where tenant_id='default' and status='approved'").fetchall()
ip, ir = sc.index("id"), sc.index("raw_path")
ids, rows = [], []
for r in src:
    r = list(r); ids.append(r[ip])
    fn = os.path.basename(r[ir].replace("\\", "/"))
    shutil.copy2(r[ir], f"{OUT}/kb_files/default/{fn}")
    r[ir] = f"kb_files/default/{fn}"
    rows.append(r)
put("knowledge_sources", sc, rows)
cc = clone("knowledge_chunks")
q = ",".join("?" * len(ids))
put("knowledge_chunks", cc, con.execute(f"select * from knowledge_chunks where source_id in ({q})", ids).fetchall())
rc = clone("knowledge_rules")
put("knowledge_rules", rc, con.execute("select * from knowledge_rules where tenant_id='default' and status='approved'").fetchall())
out.commit()
for t in ("knowledge_sources", "knowledge_chunks", "knowledge_rules"):
    print(t, out.execute(f"select count(*) from {t}").fetchone()[0])
print("files:", len(os.listdir(f"{OUT}/kb_files/default")))