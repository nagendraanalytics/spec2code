import sqlite3, os
con = sqlite3.connect("cdm_spec_to_cql.db")
rows = con.execute("select id,title,raw_path,size_bytes,embed_backend,chunk_count from knowledge_sources where tenant_id='default' and status='approved'").fetchall()
print("approved:", len(rows))
print("embed backends:", con.execute("select embed_backend,count(*) from knowledge_sources where tenant_id='default' and status='approved' group by 1").fetchall())
print("chunk backends:", con.execute("select embed_backend,count(*) from knowledge_chunks where source_id in (select id from knowledge_sources where tenant_id='default' and status='approved') group by 1").fetchall())
print("sample raw_path:", [r[2] for r in rows[:3]])
missing = [r[1] for r in rows if not os.path.exists(r[2] or "")]
print("files missing at raw_path:", len(missing), missing[:5])
print("total MB:", round(sum(r[3] or 0 for r in rows)/1048576, 1))
print("\nrules:")
for r in con.execute("select name, scope, status, applies_to, substr(coalesce(evidence_note,''),1,60) from knowledge_rules"):
    print(" |", " | ".join(str(x) for x in r))