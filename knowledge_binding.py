"""knowledge_binding.py - turns approved knowledge and rules into a prompt block
for an agent, when the run asks for it (useKnowledge).

What goes in, and only this:
  * approved, in-scope chunks that clear a relevance floor (see below)
  * approved rules whose condition matches and that bind to this agent

The spec stays authoritative: the block tells the model so. Nothing is added
when nothing clears the floor, so an irrelevant library cannot add noise.
The relevance floor is a heuristic (query-word coverage, or cosine similarity
with a real embedding model) and should be tuned on real specs.
"""

import os

import knowledge_rules as kr
import knowledge_store as ks

MAX_CHARS = int(os.environ.get("SPEC2CODE_KB_MAX_CHARS", "6000"))
CHUNK_CHARS = 1200
TOP_K = 5
MIN_COVERAGE = float(os.environ.get("SPEC2CODE_KB_MIN_COVERAGE", "0.10"))
MIN_COSINE = float(os.environ.get("SPEC2CODE_KB_MIN_COSINE", "0.35"))
# Another report's code or notes is a precedent, not this report's own material, so it must be clearly similar.
# These two numbers are starting guesses, not tuned on real data.
SIMILAR_MIN_COSINE = float(os.environ.get("SPEC2CODE_KB_SIMILAR_MIN_COSINE", "0.50"))
SIMILAR_MIN_COVERAGE = float(os.environ.get("SPEC2CODE_KB_SIMILAR_MIN_COVERAGE", "0.30"))
SIMILAR_MAX = int(os.environ.get("SPEC2CODE_KB_SIMILAR_MAX", "3"))

_HEADER = (
    "REFERENCE KNOWLEDGE (approved library, guidance only)\n"
    "Use this to interpret terms and to apply the conventions below. The REPORT SPEC above is authoritative: "
    "if this material conflicts with the spec, follow the spec and say so in your notes. "
    "Do not add columns, filters or conditions that the spec does not ask for just because this material mentions them."
)


def _scope_tag(scope: str, ref: str, own_report: str = "") -> str:
    if scope == "report" and ref.lower() != (own_report or "").strip().lower():
        return f"similar report {ref}: a precedent for a similar listing, not this report's own logic. Adapt the approach; never copy its filters, names or dates"
    return "global" if scope == "global" else f"{scope} {ref}"


def _is_similar_report(h: dict, own_report: str) -> bool:
    return h["scope"] == "report" and h["scopeRef"].lower() != (own_report or "").strip().lower()


def build(session, tenant_id: str, spec: dict, agent: str, *, study_id: str = "", edc: str = "", language: str = "") -> dict:
    """Returns {"block": str, "sources": [...], "rules": [...], "skipped": [...]}. block is "" when nothing applies."""
    ta, sponsor = "", ""
    if study_id:
        from knowledge_api import study_sponsor, study_ta

        ta = study_ta(session, tenant_id, study_id)
        sponsor = study_sponsor(session, tenant_id, study_id)
    query = " ".join(str(spec.get(k, "")) for k in ("description", "columnHeading", "logic", "reportScenarios"))[:1500]
    found = ks.search(session, tenant_id, query, study_id=study_id, ta=ta, edc=edc, sponsor=sponsor, report=str(spec.get("reportId") or ""), top_k=TOP_K * 2)
    own = str(spec.get("reportId") or "")
    use, similar = [], 0
    for r in found["results"]:
        if _is_similar_report(r, own):
            if similar >= SIMILAR_MAX or not (r["vectorScore"] >= SIMILAR_MIN_COSINE or r["coverage"] >= SIMILAR_MIN_COVERAGE):
                continue
            similar += 1
        elif not (r["coverage"] >= MIN_COVERAGE or r["vectorScore"] >= MIN_COSINE):
            continue
        use.append(r)
    use = use[:TOP_K]
    fired = kr.evaluate(session, tenant_id, kr.context(spec, study_id=study_id, ta=ta, edc=edc, language=language, sponsor=sponsor), agent=agent)

    instr, guards, maps, skipped, used_rules = [], [], [], [], []
    for r in fired:
        if r.get("overriddenBy"):
            skipped.append({"name": r["name"], "reason": f"overridden by {r['overriddenBy']}"})
            continue
        tag = _scope_tag(r["scope"], r["scopeRef"])
        a = r["action"] or {}
        if r["actionType"] == "prompt":
            instr.append(f"- ({tag}) {a.get('text', '').strip()}")
        elif r["actionType"] == "guardrail":
            guards.append(f"- ({tag}) {a.get('text', '').strip()}")
        elif r["actionType"] == "name_map":
            maps.append(f"- ({tag}) Where the spec or your plan says \"{a.get('from', '')}\", use \"{a.get('to', '')}\".")
        else:  # pattern rules bind to Tier 1, which does not consume them yet: say so, do not pretend
            skipped.append({"name": r["name"], "reason": "pattern rules are recorded but not yet executed by Tier 1"})
            continue
        used_rules.append({"id": r["id"], "name": r["name"], "actionType": r["actionType"], "scope": r["scope"], "why": r["why"]})

    parts, used_src, size = [], [], 0
    for i, h in enumerate(use, 1):
        text = h["text"].strip()
        text = text if len(text) <= CHUNK_CHARS else text[:CHUNK_CHARS] + " ..."
        head = f"[{i}] {h['title']}" + (f" - {h['heading']}" if h["heading"] else "") + f" ({_scope_tag(h['scope'], h['scopeRef'], own)}" + (f", {h['standardVersion']}" if h["standardVersion"] else "") + ")"
        entry = f"{head}\n{text}"
        if size + len(entry) > MAX_CHARS:
            skipped.append({"name": h["title"], "reason": "left out to stay within the knowledge size budget"})
            continue
        parts.append(entry)
        size += len(entry)
        used_src.append({"sourceId": h["sourceId"], "title": h["title"], "heading": h["heading"], "scope": h["scope"],
                         "docType": h["docType"], "score": h["score"]})
    if not parts and not used_rules:
        return {"block": "", "sources": [], "rules": [], "skipped": skipped, "ta": ta, "backend": found["backend"]}

    sections = [_HEADER]
    if instr:
        sections.append("RULES TO FOLLOW\n" + "\n".join(instr))
    if maps:
        sections.append("NAME MAPPINGS\n" + "\n".join(maps))
    if guards:
        sections.append("THE RESULT MUST ALSO SATISFY\n" + "\n".join(guards))
    if parts:
        sections.append("SOURCES\n" + "\n\n".join(parts))
    return {"block": "\n\n" + "\n\n".join(sections) + "\n", "sources": used_src, "rules": used_rules, "skipped": skipped,
            "ta": ta, "backend": found["backend"]}


def summary(b: dict, applied: bool) -> dict:
    """The part recorded on a result for the UI. `applied` says whether a model call really ran with this
    knowledge available. mode is "applied" or "not_used", and `note` explains the edge cases."""
    out = {"mode": "applied" if applied else "not_used", "ta": b.get("ta", ""), "backend": b.get("backend", ""),
           "sources": b["sources"] if applied else [], "rules": b["rules"] if applied else [], "skipped": b.get("skipped", [])}
    if applied and not b["block"]:
        out["note"] = "No approved knowledge or rule was relevant to this spec, so nothing was added to the prompt."
    if not applied:
        out["note"] = "A deterministic rule produced this result without the model, so the knowledge was not used."
    return out
