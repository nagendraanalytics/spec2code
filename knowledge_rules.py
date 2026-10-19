"""knowledge_rules.py - rules that bind to agents.

A rule says: in THIS scope, WHEN the condition matches the spec/run, apply
THIS action to THESE agents. Rules are human-approved (draft -> approved ->
retired) and an approval is refused while the rule's own example tests fail.

In this release rules are evaluated (dry run, back-test, and recorded beside
generation results) but are NOT yet injected into agent prompts or Tier 1.
"""

import re
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy.orm import Session

import holdout
import models_db as m

AGENTS = ("extract", "understand", "review", "generate")
ACTION_TYPES = ("pattern", "prompt", "guardrail", "name_map")
SCOPE_RANK = {"report": 5, "study": 4, "sponsor": 3, "ta": 2, "global": 1}
COND_LIST_KEYS = ("edcSystem", "listingType", "specType", "language", "forms")
MAX_TEXT = 30000


class RuleError(Exception):
    pass


def _now():
    return datetime.now(timezone.utc)


def _strs(v) -> list:
    if v is None or v == "":
        return []
    if isinstance(v, str):
        v = [x for x in re.split(r"[,\n]", v)]
    return [str(x).strip() for x in v if str(x).strip()]


def check_pattern(p: str) -> None:
    if len(p) > 200:
        raise RuleError("The text pattern is longer than 200 characters.")
    if re.search(r"\([^)]*[+*][^)]*\)\s*[+*{]", p):
        raise RuleError("The text pattern has a repeated group inside a repeat, which can hang the matcher. Simplify it.")
    try:
        re.compile(p, re.I)
    except re.error as e:
        raise RuleError(f"The text pattern is not a valid regular expression ({e}).") from e


def clean(payload: dict) -> dict:
    """Validates and normalises a rule payload (create or update)."""
    name = str(payload.get("name", "")).strip()
    if not name:
        raise RuleError("A rule needs a name.")
    scope = str(payload.get("scope", "global")).strip().lower()
    if scope not in SCOPE_RANK:
        raise RuleError("Scope must be global, sponsor, ta, study or report.")
    ref = str(payload.get("scopeRef", "")).strip()
    if scope != "global" and not ref:
        raise RuleError("A therapeutic-area or study rule needs a name or study ID.")
    agents = [a for a in _strs(payload.get("appliesTo")) if a in AGENTS]
    if not agents:
        raise RuleError(f"Choose at least one agent: {', '.join(AGENTS)}.")
    atype = str(payload.get("actionType", "prompt"))
    if atype not in ACTION_TYPES:
        raise RuleError(f"Action type must be one of {', '.join(ACTION_TYPES)}.")
    action = payload.get("action") or {}
    if not isinstance(action, dict):
        raise RuleError("The action must be an object.")
    key = {"prompt": "text", "guardrail": "text", "pattern": "pattern", "name_map": "from"}[atype]
    if not str(action.get(key, "")).strip():
        raise RuleError(f"A {atype.replace('_', ' ')} rule needs '{key}' in its action.")
    if atype == "name_map" and not str(action.get("to", "")).strip():
        raise RuleError("A name map rule needs both 'from' and 'to'.")
    cond_in = payload.get("condition") or {}
    cond = {k: _strs(cond_in.get(k)) for k in COND_LIST_KEYS if _strs(cond_in.get(k))}
    tp = str(cond_in.get("textPattern", "")).strip()
    if tp:
        check_pattern(tp)
        cond["textPattern"] = tp
    tests = []
    for t in payload.get("tests") or []:
        if not isinstance(t, dict) or t.get("expect") not in ("fires", "not_fires") or not isinstance(t.get("spec"), dict):
            raise RuleError("Each test needs a 'spec' object and expect of 'fires' or 'not_fires'.")
        tests.append({"spec": t["spec"], "expect": t["expect"]})
    try:
        prio = int(payload.get("priority", 100))
    except (TypeError, ValueError):
        raise RuleError("Priority must be a whole number.") from None
    return {"name": name[:200], "description": str(payload.get("description", ""))[:2000], "scope": scope, "scope_ref": ref,
            "applies_to": agents, "condition": cond, "action_type": atype, "action": action, "priority": prio,
            "evidence_source_id": payload.get("evidenceSourceId") or None, "evidence_note": str(payload.get("evidenceNote", ""))[:2000],
            "tests": tests}


def rule_dict(r: m.KnowledgeRule) -> dict:
    return {"id": r.id, "name": r.name, "description": r.description, "scope": r.scope, "scopeRef": r.scope_ref,
            "appliesTo": r.applies_to or [], "condition": r.condition or {}, "actionType": r.action_type, "action": r.action or {},
            "priority": r.priority, "status": r.status, "evidenceSourceId": r.evidence_source_id, "evidenceNote": r.evidence_note,
            "tests": r.tests or [], "version": r.version, "createdBy": r.created_by,
            "createdAt": r.created_at.isoformat() if r.created_at else None,
            "updatedAt": r.updated_at.isoformat() if r.updated_at else None,
            "approvedBy": r.approved_by, "approvedAt": r.approved_at.isoformat() if r.approved_at else None}


# --------------------------------------------------------------- matching

def spec_text(spec: dict) -> str:
    return " \n".join(str(spec.get(k, "")) for k in ("description", "columnHeading", "logic", "reportScenarios", "sorting"))[:MAX_TEXT]


def context(spec: dict, *, study_id: str = "", ta: str = "", edc: str = "", language: str = "", sponsor: str = "") -> dict:
    return {"text": spec_text(spec), "edcSystem": (edc or spec.get("edcSystem") or "").strip(),
            "listingType": (spec.get("listingType") or "").strip(), "specType": (spec.get("specType") or "").strip(),
            "language": (language or spec.get("language") or "").strip(), "studyId": (study_id or spec.get("studyId") or "").strip(),
            "ta": ta.strip(), "sponsor": (sponsor or "").strip(), "reportId": str(spec.get("reportId") or "").strip()}


def _scope_ok(scope: str, ref: str, ctx: dict) -> Optional[str]:
    if holdout.scope_excluded(scope):
        return f"{scope} scope switched off for this evaluation"
    if scope == "report" and holdout.is_held_out(ref):
        return f"Report '{ref}' is held out for this evaluation"
    if scope == "global":
        return None
    if scope == "report":
        return None if ctx.get("reportId") and ref.lower() == ctx["reportId"].lower() else f"Report rule for {ref}"
    if scope == "sponsor":
        return None if ctx.get("sponsor") and ref.lower() == ctx["sponsor"].lower() else f"Sponsor rule for {ref}"
    if scope == "ta":
        return None if ctx["ta"] and ref.lower() == ctx["ta"].lower() else f"TA rule for {ref}"
    return None if ctx["studyId"] and ref.lower() == ctx["studyId"].lower() else f"Study rule for {ref}"


def matches(scope: str, ref: str, condition: dict, ctx: dict) -> tuple:
    """(fires, why). `why` lists what matched, or the first thing that did not."""
    miss = _scope_ok(scope, ref, ctx)
    if miss:
        return False, miss
    why = []
    for k in ("edcSystem", "listingType", "specType", "language"):
        want = [w.lower() for w in (condition.get(k) or [])]
        if want:
            if ctx[k].lower() not in want:
                return False, f"{k} is '{ctx[k] or 'not set'}', rule wants {', '.join(condition[k])}"
            why.append(f"{k} = {ctx[k]}")
    forms = condition.get("forms") or []
    if forms:
        hit = [f for f in forms if re.search(rf"(?<![A-Za-z0-9_]){re.escape(f)}(?![A-Za-z0-9_])", ctx["text"], re.I)]
        if not hit:
            return False, f"none of the forms {', '.join(forms)} appear in the spec"
        why.append("form " + ", ".join(hit))
    pat = condition.get("textPattern")
    if pat:
        if not re.search(pat, ctx["text"], re.I):
            return False, "the text pattern does not match the spec"
        why.append("text pattern matches")
    return True, "; ".join(why) or "no condition: always applies in its scope"


def _specificity(r: m.KnowledgeRule) -> tuple:
    return (SCOPE_RANK.get(r.scope, 0), len(r.condition or {}), r.priority)


def evaluate(db: Session, tenant_id: str, ctx: dict, *, agent: str = "", include_draft: bool = False) -> list:
    """Rules that fire for this run, most specific first. Approved rules only unless include_draft."""
    qy = db.query(m.KnowledgeRule).filter_by(tenant_id=tenant_id)
    qy = qy.filter(m.KnowledgeRule.status.in_(["approved", "draft"] if include_draft else ["approved"]))
    fired = []
    for r in qy.all():
        if agent and agent not in (r.applies_to or []):
            continue
        ok, why = matches(r.scope, r.scope_ref, r.condition or {}, ctx)
        if ok:
            fired.append((r, why))
    fired.sort(key=lambda x: _specificity(x[0]), reverse=True)
    out, seen = [], {}
    for r, why in fired:
        d = rule_dict(r)
        d["why"] = why
        key = (r.action_type, str((r.action or {}).get("key") or (r.action or {}).get("from") or "").lower())
        if key[1]:
            if key in seen:
                d["overriddenBy"] = seen[key]
            else:
                seen[key] = r.name
        out.append(d)
    return out


# ------------------------------------------------------- tests and backtest

def run_tests(rule_like: dict) -> list:
    """Runs a rule's own example tests. rule_like uses the clean() keys."""
    res = []
    for i, t in enumerate(rule_like.get("tests") or [], 1):
        spec = t["spec"]
        ctx = context(spec, study_id=str(spec.get("studyId", "")), ta=str(spec.get("ta", "")), edc=str(spec.get("edcSystem", "")), sponsor=str(spec.get("sponsor", "")))
        fired, why = matches(rule_like["scope"], rule_like["scope_ref"], rule_like["condition"], ctx)
        res.append({"n": i, "expect": t["expect"], "fired": fired, "passed": fired == (t["expect"] == "fires"), "why": why})
    return res


def approve(db: Session, r: m.KnowledgeRule, by: str = "") -> list:
    results = run_tests({"scope": r.scope, "scope_ref": r.scope_ref, "condition": r.condition or {}, "tests": r.tests or []})
    bad = [t for t in results if not t["passed"]]
    if bad:
        raise RuleError(f"{len(bad)} of this rule's example tests fail, so it cannot be approved yet.")
    r.status, r.approved_by, r.approved_at = "approved", by, _now()
    db.commit()
    return results


def backtest(db: Session, tenant_id: str, rule_like: dict, *, study_id: str = "", ta: str = "", sponsor: str = "", limit: int = 3000) -> dict:
    """Counts how many stored specs a rule would fire for. The 'stored specs' are the Spec library of this tenant."""
    rows = db.query(m.Spec).filter_by(tenant_id=tenant_id).order_by(m.Spec.created_at.desc()).limit(limit).all()
    fired = []
    for s in rows:
        spec = {"reportId": s.report_id, "description": s.description or "", "columnHeading": s.column_heading or "",
                "logic": s.logic or "", "reportScenarios": s.report_scenarios or "", "sorting": getattr(s, "sorting", "") or ""}
        ok, _ = matches(rule_like["scope"], rule_like["scope_ref"], rule_like["condition"], context(spec, study_id=study_id, ta=ta, sponsor=sponsor))
        if ok:
            fired.append(s.report_id)
    return {"checked": len(rows), "fired": len(fired), "examples": fired[:25]}
