"""Draft CQL rules for Veeva CDB, each tied to a sentence in the Veeva CDB reference source (veeva_cdb_reference.md).

Same discipline as cdisc_starter_rules: a rule is created only if its evidence quote is found in the stored text of that
source, it passes its own tests, and it is created as a DRAFT. The reference is a summary of Veeva's pages, so the quotes
are checked against our summary, not against Veeva. A programmer should check each rule against Veeva's current
documentation before approving it. These are prompt rules: instructions to the model, not code checks.
"""
from typing import Optional

import knowledge_rules as kr
import models_db as m
from cdisc_starter_rules import find_quote

ENV = {"language": ["CQL"], "edcSystem": ["veeva"]}


def _t(logic: str, expect: str) -> dict:
    return {"spec": {"description": "Listing", "logic": logic, "language": "CQL", "edcSystem": "veeva"}, "expect": expect}


RULES = [
    {"name": "CQL: compare dates as dates, not RawDate text", "agents": ["generate", "review"],
     "quote": "returns the value as entered, with unknown parts shown as UN (day, month or time) or UNK (month)",
     "text": "RawDate() returns the entered value as text (for example 27-Oct-2020 or UN-Oct-2020). Do not use it in >, <, >= or <= comparisons or in sorting, because text does not order like dates. Compare the date items directly, or use SDTMDateFormat() when an ISO 8601 string is needed. Use DATE_FORMAT only to display a date, and sort on the date value, not on the formatted text.",
     "pattern": r"(?i)\b(date|before|after|prior|within|window|start|end|days?)\b",
     "pos": "Show records where the start date is before the first dose date", "neg": "List the site and subject number"},
    {"name": "CQL: say how partial dates are treated", "agents": ["generate", "review"],
     "quote": "an unknown month becomes January, an unknown day becomes the 1st, and an unknown time becomes 00:00:00",
     "text": "By default CQL fills an unknown month with January, an unknown day with the 1st and an unknown time with 00:00:00. If the spec mentions partial or unknown dates, use UnknownImpute(item, 'day type', 'month type', 'time type') with all three arguments, or say in the notes which treatment you assumed. Do not rely on the default silently.",
     "pattern": r"(?i)partial date|unknown (day|month|year|date)|\bUNK\b|impute|missing (day|month)",
     "pos": "If CM start date has an unknown day, assume the first day of the month", "neg": "List the visit name and status"},
    {"name": "CQL: join forms on IDs, not names", "agents": ["generate"],
     "quote": "Join on ID values rather than names for speed.",
     "text": "When joining forms, match on ID values such as @Form.Subject.ID or @HDR.Subject.ID rather than names. Only a few header attributes are indexed (@HDR.Subject.ID, @HDR.Event.Name, @HDR.Site.Name, @HDR.Event.ID, @HDR.Subject.Name, @HDR.Site.Number), so keep joins and filters on those where possible.",
     "pattern": r"(?i)\b(join|related|corresponding|same subject|matching|relationship)\b",
     "pos": "Show AE records with a corresponding CM record for the same subject", "neg": "Sort the listing by site"},
    {"name": "CQL: filter on aggregates with HAVING", "agents": ["generate", "review"],
     "quote": "WHERE is not supported with aggregates, so use HAVING",
     "text": "A condition on COUNT, SUM, AVG, MIN or MAX cannot go in WHERE. Use GROUP BY with HAVING, and include an aggregate in the projection. Use WHERE only for conditions on individual rows.",
     "pattern": r"(?i)\b(count|number of|more than|at least|duplicate|total|sum of|average)\b",
     "pos": "Show subjects with more than one record of the same visit", "neg": "Display the adverse event term"},
    {"name": "CQL: state the form status filter", "agents": ["generate", "review"],
     "quote": "Core listings show only forms in Submitted status.",
     "text": "Core listings show only submitted forms. If the spec asks for submitted, locked or in-progress data, write it as an explicit condition on @Form.Status (for example 'submitted__v'), and say in the notes which status values you assumed. To include forms that are in progress after submit, filter on both values.",
     "pattern": r"(?i)\b(submitted|in progress|locked|form status|unsubmitted)\b",
     "pos": "Only include submitted forms", "neg": "List the subject and country"},
]


def pick_source(db, tenant_id: str) -> Optional[m.KnowledgeSource]:
    for s in db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, scope="global").all():
        t = f"{s.title} {s.filename}".lower()
        if "veeva" in t and "cdb" in t and s.extract_status == "ok":
            return s
    return None


def build_payload(r: dict, source, chunk) -> dict:
    return {"name": r["name"], "description": "Draft from " + (source.title or source.filename), "scope": "global",
            "appliesTo": r["agents"], "actionType": "prompt", "action": {"text": r["text"]},
            "condition": {**ENV, "textPattern": r["pattern"]}, "priority": 100, "evidenceSourceId": source.id,
            "evidenceNote": f'{source.title}, section "{(chunk.heading or "").strip()[:80]}", chunk {chunk.position}. Quote: "{r["quote"]}". Summary of Veeva pages; check against the current Veeva documentation before approving.',
            "tests": [_t(r["pos"], "fires"), _t(r["neg"], "not_fires")]}


def load(db, tenant_id: str, created_by: str = "cql-starter-rules", dry_run: bool = False) -> list:
    source = pick_source(db, tenant_id)
    if source is None:
        return [{"name": r["name"], "result": "skipped", "note": "the Veeva CDB reference is not in the library"} for r in RULES]
    existing = {x.name for x in db.query(m.KnowledgeRule).filter_by(tenant_id=tenant_id, scope="global").all()}
    out = []
    for r in RULES:
        if r["name"] in existing:
            out.append({"name": r["name"], "result": "exists", "note": ""})
            continue
        chunk = find_quote(db, tenant_id, source.id, r["quote"])
        if chunk is None:
            out.append({"name": r["name"], "result": "skipped", "note": "quote not found in the stored text"})
            continue
        c = kr.clean(build_payload(r, source, chunk))
        if any(not t["passed"] for t in kr.run_tests(c)):
            out.append({"name": r["name"], "result": "skipped", "note": "its own tests fail"})
            continue
        if not dry_run:
            db.add(m.KnowledgeRule(tenant_id=tenant_id, created_by=created_by, **c))
            db.commit()
        out.append({"name": r["name"], "result": "would create" if dry_run else "created draft", "note": f"chunk {chunk.position}"})
    return out
