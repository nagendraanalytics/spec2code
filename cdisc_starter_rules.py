"""A small set of hand-written rules, each tied to a sentence that really appears in an imported CDISC publication.

These are the only rules loaded without a model. Each rule carries an evidence quote. The loader looks for that quote
(ignoring spacing and curly quotes) in the chunks of the stored source, and creates the rule only if it finds it. A rule
whose quote is not found is skipped and reported, never created. All rules are created as DRAFTS with their own tests.

The rules are instructions to the model (prompt rules), written for listing logic that works on SDTM-style data.
"""
import re
from typing import Optional

import knowledge_rules as kr
import models_db as m

SOURCE_HINT = ("SDTMIG 3.4", "SDTM Implementation Guide v3.4", "SDTMIG v3.4")


def _t(logic: str, expect: str) -> dict:
    return {"spec": {"description": "Listing", "logic": logic}, "expect": expect}


STARTER = [
    {"name": "Study day has no day zero", "agents": ["understand", "review", "generate"],
     "quote": "Dates prior to RFSTDTC are decreased by 1, with the date preceding RFSTDTC designated as study day -1 (there is no study day 0)",
     "text": "Study day counts from the reference start date (RFSTDTC). The day before RFSTDTC is day -1 and RFSTDTC is day 1; there is no day 0. When the logic compares study days or computes a gap from them, do not subtract study days naively across day 1; derive the gap from the dates.",
     "pattern": r"(?i)\bstudy day\b|--DY\b|\b[A-Z]{2}(ST|EN)?DY\b",
     "pos": "Show records where AE start study day is before day 1", "neg": "List subjects by site and country"},
    {"name": "Do not do arithmetic on study day", "agents": ["understand", "review", "generate"],
     "quote": "Study Day is not suited for use in subsequent numerical computations",
     "text": "Do not compute durations or intervals by subtracting study-day values. Compute them from the date parts of the date variables (for example --STDTC and --ENDTC), and add 1 only when the spec asks for an inclusive count.",
     "pattern": r"(?i)duration|number of days|days between|difference in days|interval",
     "pos": "Calculate the duration in days between start and end", "neg": "List the visit name and visit date"},
    {"name": "Dates are ISO 8601 and can be partial", "agents": ["understand", "review", "generate"],
     "quote": "The SDTMIG requires dates and times of day to be stored according to the international standard ISO 8601",
     "text": "Date variables hold ISO 8601 text and may be truncated on the right (for example a year only, or a year and month). Do not assume a full date. Say how a partial date is handled in the logic (impute, treat as unknown, or exclude) and do not compare partial dates as if they were complete.",
     "pattern": r"(?i)partial date|UNK|unknown date|incomplete date|missing day|missing month|DTC\b",
     "pos": "Exclude records with a partial date in AESTDTC", "neg": "Show subject and site only"},
    {"name": "Missing values are nulls", "agents": ["understand", "review", "generate"],
     "quote": "Missing values for individual data items should be represented by nulls",
     "text": "Treat an empty value as null. Do not look for placeholder text such as 'N/A', 'UNK' or a dash to detect a missing value unless the spec names that exact text. Say whether a null passes or fails each condition.",
     "pattern": r"(?i)\bmissing\b|\bnull\b|\bblank\b|\bnot populated\b|is empty",
     "pos": "Show records where the result is missing", "neg": "Sort by subject and visit"},
    {"name": "Tests not done have no result", "agents": ["understand", "review", "generate"],
     "quote": "except (1) when --STAT = \"NOT DONE\" (because there is no result for such a record)",
     "text": "A record with --STAT = NOT DONE has no result. When the logic checks results or result-based flags, say whether not-done records are excluded or are expected to appear, and do not treat the missing result as an abnormal value.",
     "pattern": r"(?i)not done|\bSTAT\b|test (was )?not performed|not performed",
     "pos": "Exclude labs where the test was not done", "neg": "List concomitant medications"},
    {"name": "Unplanned visits have no planned visit day", "agents": ["understand", "review", "generate"],
     "quote": "VISITDY must not be populated for unplanned visits; VISITDY is, by definition, the planned study day of visit",
     "text": "VISITDY is the planned day of a visit and is empty for unplanned visits. Do not use VISITDY to order or select unplanned visits; use the visit date instead, and say how unplanned visits are treated.",
     "pattern": r"(?i)unplanned|VISITDY|unscheduled",
     "pos": "Include unplanned visits and order by VISITDY", "neg": "List adverse events by system organ class"},
    {"name": "Ongoing events have no end date", "agents": ["understand", "review", "generate"],
     "quote": "CMENDTC is null because the end date is unknown/has not yet happened",
     "text": "An ongoing event or medication has a null end date. The spec must say how an ongoing record is treated by any end-date condition or duration (for example, compared to the data cut date or left out). Do not treat a null end date as an error.",
     "pattern": r"(?i)ongoing|continuing|\bENDTC\b|end date",
     "pos": "Show medications that are ongoing at the visit", "neg": "List subjects with a protocol deviation"},
    {"name": "USUBJID is unique across the submission", "agents": ["understand", "review", "generate"],
     "quote": "USUBJID values must be unique for each trial participant (subject) across all trials in the submission",
     "text": "USUBJID identifies one participant across all studies. Join domains on USUBJID, not on a site or subject number alone, and count participants by distinct USUBJID.",
     "pattern": r"(?i)\bUSUBJID\b|unique subject|distinct subject|count of subjects|number of subjects",
     "pos": "Count distinct subjects by USUBJID", "neg": "Show the visit schedule"},
]


def norm(s: str) -> str:
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"').replace(" ", " ")
    return re.sub(r"\s+", " ", s).strip().lower()


def find_quote(db, tenant_id: str, source_id: str, quote: str) -> Optional[m.KnowledgeChunk]:
    """The chunk containing the quote, or None. A quote that spans two chunks is tried against the joined pair."""
    q = norm(quote)
    chunks = db.query(m.KnowledgeChunk).filter_by(tenant_id=tenant_id, source_id=source_id).order_by(m.KnowledgeChunk.position).all()
    prev = None
    for c in chunks:
        if q in norm(c.text):
            return c
        if prev is not None and q in norm(prev.text + " " + c.text):
            return prev
        prev = c
    return None


def pick_source(db, tenant_id: str) -> Optional[m.KnowledgeSource]:
    rows = db.query(m.KnowledgeSource).filter_by(tenant_id=tenant_id, scope="global").all()
    for s in rows:
        t = f"{s.title} {s.standard_version}".lower()
        if any(h.lower() in t for h in SOURCE_HINT) and s.extract_status == "ok":
            return s
    return None


def build_payload(r: dict, source: m.KnowledgeSource, chunk: m.KnowledgeChunk) -> dict:
    return {"name": r["name"], "description": "Starter rule from " + (source.title or source.filename), "scope": "global",
            "appliesTo": r["agents"], "actionType": "prompt", "action": {"text": r["text"]},
            "condition": {"textPattern": r["pattern"]}, "priority": 100, "evidenceSourceId": source.id,
            "evidenceNote": f'{source.title}, section "{(chunk.heading or "").strip()[:80]}", chunk {chunk.position}. Quote: "{r["quote"]}"',
            "tests": [_t(r["pos"], "fires"), _t(r["neg"], "not_fires")]}


def load(db, tenant_id: str, created_by: str = "starter-rules", dry_run: bool = False) -> list:
    """Creates the starter rules as drafts. Returns one dict per rule: name, result, note."""
    out = []
    source = pick_source(db, tenant_id)
    if source is None:
        return [{"name": r["name"], "result": "skipped", "note": "SDTMIG 3.4 is not in the library"} for r in STARTER]
    existing = {x.name for x in db.query(m.KnowledgeRule).filter_by(tenant_id=tenant_id, scope="global").all()}
    for r in STARTER:
        if r["name"] in existing:
            out.append({"name": r["name"], "result": "exists", "note": ""})
            continue
        chunk = find_quote(db, tenant_id, source.id, r["quote"])
        if chunk is None:
            out.append({"name": r["name"], "result": "skipped", "note": "quote not found in the stored text"})
            continue
        clean = kr.clean(build_payload(r, source, chunk))
        bad = [t for t in kr.run_tests(clean) if not t["passed"]]
        if bad:
            out.append({"name": r["name"], "result": "skipped", "note": "its own tests fail"})
            continue
        if not dry_run:
            db.add(m.KnowledgeRule(tenant_id=tenant_id, created_by=created_by, **clean))
            db.commit()
        out.append({"name": r["name"], "result": "would create" if dry_run else "created draft", "note": f"chunk {chunk.position}"})
    return out
