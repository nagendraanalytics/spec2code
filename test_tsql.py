import os, tempfile
os.environ["DATABASE_URL"] = "sqlite:///" + os.path.join(tempfile.mkdtemp(), "t.db")
os.environ["ANTHROPIC_API_KEY"] = "test-key"
from fastapi.testclient import TestClient
import cot_generation as cg
import tsql_agents as ta
import main

client = TestClient(main.app)
SPEC = {"reportId": "12_AE-Listing", "description": "AE listing", "columnHeading": "1. Subject\n2. AE Term",
        "logic": "Subject = SRDM.DM.USUBJID\nAE Term = SDTM.AE.AETERM", "reportScenarios": "", "sorting": "Subject",
        "edcSystem": "elluminate", "language": "tsql", "specType": "edc_cdm_listing"}


def fake_result(sql):
    inv = [{"id": "COL-1", "kind": "column", "spec_text": "Subject = SRDM.DM.USUBJID", "status": "implemented", "code_evidence": 'AS [Subject]'},
           {"id": "COL-2", "kind": "column", "spec_text": "AE Term = SDTM.AE.AETERM", "status": "implemented", "code_evidence": 'AS [AE Term]'}]
    return {"reasoning_steps": ["x"], "inventory": inv, "assumptions": [], "tsql": sql, "explanation": "draft"}


SQL = "-- NAME: [dbo].[12_AE_Listing]\nCREATE OR ALTER VIEW [dbo].[12_AE_Listing] AS SELECT dm.USUBJID AS [Subject], ae.AETERM AS [AE Term] FROM [SRDM].[DM] dm JOIN [SDTM].[AE] ae ON ae.USUBJID = dm.USUBJID"


def test_targets_list_tsql_and_elluminate_as_unverified_beta():
    t = client.get("/api/targets").json()["targets"]
    cell = [x for x in t if x["edcSystem"] == "elluminate" and x["language"] == "tsql"][0]
    assert cell["status"] == "unverified_beta" and cell["optInRequired"] and cell["languageLabel"] == "T-SQL"
    assert [x for x in t if x["edcSystem"] == "veeva" and x["language"] == "tsql"][0]["optInRequired"]
    assert not [x for x in t if x["edcSystem"] == "elluminate" and x["language"] == "cql"][0]["available"]


def test_generation_is_opt_in_and_returns_the_object(monkeypatch):
    seen = {}

    def fake(system, user, tool, e):
        seen["system"], seen["user"], seen["tool"] = system, user, tool["name"]
        return fake_result(SQL)

    monkeypatch.setattr(cg, "_call", fake)
    assert client.post("/api/generate", json=SPEC).status_code == 400  # not allowed without opt-in
    r = client.post("/api/generate?allow_unverified=true", json=dict(SPEC, objectType="function"))
    assert r.status_code == 200, r.text
    j = r.json()
    assert j["isBeta"] is True and "CREATE OR ALTER VIEW" in j["cql"]
    assert seen["tool"] == "submit_tsql" and "Object type requested: function" in seen["user"]
    assert "SQL Server 2008" in seen["system"] and "-- NAME:" in seen["system"] and "CONSERVATIVE" in seen["system"] and "STEP 1 INVENTORY" in seen["system"]
    assert j["coverage"]["complete"] is True


def test_object_type_defaults_and_is_validated():
    assert ta.normalize_object_type("") == "view" and ta.normalize_object_type("PROCEDURE") == "procedure"
    assert ta.normalize_object_type("nonsense") == "view"
    assert "Object type requested: view" in ta.build_tsql_user_prompt({"reportId": "r"})


def test_other_systems_get_tsql_only_as_a_metadata_grounded_draft():
    t = client.get("/api/targets").json()["targets"]
    cell = [x for x in t if x["edcSystem"] == "rave" and x["language"] == "tsql"][0]
    assert not cell["available"] and not cell["optInRequired"]  # no metadata loaded, so blocked like SQL


def test_batch_passes_the_object_type_through(monkeypatch):
    import time
    seen = []

    def fake(system, user, tool, e):
        seen.append(user)
        return fake_result(SQL)

    monkeypatch.setattr(cg, "_call", fake)
    r = client.post("/api/batch", json={"name": "t", "items": [{"name": "a", "spec": SPEC}],
                                        "options": {"language": "tsql", "edcSystem": "elluminate", "allowUnverified": True,
                                                    "runReview": False, "specType": "edc_cdm_listing", "objectType": "procedure"}})
    assert r.status_code == 200, r.text
    bid = r.json()["id"]
    end = time.time() + 30
    while time.time() < end:
        d = client.get(f"/api/batch/{bid}").json()
        if d["status"] != "running" and not d["active"]:
            break
        time.sleep(0.2)
    assert d["items"][0]["status"] == "done" and "Object type requested: procedure" in seen[0]


def test_elluminate_is_a_known_system_with_a_reference_file():
    import edc_registry
    assert edc_registry.is_known("elluminate")
    assert os.path.exists(os.path.join(os.path.dirname(__file__), "reference_sources", "elluminate_tsql_reference.md"))


# ---------------------------------------------------------------- the five problems reported in Elluminate

BAD = """CREATE OR ALTER VIEW [dbo].[v] AS
SELECT a.X || a.Y AS [c1], CURRENT_DATE AS [c2], SYSDATE AS [c3], CAST(a.D AS DATE) AS [c4], SUBSTR(a.D,1,10) AS [c5]
FROM [SDTM].[AE] a ORDER BY a.USUBJID"""
GOOD = """-- NAME: [dbo].[v]
CREATE OR ALTER VIEW [dbo].[v] AS
SELECT ISNULL(a.X,'') + ' ' + ISNULL(a.Y,'') AS [c1], GETDATE() AS [c2], LEFT(a.D,10) AS [c4],
  DATEDIFF(day, sd.StartDt, GETDATE()) AS [days],
  ROW_NUMBER() OVER (PARTITION BY a.USUBJID ORDER BY a.AESEQ) AS [rn]
FROM [SDTM].[AE] a
OUTER APPLY (SELECT CASE WHEN LEN(a.D) >= 10 AND ISDATE(REPLACE(LEFT(a.D,10),'-','')) = 1 THEN CONVERT(datetime, REPLACE(LEFT(a.D,10),'-',''), 112) END AS StartDt) sd
-- SORT BY: USUBJID, AESEQ"""


def test_lint_catches_each_reported_problem():
    g = " | ".join(ta.lint(BAD, "view"))
    assert "||" in g and "CURRENT_DATE" in g and "SYSDATE" in g and "DATE" in g and "SUBSTR" in g and "ORDER BY" in g
    assert len(ta.lint(BAD, "view")) >= 6


def test_lint_passes_the_conservative_pattern_and_ignores_strings_comments_and_window_order_by():
    assert ta.lint(GOOD, "view") == []
    assert ta.lint("SELECT '||' AS x -- uses || and SYSDATE in a comment\nFROM [t]", "query") == []


def test_order_by_is_fine_in_a_procedure_and_modern_mode_allows_newer_syntax():
    proc = "CREATE OR ALTER PROCEDURE [dbo].[p] AS BEGIN SELECT 1 AS a FROM [t] ORDER BY a END"
    assert ta.lint(proc, "procedure") == []
    modern = "SELECT TRY_CONVERT(date, LEFT(d,10)) AS a, STRING_AGG(x, ',') AS b, CAST(GETDATE() AS date) AS c FROM [t] ORDER BY a OFFSET 0 ROWS"
    assert ta.lint(modern, "view", "modern") == []
    assert any("TRY_CONVERT" in g for g in ta.lint(modern, "view", "conservative"))
    assert any("||" in g for g in ta.lint("SELECT a || b FROM t", "query", "modern"))  # never allowed


def test_prompts_differ_by_mode_and_always_ban_oracle_syntax():
    c, m = ta.build_system_prompt("conservative"), ta.build_system_prompt("modern")
    for p in (c, m):
        assert "CURRENT_DATE" in p and "SYSDATE" in p and "the || operator" in p and "-- NAME:" in p
    assert "ISDATE" in c and "do NOT write ORDER BY" in c and "STRING_AGG" in m and "TRY_CONVERT(date" in m
    assert ta.normalize_compat("???") == "conservative" and ta.normalize_compat("Modern") == "modern"


def test_lint_gaps_reach_the_user_and_mark_the_batch_item(monkeypatch):
    monkeypatch.setattr(cg, "_call", lambda s, u, t, e: fake_result(BAD.replace("[c1]", "[Subject]").replace("[c2]", "[AE Term]")))
    j = client.post("/api/generate?allow_unverified=true", json=SPEC).json()
    assert j["coverage"]["complete"] is False
    assert any("CURRENT_DATE" in g for g in j["coverage"]["gaps"]) and "machine check" in j["explanation"]


def test_compat_mode_reaches_the_prompt(monkeypatch):
    seen = {}

    def fake(system, user, tool, e):
        seen["s"], seen["u"] = system, user
        return fake_result(SQL)

    monkeypatch.setattr(cg, "_call", fake)
    client.post("/api/generate?allow_unverified=true", json=dict(SPEC, tsqlCompat="modern"))
    assert "COMPATIBILITY MODE: MODERN" in seen["s"] and "Compatibility mode: modern" in seen["u"]


def test_generic_sql_is_not_offered_for_elluminate_even_with_metadata():
    t = client.get("/api/targets?studyId=NOPE").json()["targets"]
    cell = [x for x in t if x["edcSystem"] == "elluminate" and x["language"] == "sql"][0]
    assert not cell["available"] and not cell["optInRequired"] and "T-SQL" in cell["detail"]
    import generation_router as gr
    assert gr.grounded_draft_possible("elluminate", "sql", True) is False
    assert gr.grounded_draft_possible("elluminate", "tsql", True) is True
