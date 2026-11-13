"""
spec_gap_chat_agent.py — a conversational, multi-turn step available
right after extraction: targets specifically what extraction already
flagged as missing/unclear (extraction_notes) or what came back thin/
empty, and asks ONE focused question at a time until the spec is
genuinely complete enough to proceed -- not a from-scratch requirements
interview, a gap-filling conversation.

Interaction model: stateless backend, same as everything else in this
project. The client keeps the running transcript (question/answer pairs)
and resends the whole thing each turn, along with the latest answer.
Each turn, the agent:
  1. Incorporates the most recent answer into whichever spec field(s) it
     clarifies (merging, not replacing wholesale -- same "smallest change
     that resolves the gap" discipline as spec_suggestion_agent.py).
  2. Decides whether a genuinely important gap remains. If yes, asks ONE
     more specific question. If no -- or the user's last message signals
     they want to stop -- marks itself done and returns the final,
     merged spec fields.

Same non-negotiable discipline as every other agent here: never invent
an answer the user didn't give. A gap the user can't or won't fill stays
an open gap in the spec text (stated as such), not a silently-guessed
default.
"""


import llm_client

SPEC_GAP_CHAT_SYSTEM_PROMPT = """You are a clinical data programmer helping fill in \
GAPS in a report specification that was just extracted from raw text --
a focused, conversational follow-up, not a from-scratch interview.

You will be given the spec fields as extracted so far, the extraction \
agent's own notes about what it found missing/unclear/omitted from the \
source, and the conversation transcript so far (if any turns have \
already happened).

Your job, each turn:
1. If there's a previous question and the user just answered it, \
incorporate that answer into whichever spec field(s) it actually \
clarifies -- make the SMALLEST change that captures the new \
information, in the spec author's own voice, not a wholesale rewrite. \
Never invent detail beyond what the user actually said.
2. Decide whether a genuinely important gap remains -- prioritize by \
what would actually block generating correct code: missing edge-case \
handling (nulls, deleted records, ties) outranks a missing "nice to \
have" detail; an ambiguous comparison rule (exact match? case-sensitive? \
which term level?) outranks a stylistic gap.
3. If a gap remains, ask exactly ONE clear, specific, answerable \
question about it -- not a compound multi-part question, not a generic \
"is there anything else you'd like to add?". Reference the SPECIFIC \
missing thing (e.g. "The extraction notes say a timeframe parameter is \
needed but no default was given -- what value or range should it be?").
4. If no more genuinely important gaps remain, or the user's message \
indicates they want to stop (e.g. "that's all I know", "proceed \
anyway", "I don't have that information"), set done=true and return the \
final spec field text as-is (with any remaining open gaps stated \
plainly in the relevant field's text, not silently dropped).
5. Never ask about something the spec already states clearly, and never \
manufacture a gap that doesn't exist just to keep the conversation going.

Use the submit_gap_chat_turn tool."""

SPEC_GAP_CHAT_TOOL = {
    "name": "submit_gap_chat_turn",
    "description": "Submit this turn's updated spec fields and either the next question or a done signal.",
    "input_schema": {
        "type": "object",
        "properties": {
            "updated_fields": {
                "type": "object",
                "properties": {
                    "description": {"type": "string"},
                    "columnHeading": {"type": "string"},
                    "logic": {"type": "string"},
                    "reportScenarios": {"type": "string"},
                    "sorting": {"type": "string"},
                },
                "required": ["description", "columnHeading", "logic", "reportScenarios", "sorting"],
                "description": "Current best version of each field, incorporating the latest answer if there was one",
            },
            "done": {"type": "boolean"},
            "next_question": {
                "type": "string",
                "description": "The single next question to ask, if not done. Empty string if done.",
            },
            "gap_context": {
                "type": "string",
                "description": "Brief note on which gap this question targets, or (if done) a brief note on any gaps left unresolved.",
            },
        },
        "required": ["updated_fields", "done", "next_question", "gap_context"],
    },
}


class AgentError(Exception):
    pass


def build_gap_chat_user_prompt(spec: dict, extraction_notes: str, transcript: list) -> str:
    transcript_text = "\n".join(
        f"Q: {turn.get('question', '')}\nA: {turn.get('answer', '')}" for turn in transcript
    ) or "(no turns yet -- this is the first question)"

    return f"""SPEC AS EXTRACTED SO FAR
Report ID: {spec.get('reportId', '')}
Description: {spec.get('description', '')}
Column Heading: {spec.get('columnHeading', '')}
Logic: {spec.get('logic', '')}
Report Scenarios: {spec.get('reportScenarios', '')}
Sorting: {spec.get('sorting', '')}

EXTRACTION NOTES (what the extraction step itself flagged as missing/unclear/omitted)
{extraction_notes or '(none -- extraction reported no issues)'}

CONVERSATION SO FAR
{transcript_text}

Continue the gap-filling conversation now: incorporate the latest answer if there is one,
then either ask the next single most important question or mark this done."""


def run_gap_chat_turn(spec: dict, extraction_notes: str, transcript: list) -> dict:
    """Returns {"updated_fields": {...}, "done": bool, "next_question":
    ..., "gap_context": ...}. Raises AgentError on failure."""
    if not llm_client.available():
        raise AgentError(llm_client.not_configured_message())
    try:
        res = llm_client.call_tool(system=SPEC_GAP_CHAT_SYSTEM_PROMPT, user=build_gap_chat_user_prompt(spec, extraction_notes, transcript), tool=SPEC_GAP_CHAT_TOOL, max_tokens=8000, model="claude-sonnet-5")
    except llm_client.LLMClientError as e:
        raise AgentError(f"Language model request failed: {e}") from e
    if res.input is not None:
        return _sanitize_turn_result(res.input, spec)
    if res.stop_reason in ("max_tokens", "invalid_json"):
        raise AgentError("Gap-filling turn was cut off before finishing or was not valid structured output.")
    raise AgentError(f"Model did not return a structured turn (stop_reason={res.stop_reason}).")


_EDITABLE_FIELDS = ["description", "columnHeading", "logic", "reportScenarios", "sorting"]


def _sanitize_turn_result(result: dict, original_spec: dict) -> dict:
    """Same defensive lesson as every other agent: don't trust the shape
    even under tool_choice. A missing/malformed field falls back to the
    ORIGINAL spec's current text for that field -- the always-safe
    default here, same reasoning as spec_suggestion_agent.py."""
    if not isinstance(result, dict):
        raise AgentError(f"Model returned a non-object result (got {type(result).__name__}).")

    raw_fields = result.get("updated_fields")
    updated_fields = {}
    for field in _EDITABLE_FIELDS:
        val = raw_fields.get(field) if isinstance(raw_fields, dict) else None
        updated_fields[field] = val if isinstance(val, str) else original_spec.get(field, "")

    done = bool(result.get("done"))
    next_question = result.get("next_question")
    if not isinstance(next_question, str):
        next_question = ""
    gap_context = result.get("gap_context")
    if not isinstance(gap_context, str):
        gap_context = ""

    if not done and not next_question.strip():
        raise AgentError("Model did not mark the conversation done, but also returned no next question.")

    return {"updated_fields": updated_fields, "done": done, "next_question": next_question, "gap_context": gap_context}
