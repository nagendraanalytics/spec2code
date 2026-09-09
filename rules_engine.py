"""
rules_engine.py — Tier 1 of the cascade. Deterministic pattern matching:
if a spec's Logic/Description clearly matches a known pattern, render CQL
directly from a verified template instead of calling Claude at all.

Same honesty principle as the ADaM/TLF framework's rules engine: a rule
only exists here if it's grounded in a real, human-verified precedent --
not a guess at what a CQL pattern "should" look like. Right now that's
exactly one pattern (the AE/VAE overlap self-join from precedents.jsonl's
ABC002_JR entry). Adding a new rule means adding a new verified precedent
first, then writing the rule from it -- not the other way around.

If nothing matches, apply_rules() returns None and the spec falls through
to the next tier. This module never guesses; a near-miss is a miss.
"""

import re
from typing import Optional, TypedDict


class RuleMatch(TypedDict):
    rule_name: str
    cql: str
    explanation: str


def _spec_text(spec: dict) -> str:
    return f"{spec.get('description', '')} {spec.get('logic', '')}".lower()


def try_ae_vae_overlap_rule(spec: dict) -> Optional[RuleMatch]:
    """Matches specs asking for overlapping-record detection between two
    instances of the same repeating Form, keyed on a coded term matching
    and the onset/end dates overlapping -- the exact shape of ABC002_JR.

    Scope limitation, stated explicitly rather than silently assumed:
    this rule only fires for AE/VAE-domain overlap specs, because that's
    the only domain we have a verified precedent for. It will NOT match
    (correctly) an overlap spec written against LB or CM, even though the
    same self-join shape might apply there -- extending it there without
    a verified LB/CM precedent would be exactly the kind of unverified
    guess this module exists to avoid.
    """
    text = _spec_text(spec)

    has_overlap = "overlap" in text
    # Domain check accepts EITHER the connected "AE/VAE Term(s)" phrase,
    # OR a standalone "LLT" mention. LLT (Lowest Level Term) is a MedDRA
    # coding-hierarchy level used almost exclusively for AE/VAE data --
    # a spec can legitimately say "identical LLT after encoding" without
    # ever writing the literal words "AE Term" (this project's own VAE
    # test case does exactly that). Confirmed via the 469-spec corpus
    # that "LLT" doesn't appear in any of the 4 false-positive specs
    # that motivated tightening this check in the first place, so this
    # doesn't reopen that hole.
    has_ae_vae_domain_signal = bool(
        re.search(r"\b(?:ae|vae)(?:\s*/\s*(?:ae|vae))?\s+terms?\b", text, re.IGNORECASE)
        or "llt" in text
    )
    has_identical_term = ("identical" in text or "same" in text) and ("llt" in text or "term" in text)
    has_encoding = "encod" in text or bool(re.search(r"\bcod(ed|ing)\b", text))

    if not (has_overlap and has_identical_term and has_encoding and has_ae_vae_domain_signal):
        return None

    form = "VAE" if "vaccine" in text else "AE"
    p = form  # item prefix matches the Form name in the verified precedent (AETERM, AESEQ, ...)

    cql = (
        f"SELECT a1.`@HDR`.`Site`.`Country` AS `Country`, a1.`@HDR`.`Site`.`Number` AS `Site`, "
        f"a1.`@HDR`.`Subject`.`Name` AS `Subject Number`, a1.{p}SEQ AS `AE/VAE 1 Seq`, "
        f"a1.{p}TERM AS `AE/VAE 1 Verbatim`, CODEDTERM(a1.{p}TERM, 'LLT') AS `AE/VAE LLT`, "
        f"a1.{p}STDAT AS `AE/VAE 1 Onset Dt`, a1.{p}ENDAT AS `AE/VAE 1 End Dt`, "
        f"a2.{p}SEQ AS `AE/VAE 2 Seq`, a2.{p}TERM AS `AE/VAE 2 Verbatim`, "
        f"a2.{p}STDAT AS `AE/VAE 2 Onset Dt`, a2.{p}ENDAT AS `AE/VAE 2 End Dt` "
        f"FROM {form} a1 "
        f"JOIN {form} a2 ON a1.`@HDR`.`Subject`.`ID` = a2.`@HDR`.`Subject`.`ID` AND a1.{p}SEQ < a2.{p}SEQ "
        f"WHERE `@Form`.`Status` = 'submitted__v' "
        f"AND CODEDTERM(a1.{p}TERM, 'LLT') = CODEDTERM(a2.{p}TERM, 'LLT') "
        f"AND a1.{p}STDAT <= IFNULL(a2.{p}ENDAT, a1.{p}STDAT) "
        f"AND a2.{p}STDAT <= IFNULL(a1.{p}ENDAT, a2.{p}STDAT)"
    )

    return {
        "rule_name": "ae_vae_overlap_self_join",
        "cql": cql,
        "explanation": (
            f"Matched deterministic Tier 1 rule 'ae_vae_overlap_self_join' -- no Claude call "
            f"made. Renders a self-join on {form} via two aliased subqueries (a1, a2), matching "
            f"on CODEDTERM(...,'LLT') and using IFNULL to treat a NULL end date as still-ongoing "
            f"for overlap purposes. Pattern verified against precedent ABC002_JR; if this spec's "
            f"Form/Item names differ from standard AE/VAE conventions, verify before running."
        ),
    }


# Ordered list of rule functions -- first match wins. Add new rules here
# once (and only once) a verified precedent exists for the pattern.
RULES = [try_ae_vae_overlap_rule]


def apply_rules(spec: dict) -> Optional[RuleMatch]:
    for rule_fn in RULES:
        result = rule_fn(spec)
        if result is not None:
            return result
    return None
