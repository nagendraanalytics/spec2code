"""Load the per-EDC reference summaries in reference_sources/ as DRAFT EDC guides.

  python scripts/import_edc_references.py --tenant default [--dry-run]

Each file becomes one source of type EDC guide, scoped to its EDC system id, so it is used only for runs on that EDC.
Everything is stored as a draft. A programmer reads each file, checks it against the vendor's current documentation,
and approves it in the Review queue. Re-running is safe: a file already stored is reported as a duplicate.
"""
import argparse
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, ROOT)

REFS = [
    ("veeva_cdb_reference.md", "veeva", "Veeva CDB and CQL reference (draft summary)"),
    ("redcap_reference.md", "redcap", "REDCap logic and data dictionary reference (draft summary)"),
    ("oracle_clinical_one_reference.md", "oracle_clinical_one", "Oracle Clinical One custom rules reference (draft summary)"),
    ("medidata_rave_reference.md", "rave", "Medidata Rave data access reference (draft, thin)"),
    ("openclinica_reference.md", "openclinica", "OpenClinica reference (draft, thin)"),
    ("medrio_reference.md", "medrio", "Medrio features reference (draft, thin)"),
    ("castor_reference.md", "castor", "Castor EDC reference (draft, thin)"),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default="default")
    ap.add_argument("--created-by", default="edc-references")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    folder = os.path.join(ROOT, "reference_sources")
    if a.dry_run:
        for fn, edc, title in REFS:
            print(f"would store   {edc:<20} {os.path.getsize(os.path.join(folder, fn)):>6} bytes  {title}")
        return
    import db
    import knowledge_ingest as ki
    import knowledge_store as ks
    import edc_registry
    db.init_db()
    s = db.SessionLocal()
    stored = dup = bad = 0
    for fn, edc, title in REFS:
        if not edc_registry.is_known(edc):
            print(f"FAILED        {title}: unknown EDC id {edc}")
            bad += 1
            continue
        try:
            r = ks.add_source(s, a.tenant, fn, open(os.path.join(folder, fn), "rb").read(), scope="global", scope_ref=edc,
                              doc_type="edc_guide", title=title,
                              license_note="Summary written for Spec2Code from public vendor or third-party pages. Not verified by a CDM programmer.",
                              created_by=a.created_by)
            dup += bool(r["duplicate"])
            stored += not r["duplicate"]
            print(f"{'duplicate' if r['duplicate'] else 'stored draft':<13} {edc:<20} {title}  ({r.get('chunks', '')} chunks)")
        except (ki.KnowledgeError, ks.KbError) as e:
            bad += 1
            print(f"FAILED        {title}: {e}")
    print(f"\n{stored} stored as drafts, {dup} duplicates, {bad} failed. Approve them in the Review queue after reading.")


if __name__ == "__main__":
    main()
