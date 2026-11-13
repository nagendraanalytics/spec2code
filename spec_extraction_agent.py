"""
spec_extraction_agent.py — extracts structured CDM report spec fields
(reportId, description, columnHeading, logic, reportScenarios, sorting)
from RAW, UNSTRUCTURED spec text -- e.g. something copy-pasted out of a
Word document, a PDF, or literally Notepad, where the fields aren't
already split apart the way the existing form/API expects.

Same tool-forced pattern as every other agent in this project
(cql_agents.py, spec_review_agents.py): the model fills a schema, it
doesn't write free text we then have to parse. Grounding rule: if a
field genuinely isn't present in the raw text, the extraction leaves it
EMPTY rather than inventing plausible-sounding content -- an empty field
the human can fill in is honest; a fabricated one that looks plausible
is a worse outcome than making them type it themselves.
"""

from typing import Optional

import llm_client

EXTRACTION_SYSTEM_PROMPT = """You extract structured fields from raw, unstructured \
CDM (clinical data management) report specification text. The source \
text might be copy-pasted from a Word document, a PDF, an email, or \
plain notes -- it will NOT already be neatly split into labeled fields, \
and its structure/wording will vary a lot between authors.

Extract exactly these fields:
- reportId: a short identifier/code for the report, if one is stated \
(e.g. "ABC002_JR", "AE Overlap Report v2"). If no ID-like token appears, \
leave this empty -- do not invent one.
- description: what the report identifies/is for, in the author's own \
words if possible.
- columnHeading: the output columns/fields the report should display, \
if listed (often numbered or bulleted in the source text).
- logic: the rule/condition that determines what data appears in the \
report -- this is usually the longest, most detail-dense part of the \
source text.
- reportScenarios: any described test scenarios or YES/NO cases the \
report should handle, if present.
- sorting: any stated sort order for the output, if present.

Rules:
- Extract, don't summarize-and-lose-detail -- logic and reportScenarios \
especially should preserve the source text's actual conditions, not a \
shortened paraphrase that drops a qualifier.
- If a field has no corresponding content anywhere in the source text, \
return an empty string for it. An empty field is honest; inventing \
plausible-sounding content is not -- this matters especially for \
reportId and sorting, which are easy to guess wrong confidently.
- If the source text is ambiguous about which sentence belongs to which \
field (e.g. it's not clear whether a sentence is part of the \
description or the logic), use your best judgment but note the \
ambiguity in "extraction_notes" rather than silently picking one.
- Do not add information that isn't in the source text, even if it seems \
like an obvious thing a report like this would need.

Use the submit_extracted_spec tool."""

EXTRACTION_TOOL = {
    "name": "submit_extracted_spec",
    "description": "Submit the structured fields extracted from raw spec text.",
    "input_schema": {
        "type": "object",
        "properties": {
            "reportId": {"type": "string"},
            "description": {"type": "string"},
            "columnHeading": {"type": "string"},
            "logic": {"type": "string"},
            "reportScenarios": {"type": "string"},
            "sorting": {"type": "string"},
            "extraction_notes": {
                "type": "string",
                "description": "Any ambiguity in how the raw text was split into fields, or fields that were left empty because nothing in the source text corresponded to them. Empty string if extraction was unambiguous.",
            },
        },
        "required": ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting", "extraction_notes"],
    },
}


class AgentError(Exception):
    pass


def run_spec_extraction(raw_text: str) -> dict:
    """Returns the extracted field dict (same shape as ReportSpec, plus
    extraction_notes). Raises AgentError on failure -- never returns a
    partial/garbage result silently."""
    if not llm_client.available():
        raise AgentError(llm_client.not_configured_message())
    if not raw_text or not raw_text.strip():
        raise AgentError("No text provided to extract from.")

    # max_tokens 16000 (bumped from 8000): thinking shares this budget with the response on models with adaptive
    # thinking, and "extract, don't summarize" can mean reproducing close to the full source text plus JSON escaping
    # overhead -- a real "response was cut off" report on a complex spec came from exactly this.
    try:
        res = llm_client.call_tool(system=EXTRACTION_SYSTEM_PROMPT, user=f"RAW SPEC TEXT:\n\n{raw_text}",
                                   tool=EXTRACTION_TOOL, max_tokens=16000, model="claude-sonnet-5")
    except llm_client.LLMClientError as e:
        raise AgentError(str(e)) from e

    if res.input is not None:
        return res.input

    if res.stop_reason in ("max_tokens", "invalid_json"):
        raise AgentError(
            "Extraction was cut off or was not valid structured output (ran out of tokens, or not valid JSON) -- the "
            "source text may be too long/detailed for the current max_tokens budget. Try a shorter excerpt, or "
            "increase max_tokens in spec_extraction_agent.py further if this keeps happening."
        )
    raise AgentError(f"Model did not return a structured extraction (stop_reason={res.stop_reason}).")
