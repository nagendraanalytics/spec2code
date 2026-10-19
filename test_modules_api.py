"""Tests for the spec-type / output-language API and the removal of SAS
migration. Claude is never called: the one generation test swaps the SQL
agent for a stub and checks that the spec type's domain guidance reaches
the prompt."""

import os
import tempfile

os.environ["DATABASE_URL"] = f"sqlite:///{tempfile.mkdtemp()}/test.db"
os.environ["ANTHROPIC_API_KEY"] = "test-key"

from fastapi.testclient import TestClient  # noqa: E402

import clinical_modules  # noqa: E402
import sql_agents  # noqa: E402
import main  # noqa: E402

client = TestClient(main.app)


def test_health_never_exposes_the_key():
    body = client.get("/api/health").json()
    assert body == {"status": "ok", "modelKeyConfigured": True}


def test_modules_listed_with_honest_status():
    modules = {m["id"]: m for m in client.get("/api/modules").json()["modules"]}
    assert set(modules) == set(clinical_modules.MODULES)
    assert modules["edc_cdm_listing"]["status"] == "verified"
    assert all(m["status"] == "template" for k, m in modules.items() if k != "edc_cdm_listing")
    assert all("guidance" not in m for m in modules.values())


def test_targets_match_registry_and_mark_coverage():
    cells = {(t["edcSystem"], t["language"]): t for t in client.get("/api/targets").json()["targets"]}
    assert cells[("veeva", "cql")]["coverage"] == "full"
    assert cells[("veeva", "python")]["coverage"] == "rules_only"
    for lang in ("sql", "sas", "r"):
        assert cells[("veeva", lang)]["coverage"] == "draft"
        assert cells[("veeva", lang)]["optInRequired"] is True
    assert cells[("rave", "sql")]["coverage"] == "none"


def test_sas_migration_endpoint_is_gone():
    assert client.post("/api/migrate-sas", json={"sasCode": "data a; run;"}).status_code in (404, 405)


def test_unknown_spec_type_rejected():
    r = client.post("/api/generate", json={"reportId": "X", "description": "d", "specType": "nope"})
    assert r.status_code == 400 and "Unknown spec type" in r.json()["error"]


def test_beta_language_needs_opt_in():
    r = client.post("/api/generate", json={"reportId": "X", "description": "d", "language": "sql"})
    assert r.status_code == 400 and "UNVERIFIED BETA" in r.json()["error"]


def test_module_guidance_reaches_beta_prompt(monkeypatch):
    seen = {}

    def fake(spec):
        seen["prompt"] = sql_agents.build_sql_user_prompt(spec)
        return {"sql": "select 1", "explanation": "UNVERIFIED"}

    monkeypatch.setattr(sql_agents, "run_sql_generation", fake)
    r = client.post(
        "/api/generate?allow_unverified=true",
        json={"reportId": "S1", "description": "d", "language": "sql", "specType": "safety_monitoring"},
    )
    assert r.status_code == 200 and r.json()["isBeta"] is True
    assert "SPEC TYPE: Safety monitoring" in seen["prompt"]
    assert "NOT been verified" in seen["prompt"]


def test_taxonomy_is_wide_and_well_formed():
    modules = {m["id"]: m for m in client.get("/api/modules").json()["modules"]}
    assert len(modules) >= 9
    total = 0
    for m in modules.values():
        ids = [t["id"] for t in m["listing_types"]]
        assert ids and len(ids) == len(set(ids)), m["id"]
        assert all(set(t) == {"id", "label", "summary"} for t in m["listing_types"])  # guidance stays server-side
        total += len(ids)
    assert total >= 70
    # families the analysis needs beyond EDC/CDM listings
    assert {"external_reconciliation", "efficacy_outcomes", "trial_operations", "regulatory_safety", "pharmacovigilance"} <= set(modules)
    assert "e3_demographics" in [t["id"] for t in modules["adam_listing"]["listing_types"]]


def test_listing_type_guidance_reaches_the_prompt_and_is_validated():
    block = clinical_modules.prompt_block({"specType": "safety_monitoring", "listingType": "teae"})
    assert "Treatment-emergent adverse events" in block and "within a stated window" not in block.split("LISTING TYPE")[0]
    assert "LISTING TYPE" not in clinical_modules.prompt_block({"specType": "safety_monitoring"})
    assert "LISTING TYPE" not in clinical_modules.prompt_block({"specType": "safety_monitoring", "listingType": "nope"})
    bad = client.post("/api/generate", json={"reportId": "X", "description": "d", "specType": "safety_monitoring", "listingType": "nope"})
    assert bad.status_code == 400 and "Unknown listing type" in bad.json()["error"]
    # a listing type belongs to one family only
    bad2 = client.post("/api/generate", json={"reportId": "X", "description": "d", "specType": "data_review", "listingType": "teae"})
    assert bad2.status_code == 400
    assert client.post("/api/batch", json={"items": [{"spec": {"reportId": "A", "description": "d"}}],
                                           "options": {"specType": "data_review", "listingType": "teae"}}).status_code == 400


def test_pharmacovigilance_family_is_present_and_guarded():
    pv = {m["id"]: m for m in client.get("/api/modules").json()["modules"]}["pharmacovigilance"]
    assert pv["status"] == "template" and len(pv["listing_types"]) >= 15
    block = clinical_modules.prompt_block({"specType": "pharmacovigilance", "listingType": "case_timeliness"})
    assert "Never decide causality" in block and "time limit" in block
