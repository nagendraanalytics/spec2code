"""
sas_migration_agent.py — an OPTIONAL alternate entry point to the Spec
step: instead of starting from a written specification, start from
EXISTING legacy SAS code (a client migrating off SAS-based reporting)
and reverse-engineer it into the same spec fields spec_extraction_agent.py
produces from raw text.

Why this doesn't do a direct SAS-to-CQL syntax translation: SAS report
programs typically read flat, pre-exported datasets. Veeva CQL queries a
completely different live data model (Forms/Items via @HDR/@Form
context, not flat tables). A literal syntax-level translation would
produce broken code regardless of how well the syntax was mapped -- the
underlying data shapes don't correspond. The sound approach is to
extract the SAS code's actual BUSINESS INTENT (what it reads, what
conditions it applies, what it outputs, what edge cases it handles) into
the same plain-language spec fields a human-written spec would use, then
let the EXISTING, already-verified pipeline (Understand -> Review ->
Suggest -> Generate) regenerate it correctly against whichever target
platform/language the client actually needs -- including SAS itself, if
the client just wants their legacy code modernized/cleaned up rather
than moved to a different platform.

Same non-negotiable discipline as every other agent here: describe only
what the code actually does. A SAS-specific idiom with no obvious
platform-agnostic equivalent (a macro whose value isn't visible in this
snippet, a %INCLUDE'd file, RETAIN/first.var logic implying an assumed
sort order) gets flagged explicitly in migration_notes for human review
-- never silently guessed or dropped.
"""

import os

import anthropic

SAS_MIGRATION_SYSTEM_PROMPT = """You are helping migrate a legacy SAS clinical report \
program to a new platform. You will be given raw SAS code (which may \
include PROC SQL, DATA steps, PROC SORT, macros, formats, and comments).

Your job is NOT a syntax translation -- it's reverse-engineering the \
code's business intent into the same plain-language fields a written \
report specification would use, because this description will be used \
to REGENERATE the report against a potentially completely different \
data platform. Describe WHAT the code accomplishes, not HOW the SAS \
syntax specifically does it:

1. Identify the source dataset(s)/domain(s) the code reads and what they \
represent clinically (e.g. adverse events, disposition, deaths) -- infer \
this from dataset names, variable names, and any comments, not just the \
literal SAS identifiers.
2. Describe the actual comparison/filtering logic in plain language -- \
what makes a record included or excluded, any joins/merges and what \
they're matching on, any date logic, any term/value matching.
3. Identify the output columns, in order, using the code's column \
labels/formats where available, or the variable names otherwise.
4. If the code has PROC SORT or an ORDER BY, capture that as the sorting \
field.
5. If the code's logic implies distinct test scenarios (conditional \
branches, comments describing cases, IF/THEN/ELSE structures), describe \
them as report scenarios the way a spec author would.
6. Flag, in migration_notes, anything SAS-specific that doesn't have an \
obvious platform-agnostic equivalent and needs human review before \
regenerating: a macro variable whose value isn't visible in this \
snippet, a %INCLUDE'd file this snippet doesn't contain, RETAIN/ \
first.var/last.var logic that implies an assumed sort order which must \
be re-expressed explicitly for a different platform, a custom format/ \
informat referencing an external catalog not shown here, or any other \
external dependency the code relies on that isn't visible in what was \
pasted.
7. Never guess the content of something you can't see (an undefined \
macro, an external include, an unshown format catalog) -- name it as a \
gap in migration_notes instead.

Use the submit_sas_migration tool."""

SAS_MIGRATION_TOOL = {
    "name": "submit_sas_migration",
    "description": "Submit the reverse-engineered spec fields and migration notes for this SAS code.",
    "input_schema": {
        "type": "object",
        "properties": {
            "description": {"type": "string"},
            "columnHeading": {"type": "string"},
            "logic": {"type": "string"},
            "reportScenarios": {"type": "string"},
            "sorting": {"type": "string"},
            "migration_notes": {
                "type": "string",
                "description": "SAS-specific idioms, external dependencies, or ambiguities flagged for human review before regenerating",
            },
        },
        "required": ["description", "columnHeading", "logic", "reportScenarios", "sorting", "migration_notes"],
    },
}


class AgentError(Exception):
    pass


def build_sas_migration_user_prompt(sas_code: str) -> str:
    return f"""LEGACY SAS CODE:

{sas_code}

Reverse-engineer this code's business intent into spec fields now."""


def run_sas_migration(sas_code: str) -> dict:
    """Returns {"description": ..., "columnHeading": ..., "logic": ...,
    "reportScenarios": ..., "sorting": ..., "migration_notes": ...}.
    Raises AgentError on failure -- never returns a partial/garbage
    result silently."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise AgentError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)
    try:
        # See cql_agents.run_spec_review's comment for why this is
        # messages.stream() + get_final_message(), not messages.create().
        with client.messages.stream(
            model="claude-sonnet-5",
            max_tokens=16000,
            system=SAS_MIGRATION_SYSTEM_PROMPT,
            tools=[SAS_MIGRATION_TOOL],
            tool_choice={"type": "tool", "name": "submit_sas_migration"},
            messages=[{"role": "user", "content": build_sas_migration_user_prompt(sas_code)}],
        ) as stream:
            response = stream.get_final_message()
    except Exception as e:  # noqa: BLE001
        raise AgentError(f"Claude API request failed: {e}") from e

    for block in response.content:
        if getattr(block, "type", None) == "tool_use" and block.name == "submit_sas_migration":
            return _sanitize_migration_result(block.input)

    if response.stop_reason == "max_tokens":
        raise AgentError("SAS migration was cut off before finishing (ran out of tokens).")
    raise AgentError(f"Model did not return a structured migration result (stop_reason={response.stop_reason}).")


_STRING_FIELDS = ["description", "columnHeading", "logic", "reportScenarios", "sorting", "migration_notes"]


def _sanitize_migration_result(result: dict) -> dict:
    """Same defensive lesson as every other agent: don't trust the shape
    even under tool_choice."""
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object result (got {type(result).__name__}).")
    sanitized = {field: (result.get(field) if isinstance(result.get(field), str) else "") for field in _STRING_FIELDS}
    if not sanitized["description"].strip() and not sanitized["logic"].strip():
        raise AgentError("Model did not produce a usable description or logic from this code.")
    return sanitized
