"""
edc_registry.py — the EDC systems the platform knows about.

Honest scope: today only Veeva Vault CDMS has generation that was checked
against real specs and code. For every other system the platform can produce
an UNVERIFIED DRAFT (SQL, SAS or R) when -- and only when -- that study's
metadata has been loaded, because then the generator names real forms and
items from the study instead of guessing a naming convention. Without loaded
metadata those cells stay blocked. One confirmed (spec, correct code) pair
from a system is what would promote it, exactly as in code_gen_registry.py.

`export_hint` describes the metadata export that system usually offers, so
the loader screen can say what to upload. NO real export from these systems
has been tested here yet: the loader matches columns by name and says so.
"""

from __future__ import annotations

from typing import Optional

# Languages that have an unverified generator (see generation_router.py).
GROUNDED_LANGUAGES = ("sql", "sas", "r")

EDC_SYSTEMS: list = [
    {"id": "veeva", "label": "Veeva Vault CDMS", "vendor": "Veeva",
     "export_hint": "Study metadata export with form, item, label and data type columns."},
    {"id": "rave", "label": "Medidata Rave", "vendor": "Medidata",
     "export_hint": "Architect loader spreadsheet (forms and fields sheets) or a forms and fields export."},
    {"id": "oracle_clinical_one", "label": "Oracle Clinical One", "vendor": "Oracle",
     "export_hint": "Study design export of forms and items. Layout not yet confirmed."},
    {"id": "openclinica", "label": "OpenClinica", "vendor": "OpenClinica",
     "export_hint": "CRF template spreadsheet (items sheet) or a study metadata export."},
    {"id": "castor", "label": "Castor EDC", "vendor": "Castor",
     "export_hint": "Study structure export (Excel). Layout not yet confirmed."},
    {"id": "medrio", "label": "Medrio", "vendor": "Medrio",
     "export_hint": "Form and field design export. Layout not yet confirmed."},
    {"id": "viedoc", "label": "Viedoc", "vendor": "Viedoc",
     "export_hint": "Study design export of forms and fields. Layout not yet confirmed."},
    {"id": "redcap", "label": "REDCap", "vendor": "Vanderbilt University",
     "export_hint": "Data dictionary CSV (Variable / Field Name, Form Name, Field Label, Field Type)."},
    {"id": "trialmaster", "label": "TrialMaster", "vendor": "Anju Software (formerly OmniComm)",
     "export_hint": "Form and item definition export. Layout not yet confirmed."},
    {"id": "xclinical_marvin", "label": "Marvin (XClinical)", "vendor": "XClinical",
     "export_hint": "Study design or ODM metadata export. Layout not yet confirmed."},
]

_BY_ID = {e["id"]: e for e in EDC_SYSTEMS}
DEFAULT_EDC = "veeva"


def get(edc_id: str) -> Optional[dict]:
    return _BY_ID.get(edc_id)


def is_known(edc_id: str) -> bool:
    return edc_id in _BY_ID


def label(edc_id: str) -> str:
    return _BY_ID.get(edc_id, {}).get("label", edc_id)


def list_public() -> list:
    return [dict(e) for e in EDC_SYSTEMS]


def context_block(edc_id: str, metadata_block: str) -> str:
    """Prompt text appended to a beta generator's user prompt. Gives the
    study's real names when metadata is loaded, and for a non-Veeva system
    says plainly that the RM_<DOMAIN> convention in the system prompt is
    Veeva-specific and must not be used."""
    if not metadata_block and edc_id == DEFAULT_EDC:
        return ""
    lines = [f"\nTARGET EDC SYSTEM: {label(edc_id)}"]
    if edc_id != DEFAULT_EDC:
        lines.append(
            "The RM_<DOMAIN> table and variable naming described above is specific to Veeva and does NOT apply "
            "to this system. Use the form and item names from the study metadata below exactly as written "
            "(a form is a table or dataset, an item is a column or variable). Do not invent names that are not listed. "
            "In the explanation, say which names came from the metadata and which you had to assume."
        )
    if metadata_block:
        lines.append(metadata_block)
    elif edc_id != DEFAULT_EDC:
        lines.append("No study metadata is available, so every table and column name is an assumption.")
    return "\n".join(lines) + "\n"
