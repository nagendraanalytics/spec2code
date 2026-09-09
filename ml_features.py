"""
ml_features.py — feature extraction for the Tier 3 XGBoost classifier.

Deliberately reuses the SAME boolean signals rules_engine.py's regex
heuristic checks (has_overlap, has_identical_term, has_encoding,
has_ae_domain), rather than inventing separate ML-only features. This
matters for the corroboration design in ml_subagent.py: if XGBoost used
totally different signals than the Tier 1 regex, "corroboration" would
just mean two unrelated methods happening to agree, not two methods
checking related evidence and confirming each other.
"""

import re

FEATURE_NAMES = [
    "has_overlap",
    "has_identical_term",
    "has_encoding",
    "has_ae_domain",
    "has_vaccine",
    "text_length",
    "logic_bullet_count",
    "mentions_ongoing",
]


def extract_features(spec: dict) -> dict:
    text = f"{spec.get('description', '')} {spec.get('logic', '')}".lower()
    logic = spec.get("logic", "") or ""

    return {
        "has_overlap": int("overlap" in text),
        "has_identical_term": int(("identical" in text or "same" in text) and ("llt" in text or "term" in text)),
        "has_encoding": int("encod" in text or bool(re.search(r"\bcod(ed|ing)\b", text))),
        "has_ae_domain": int(bool(re.search(r"\b(adverse event|\bae\b|\bvae\b)", text))),
        "has_vaccine": int("vaccine" in text),
        "text_length": len(text),
        "logic_bullet_count": logic.count("\n-") + logic.count("\n\u2022"),
        "mentions_ongoing": int("ongoing" in text or "continuing" in text),
    }


def features_to_vector(features: dict) -> list:
    return [features[name] for name in FEATURE_NAMES]
