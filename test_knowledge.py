"""Knowledge library, scoped retrieval, approval gating, rules and shadow use.
Claude is never called."""

import base64
import io
import os
import tempfile
import zipfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/kb.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

import openpyxl  # noqa: E402
import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import generation_router  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app)
H = {"X-User-Id": "prog1"}


def b64(b: bytes) -> str:
    return base64.b64encode(b).decode()


def docx(paragraphs, table=None, heading=None) -> bytes:
    W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
    body = ""
    if heading:
        body += f'<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>{heading}</w:t></w:r></w:p>'
    for p in paragraphs:
        body += f"<w:p><w:r><w:t>{p}</w:t></w:r></w:p>"
    if table:
        body += "<w:tbl>" + "".join("<w:tr>" + "".join(f"<w:tc><w:p><w:r><w:t>{c}</w:t></w:r></w:p></w:tc>" for c in row) + "</w:tr>" for row in table) + "</w:tbl>"
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("word/document.xml", f"<w:document {W}><w:body>{body}</w:body></w:document>")
    return buf.getvalue()


def xlsx(rows) -> bytes:
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "History"
    for r in rows:
        ws.append(r)
    buf = io.BytesIO()
    wb.save(buf)
    return buf.getvalue()


def pdf(text: str) -> bytes:
    stream = f"BT /F1 12 Tf 72 720 Td ({text}) Tj ET".encode()
    objs = [b"<< /Type /Catalog /Pages 2 0 R >>", b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
            b"<< /Length %d >>\nstream\n" % len(stream) + stream + b"\nendstream", b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"]
    out, offs = b"%PDF-1.4\n", []
    for i, o in enumerate(objs, 1):
        offs.append(len(out))
        out += b"%d 0 obj\n" % i + o + b"\nendobj\n"
    x = len(out)
    out += b"xref\n0 %d\n0000000000 65535 f \n" % (len(objs) + 1) + b"".join(b"%010d 00000 n \n" % o for o in offs)
    return out + b"trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF" % (len(objs) + 1, x)


def upload(files, scope="global", scope_ref="", **kw):
    return client.post("/api/knowledge/sources", headers=H, json={
        "files": [{"name": n, "data": b64(d)} for n, d in files], "scope": scope, "scopeRef": scope_ref, **kw})


def first_id(r):
    return r.json()["results"][0]["sourceId"]


PROTOCOL = docx(["Schedule of assessments is shown below. Inclusion criteria and exclusion criteria apply. The primary objective is safety."],
                table=[["Visit", "Day", "Vitals"], ["Screening", "-28", "X"], ["Week 4", "28", "X"]], heading="Study Design")


# ---------------------------------------------------------------- ingestion

@pytest.mark.parametrize("name,data,doc_type", [
    ("protocol.docx", PROTOCOL, "protocol"),
    ("prog.sas", b"/* ae listing */\nproc sql;\n create table x as select * from ae where deleted ne 1;\nquit;\n", "sas_program"),
    ("notes.txt", b"Meeting notes about the SDTM implementation guide and controlled terminology versions in use.\nAnother line of text to read.", "standard"),
    ("history.xlsx", xlsx([["Report", "Note"], ["R1", "Deleted forms were excluded"], ["R2", "Used UNK handling"]]), "other"),
    ("list.csv", b"Report ID,Column Heading,Logic\nL1,Site,DS01.Status <> X\n", "listing_standard"),
])
def test_each_format_is_read_chunked_and_starts_as_draft(name, data, doc_type):
    r = upload([(name, data)])
    assert r.status_code == 200, r.text
    res = r.json()["results"][0]
    assert res["status"] == "draft" and res["chunks"] >= 1 and res["extractStatus"] == "ok"
    assert res["docType"] == doc_type, res


def test_pdf_with_text_is_read_and_a_scanned_pdf_is_flagged_not_faked():
    ok = upload([("p.pdf", pdf("Primary endpoint is overall survival at 24 months"))]).json()["results"][0]
    assert ok["extractStatus"] == "ok" and ok["chunks"] == 1
    # a PDF with no text layer
    blank = upload([("scan.pdf", pdf(""))]).json()["results"][0]
    assert blank["extractStatus"] == "needs_ocr" and blank["chunks"] == 0
    assert client.post(f"/api/knowledge/sources/{blank['sourceId']}/approve", headers=H).status_code == 400  # nothing to approve


def test_docx_table_stays_a_table_and_heading_is_kept():
    sid = first_id(upload([("p2.docx", docx(["Intro text about the study population, long enough to keep."], table=[["Visit", "Day"], ["Screening", "-28"]], heading="Schedule"))]))
    prev = client.get(f"/api/knowledge/sources/{sid}").json()["preview"]
    assert {c["meta"].get("rows") for c in prev if c["heading"] == "Schedule"} >= {2}
    assert any("Screening | -28" in c["text"] for c in prev)


def test_sas_is_split_by_step():
    sas = b"proc sql;\n select 1 from a;\nquit;\n\nproc sort data=a;\n by x;\nrun;\n\n%macro m1;\n data b; set a; run;\n%mend;\n"
    sid = first_id(upload([("steps.sas", sas)]))
    assert client.get(f"/api/knowledge/sources/{sid}").json()["chunks"] == 3


def test_unsupported_and_corrupt_files_are_refused_with_reasons():
    r = upload([("x.exe", b"MZ"), ("bad.docx", b"not a zip")])
    assert r.status_code == 400
    errs = [x["error"] for x in r.json()["results"]]
    assert any("Unsupported" in e for e in errs) and any("docx" in e for e in errs)


def test_duplicate_upload_is_detected_at_the_same_scope_only():
    data = b"A line of reference text about visit windows for the study design section."
    first = upload([("dup.txt", data)]).json()["results"][0]
    again = upload([("dup.txt", data)]).json()["results"][0]
    assert again["duplicate"] and again["sourceId"] == first["sourceId"]
    other = upload([("dup.txt", data)], scope="ta", scope_ref="Oncology").json()["results"][0]
    assert not other["duplicate"]


def test_scope_validation():
    assert upload([("a.txt", b"some text long enough")], scope="ta").status_code == 400
    assert upload([("a.txt", b"some text long enough")], scope="nope").status_code == 400
    assert upload([("a.txt", b"some text long enough")], docType="weird").json()["results"][0]["error"]


# ---------------------------------------------------- approval and retrieval

def search(**kw):
    kw.setdefault("query", "visit windows")
    return client.post("/api/knowledge/search", json=kw).json()


def test_drafts_are_invisible_until_approved_and_retired_sources_vanish():
    sid = first_id(upload([("vw.txt", b"Visit windows: screening occurs within 28 days; week 4 visit has a plus or minus 3 day window.")]))
    assert search(query="visit window screening")["results"] == []
    ex = search(query="visit window screening")["excluded"]
    assert any(e["sourceId"] == sid and "draft" in e["reason"] for e in ex)
    assert client.post(f"/api/knowledge/sources/{sid}/approve", headers=H).json()["approvedBy"] == "prog1"
    hits = search(query="visit window screening")["results"]
    assert hits and hits[0]["sourceId"] == sid and hits[0]["status"] == "approved"
    client.post(f"/api/knowledge/sources/{sid}/retire", headers=H)
    assert search(query="visit window screening")["results"] == []
    # the tester can show other drafts on request, but a retired source never comes back
    assert sid not in [x["sourceId"] for x in search(query="visit window screening", includeUnapproved=True, topK=50)["results"]]


def test_scope_chain_global_ta_study():
    def approved(name, text, scope, ref=""):
        sid = first_id(upload([(name, text.encode())], scope=scope, scope_ref=ref))
        client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
        return sid

    same = "Zebra endpoint rule: the zebra endpoint is assessed with the agreed response criteria at each visit."
    g = approved("g.txt", same, "global")  # identical text, so only the scope can decide the order
    ta = approved("ta.txt", same, "ta", "Oncology")
    st = approved("st.txt", same, "study", "ZB-1")
    other = approved("o.txt", same, "ta", "Vaccines")
    client.post("/api/studies", json={"studyId": "ZB-1", "ta": "Oncology"})
    client.post("/api/studies", json={"studyId": "ZB-2", "ta": "Vaccines"})

    ids = lambda r: [x["sourceId"] for x in r["results"]]  # noqa: E731
    none = search(query="zebra endpoint rule", topK=10)
    assert ids(none) == [g]  # no study/TA: only global applies
    r1 = search(query="zebra endpoint rule", studyId="ZB-1", topK=10)
    assert ids(r1) == [st, ta, g]  # most specific first, the other TA excluded
    assert any(e["sourceId"] == other and "Vaccines" in e["reason"] for e in r1["excluded"]) and r1["ta"] == "Oncology"
    r2 = search(query="zebra endpoint rule", studyId="ZB-2", topK=10)
    assert set(ids(r2)) == {g, other}
    assert set(ids(search(query="zebra endpoint rule", ta="Oncology", topK=10))) == {g, ta}


def test_edc_guide_scoped_to_one_edc_system():
    sid = first_id(upload([("rave.txt", b"Medidata Rave edit check guide: use the Architect loader to import forms and edit checks for study builds.")],
                          doc_type="edc_guide", ))
    client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
    client.patch(f"/api/knowledge/sources/{sid}", json={"scopeRef": "rave"})
    assert client.get(f"/api/knowledge/sources/{sid}").json()["status"] == "draft"  # a scope change needs review again
    client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
    assert search(query="architect loader edit checks", edcSystem="rave")["results"]
    r = search(query="architect loader edit checks", edcSystem="veeva")
    assert not r["results"] and any("rave" in e["reason"] for e in r["excluded"])


def test_tenant_isolation():
    sid = first_id(upload([("iso.txt", b"Isolated tenant text about quasar listings and nothing else here.")]))
    client.post(f"/api/knowledge/sources/{sid}/approve", headers=H)
    other = {"X-Tenant-Id": "other"}
    assert client.get(f"/api/knowledge/sources/{sid}", headers=other).status_code == 404
    assert client.post("/api/knowledge/search", headers=other, json={"query": "quasar listings"}).json()["results"] == []
    assert client.post(f"/api/knowledge/sources/{sid}/approve", headers=other).status_code == 404


def test_reindex_and_stats():
    r = client.post("/api/knowledge/reindex", json={}).json()
    assert r["chunks"] > 0 and r["backend"]
    s = client.get("/api/knowledge/stats").json()
    assert s["sources"] > 0 and "Oncology" in s["tas"] and s["lexicalOnly"] is True


def test_review_queue_lists_drafts_and_unreadable_files():
    upload([("scan2.pdf", pdf(""))])
    q = client.get("/api/knowledge/review-queue").json()
    assert q["sources"] and any(p["extractStatus"] == "needs_ocr" for p in q["problems"])


# -------------------------------------------------------------------- rules

RULE = {"name": "Exclude deleted DS01", "scope": "global", "appliesTo": ["generate"], "actionType": "prompt",
        "action": {"text": "Exclude deleted DS01 records."}, "condition": {"forms": ["DS01"], "edcSystem": ["veeva"]},
        "tests": [{"spec": {"logic": "DS01.Status <> X", "edcSystem": "veeva"}, "expect": "fires"},
                  {"spec": {"logic": "AE.Term is not null", "edcSystem": "veeva"}, "expect": "not_fires"}]}


def test_rule_validation():
    bad = lambda **kw: client.post("/api/rules", json={**RULE, **kw})  # noqa: E731
    assert bad(name="").status_code == 400
    assert bad(appliesTo=[]).status_code == 400
    assert bad(actionType="prompt", action={}).status_code == 400
    assert bad(scope="ta").status_code == 400
    assert bad(condition={"textPattern": "(a+)+$"}).status_code == 400
    assert bad(condition={"textPattern": "[unclosed"}).status_code == 400
    assert bad(tests=[{"spec": {}, "expect": "maybe"}]).status_code == 400


def test_rule_lifecycle_and_test_gate():
    r = client.post("/api/rules", headers=H, json=RULE).json()
    assert r["status"] == "draft"
    ok = client.post(f"/api/rules/{r['id']}/approve", headers=H)
    assert ok.status_code == 200 and ok.json()["status"] == "approved" and all(t["passed"] for t in ok.json()["testResults"])
    # editing an approved rule makes it a new draft
    upd = client.put(f"/api/rules/{r['id']}", json={**RULE, "description": "changed"}).json()
    assert upd["status"] == "draft" and upd["version"] == 2
    # a rule whose own test fails cannot be approved
    broken = client.post("/api/rules", json={**RULE, "name": "Broken", "tests": [{"spec": {"logic": "nothing"}, "expect": "fires"}]}).json()
    res = client.post(f"/api/rules/{broken['id']}/approve", headers=H)
    assert res.status_code == 400 and res.json()["tests"][0]["passed"] is False
    assert client.get("/api/rules?status=draft").json()
    client.delete(f"/api/rules/{broken['id']}")


def test_dry_run_specificity_and_overrides():
    mk = lambda **kw: client.post("/api/rules", headers=H, json={**RULE, "tests": [], **kw}).json()  # noqa: E731
    g = mk(name="G map", condition={}, actionType="name_map", action={"from": "Site", "to": "SiteNumber"})
    s = mk(name="Study map", scope="study", scopeRef="ZB-1", condition={}, actionType="name_map", action={"from": "Site", "to": "SiteID"})
    for x in (g, s):
        assert client.post(f"/api/rules/{x['id']}/approve", headers=H).status_code == 200
    spec = {"logic": "x", "description": "d"}
    base = client.post("/api/rules/dry-run", json={"spec": spec}).json()["fired"]
    assert [f["name"] for f in base if f["actionType"] == "name_map"] == ["G map"]  # study rule needs its study
    r = client.post("/api/rules/dry-run", json={"spec": spec, "studyId": "ZB-1"}).json()["fired"]
    maps = [f for f in r if f["actionType"] == "name_map"]
    assert [f["name"] for f in maps] == ["Study map", "G map"] and maps[1]["overriddenBy"] == "Study map"


def test_drafts_only_fire_in_dry_run_when_asked():
    d = client.post("/api/rules", json={**RULE, "name": "Draft only", "tests": [], "condition": {"textPattern": "draftmarker"}}).json()
    spec = {"logic": "has draftmarker in it"}
    assert not [f for f in client.post("/api/rules/dry-run", json={"spec": spec}).json()["fired"] if f["name"] == "Draft only"]
    assert [f for f in client.post("/api/rules/dry-run", json={"spec": spec, "includeDraft": True}).json()["fired"] if f["name"] == "Draft only"]
    client.delete(f"/api/rules/{d['id']}")


def test_backtest_counts_stored_specs():
    import db
    import store
    s = db.SessionLocal()
    try:
        for i, logic in enumerate(["DS01.Status <> X", "AE.Term is not null", "DS01.Date is not null"]):
            store.create_spec(s, "default", {"reportId": f"BT{i}", "description": "d", "logic": logic})
    finally:
        s.close()
    r = client.post("/api/rules/backtest", json={"rule": {**RULE, "condition": {"forms": ["DS01"]}, "tests": []}}).json()
    assert r["fired"] == 2 and r["checked"] >= 3 and set(r["examples"]) >= {"BT0", "BT2"}


# ---------------------------------------------------------- shadow in a run

def test_generation_records_what_the_knowledge_base_would_add_without_changing_the_prompt(monkeypatch):
    seen = {}

    def fake(language, spec):
        seen["spec"] = dict(spec)
        return {"code": "select 1", "explanation": "draft"}

    monkeypatch.setattr(generation_router, "run_beta_generation", fake)
    client.post("/api/studies", json={"studyId": "SH1", "edcSystem": "rave", "ta": "Oncology"})
    client.post("/api/studies/SH1/metadata", json={"files": [{"name": "i.csv", "data": b64(b"Form,Item,Label\nDS01,DSDECOD,Status\n")}]})
    spec = {"reportId": "SH", "description": "zebra endpoint listing", "logic": "DS01.Status <> X zebra endpoint rule",
            "edcSystem": "rave", "language": "sql", "studyId": "SH1"}
    r = client.post("/api/generate?allow_unverified=true", json=spec).json()
    k = r["knowledge"]
    assert k["mode"] == "shadow" and k["ta"] == "Oncology"
    assert any(s["scope"] == "ta" for s in k["sources"])
    assert "G map" in [x["name"] for x in k["rules"]]
    assert "RECIST" not in seen["spec"].get("_context_block", "")  # shadow only: nothing is injected into the prompt


def test_study_ta_can_be_edited():
    client.post("/api/studies", json={"studyId": "TA1"})
    assert client.patch("/api/studies/TA1", json={"ta": "Vaccines"}).json()["ta"] == "Vaccines"
    assert [s for s in client.get("/api/studies").json() if s["studyId"] == "TA1"][0]["ta"] == "Vaccines"


def test_markdown_headings_become_chunk_headings_and_code_lines_do_not():
    import knowledge_ingest as ki
    text = ("# Title\n\nIntro text. " + "x " * 50 + "\n\n## 1. Joins\n\nUse a join.\n\n```\nSELECT *\nFROM A\n```\n\nMore on joins.\n\n## 2. Dates\n\nDates text here.\n")
    heads = [c.heading for c in ki.chunk(ki.extract("t.md", text.encode()))]
    assert "1. Joins" in heads and "2. Dates" in heads and "SELECT *" not in heads
