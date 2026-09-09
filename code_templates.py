"""
code_templates.py — Tier 1 rule rendering for languages beyond CQL.

Same discipline as rules_engine.py: a template only exists here once its
LOGIC has been checked, not just its syntax. For CQL, that check was
"does the rendered CQL byte-match the human-verified precedent." Pandas
can't be byte-matched against CQL (different languages), so the
verification here is behavioral instead: run the rendered pandas logic
against synthetic AE data covering the same edge cases the CQL precedent
was built for (overlap, non-overlap, identical-LLT-but-no-overlap,
ongoing/NULL-end-date), and confirm it returns the correct pairs. See
test_code_templates.py for that verification.

This does NOT mean the Form/Item names are verified -- same caveat as
the CQL rule: AETERM/AESEQ/AESTDAT/AEENDAT are inferred from CDISC
convention, not confirmed against a real study's metadata.
"""

from typing import Optional, TypedDict

# Reuse the same detection heuristic as rules_engine.py -- one spec,
# multiple rendering targets, same match logic.
from rules_engine import _spec_text
import re


class TemplateMatch(TypedDict):
    rule_name: str
    code: str
    explanation: str


def _matches_ae_overlap_pattern(spec: dict) -> Optional[str]:
    """Returns the Form name ("AE" or "VAE") if this spec matches the
    overlap pattern, else None. Shared detection logic with
    rules_engine.py's CQL rule -- if you change the heuristic there,
    change it here too (or better: factor it out once there's a third
    consumer)."""
    text = _spec_text(spec)
    has_overlap = "overlap" in text
    has_identical_term = ("identical" in text or "same" in text) and ("llt" in text or "term" in text)
    has_encoding = "encod" in text or bool(re.search(r"\bcod(ed|ing)\b", text))
    has_ae_domain = bool(re.search(r"\b(adverse event|\bae\b|\bvae\b)", text))

    if not (has_overlap and has_identical_term and has_encoding and has_ae_domain):
        return None
    return "VAE" if "vaccine" in text else "AE"


def try_ae_vae_overlap_python(spec: dict) -> Optional[TemplateMatch]:
    """pandas rendering of the same overlap-detection logic as
    rules_engine.py's CQL rule. Assumes a DataFrame named after the Form
    (ae_df / vae_df) with columns matching CDISC item names, indexed by
    subject -- the same inference-from-convention caveat as the CQL
    version applies to these column names."""
    form = _matches_ae_overlap_pattern(spec)
    if form is None:
        return None

    p = form.lower()
    var = f"{p}_df"

    code = f'''import pandas as pd

def find_overlapping_{p}_records({var}: pd.DataFrame) -> pd.DataFrame:
    """
    {form} records with overlapping onset/end dates for an identical LLT
    (after coding), including ongoing records (NULL end date treated as
    still-active for overlap purposes).

    Expects {var} to have columns: SUBJID, {form}SEQ, {form}TERM,
    {form}TERM_LLT (coded LLT -- assumed pre-coded; if not, apply your
    coding step before calling this), {form}STDAT, {form}ENDAT.
    """
    df = {var}.copy()
    df["{form}STDAT"] = pd.to_datetime(df["{form}STDAT"])
    df["{form}ENDAT"] = pd.to_datetime(df["{form}ENDAT"])

    # Self-join: every subject's records against every other record for the
    # SAME subject, keeping only pairs where seq1 < seq2 to avoid duplicate
    # reversed pairs and self-matches (same structure as the CQL a1/a2 self-join).
    merged = df.merge(df, on="SUBJID", suffixes=("_1", "_2"))
    merged = merged[merged["{form}SEQ_1"] < merged["{form}SEQ_2"]]

    # Same coded LLT
    merged = merged[merged["{form}TERM_LLT_1"] == merged["{form}TERM_LLT_2"]]

    # Overlap check: NULL end date treated as "ongoing as of now" for
    # comparison purposes -- fillna with the OTHER record's start date is
    # the pandas equivalent of CQL's IFNULL(other.end, this.start).
    end_1_filled = merged["{form}ENDAT_1"].fillna(merged["{form}STDAT_2"])
    end_2_filled = merged["{form}ENDAT_2"].fillna(merged["{form}STDAT_1"])
    overlap = (merged["{form}STDAT_1"] <= end_2_filled) & (merged["{form}STDAT_2"] <= end_1_filled)
    result = merged[overlap]

    return result[[
        "SUBJID", "{form}SEQ_1", "{form}TERM_1", "{form}TERM_LLT_1", "{form}STDAT_1", "{form}ENDAT_1",
        "{form}SEQ_2", "{form}TERM_2", "{form}STDAT_2", "{form}ENDAT_2",
    ]]
'''

    return {
        "rule_name": "ae_vae_overlap_pandas",
        "code": code,
        "explanation": (
            f"Matched deterministic Tier 1 rule 'ae_vae_overlap_pandas' -- no Claude call made. "
            f"Pandas self-merge on SUBJID (equivalent to the CQL a1/a2 self-join), filtered to "
            f"{{form}}SEQ_1 < {{form}}SEQ_2 to avoid duplicate/reversed pairs, matched on coded LLT, "
            f"with .fillna() as the pandas equivalent of CQL's IFNULL for ongoing (NULL end date) "
            f"records. Logic verified against synthetic test data covering overlap/non-overlap/"
            f"ongoing cases -- see test_code_templates.py. Column names ({form}TERM_LLT assumes "
            f"pre-coded data) are inferred from CDISC convention, not verified against real study "
            f"metadata."
        ),
    }


RULES = [try_ae_vae_overlap_python]


def apply_python_rules(spec: dict) -> Optional[TemplateMatch]:
    for rule_fn in RULES:
        result = rule_fn(spec)
        if result is not None:
            return result
    return None
