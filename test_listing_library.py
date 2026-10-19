"""The AI-drafted listing library: structure, rendering, import as drafts, retrieval."""
import json
import os
import re
import sys
import tempfile

os.environ["DATABASE_URL"] = "sqlite:///" + os.path.join(tempfile.mkdtemp(), "ll.db")
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()
ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ROOT, "listing_library"))

import db  # noqa: E402
import cdisc_files  # noqa: E402
import content_complex  # noqa: E402
import content_global  # noqa: E402
import content_ta  # noqa: E402
import knowledge_ingest as ki  # noqa: E402
import knowledge_store as ks  # noqa: E402

import content_types  # noqa: E402

DOCS = content_global.DOCS + content_complex.DOCS + content_types.DOCS + content_ta.DOCS
TA_NAMES = {r[3] for r in cdisc_files.RULES if r[2] == "ta"}


def test_ids_are_unique_and_every_listing_is_complete():
    ids = [l["id"] for d in DOCS for l in d["listings"]]
    assert len(ids) == len(set(ids)) and len(ids) >= 160
    for d in DOCS:
        for l in d["listings"]:
            assert all(l[k] for k in ("id", "title", "desc", "cols", "logic", "yes", "sort")), l["id"]
            assert re.match(r"^LIB-[A-Z]+-\d\d$", l["id"]), l["id"]
            assert len(l["cols"]) >= 3 and "Scenario" in l["logic"] or "Rule" in l["logic"], l["id"]


def test_therapeutic_areas_are_known_names_and_global_docs_have_no_scope_ref():
    for d in DOCS:
        if d["scope"] == "ta":
            assert d["ref"] in TA_NAMES, d["ref"]
        else:
            assert d["scope"] == "global" and d["ref"] == ""


def test_manifest_matches_the_files_and_every_doc_says_it_is_an_ai_draft():
    man = json.load(open(os.path.join(ROOT, "listing_library", "manifest.json"), encoding="utf-8"))
    assert len(man) == len(DOCS)
    for m in man:
        text = open(os.path.join(ROOT, "listing_library", "docs", m["file"]), encoding="utf-8").read()
        assert "AI-generated draft" in text and "AI draft" in m["title"]
        for i in m["ids"]:
            assert f"## {i}:" in text


def test_import_stores_drafts_only_is_repeatable_and_chunks_by_listing():
    import subprocess
    env = dict(os.environ, DATABASE_URL=os.environ["DATABASE_URL"], SPEC2CODE_KB_DIR=os.environ["SPEC2CODE_KB_DIR"])
    p = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "import_listing_library.py"), "--tenant", "ll"], capture_output=True, text=True, env=env, cwd=ROOT)
    assert p.returncode == 0 and "0 failed" in p.stdout, p.stdout + p.stderr
    s = db.SessionLocal()
    rows = ks.list_sources(s, "ll")
    assert len(rows) == len(DOCS) and all(r.status == "draft" for r in rows)
    assert all(r.doc_type == "listing_standard" for r in rows)
    oncology = [r for r in rows if r.scope_ref == "Oncology"]
    assert len(oncology) == 1
    p2 = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "import_listing_library.py"), "--tenant", "ll"], capture_output=True, text=True, env=env, cwd=ROOT)
    assert f"0 stored as drafts, {len(DOCS)} duplicates" in p2.stdout, p2.stdout
    res = ks.search(s, "ll", "adverse event end date before start date", include_unapproved=True, top_k=3)
    assert res["results"] and "AE" in res["results"][0].get("heading", ""), res["results"][:1]
    s.close()


def test_specs_export_parses_in_the_batch_upload_format_for_every_listing():
    import base64
    import spec_ingest
    total = sum(len(d["listings"]) for d in DOCS)
    for fn in ("listing_specs.json", "listing_specs.xlsx"):
        data = open(os.path.join(ROOT, "listing_library", fn), "rb").read()
        r = spec_ingest.parse_uploads([{"name": fn, "data": base64.b64encode(data).decode()}])
        items = r["items"] if isinstance(r, dict) and "items" in r else r
        specs = [i["spec"] for i in items if i.get("spec")]
        assert len(items) == total and len(specs) == total, (fn, len(items), len(specs))
        assert len({s["reportId"] for s in specs}) == total
        assert all(s["description"] and s["logic"] and s["columnHeading"] for s in specs)
