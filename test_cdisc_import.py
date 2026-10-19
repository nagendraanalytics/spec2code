"""CDISC file-name rules and the folder/zip importer."""
import csv
import importlib.util
import os
import subprocess
import sys
import tempfile
import zipfile

import cdisc_files

ROOT = os.path.dirname(os.path.abspath(__file__))
REAL = {
    "SDTMIG v3.4-FINAL_2022-07-21.pdf": ("global", "", "SDTMIG 3.4"), "SDTMIG_v3.2.pdf": ("global", "", "SDTMIG 3.2"),
    "ADaMIG v1.2-Final.pdf": ("global", "", "ADaMIG 1.2"), "CDASH_SAE_Supplement_v2.0_0.pdf": ("global", "", "CDASH SAE Supplement 2.0"),
    "TAUG-LuCa_v1.0.pdf": ("ta", "Oncology", "TAUG-Lung Cancer 1.0"), "taug-diabetes-adam-supplement.pdf": ("ta", "Diabetes", "TAUG-Diabetes ADaM Supplement 1.0"),
    "taug-diabetesv101.pdf": ("ta", "Diabetes", "TAUG-Diabetes 1.0"), "TAUG-Pancreatic_Cancer_v1.0.pdf": ("ta", "Oncology", "TAUG-Pancreatic Cancer 1.0"),
    "CDISC_TAUG_HF_v1.0.pdf": ("ta", "Cardiovascular", "TAUG-Heart Failure 1.0"), "TAUG-TCM_CAD-Angina_v1.0 (1).pdf": ("ta", "Cardiovascular", "TAUG-TCM CAD Angina 1.0"),
    "TAUG-TCM-Acupuncture_v1.0.pdf": ("ta", "Traditional Chinese Medicine", "TAUG-TCM Acupuncture 1.0"), "taugasthmav10single.pdf": ("ta", "Respiratory", "TAUG-Asthma 1.0"),
    "T1D_TAUG_v1.0_Screening_Staging_Monitoring_for_Pre-Clinical_T1D_Modules (1).pdf": ("ta", "Diabetes", "TAUG-T1D Screening 1.0"),
    "Colorectal Cancer Therapeutic Area User Guide v1.0 _ CDISC.html": ("ta", "Oncology", "TAUG-Colorectal Cancer 1.0"),
}


def test_real_file_names_map_to_the_right_scope_area_and_version():
    for name, (scope, ref, ver) in REAL.items():
        got = cdisc_files.identify(name)
        assert got and (got[1], got[2], got[3]) == (scope, ref, ver), name


def test_rules_are_unambiguous_and_unknown_names_are_not_guessed():
    assert cdisc_files.identify("quarterly_budget.pdf") is None
    for _, _, scope, ref, ver in [(r[0], r[1], r[2], r[3], r[4]) for r in cdisc_files.RULES]:
        assert scope in ("global", "ta") and (ref != "") == (scope == "ta") and ver
    # a TAUG file must never be taken for a foundational standard
    assert cdisc_files.identify("taug-diabetes-adam-supplement.pdf")[1] == "ta"


def _make_zip(path):
    with zipfile.ZipFile(path, "w") as z:
        z.writestr("pack/SDTMIG_v3.3_FINAL.txt", "DM domain. RFSTDTC is the subject reference start date. " * 30)
        z.writestr("pack/TAUG-Pain_v1.1.txt", "Pain intensity numeric rating scale assessments. " * 30)
        z.writestr("pack/TAUG-Pain_v1.1 (1).txt", "Pain intensity numeric rating scale assessments. " * 30)  # exact duplicate
        z.writestr("pack/notes.txt", "Some local notes about our own process. " * 20)
        z.writestr("pack/Page_files/site.css", "body{}")
        z.writestr("pack/logo.png", "x")
        z.writestr("../evil.txt", "no")


def _run(args, env):
    return subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "import_knowledge_folder.py"), *args], capture_output=True, text=True, env={**os.environ, **env}, cwd=ROOT)


def test_importer_loads_zip_as_drafts_skips_junk_and_unsafe_flags_unknown_and_is_rerunnable(tmp_path):
    z = tmp_path / "k.zip"
    _make_zip(z)
    env = {"DATABASE_URL": f"sqlite:///{tmp_path}/imp.db", "SPEC2CODE_KB_DIR": str(tmp_path / "kb"), "ANTHROPIC_API_KEY": "x"}
    man = tmp_path / "m.csv"
    r = _run([str(z), "--tenant", "t1", "--manifest", str(man)], env)
    assert r.returncode == 0, r.stderr
    rows = {x["file"]: x for x in csv.DictReader(open(man))}
    assert set(rows) == {"SDTMIG_v3.3_FINAL.txt", "TAUG-Pain_v1.1.txt", "TAUG-Pain_v1.1 (1).txt", "notes.txt"}  # css, png, ../evil skipped
    assert rows["SDTMIG_v3.3_FINAL.txt"]["result"] == "stored draft" and rows["SDTMIG_v3.3_FINAL.txt"]["scope"] == "global"
    assert rows["TAUG-Pain_v1.1.txt"]["scopeRef"] == "Pain"
    assert sorted([rows["TAUG-Pain_v1.1.txt"]["result"], rows["TAUG-Pain_v1.1 (1).txt"]["result"]]) == ["duplicate", "stored draft"]  # identical content is stored once
    assert rows["notes.txt"]["recognised"].startswith("NO") and rows["notes.txt"]["scope"] == "global"
    again = _run([str(z), "--tenant", "t1", "--manifest", str(man)], env)
    assert "0 stored, 4 duplicates" in again.stdout, again.stdout[-200:]
    # a different tenant gets its own copy
    other = _run([str(z), "--tenant", "t2", "--manifest", str(man)], env)
    assert "3 stored, 1 duplicates" in other.stdout


def test_importer_dry_run_writes_nothing_and_overrides_apply(tmp_path):
    z = tmp_path / "k.zip"
    _make_zip(z)
    env = {"DATABASE_URL": f"sqlite:///{tmp_path}/imp.db", "SPEC2CODE_KB_DIR": str(tmp_path / "kb"), "ANTHROPIC_API_KEY": "x"}
    man = tmp_path / "m.csv"
    r = _run([str(z), "--dry-run", "--manifest", str(man)], env)
    assert r.returncode == 0 and not (tmp_path / "imp.db").exists()
    rows = list(csv.DictReader(open(man)))
    for x in rows:
        if x["file"] == "TAUG-Pain_v1.1.txt":
            x["scopeRef"] = "Analgesia"
    ov = tmp_path / "ov.csv"
    with open(ov, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    out = tmp_path / "m2.csv"
    r = _run([str(z), "--overrides", str(ov), "--manifest", str(out), "--approve-as", "jane"], env)
    assert r.returncode == 0, r.stderr
    m2 = {x["file"]: x for x in csv.DictReader(open(out))}
    assert m2["TAUG-Pain_v1.1.txt"]["scopeRef"] == "Analgesia" and m2["TAUG-Pain_v1.1.txt"]["result"] == "stored and approved"
