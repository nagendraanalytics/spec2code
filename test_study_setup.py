"""Study setup, EDC registry, metadata-grounded drafts, pre-flight and the
batch-wise / report-wise metadata selection. Claude is never called."""

import base64
import os
import tempfile
import time

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/test.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import cql_agents  # noqa: E402
import edc_registry  # noqa: E402
import generation_router  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app)


def b64(text: str) -> str:
    return base64.b64encode(text.encode()).decode()


ITEMS_CSV = (
    "Form,Form Label,Item,Label,Data Type\n"
    "DS01,Disposition,DSDECOD,Select the Status of the Subject for the Study,text\n"
    "DS01,Disposition,DSSTDAT,Date of status,date\n"
    "AE,Adverse Events,AETERM,Adverse event term,text\n"
)
VISITS_CSV = "Visit Name,Order\nScreening,1\nWeek 4,2\n"
CODELIST_CSV = "Code List,Coded Value,Decode\nYN,Y,Yes\nYN,N,No\n"


def make_study(sid="S1", edc="rave", files=None):
    assert client.post("/api/studies", json={"studyId": sid, "name": "Demo", "edcSystem": edc}).status_code == 200
    files = files or [{"name": "items.csv", "data": b64(ITEMS_CSV)}]
    r = client.post(f"/api/studies/{sid}/metadata", json={"files": files})
    assert r.status_code == 200, r.text
    return r.json()


# ------------------------------------------------------------ EDC registry

def test_ten_edc_systems_listed_and_unique():
    systems = client.get("/api/edc-systems").json()["edcSystems"]
    ids = [e["id"] for e in systems]
    assert len(ids) == 10 and len(set(ids)) == 10 and {"veeva", "rave", "oracle_clinical_one", "redcap"} <= set(ids)


def test_targets_cover_every_edc_and_stay_blocked_without_metadata():
    cells = {(t["edcSystem"], t["language"]): t for t in client.get("/api/targets").json()["targets"]}
    assert len(cells) == 10 * 5
    assert cells[("castor", "sql")]["coverage"] == "none" and not cells[("castor", "sql")]["available"] and not cells[("castor", "sql")]["optInRequired"]
    assert cells[("veeva", "cql")]["coverage"] == "full"


def test_metadata_turns_a_blocked_system_into_an_unverified_draft_only_for_sql_sas_r():
    make_study("TGT1", "castor")
    cells = {(t["edcSystem"], t["language"]): t for t in client.get("/api/targets?studyId=TGT1").json()["targets"]}
    for lang in ("sql", "sas", "r"):
        assert cells[("castor", lang)]["optInRequired"] and cells[("castor", lang)]["coverage"] == "draft"
    assert cells[("castor", "cql")]["coverage"] == "none" and cells[("castor", "python")]["coverage"] == "none"
    assert cells[("veeva", "cql")]["coverage"] == "full"  # unchanged
    unknown = {(t["edcSystem"], t["language"]): t for t in client.get("/api/targets?studyId=NOPE").json()["targets"]}
    assert not unknown[("castor", "sql")]["optInRequired"]


# ------------------------------------------------------------------ loader

def test_create_study_validation_and_duplicates():
    assert client.post("/api/studies", json={"studyId": "bad id!"}).status_code == 400
    assert client.post("/api/studies", json={"studyId": "X", "edcSystem": "nope"}).status_code == 400
    assert client.post("/api/studies", json={"studyId": "DUP"}).status_code == 200
    assert client.post("/api/studies", json={"studyId": "DUP"}).status_code == 400


def test_upload_reads_items_visits_and_codelists_and_reports_matched_columns():
    body = make_study("LOAD1", files=[
        {"name": "items.csv", "data": b64(ITEMS_CSV)},
        {"name": "visits.csv", "data": b64(VISITS_CSV)},
        {"name": "lists.csv", "data": b64(CODELIST_CSV)},
    ])
    c = body["version"]["counts"]
    assert (c["items"], c["forms"], c["visits"], c["codelists"]) == (3, 2, 2, 1)
    assert any("Matched columns" in m["text"] and "form <- Form" in m["text"] for m in body["messages"])


def test_redcap_style_data_dictionary_columns_are_understood():
    redcap = ("Variable / Field Name,Form Name,Field Type,Field Label\n"
              "age,demographics,text,Age at consent\nsex,demographics,radio,Sex\n")
    body = make_study("RC1", "redcap", files=[{"name": "dd.csv", "data": b64(redcap)}])
    assert body["version"]["counts"]["items"] == 2
    items = client.get("/api/studies/RC1/items").json()["items"]
    assert {i["item"] for i in items} == {"age", "sex"} and items[0]["form"] == "demographics"


def test_new_upload_is_a_new_version_and_carries_over_other_kinds():
    make_study("VER1", files=[{"name": "i.csv", "data": b64(ITEMS_CSV)}, {"name": "v.csv", "data": b64(VISITS_CSV)}])
    r = client.post("/api/studies/VER1/metadata", json={"files": [{"name": "i2.csv", "data": b64(ITEMS_CSV + "VS,Vitals,SYSBP,Systolic BP,integer\n")}]}).json()
    assert r["version"]["version"] == 2 and r["version"]["counts"]["items"] == 4
    assert r["version"]["counts"]["visits"] == 2 and "visits" in r["version"]["counts"]["carriedOver"]
    off = client.post("/api/studies/VER1/metadata", json={"files": [{"name": "i3.csv", "data": b64(ITEMS_CSV)}], "carryOver": False}).json()
    assert off["version"]["counts"]["visits"] == 0
    detail = client.get("/api/studies/VER1").json()
    assert detail["activeVersion"] == 3 and [v["version"] for v in detail["versionList"]] == [3, 2, 1]
    assert client.post("/api/studies/VER1/versions/1/activate").json()["activeVersion"] == 1
    assert client.post("/api/studies/VER1/versions/9/activate").status_code == 404


def test_unreadable_upload_creates_nothing():
    client.post("/api/studies", json={"studyId": "BAD1"})
    r = client.post("/api/studies/BAD1/metadata", json={"files": [{"name": "x.csv", "data": b64("a,b\n1,2\n")}, {"name": "y.pdf", "data": b64("x")}]})
    assert r.status_code == 400 and r.json()["messages"]
    assert client.get("/api/studies/BAD1").json()["versions"] == 0


def test_checks_flag_duplicates_and_missing_labels():
    csv_text = "Form,Item,Label\nF,A,\nF,A,\nF,B,\nF,C,\n"
    body = make_study("CHK1", files=[{"name": "i.csv", "data": b64(csv_text)}])
    texts = " ".join(c["text"] for c in body["checks"])
    assert "Duplicate" in texts and "no label" in texts


def test_studies_are_tenant_scoped():
    make_study("ISO1")
    other = {"X-Tenant-Id": "other"}
    assert client.get("/api/studies/ISO1", headers=other).status_code == 404
    assert all(s["studyId"] != "ISO1" for s in client.get("/api/studies", headers=other).json())
    assert client.post("/api/studies/ISO1/metadata", headers=other, json={"files": []}).status_code == 404


def test_legacy_flat_metadata_still_resolves():
    import db
    import study_setup

    client.post("/api/study-metadata", json={"study_id": "OLD1", "rows": [{"form": "AE", "item": "AETERM"}]})
    s = db.SessionLocal()
    try:
        res = study_setup.resolve(s, "default", "OLD1")
        assert res is not None and res.legacy and res.lookup() == {"AE": {"AETERM"}}
    finally:
        s.close()


# --------------------------------------------------------------- preflight

SPEC_TEXT = ("DS01.Select the Status of the Subject for the Study <> “Discontinued”\nAND\n"
             "ZZ99.Some missing thing = 1\nAND DS01.Date of statuz is not null")


def test_preflight_resolves_found_names_and_flags_unknown_ones():
    make_study("PF1")
    out = client.post("/api/preflight", json={"studyId": "PF1", "listings": [
        {"key": "a", "spec": {"logic": SPEC_TEXT}}, {"key": "b", "studyId": "NOSTUDY", "spec": {"logic": SPEC_TEXT}},
    ]}).json()["results"]
    a, b = out
    assert a["status"] == "unresolved" and a["resolved"] == 1 and a["references"] == 3
    problems = " ".join(u["problem"] for u in a["unresolved"])
    assert "ZZ99" in problems and "Closest" in problems  # the near-miss item gets a suggestion
    assert b["status"] == "no_metadata"


# ---------------------------------------------- grounded drafts via generate

@pytest.fixture()
def beta_probe(monkeypatch):
    seen = {}

    def fake(language, spec):
        seen["spec"] = spec
        return {"code": f"/* {language} */ select 1", "explanation": "draft"}

    monkeypatch.setattr(generation_router, "run_beta_generation", fake)
    return seen


SPEC = {"reportId": "R1", "description": "d", "logic": "DS01.Select the Status of the Subject for the Study <> X",
        "edcSystem": "rave", "language": "sql", "studyId": "GEN1"}


def test_non_veeva_generation_needs_metadata_then_is_an_opt_in_draft(beta_probe):
    r = client.post("/api/generate?allow_unverified=true", json=SPEC)
    assert r.status_code == 400  # no study metadata loaded yet
    make_study("GEN1", "rave")
    assert client.post("/api/generate", json=SPEC).status_code == 400  # grounded, but still opt-in
    ok = client.post("/api/generate?allow_unverified=true", json=SPEC)
    assert ok.status_code == 200 and ok.json()["isBeta"] is True
    assert ok.json()["metadata"] == {"studyId": "GEN1", "version": 1, "items": 3}
    block = beta_probe["spec"]["_context_block"]
    assert "Medidata Rave" in block and "does NOT apply" in block and "DSDECOD" in block
    assert "Select the Status of the Subject for the Study" in block


def test_pinned_version_is_used_over_the_active_one(beta_probe):
    make_study("GEN2", "rave")
    client.post("/api/studies/GEN2/metadata", json={"files": [{"name": "i.csv", "data": b64("Form,Item,Label\nNEW,NEWITEM,New\n")}], "carryOver": False})
    spec = dict(SPEC, studyId="GEN2")
    client.post("/api/generate?allow_unverified=true", json=dict(spec, metadataVersion=1))
    assert "DSDECOD" in beta_probe["spec"]["_context_block"]
    client.post("/api/generate?allow_unverified=true", json=spec)
    assert "NEWITEM" in beta_probe["spec"]["_context_block"] and "DSDECOD" not in beta_probe["spec"]["_context_block"]


# ----------------------------------------------- batch-wise and report-wise

def batch(items, **opts):
    return client.post("/api/batch", json={"name": "t", "items": items, "options": opts})


def wait(job_id):
    end = time.time() + 30
    while time.time() < end:
        d = client.get(f"/api/batch/{job_id}").json()
        if d["status"] != "running" and not d["active"]:
            return d
        time.sleep(0.05)
    raise AssertionError("timeout")


def spec_item(i, study=""):
    return {"name": f"L{i}", "studyId": study, "spec": {"reportId": f"L{i:02d}", "description": "d", "logic": "x"}}


def test_batch_wise_and_report_wise_metadata(monkeypatch, beta_probe):
    monkeypatch.setattr(cql_agents, "run_spec_review", lambda s: {"readiness": "ready", "summary": "", "insights": []})
    make_study("BW1", "rave")
    make_study("BW2", "rave", files=[{"name": "i.csv", "data": b64("Form,Item,Label\nZZ,ZZITEM,z\nZZ,ZZ2,z\n")}])
    base = dict(edcSystem="rave", language="sql", allowUnverified=True)

    # no study anywhere: refused up front, with the reason
    r = batch([spec_item(1)], **base)
    assert r.status_code == 400 and "no study metadata" in r.json()["error"]

    # batch-wise: one study for everything; the version in use is pinned into the run
    r = batch([spec_item(1), spec_item(2)], studyId="BW1", **base)
    assert r.status_code == 200 and r.json()["options"]["metadataVersion"] == 1
    job = wait(r.json()["id"])
    assert job["counts"]["done"] == 2
    item = client.get(f"/api/batch/{job['id']}/items/{job['items'][0]['id']}").json()
    assert item["result"]["metadata"]["studyId"] == "BW1"

    # report-wise: one listing carries its own study
    r = batch([spec_item(1), spec_item(2, study="BW2")], studyId="BW1", **base)
    job = wait(r.json()["id"])
    studies = [client.get(f"/api/batch/{job['id']}/items/{i['id']}").json()["result"]["metadata"]["studyId"] for i in job["items"]]
    assert studies == ["BW1", "BW2"] and [i["studyId"] for i in job["items"]] == ["", "BW2"]

    # report-wise only: every listing names its study, so no batch-level study is needed
    assert batch([spec_item(1, "BW1"), spec_item(2, "BW2")], **base).status_code == 200
    # but one listing without a study is refused
    assert batch([spec_item(1, "BW1"), spec_item(2)], **base).status_code == 400

    # a study column inside the spec data works as the override too
    item = spec_item(3)
    item["spec"]["studyId"] = "BW2"
    assert batch([item], **base).status_code == 200


def test_manifest_records_study_and_version(monkeypatch, beta_probe):
    import io
    import zipfile

    monkeypatch.setattr(cql_agents, "run_spec_review", lambda s: {"readiness": "ready", "summary": "", "insights": []})
    make_study("MAN1", "rave")
    job = wait(batch([spec_item(1)], studyId="MAN1", edcSystem="rave", language="sql", allowUnverified=True).json()["id"])
    z = zipfile.ZipFile(io.BytesIO(client.get(f"/api/batch/{job['id']}/download").content))
    manifest = z.read("manifest.csv").decode()
    assert "study,metadata_version" in manifest and "MAN1,1" in manifest


# ------------------------------------------------------------------ migration

def test_ensure_columns_adds_the_missing_batch_item_column():
    from sqlalchemy import create_engine, inspect, text

    import db

    eng = create_engine(f"sqlite:///{tempfile.mkdtemp()}/old.db")
    with eng.begin() as c:
        c.execute(text("CREATE TABLE batch_items (id VARCHAR PRIMARY KEY, job_id VARCHAR)"))
    db.ensure_columns(eng)
    db.ensure_columns(eng)  # idempotent
    assert "study_id" in {c["name"] for c in inspect(eng).get_columns("batch_items")}


def test_ensure_columns_adds_the_therapeutic_area_column_to_old_studies_tables():
    from sqlalchemy import create_engine, inspect, text

    import db

    eng = create_engine(f"sqlite:///{tempfile.mkdtemp()}/old2.db")
    with eng.begin() as c:
        c.execute(text("CREATE TABLE studies (id VARCHAR PRIMARY KEY, study_id VARCHAR)"))
    db.ensure_columns(eng)
    assert "ta" in {c["name"] for c in inspect(eng).get_columns("studies")}
