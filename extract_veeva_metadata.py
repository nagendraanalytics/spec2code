"""
Veeva Vault EDC — Full Metadata Pull
Pulls: Study Design (CDE: forms/item groups/items) + Operational hierarchy
(Sites, Subjects, Events/Visits, Forms) and writes them all to CSV.

Requires: a Vault user with API Access + View Casebook + Restricted Data
Access (for CDE) roles.

Usage:
    python pull_edc_metadata.py

Config: edit the CONFIG block below, or set environment variables:
    VAULT_DNS, VAULT_USER, VAULT_PASS, STUDY_NAME
"""
import os
import csv
import json
import time
import requests

# ---------------- CONFIG ----------------
VAULT_DNS   = os.environ.get("VAULT_DNS",   "myvault.veevavault.com")
VAULT_USER  = os.environ.get("VAULT_USER",  "integration.user@yourcompany.com")
VAULT_PASS  = os.environ.get("VAULT_PASS",  "")
STUDY_NAME  = os.environ.get("STUDY_NAME",  "CMX-HF-301_DEV1")
API_VERSION = "v25.2"
OUT_DIR     = "edc_metadata_out"
# -----------------------------------------

BASE = f"https://{VAULT_DNS}/api/{API_VERSION}"


def auth():
    r = requests.post(f"{BASE}/auth", data={"username": VAULT_USER, "password": VAULT_PASS})
    r.raise_for_status()
    data = r.json()
    if data["responseStatus"] != "SUCCESS":
        raise RuntimeError(data)
    return data["sessionId"]


def get(session_id, path, params=None):
    r = requests.get(f"{BASE}{path}", headers={"Authorization": session_id}, params=params or {})
    r.raise_for_status()
    return r.json()


def paginate(session_id, path, params, list_key):
    """Generic paginator for EDC list endpoints."""
    out = []
    offset = 0
    limit = 1000
    while True:
        p = dict(params, limit=limit, offset=offset)
        data = get(session_id, path, p)
        items = data.get(list_key, [])
        out.extend(items)
        details = data.get("responseDetails", {})
        if "next_page" not in details:
            break
        offset += limit
    return out


def write_csv(rows, path, fieldnames=None):
    if not rows:
        print(f"  (no rows) {path}")
        return
    fieldnames = fieldnames or sorted({k for row in rows for k in row.keys()})
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        for row in rows:
            w.writerow(row)
    print(f"  wrote {len(rows)} rows -> {path}")


# ---------- 1. Operational hierarchy: Sites / Subjects / Events / Forms ----------

def pull_sites(session_id):
    sites = paginate(session_id, "/app/cdm/sites", {"study_name": STUDY_NAME}, "sites")
    write_csv(sites, f"{OUT_DIR}/site_level.csv")
    return sites


def pull_subjects(session_id):
    subjects = paginate(session_id, "/app/cdm/subjects", {"study_name": STUDY_NAME}, "subjects")
    write_csv(subjects, f"{OUT_DIR}/subject_level.csv")
    return subjects


def pull_events_and_forms(session_id, subjects):
    """Events (visits) + the Forms nested under each, flattened to two CSVs."""
    event_rows, form_rows = [], []
    for s in subjects:
        params = {
            "study_name": STUDY_NAME,
            "study_country": s.get("study_country"),
            "site": s.get("site"),
            "subject": s.get("subject"),
        }
        data = get(session_id, "/app/cdm/events", params)
        for ev in data.get("events", []):
            forms = ev.pop("forms", [])
            ev["subject"] = s.get("subject")
            ev["site"] = s.get("site")
            event_rows.append(ev)
            for fm in forms:
                fm["subject"] = s.get("subject")
                fm["site"] = s.get("site")
                fm["eventgroup_name"] = ev.get("eventgroup_name")
                fm["event_name"] = ev.get("event_name")
                form_rows.append(fm)
        time.sleep(0.05)  # stay well under burst limit
    write_csv(event_rows, f"{OUT_DIR}/visit_event_level.csv")
    write_csv(form_rows, f"{OUT_DIR}/form_instance_level.csv")


# ---------- 2. Study Design: Casebook Design Export (CDE) — forms/item groups/items ----------

def run_cde_job(session_id):
    r = requests.post(
        f"{BASE}/app/cdm/jobs",
        headers={"Authorization": session_id, "Content-Type": "application/json"},
        json={"study_name": STUDY_NAME, "job_type": "casebook_design_export_v"},
    )
    r.raise_for_status()
    data = r.json()
    return data["job_id"]  # adjust key if response shape differs


def poll_job(session_id, job_id):
    while True:
        time.sleep(10)
        data = get(session_id, f"/app/cdm/jobs/{job_id}")
        status = data.get("status") or data.get("job_status")
        print(f"  CDE job status: {status}")
        if status in ("COMPLETED", "SUCCESS", "completed__v"):
            return data
        if status in ("FAILED", "ERROR", "CANCELLED"):
            raise RuntimeError(f"CDE job failed: {data}")


def fetch_cde_output(session_id, job_id):
    r = requests.get(
        f"{BASE}/app/cdm/jobs/{job_id}/output",
        headers={"Authorization": session_id},
    )
    r.raise_for_status()
    return r.json()  # full study design JSON: event groups -> events -> forms -> item groups -> items


def flatten_cde(cde_json):
    """Flatten CDE JSON into form-definition and item-definition rows."""
    form_rows, item_rows = [], []
    for eg in cde_json.get("event_groups", []):
        for ev in eg.get("events", []):
            for fm in ev.get("forms", []):
                form_rows.append({
                    "eventgroup_name": eg.get("name"),
                    "event_name": ev.get("name"),
                    "form_name": fm.get("name"),
                    "form_label": fm.get("label"),
                    "repeating": fm.get("repeating"),
                    "common_form": fm.get("is_common_form") or fm.get("common"),
                })
                for ig in fm.get("item_groups", []):
                    for item in ig.get("items", []):
                        item_rows.append({
                            "form_name": fm.get("name"),
                            "item_group_name": ig.get("name"),
                            "item_name": item.get("name"),
                            "item_label": item.get("label"),
                            "data_type": item.get("data_type") or item.get("type"),
                            "codelist": item.get("codelist_name"),
                            "required": item.get("required"),
                        })
    return form_rows, item_rows


def main():
    print("Authenticating...")
    session_id = auth()

    print("Pulling sites...")
    sites = pull_sites(session_id)

    print("Pulling subjects...")
    subjects = pull_subjects(session_id)

    print("Pulling events (visits) + forms per subject...")
    pull_events_and_forms(session_id, subjects)

    print("Running Casebook Design Export (CDE) job for full form/item schema...")
    job_id = run_cde_job(session_id)
    poll_job(session_id, job_id)
    cde_json = fetch_cde_output(session_id, job_id)
    with open(f"{OUT_DIR}/casebook_design_export.json", "w") as f:
        json.dump(cde_json, f, indent=2)

    form_defs, item_defs = flatten_cde(cde_json)
    write_csv(form_defs, f"{OUT_DIR}/form_definitions.csv")
    write_csv(item_defs, f"{OUT_DIR}/item_definitions.csv")

    print("Done. Files in", OUT_DIR)


if __name__ == "__main__":
    main()