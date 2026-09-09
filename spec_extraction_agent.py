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

import os
from typing import Optional

import anthropic

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
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")
    if not raw_text or not raw_text.strip():
        raise AgentError("No text provided to extract from.")

    client = anthropic.Anthropic(api_key=api_key)
    try:
        # See cql_agents.run_spec_review's comment for why this is
        # messages.stream() + get_final_message(), not messages.create().
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=16000,  # bumped from 8000 -- confirmed via docs Sonnet 5 supports up to
            # 128k output tokens; adaptive thinking (on by default) shares this same budget with
            # the actual response, which was the real mechanism behind a real "response was cut
            # off" report on a complex spec, not just the extracted text itself being long.
            # (see EXTRACTION_SYSTEM_PROMPT's "Extract, don't summarize" rule) -- for a real,
            # detailed spec this can mean reproducing close to the full source text, plus JSON
            # escaping overhead (every newline becomes \n, quotes need escaping). 3000 was
            # measured too tight for real specs in this project (~2,080 tokens of raw content
            # in some -- see chat) and had no graceful degradation on truncation, unlike
            # cql_agents.run_cql_generation -- it just raised an opaque error, which is
            # exactly what "extraction isn't working" looks like from the outside.
            system=EXTRACTION_SYSTEM_PROMPT,
            tools=[EXTRACTION_TOOL],
            tool_choice={"type": "tool", "name": "submit_extracted_spec"},
            messages=[{"role": "user", "content": f"RAW SPEC TEXT:\n\n{raw_text}"}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_extracted_spec":
            return block.input

    if response.stop_reason == "max_tokens":
        raise AgentError(
            "Extraction was cut off before finishing (ran out of tokens) -- the source text may "
            "be too long/detailed for the current max_tokens budget. Try a shorter excerpt, or "
            "increase max_tokens in spec_extraction_agent.py further if this keeps happening."
        )
    raise AgentError(f"Model did not return a structured extraction (stop_reason={response.stop_reason}).")
