import os, re, tempfile
os.environ["DATABASE_URL"] = "sqlite:///" + os.path.join(tempfile.mkdtemp(), "t.db")
import pytest
os.environ["ANTHROPIC_API_KEY"] = "test-key"
from fastapi.testclient import TestClient
import cot_generation as cg
import main

client = TestClient(main.app)
RAW = open(os.path.join(os.path.dirname(__file__), "eval", "fixtures", "ae_listing_spec.txt"), encoding="utf-8").read()


def section(name, nxt):
    m = re.search(rf"^{name}\n(.*?)(?=^{nxt}\n|\Z)", RAW, flags=re.S | re.M)
    return m.group(1).strip()


SPEC = {
    "reportId": "12_AE_Listing", "description": section("Description", "Output columns"),
    "columnHeading": section("Output columns", "Logic"), "logic": section("Logic", "Scenarios"),
    "reportScenarios": section("Scenarios", "Sorting"), "sorting": section("Sorting", "ZZZ") if "ZZZ" in RAW else RAW.split("Sorting\n")[1].strip(),
}
COLS = cg.spec_columns(SPEC)
NO_LOGIC = {"Merck patient #", "Inform Form Name", "AE Term", "PT", "Overall Toxicity Grade", "Outcome", "Serious Event (Y/N)",
            "Relationship to Treatment (Overall)", "Action taken with Study Tx (Overall)", "Relationship to Suspect Non-Study Tx",
            "Medically Important AE", "Admission Date", "Discharge Date", "Narrative", "Rechallenge (Overall)", "Dechallenge (Overall)"}


def sql_for(cols, with_case4, with_logic_cols):
    sel = []
    for c in cols:
        if c in ("Treatment related to AE", "Action Taken with each Study Tx") and not with_logic_cols:
            sel.append(f'NULL AS "{c}"')
        elif c == "Flag":
            f = "CASE WHEN a=1 THEN 'one' WHEN b=2 THEN 'two' ELSE NULL END" if not with_case4 else \
                "CASE WHEN a=1 THEN 'one' WHEN EXISTS (SELECT 1 FROM RM_AE o WHERE o.USUBJID=ae.USUBJID) THEN 'overlap' ELSE NULL END"
            sel.append(f'{f} AS "Flag"')
        else:
            sel.append(f'ae.X AS "{c}"')
    return "SELECT " + ", ".join(sel) + " FROM RM_AE ae"


def result_for(sql, include_case4, logic_cols_done):
    inv = []
    for i, c in enumerate(COLS, 1):
        ok = c in NO_LOGIC
        if not ok and c in ("Treatment related to AE", "Action Taken with each Study Tx") and not logic_cols_done:
            st, ev = "null_no_logic", ""
        elif ok:
            st, ev = "null_no_logic", ""
        else:
            st, ev = "implemented", f'AS "{c}"'
        inv.append({"id": f"COL-{i}", "kind": "column", "spec_text": f"{c}: " + ("no source or logic given" if ok else "logic"), "status": st, "code_evidence": ev})
    for n in (1, 2, 3) + ((4,) if include_case4 else ()):
        inv.append({"id": f"CASE-{n}", "kind": "case", "spec_text": f"Case {n}", "status": "implemented", "code_evidence": "CASE WHEN a=1"})
    return {"reasoning_steps": ["a", "b"], "inventory": inv, "assumptions": ["x"], "sql": sql, "explanation": "draft"}


def test_check_flags_the_gaps_found_in_the_real_run():
    r = result_for(sql_for(COLS, False, False), False, False)
    chk = cg.check(SPEC, r, "sql")
    text = " ".join(chk["gaps"])
    assert "Case 4" in text
    assert "Treatment related to AE" in text and "Action Taken with each Study Tx" in text
    # columns that legitimately have no logic are not reported
    assert "Narrative" not in text


def test_check_passes_a_complete_result():
    r = result_for(sql_for(COLS, True, True), True, True)
    assert cg.check(SPEC, r, "sql")["gaps"] == []


def test_invented_evidence_and_missing_column_are_caught():
    r = result_for(sql_for(COLS, True, True), True, True)
    r["sql"] = r["sql"].replace('AS "Narrative"', "AS nope")
    r["inventory"][5]["code_evidence"] = "THIS TEXT IS NOT IN THE CODE"
    gaps = " ".join(cg.check(SPEC, r, "sql")["gaps"])
    assert "Narrative" in gaps and "not in the code" in gaps


CLEAN_AUDIT = {"requirements": [{"id": "R1", "spec_text": "x", "present": True, "code_evidence": "SELECT"}]}
BODY = dict(SPEC, edcSystem="veeva", language="sql", specType="edc_cdm_listing")


def run(monkeypatch, gen_results, audits=None, opt_in=True, passes=4):
    """gen_results: successive generation results; audits: successive audit results (default clean)."""
    gens, auds, seen = list(gen_results), list(audits or []), {"gen": [], "audit": 0}
    if opt_in:
        monkeypatch.setattr(cg, "MAX_PASSES", passes)
        monkeypatch.setattr(cg, "AUDIT", True)

    def fake_call(system, user, tool, error_cls):
        if tool["name"] == "audit_coverage":
            seen["audit"] += 1
            return auds.pop(0) if auds else CLEAN_AUDIT
        seen["gen"].append(user)
        return gens.pop(0) if len(gens) > 1 else gens[0]

    monkeypatch.setattr(cg, "_call", fake_call)
    r = client.post("/api/generate?allow_unverified=true", json=BODY)
    assert r.status_code == 200, r.text
    return r.json(), seen


GAPPY = lambda: result_for(sql_for(COLS, False, False), False, False)
HALF = lambda: result_for(sql_for(COLS, True, False), True, False)
FULL = lambda: result_for(sql_for(COLS, True, True), True, True)


def test_one_repair_pass_through_the_live_app(monkeypatch):
    j, seen = run(monkeypatch, [GAPPY(), FULL()])
    assert len(seen["gen"]) == 2 and "PREVIOUS ATTEMPT" in seen["gen"][1] and "Case 4" in seen["gen"][1]
    assert "Treatment related to AE" in seen["gen"][1]
    assert j["coverage"]["complete"] is True and j["coverage"]["gaps"] == [] and j["coverage"]["passes"] == 2
    assert "COVERAGE CHECK" in j["explanation"] and j["inventory"] and j["reasoning"]


def test_it_keeps_going_until_nothing_is_missing(monkeypatch):
    j, seen = run(monkeypatch, [GAPPY(), HALF(), FULL()])
    assert len(seen["gen"]) == 3 and j["coverage"]["complete"] is True
    gh = j["coverage"]["gapHistory"]
    assert gh[0] > gh[1] > gh[2] == 0


def test_the_independent_audit_catches_a_part_the_static_check_cannot_see(monkeypatch):
    missing = {"requirements": [{"id": "CASE-2", "spec_text": "AEENDTC - AESTDTC >= 7 OR today - AESTDTC >= 7", "present": False,
                                 "problem": "the duration condition is not in the Flag CASE"}]}
    j, seen = run(monkeypatch, [FULL(), FULL()], audits=[missing, CLEAN_AUDIT])
    assert len(seen["gen"]) == 2 and "duration condition" in seen["gen"][1] and j["coverage"]["complete"] is True


def test_audit_claims_are_checked_against_the_code(monkeypatch):
    liar = {"requirements": [{"id": "R9", "spec_text": "something", "present": True, "code_evidence": "NOT ANYWHERE IN THE CODE"}]}
    j, _ = run(monkeypatch, [FULL()], audits=[liar, liar, liar, liar])
    assert not j["coverage"]["complete"] and any("not found in the code" in g for g in j["coverage"]["gaps"])


def test_it_gives_up_honestly_after_no_progress_and_reports_the_gaps(monkeypatch):
    j, seen = run(monkeypatch, [GAPPY()])
    assert j["coverage"]["complete"] is False and j["coverage"]["gaps"]
    assert "GAP(S) FOUND" in j["explanation"]
    assert len(seen["gen"]) == 3  # first try plus two repairs that did not improve, then stop


def test_the_pass_cap_is_a_hard_limit(monkeypatch):
    j, seen = run(monkeypatch, [GAPPY(), HALF(), FULL()], passes=2)
    assert len(seen["gen"]) == 2 and j["coverage"]["complete"] is False


def test_the_best_attempt_is_returned_not_the_last(monkeypatch):
    j, _ = run(monkeypatch, [HALF(), GAPPY(), GAPPY()])
    assert "overlap" in j["cql"]  # the half-complete version (it has Case 4) beat the worse retries


def test_audit_can_be_switched_off(monkeypatch):
    j, seen = run(monkeypatch, [FULL()], opt_in=False)
    assert seen["audit"] == 0 and j["coverage"]["auditRan"] is False and j["coverage"]["complete"] is True


def test_prompts_carry_the_method_and_the_date_override():
    import sql_agents, sas_agents, r_agents
    for p in (sql_agents.SQL_SYSTEM_PROMPT, sas_agents.SAS_SYSTEM_PROMPT, r_agents.R_SYSTEM_PROMPT):
        assert "STEP 1 INVENTORY" in p and "COMPLETENESS RULES" in p and "overrides the previous bullet" in p


def test_a_batch_item_with_open_gaps_needs_attention_but_keeps_its_code(monkeypatch):
    import time
    monkeypatch.setattr(cg, "_call", lambda system, user, tool, e: CLEAN_AUDIT if tool["name"] == "audit_coverage" else GAPPY())
    r = client.post("/api/batch", json={"name": "cov", "items": [{"name": "ae", "spec": BODY}],
                                        "options": {"language": "sql", "edcSystem": "veeva", "allowUnverified": True, "runReview": False,
                                                    "specType": "edc_cdm_listing"}})
    assert r.status_code == 200, r.text
    bid = r.json()["id"]
    end = time.time() + 30
    while time.time() < end:
        d = client.get(f"/api/batch/{bid}").json()
        if d["status"] != "running" and not d["active"]:
            break
        time.sleep(0.3)
    item = d["items"][0]
    assert item["status"] == "needs_attention" and item["hasCode"] and item["coverageComplete"] is False


def test_default_is_exactly_one_model_call_even_with_gaps(monkeypatch):
    j, seen = run(monkeypatch, [GAPPY(), FULL()], opt_in=False)
    assert len(seen["gen"]) == 1 and seen["audit"] == 0
    assert j["coverage"]["passes"] == 1 and j["coverage"]["complete"] is False  # reported by the free check, not re-run
    assert "Case 4" in " ".join(j["coverage"]["gaps"]) and "machine check" in j["explanation"]


def test_defaults_are_one_pass_and_no_audit():
    import importlib
    assert cg.MAX_PASSES == 1 and cg.AUDIT is False


def test_code_left_in_the_explanation_is_recovered_without_another_call(monkeypatch):
    r = FULL()
    code = r["sql"]
    r["sql"] = ""
    r["explanation"] = "Here it is:\n```sql\n" + code + "\n```"
    j, seen = run(monkeypatch, [r], opt_in=False)
    assert len(seen["gen"]) == 1 and j["cql"] == code.strip() and "recovered" in j["explanation"]


def test_low_credit_error_is_plain(monkeypatch):
    import anthropic

    class Boom:
        def __init__(self, **k): pass
        class messages:
            @staticmethod
            def stream(**k): raise Exception("Error code: 400 - Your credit balance is too low to access the Anthropic API")
    monkeypatch.setattr(cg.anthropic, "Anthropic", Boom)
    with pytest.raises(RuntimeError) as e:
        cg._call("s", "u", {"name": "t"}, RuntimeError)
    assert "credit balance is too low" in str(e.value) and "Add credits" in str(e.value)
