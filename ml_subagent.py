"""
ml_subagent.py — Tier 3. Loads the model trained by train_xgboost.py and
predicts, but runs in SHADOW MODE ONLY: its prediction is logged for
future evaluation, never used to render CQL, never used to gate or
override Tier 1's decision, never blocks or skips Tier 5.

Why shadow mode, not corroboration mode (which is what your ADaM
framework's MlSubagent does): corroboration mode still means the model's
output affects something -- ADaM's version only renders when the model
AGREES with a Tier 1 regex match, but that agreement still gates
behavior. At 0% leave-one-out accuracy on 4 examples, this model has no
demonstrated signal at all -- letting it gate anything, even by
agreement, would be trusting a coin flip. Shadow mode is the honest
middle ground: the infrastructure is real and wired in, but it earns no
authority over outcomes until there's actually a trained model with
real accuracy to point to.

Promote this out of shadow mode only after: (1) the precedent/training
corpus has grown well past 4 examples (the "promote to precedent" button
in the UI is the actual path to that), and (2) a real train/test
evaluation (not leave-one-out on a handful of points) shows accuracy
worth trusting.
"""

import os
from typing import Optional

import xgboost as xgb

from ml_features import FEATURE_NAMES, extract_features, features_to_vector

MODEL_PATH = os.environ.get("XGBOOST_MODEL_PATH", "tier3_model.json")

_model: Optional[xgb.XGBClassifier] = None
_model_load_error: Optional[str] = None


def _get_model() -> Optional[xgb.XGBClassifier]:
    global _model, _model_load_error
    if _model is not None:
        return _model
    if _model_load_error is not None:
        return None
    if not os.path.exists(MODEL_PATH):
        _model_load_error = f"no trained model found at {MODEL_PATH} -- run train_xgboost.py first"
        return None
    try:
        model = xgb.XGBClassifier()
        model.load_model(MODEL_PATH)
        _model = model
        return _model
    except Exception as e:  # noqa: BLE001
        _model_load_error = f"failed to load model: {e}"
        return None


def predict_shadow(spec: dict) -> dict:
    """Returns a prediction dict for LOGGING ONLY. Callers must not use
    "predicted_match" to make any decision -- see module docstring for
    why. Always returns a result (never raises) so a shadow-mode
    prediction failure can never break the real pipeline it's shadowing."""
    model = _get_model()
    if model is None:
        return {
            "ran": False,
            "reason": _model_load_error or "model unavailable",
            "predicted_match": None,
            "confidence": None,
        }

    features = extract_features(spec)
    vector = features_to_vector(features)

    try:
        pred = int(model.predict([vector])[0])
        proba = model.predict_proba([vector])[0]
        confidence = float(proba[pred])
    except Exception as e:  # noqa: BLE001
        return {"ran": False, "reason": f"prediction failed: {e}", "predicted_match": None, "confidence": None}

    return {
        "ran": True,
        "reason": "shadow mode -- prediction logged only, does not affect routing (see module docstring: 0% LOO accuracy at n=4)",
        "predicted_match": bool(pred),
        "confidence": round(confidence, 3),
        "features": features,
    }
