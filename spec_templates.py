"""
spec_templates.py — registry of known SPONSOR SPEC FORMATS.

Every spec this project has ever processed (ABC002_JR, SCI003_STD, all
the test/demo specs) uses the same shape: reportId, description,
columnHeading, logic, reportScenarios, sorting. That's ONE sponsor's
report-library convention (Merck/CDISC-style), not a universal standard
-- a different sponsor could reasonably use completely different field
names, a different structure, or split "logic" into several fields.

This registry exists so "support any sponsor" means "plug in a new,
verified template" rather than "assume the one format we've seen
generalizes." Same discipline as code_gen_registry.py's needs_precedent
gate: a template only becomes usable once there's a real example spec in
that format to build and test the field mapping against -- not before.
"""

from typing import Optional, TypedDict


class SpecTemplate(TypedDict):
    name: str
    status: str  # "verified" | "needs_example"
    fields: list  # field names this template expects, in the shape the sponsor actually uses
    content_fields: list  # subset of `fields` that carry the semantic content used for
    # review/generation/RAG matching (excludes purely structural fields like an ID or sort order)
    detail: str


TEMPLATES: dict = {
    "merck_cdisc_report_library": {
        "name": "merck_cdisc_report_library",
        "status": "verified",
        "fields": ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting"],
        "content_fields": ["description", "columnHeading", "logic", "reportScenarios"],
        "detail": (
            "The only format this project has real examples for (ABC002_JR, SCI003_STD, "
            "and every test/demo spec). Verified against actual generation and review runs."
        ),
    },
}


def get_template(name: str) -> Optional[SpecTemplate]:
    return TEMPLATES.get(name)


def is_supported(name: str) -> bool:
    template = TEMPLATES.get(name)
    return template is not None and template["status"] == "verified"


def register_template(name: str, fields: list, content_fields: list, detail: str) -> None:
    """Registers a NEW sponsor format. Deliberately requires the caller
    to supply real field names and a real detail string explaining what
    example spec grounds this -- there is no auto-detection or
    inference-from-a-sample path here. If you're calling this without a
    real example spec in hand to test the mapping against, you're doing
    exactly what this module exists to prevent."""
    TEMPLATES[name] = {
        "name": name,
        "status": "verified",
        "fields": fields,
        "content_fields": content_fields,
        "detail": detail,
    }
