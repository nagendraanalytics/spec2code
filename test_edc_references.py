"""Per-EDC reference sources import as drafts, scoped to their EDC, and are used only for that EDC."""
import os
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
DBF = os.path.join(tempfile.mkdtemp(), "e.db")
ENV = {**os.environ, "DATABASE_URL": "sqlite:///" + DBF, "SPEC2CODE_KB_DIR": tempfile.mkdtemp()}


def run(*args):
    return subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "import_edc_references.py"), *args], capture_output=True, text=True, env=ENV, cwd=ROOT)


def test_import_is_draft_scoped_repeatable_and_edc_specific():
    p = run("--tenant", "t1")
    assert p.returncode == 0 and "7 stored as drafts, 0 duplicates, 0 failed" in p.stdout, p.stdout + p.stderr
    assert "0 failed" in run("--tenant", "t1").stdout and "7 duplicates" in run("--tenant", "t1").stdout
    code = f"""
import os
os.environ['DATABASE_URL']={ENV['DATABASE_URL']!r}; os.environ['SPEC2CODE_KB_DIR']={ENV['SPEC2CODE_KB_DIR']!r}
import db, knowledge_store as ks, models_db as m
s=db.SessionLocal()
rows=s.query(m.KnowledgeSource).filter_by(tenant_id='t1').all()
assert len(rows)==7 and all(r.status=='draft' and r.doc_type=='edc_guide' and r.scope=='global' and r.chunk_count>0 for r in rows)
assert {{r.scope_ref for r in rows}}=={{'veeva','redcap','oracle_clinical_one','rave','openclinica','medrio','castor'}}
for r in rows:
    ks.set_status(s,r,'approved','prog')
s.commit()
q='datediff function for date difference in logic expression'
a=ks.search(s,'t1',q,edc='redcap',top_k=5)
assert a['results'] and a['results'][0]['title'].startswith('REDCap') and all(x['title'].startswith('REDCap') for x in a['results'])
b=ks.search(s,'t1',q,edc='rave',top_k=10)
assert not any(x['title'].startswith('REDCap') for x in b['results'])
print('ok')
"""
    r = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True, env=ENV, cwd=ROOT)
    assert "ok" in r.stdout, r.stdout + r.stderr
