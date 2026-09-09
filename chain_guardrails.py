"""
chain_guardrails.py — deterministic checks WITHIN the multi-agent
code-gen reasoning chain (code_gen_agents.py), not on the finished CQL
text. guardrails.py can only see the final query string; it can't tell
you that the `joins` step referenced a Form the `domains` step never
identified -- by the time there's a finished query, that hallucination
is already baked in. This module catches it at the point it actually
happens, using the structured intermediate outputs (domains, columns,
joins, filters) each sub-agent already produces.

This is enforcement by inspection of STRUCTURE, same tier of guarantee
as guardrails.py -- weaker than Tier 1's enforcement-by-construction,
stronger than hoping a prompt instruction was followed. It complements
the CQL_RULES_CONTEXT prompt-binding fix from earlier (which tells every
step not to invent things) by actually checking whether that held.
"""

import re
from typing import TypedDict


class ChainGuardrailReport(TypedDict):
    passed: bool
    issues: list


def _forms_mentioned(value) -> set:
    """Extracts Form-name-looking tokens from a structured step output
    (list of dicts with a 'form'/'forms' key, or nested)."""
    forms = set()

    def walk(v):
        if isinstance(v, dict):
            for key in ("form", "forms"):
                if key in v:
                    val = v[key]
                    if isinstance(val, str):
                        forms.add(val)
                    elif isinstance(val, list):
                        forms.update(x for x in val if isinstance(x, str))
            for v2 in v.values():
                walk(v2)
        elif isinstance(v, list):
            for item in v:
                walk(item)

    walk(value)
    return forms


def check_form_grounding(domains: list, columns: list, joins: list, filters: list) -> ChainGuardrailReport:
    """Every Form referenced anywhere in columns/joins/filters must have
    been listed in domains. A Form appearing later that was never
    identified in the domains step is exactly the kind of drift a
    sequential chain is vulnerable to -- each step trusts what came
    before rather than re-deriving it, so an early omission or a later
    hallucination can silently propagate."""
    known_forms = {d.get("form") for d in domains if isinstance(d, dict) and d.get("form")}

    issues = []
    for step_name, step_data in [("columns", columns), ("joins", joins), ("filters", filters)]:
        mentioned = _forms_mentioned(step_data)
        ungrounded = mentioned - known_forms
        if ungrounded:
            issues.append(
                f"{step_name} step references Form(s) {sorted(ungrounded)} not identified in the "
                f"domains step (known: {sorted(known_forms)})"
            )

    return {"passed": len(issues) == 0, "issues": issues}


def check_filter_form_references(known_forms: set, filters: list) -> ChainGuardrailReport:
    """Scans filter condition TEXT for domain-qualified references
    (e.g. "LB.LBNRIND", "AE.AESEQ" -- a short uppercase Form-code prefix
    followed by a dot) and flags any prefix not in the known Forms list.
    This is what actually catches a hallucinated Form buried in free-text
    filter conditions, since FILTERS_TOOL's schema has no structured
    "form" field for check_form_grounding to inspect there.

    Precision note: an earlier version of this check flagged ANY
    unrecognized uppercase token in a filter condition (e.g. "LLT",
    "HIGH") as suspicious. That produced a false positive on a correct,
    properly-grounded example in testing -- "AE.LLT match" was flagged
    because "LLT" (a term-level qualifier, not a column) wasn't in the
    columns list. A guardrail that flags correct code teaches people to
    ignore it, which defeats the purpose. This version only looks for
    the FORMNAME. prefix pattern specifically, which is precise enough
    not to false-positive on ordinary CDISC vocabulary."""
    issues = []
    for f in filters:
        if not isinstance(f, dict):
            continue
        condition = f.get("condition", "")
        for prefix in re.findall(r"\b([A-Z]{2,5})\.", condition):
            if prefix not in known_forms:
                issues.append(
                    f"filter condition '{condition}' references '{prefix}.' -- "
                    f"'{prefix}' was not identified in the domains step (known: {sorted(known_forms)})"
                )
    return {"passed": len(issues) == 0, "issues": issues}


def run_chain_guardrails(domains: list, columns: list, joins: list, filters: list) -> ChainGuardrailReport:
    known_forms = {d.get("form") for d in domains if isinstance(d, dict) and d.get("form")}
    grounding = check_form_grounding(domains, columns, joins, filters)
    filter_refs = check_filter_form_references(known_forms, filters)
    all_issues = grounding["issues"] + filter_refs["issues"]
    return {"passed": len(all_issues) == 0, "issues": all_issues}
