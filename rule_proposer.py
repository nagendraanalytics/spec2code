"""Proposes draft rules from the text of one knowledge source, using a Claude call.

How it stays grounded: the model must return, for every rule, a quote copied from the passage it was given. A rule
is dropped if that quote is not found in the passage (ignoring spacing and curly quotes), if the rule does not pass
knowledge_rules.clean(), or if its own example tests fail. What survives is stored as a DRAFT, linked to the source, and
needs a programmer's approval like any other rule. The model never approves anything.

The passages sent are the source's own text, which is already in the library. Choose the source yourself; nothing is
sent for a source you did not name.
"""
from __future__ import annotations

import os
import re

import knowledge_rules as kr
import models_db as m
from cdisc_starter_rules import norm

MODEL = os.environ.get("SPEC2CODE_RULE_MODEL", "claude-sonnet-5")
MODAL = re.compile(r"\b(must|shall|should not|must not|is required|are required|required to|should be)\b", re.I)
AGENTS = list(kr.AGENTS)


class ProposerError(Exception):
    pass


TOOL = {
    "name": "submit_rules",
    "description": "Submit zero or more rules found in the passage. Submit none if the passage holds nothing a listing author must apply.",
    "input_schema": {"type": "object", "properties": {"rules": {"type": "array", "items": {"type": "object", "properties": {
        "name": {"type": "string", "description": "Short title, under 80 characters."},
        "quote": {"type": "string", "description": "One sentence copied word for word from the passage that the rule rests on."},
        "instruction": {"type": "string", "description": "The rule as an instruction to someone writing listing logic or code. Plain words."},
        "applies_to": {"type": "array", "items": {"type": "string", "enum": AGENTS}},
        "text_pattern": {"type": "string", "description": "A regular expression that matches spec wording where the rule matters. Keep it specific."},
        "example_fires": {"type": "string", "description": "A short spec logic sentence that the pattern matches."},
        "example_not_fires": {"type": "string", "description": "A short spec logic sentence that the pattern does not match."},
    }, "required": ["name", "quote", "instruction", "applies_to", "text_pattern", "example_fires", "example_not_fires"]}}}, "required": ["rules"]},
}

SYSTEM = ("You read a passage from a clinical data standard and pick out requirements that matter to someone writing a data listing "
          "or validation logic. Be conservative. Only use what the passage says; do not add outside knowledge. Each rule needs a quote "
          "copied exactly from the passage. Prefer fewer, sharper rules. Skip anything that is only a definition or an example.")


def candidates(db, tenant_id: str, source_id: str, limit: int = 20) -> list:
    """Chunks that state requirements, strongest first."""
    out = []
    for c in db.query(m.KnowledgeChunk).filter_by(tenant_id=tenant_id, source_id=source_id).order_by(m.KnowledgeChunk.position).all():
        if (c.meta or {}).get("kind") == "code" or not (200 <= len(c.text or "") <= 3500):
            continue
        n = len(MODAL.findall(c.text))
        if n:
            out.append((n, c))
    out.sort(key=lambda x: (-x[0], x[1].position))
    return [c for _, c in out[:limit]]


def ask_model(passage: str, heading: str) -> list:
    import anthropic
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        raise ProposerError("ANTHROPIC_API_KEY is not set.")
    client = anthropic.Anthropic(api_key=key)
    try:
        resp = client.messages.create(model=MODEL, max_tokens=4000, system=SYSTEM, tools=[TOOL],
                                      tool_choice={"type": "tool", "name": "submit_rules"},
                                      messages=[{"role": "user", "content": f"Section: {heading}\n\nPassage:\n{passage}"}])
    except Exception as e:  # noqa: BLE001
        raise ProposerError(f"Claude API request failed: {e}") from e
    for b in resp.content:
        if getattr(b, "type", None) == "tool_use" and b.name == "submit_rules":
            r = (b.input or {}).get("rules")
            return r if isinstance(r, list) else []
    return []


def to_payload(raw: dict, source: m.KnowledgeSource, chunk: m.KnowledgeChunk) -> dict:
    scope_keys = {"ta": {"ta": source.scope_ref}, "sponsor": {"sponsor": source.scope_ref}, "report": {"reportId": source.scope_ref}, "study": {"studyId": source.scope_ref}}.get(source.scope or "global", {})
    ex = lambda s: {"description": "Listing", "logic": str(s), **scope_keys}  # noqa: E731
    return {"name": str(raw.get("name", ""))[:200], "description": "Proposed from " + (source.title or source.filename),
            "scope": source.scope or "global", "scopeRef": source.scope_ref or "",
            "appliesTo": [a for a in (raw.get("applies_to") or []) if a in AGENTS] or ["understand", "review"],
            "actionType": "prompt", "action": {"text": str(raw.get("instruction", "")).strip()},
            "condition": {"textPattern": str(raw.get("text_pattern", "")).strip()}, "priority": 100,
            "evidenceSourceId": source.id,
            "evidenceNote": f'{source.title}, section "{(chunk.heading or "").strip()[:80]}", chunk {chunk.position}. Quote: "{str(raw.get("quote", "")).strip()}"',
            "tests": [{"spec": ex(raw.get("example_fires", "")), "expect": "fires"},
                      {"spec": ex(raw.get("example_not_fires", "")), "expect": "not_fires"}]}


def validate(raw, source, chunk) -> tuple:
    """(clean payload or None, reason if dropped)."""
    if not isinstance(raw, dict):
        return None, "not an object"
    q = norm(str(raw.get("quote", "")))
    if len(q) < 25 or q not in norm(chunk.text):
        return None, "quote not found in the passage"
    try:
        c = kr.clean(to_payload(raw, source, chunk))
    except kr.RuleError as e:
        return None, str(e)
    if len(c["tests"]) != 2 or not all(t["spec"]["logic"].strip() for t in c["tests"]):
        return None, "missing example"
    if any(not t["passed"] for t in kr.run_tests(c)):
        return None, "its own examples fail the pattern"
    return c, ""


def propose(db, tenant_id: str, source_id: str, *, limit: int = 20, created_by: str = "rule-proposer", ask=None, dry_run: bool = False) -> dict:
    source = db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, id=source_id).first()
    if source is None:
        raise ProposerError("Source not found.")
    ask = ask or ask_model
    names = {r.name.strip().lower() for r in db.query(m.KnowledgeRule).filter_by(tenant_id=tenant_id).all()}
    made, dropped, passages = [], [], 0
    for chunk in candidates(db, tenant_id, source_id, max(1, min(int(limit), 100))):
        passages += 1
        for raw in ask(chunk.text, chunk.heading or ""):
            c, why = validate(raw, source, chunk)
            nm = (raw.get("name") if isinstance(raw, dict) else "") or ""
            if c is None:
                dropped.append({"name": nm, "reason": why})
            elif c["name"].strip().lower() in names:
                dropped.append({"name": c["name"], "reason": "a rule with this name exists"})
            else:
                names.add(c["name"].strip().lower())
                if not dry_run:
                    db.add(m.KnowledgeRule(tenant_id=tenant_id, created_by=created_by, **c))
                    db.commit()
                made.append({"name": c["name"], "scope": c["scope"], "scopeRef": c["scope_ref"]})
    return {"source": source.title, "passages": passages, "created": made, "dropped": dropped}
