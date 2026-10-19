"""Public source catalogue: honest entries, guarded fetching, drafts only."""
import json
import os
import tempfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/kf.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"
os.environ["SPEC2CODE_KB_DIR"] = tempfile.mkdtemp()

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import knowledge_fetch as kf  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app, headers={"X-Tenant-Id": "kf", "X-User-Id": "prog1"})
HOSTS = {"evs.nci.nih.gov"}
URL = "https://evs.nci.nih.gov/ftp1/CDISC/SDTM/SDTM%20Terminology.txt"


def net(monkeypatch, responses, public=True):
    calls = []

    def fake_get(host, path, timeout, max_bytes):
        calls.append((host, path))
        r = responses.pop(0)
        if isinstance(r, Exception):
            raise r
        return r
    monkeypatch.setattr(kf, "_get", fake_get)
    if public:
        monkeypatch.setattr(kf, "_public", lambda h: None)
    return calls


def test_catalogue_is_honest_about_what_was_checked_and_can_be_fetched():
    entries = kf.load_catalog()
    ids = [e["id"] for e in entries]
    assert len(ids) == len(set(ids))
    for e in entries:
        assert e["kind"] in ("file", "manual", "pack") and e["scope"] in ("global", "ta", "study") and e["access"] in ("open", "login", "check")
        assert e["verifiedHow"], e["id"]
        if e["kind"] == "file":
            assert e["url"].startswith("https://") and e["docType"] in ("standard", "protocol", "edc_guide", "other", "spec", "history", "sas_program", "listing_standard")
        if not e["url"]:
            assert not e["verified"], f"{e['id']} has no link, so it cannot be marked verified"
        if e["access"] == "login":
            assert e["kind"] != "file"  # gated sources are never fetched
    assert {"nci-sdtm-ct", "ich-e6r3", "cdisc-core-rules"} <= set(ids)
    assert kf.allowed_hosts(entries) >= {"evs.nci.nih.gov", "database.ich.org"}


def test_fetch_guards_scheme_host_credentials_port_and_private_addresses(monkeypatch):
    net(monkeypatch, [])
    for bad, msg in [("http://evs.nci.nih.gov/x.txt", "https"), ("https://evil.example/x.txt", "allowlist"),
                     ("https://user:pw@evs.nci.nih.gov/x", "credentials"), ("https://evs.nci.nih.gov:8443/x", "port")]:
        with pytest.raises(kf.FetchError, match=msg):
            kf.fetch(bad, HOSTS)
    monkeypatch.undo()
    with pytest.raises(kf.FetchError, match="non-public"):
        kf.fetch("https://127.0.0.1/x", {"127.0.0.1"})
    with pytest.raises(kf.FetchError, match="non-public"):
        kf.fetch("https://localhost/x", {"localhost"})


def test_fetch_follows_allowlisted_redirects_only_and_caps_them(monkeypatch):
    calls = net(monkeypatch, [(302, {"location": "/ftp1/other.txt"}, b""), (200, {"content-type": "text/plain"}, b"data")])
    data, final = kf.fetch(URL, HOSTS, "txt")
    assert data == b"data" and final.endswith("/ftp1/other.txt") and len(calls) == 2
    net(monkeypatch, [(302, {"location": "https://evil.example/x"}, b"")])
    with pytest.raises(kf.FetchError, match="allowlist"):
        kf.fetch(URL, HOSTS, "txt")
    net(monkeypatch, [(302, {"location": "/a"}, b"")] * 5)
    with pytest.raises(kf.FetchError, match="redirects"):
        kf.fetch(URL, HOSTS, "txt")


def test_fetch_rejects_web_page_for_a_file_bad_status_and_empty(monkeypatch):
    net(monkeypatch, [(200, {"content-type": "text/html; charset=utf-8"}, b"<html>login</html>")])
    with pytest.raises(kf.FetchError, match="web page"):
        kf.fetch(URL, HOSTS, "pdf")
    net(monkeypatch, [(404, {}, b"")])
    with pytest.raises(kf.FetchError, match="404"):
        kf.fetch(URL, HOSTS, "txt")
    net(monkeypatch, [(200, {"content-type": "text/plain"}, b"")])
    with pytest.raises(kf.FetchError, match="empty"):
        kf.fetch(URL, HOSTS, "txt")


def test_catalog_endpoint_lists_entries_and_state():
    r = client.get("/api/knowledge/catalog").json()
    assert "evs.nci.nih.gov" in r["hosts"] and all(e["inLibrary"] is False for e in r["entries"])


def test_fetch_endpoint_stores_a_draft_with_source_note_and_marks_in_library(monkeypatch):
    body = b"Code\tCodelist Name\nC12345\tNoYesResponse\n" * 20
    net(monkeypatch, [(200, {"content-type": "text/plain"}, body)])
    r = client.post("/api/knowledge/catalog/fetch", json={"ids": ["nci-sdtm-ct"]}).json()
    res = r["results"][0]
    assert res["ok"] and res["duplicate"] is False and res["chunks"] >= 1 and "drafts" in r["note"]
    srcs = client.get("/api/knowledge/sources").json()
    src = [s for s in (srcs["sources"] if isinstance(srcs, dict) else srcs) if s["id"] == res["sourceId"]][0]
    assert src["status"] == "draft" and src["scope"] == "global" and "evs.nci.nih.gov" in src["licenseNote"] and "retrieved" in src["licenseNote"]
    cat = {e["id"]: e for e in client.get("/api/knowledge/catalog").json()["entries"]}
    assert cat["nci-sdtm-ct"]["inLibrary"] is True and cat["nci-adam-ct"]["inLibrary"] is False
    net(monkeypatch, [(200, {"content-type": "text/plain"}, body)])
    again = client.post("/api/knowledge/catalog/fetch", json={"ids": ["nci-sdtm-ct"]}).json()["results"][0]
    assert again["ok"] and again["duplicate"] is True


def test_fetch_endpoint_isolates_failures_and_refuses_manual_entries(monkeypatch):
    net(monkeypatch, [kf.FetchError("Cannot resolve evs.nci.nih.gov: no internet"), (200, {"content-type": "text/plain"}, b"Glossary term\tdefinition\n" * 10)])
    r = client.post("/api/knowledge/catalog/fetch", json={"ids": ["nci-adam-ct", "nci-glossary", "edc-veeva", "cdisc-core-rules", "nope"]}).json()["results"]
    by = {x["id"]: x for x in r}
    assert not by["nci-adam-ct"]["ok"] and "no internet" in by["nci-adam-ct"]["error"]
    assert by["nci-glossary"]["ok"]
    assert not by["edc-veeva"]["ok"] and "by hand" in by["edc-veeva"]["error"]
    assert not by["cdisc-core-rules"]["ok"] and not by["nope"]["ok"]


def test_catalog_state_is_per_tenant(monkeypatch):
    other = TestClient(main.app, headers={"X-Tenant-Id": "kf-other", "X-User-Id": "x"})
    assert all(e["inLibrary"] is False for e in other.get("/api/knowledge/catalog").json()["entries"])


def test_core_rules_reference_builder_reads_rule_yaml(tmp_path):
    import csv
    import importlib.util
    d = tmp_path / "Published" / "CORE-000001"
    d.mkdir(parents=True)
    (d / "rule.yml").write_text(
        "Authorities:\n  - Organization: CDISC\n    Standards:\n      - Name: SDTMIG\n        Version: '3.4'\n        References:\n"
        "          - Rule Identifier: {Id: CG0176, Version: '1'}\n            Citations:\n              - {Cited Guidance: 'Only unmet criteria.', Document: 'IG v3.4'}\n"
        "Core: {Id: CORE-000001, Status: Published, Version: '1'}\nDescription: Raise an error when IECAT is INCLUSION but IEORRES is not N.\n"
        "Outcome: {Message: 'IECAT inclusion with IEORRES not N.'}\nExecutability: Fully Executable\n")
    (tmp_path / "Published" / "CORE-000002").mkdir()
    (tmp_path / "Published" / "CORE-000002" / "rule.yml").write_text(": not yaml: [")
    spec = importlib.util.spec_from_file_location("b", os.path.join(os.path.dirname(__file__), "scripts", "build_core_rules_reference.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    out = tmp_path / "out"
    mod.main(str(tmp_path), str(out))
    rows = list(csv.DictReader(open(out / "cdisc_core_published_rules_reference.csv")))
    assert len(rows) == 1 and rows[0]["rule_ids"] == "CG0176" and rows[0]["standard_version"] == "3.4" and "IEORRES" in rows[0]["description"]
    assert "MIT" in (out / "NOTICE.txt").read_text()
