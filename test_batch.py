"""Batch run tests. Claude is never called: the stage functions are swapped
for stubs, so these tests cover the engine itself -- parallelism limits,
failure isolation, cancel/retry, ingestion and tenant isolation."""

import base64
import io
import json
import os
import tempfile
import threading
import time
import zipfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/test.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import cql_agents  # noqa: E402
import generation_router  # noqa: E402
import logic_understanding_agent  # noqa: E402
import spec_extraction_agent  # noqa: E402
import spec_ingest  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app)


class Probe:
    """Records how many generate calls overlap."""

    def __init__(self, delay=0.03):
        self.delay, self.lock, self.now, self.peak = delay, threading.Lock(), 0, 0

    def generate(self, spec, **_kw):
        with self.lock:
            self.now += 1
            self.peak = max(self.peak, self.now)
        try:
            time.sleep(self.delay)
            if spec["reportId"].startswith("BOOM"):
                raise RuntimeError("model exploded")
            return {
                "cql": f"-- {spec['reportId']}\nSELECT 1", "explanation": "ok", "retrieved_precedents": [],
                "cascade_trace": [], "guardrail_reports": [{"passed": True, "checks": []}], "status": "generated",
            }
        finally:
            with self.lock:
                self.now -= 1


@pytest.fixture()
def probe(monkeypatch):
    p = Probe()
    monkeypatch.setattr(main.graph, "run_generation_pipeline", p.generate)

    def review(spec):
        blocked = spec["reportId"].startswith("BLOCK")
        return {"readiness": "needs_revision" if blocked else "ready", "summary": "s",
                "insights": [{"category": "c", "severity": "blocking" if blocked else "info", "finding": "f", "suggestion": "s"}]}

    monkeypatch.setattr(cql_agents, "run_spec_review", review)
    monkeypatch.setattr(logic_understanding_agent, "run_logic_understanding",
                        lambda spec, block="": {"summary": "u", "logic_steps": [{"step_number": 1, "explanation": "e", "inferred": False}],
                                                "domains_identified": [], "key_definitions": [], "assumptions": [], "edge_cases": []})
    monkeypatch.setattr(spec_extraction_agent, "run_spec_extraction",
                        lambda raw: {"reportId": "", "description": raw[:40], "columnHeading": "", "logic": raw, "reportScenarios": "", "sorting": ""})
    return p


def spec(i, prefix="R"):
    return {"name": f"{prefix}{i}.json", "spec": {"reportId": f"{prefix}{i:03d}", "description": f"listing {i}", "logic": "x"}}


def wait_done(job_id, headers=None, timeout=60):
    end = time.time() + timeout
    while time.time() < end:
        body = client.get(f"/api/batch/{job_id}", headers=headers or {}).json()
        if body["status"] != "running" and not body["active"]:
            return body
        time.sleep(0.05)
    raise AssertionError("batch did not finish")


def create(items, **options):
    r = client.post("/api/batch", json={"name": "t", "items": items, "options": options})
    assert r.status_code == 200, r.text
    return r.json()["id"]


# ----------------------------------------------------------------- engine

def test_hundred_listings_run_in_parallel_within_the_cap(probe):
    items = [spec(i) for i in range(98)] + [spec(1, "BLOCK"), spec(1, "BOOM")]
    job = wait_done(create(items, concurrency=5))
    c = job["counts"]
    assert c["total"] == 100 and c["done"] == 98
    assert c["needs_attention"] == 1 and c["failed"] == 1  # blocked by review / model error, isolated
    assert 2 <= probe.peak <= 5
    failed = next(i for i in job["items"] if i["status"] == "failed")
    assert "model exploded" in failed["error"]


def test_download_zip_has_code_and_manifest(probe):
    job_id = create([spec(i) for i in range(3)] + [spec(1, "BLOCK")], concurrency=3)
    wait_done(job_id)
    r = client.get(f"/api/batch/{job_id}/download")
    z = zipfile.ZipFile(io.BytesIO(r.content))
    names = set(z.namelist())
    assert {"R000.cql", "R001.cql", "R002.cql", "manifest.csv"} <= names
    assert "BLOCK001.cql" not in names
    assert "BLOCK001,needs_attention" in z.read("manifest.csv").decode()
    assert z.read("R001.cql").decode().startswith("-- R001")


def test_generate_anyway_overrides_blocked_review(probe):
    job_id = create([spec(1, "BLOCK")], onBlocked="generate")
    job = wait_done(job_id)
    assert job["counts"]["done"] == 1


def test_cancel_then_retry_finishes_the_rest(probe):
    probe.delay = 0.08
    job_id = create([spec(i) for i in range(30)], concurrency=2)
    time.sleep(0.3)
    client.post(f"/api/batch/{job_id}/cancel")
    job = wait_done(job_id)
    assert job["status"] == "cancelled"
    assert job["counts"]["cancelled"] > 0 and job["counts"]["running"] == 0
    probe.delay = 0.01
    assert client.post(f"/api/batch/{job_id}/retry", json={}).json()["queued"] == job["counts"]["cancelled"]
    job = wait_done(job_id)
    assert job["counts"]["done"] == 30


def test_retry_failed_only(probe):
    job_id = create([spec(1), spec(2, "BOOM")])
    job = wait_done(job_id)
    assert job["counts"]["failed"] == 1
    failed_id = next(i["id"] for i in job["items"] if i["status"] == "failed")
    assert client.post(f"/api/batch/{job_id}/retry", json={"itemIds": [failed_id]}).json()["queued"] == 1
    assert wait_done(job_id)["items"][1]["attempts"] == 2


def test_optional_understanding_is_stored(probe):
    job_id = create([spec(1)], runUnderstanding=True)
    job = wait_done(job_id)
    item = client.get(f"/api/batch/{job_id}/items/{job['items'][0]['id']}").json()
    assert item["understanding"]["logic_steps"][0]["step_number"] == 1
    assert item["review"]["readiness"] == "ready" and item["result"]["cql"]


def test_raw_text_listings_are_extracted_then_run(probe):
    job_id = create([{"name": "spec_a.txt", "rawText": "Lists subjects with overlapping AEs"}])
    job = wait_done(job_id)
    assert job["counts"]["done"] == 1
    assert job["items"][0]["reportId"] == "spec_a"  # falls back to the file name


def test_unverified_language_needs_opt_in(probe):
    r = client.post("/api/batch", json={"items": [spec(1)], "options": {"language": "sql"}})
    assert r.status_code == 400 and "UNVERIFIED" in r.json()["error"]


def test_empty_selection_rejected(probe):
    r = client.post("/api/batch", json={"items": [], "options": {}})
    assert r.status_code == 400


def test_other_tenants_cannot_see_a_batch(probe):
    job_id = create([spec(1)])
    wait_done(job_id)
    other = {"X-Tenant-Id": "someone-else"}
    assert client.get(f"/api/batch/{job_id}", headers=other).status_code == 404
    assert client.get(f"/api/batch/{job_id}/download", headers=other).status_code == 404
    assert client.delete(f"/api/batch/{job_id}", headers=other).status_code == 404
    assert all(j["id"] != job_id for j in client.get("/api/batch", headers=other).json())


def test_delete_removes_the_batch(probe):
    job_id = create([spec(1)])
    wait_done(job_id)
    assert client.delete(f"/api/batch/{job_id}").status_code == 200
    assert client.get(f"/api/batch/{job_id}").status_code == 404


def test_interrupted_work_is_recoverable(probe):
    import db
    import models_db

    job_id = create([spec(1), spec(2)])
    wait_done(job_id)
    s = db.SessionLocal()
    job = s.get(models_db.BatchJob, job_id)
    job.status = "running"
    job.items[0].status = "running"
    s.commit()
    s.close()
    assert main.batch_engine.recover_interrupted() >= 1
    assert client.get(f"/api/batch/{job_id}").json()["items"][0]["status"] == "interrupted"
    assert client.post(f"/api/batch/{job_id}/retry", json={}).json()["queued"] == 1
    assert wait_done(job_id)["counts"]["done"] == 2


# -------------------------------------------------------------- ingestion

def b64(text: bytes) -> str:
    return base64.b64encode(text).decode()


def docx_bytes(paragraphs):
    ns = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    body = "".join(f"<w:p><w:r><w:t>{p}</w:t></w:r></w:p>" for p in paragraphs)
    xml = f'<w:document xmlns:w="{ns}"><w:body>{body}</w:body></w:document>'
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("word/document.xml", xml)
    return buf.getvalue()


def test_parse_uploads_handles_each_format():
    csv_text = "Report ID,Description,Logic\nA1,first,l1\nA2,second,l2\n,missing id,l3\n"
    files = [
        {"name": "one/spec.json", "data": b64(json.dumps({"reportId": "J1", "description": "d"}).encode())},
        {"name": "many.json", "data": b64(json.dumps([{"reportId": "J2", "description": "d"}, {"reportId": "J3", "description": "d"}]).encode())},
        {"name": "table.csv", "data": b64(csv_text.encode())},
        {"name": "notes.txt", "data": b64(b"Raw spec text")},
        {"name": "word.docx", "data": b64(docx_bytes(["Report", "Logic: x"]))},
        {"name": "image.png", "data": b64(b"\x89PNG")},
    ]
    out = spec_ingest.parse_uploads(files)
    by_name = {i["name"]: i for i in out["items"]}
    assert by_name["one/spec.json"]["spec"]["reportId"] == "J1"
    assert by_name["many.json #2"]["reportId"] == "J3"
    assert [i["reportId"] for i in out["items"] if i["source"] == "table.csv"][:2] == ["A1", "A2"]
    assert by_name["table.csv row 4"]["error"] == "No report ID found."
    assert by_name["notes.txt"]["kind"] == "raw" and by_name["notes.txt"]["rawText"] == "Raw spec text"
    assert by_name["word.docx"]["rawText"] == "Report\nLogic: x"
    assert out["skipped"] == [{"name": "image.png", "reason": "unsupported type '.png'"}]


def test_xlsx_rows_become_listings():
    openpyxl = pytest.importorskip("openpyxl")
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append(["reportId", "description", "sorting"])
    ws.append(["X1", "d1", "Site"])
    ws.append(["X2", "d2", "Subject"])
    buf = io.BytesIO()
    wb.save(buf)
    items = spec_ingest.parse_bytes("book.xlsx", buf.getvalue())
    assert [i["reportId"] for i in items] == ["X1", "X2"] and items[1]["spec"]["sorting"] == "Subject"


def test_parse_endpoint_and_bad_json():
    r = client.post("/api/batch/parse", json={"files": [{"name": "bad.json", "data": b64(b"{nope")}]})
    assert r.status_code == 200 and "Could not parse" in r.json()["items"][0]["error"]


def test_server_folder_scan_is_gated(tmp_path, monkeypatch):
    (tmp_path / "a.json").write_text(json.dumps({"reportId": "S1", "description": "d"}))
    sub = tmp_path / "sub"
    sub.mkdir()
    (sub / "b.txt").write_text("raw")
    monkeypatch.delenv("SPEC2CODE_SPEC_ROOTS", raising=False)
    r = client.post("/api/batch/scan", json={"path": str(tmp_path)})
    assert r.status_code == 400 and "disabled" in r.json()["error"]

    monkeypatch.setenv("SPEC2CODE_SPEC_ROOTS", str(tmp_path))
    ok = client.post("/api/batch/scan", json={"path": str(tmp_path)}).json()
    assert sorted(i["name"] for i in ok["items"]) == ["a.json", "sub/b.txt"]
    flat = client.post("/api/batch/scan", json={"path": str(tmp_path), "recursive": False}).json()
    assert [i["name"] for i in flat["items"]] == ["a.json"]

    outside = client.post("/api/batch/scan", json={"path": str(tmp_path.parent)})
    assert outside.status_code == 400 and "outside" in outside.json()["error"]
    escape = client.post("/api/batch/scan", json={"path": str(tmp_path / ".." )})
    assert escape.status_code == 400
