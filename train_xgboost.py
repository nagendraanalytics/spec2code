"""
train_xgboost.py — trains the Tier 3 classifier on every real,
hand-verified (spec, matches_ae_overlap_pattern) label that exists in
this project. That's 4 examples total. This is not a benchmark, and the
resulting model should not be trusted to generalize -- it exists to
prove the training/inference pipeline works mechanically, the same
honest framing your ADaM/TLF framework used for its own 15-example
XGBoost tier ("NOT a benchmark, dataset far too small").

Every example below is REAL: each one was actually run through
rules_engine.apply_rules() earlier in this project and its label
confirmed by that run's actual output, not invented for this file.
Nothing here is synthetic filler data.

DO NOT add synthetic/paraphrased examples to pad this dataset out --
that would make it LOOK more substantial without actually being more
substantial. The honest path to a real dataset is more real specs with
real human-confirmed labels (the same "promote to precedent" mechanism
already built for RAG), not synthetic augmentation.
"""

import json
import os

import xgboost as xgb
from sklearn.model_selection import LeaveOneOut

from ml_features import FEATURE_NAMES, extract_features, features_to_vector

MODEL_PATH = os.environ.get("XGBOOST_MODEL_PATH", "tier3_model.json")

# Every entry here is a REAL example already used and verified in this
# project (see the comment on each). label=1 means rules_engine.py's
# ae_vae_overlap rule matched it; label=0 means it correctly did not.
DATASET = [
    (
        # = precedents.jsonl:ABC002_JR, the human-verified precedent itself.
        # Confirmed: rules_engine.apply_rules() renders CQL byte-identical
        # to the verified precedent for this exact spec.
        {
            "description": "This report identifies overlaps in adverse events based on matching LLT terms and overlapping onset/end dates.",
            "logic": "This report lists subjects with overlapping onset dates/end dates for identical AE/VAE Terms. Identical AE/VAE terms are defined as having the same LLT after encoding. Each pair of overlapping adverse events should be output on one line. Note: Continuing adverse events (with no End Date) should also be included in the report.",
        },
        1,
    ),
    (
        # Vaccine-domain variant, used to verify the rule correctly renders
        # FROM VAE instead of FROM AE. Confirmed match in that test.
        {
            "description": "Identify overlapping vaccine adverse events with identical LLT after encoding",
            "logic": "overlapping onset/end dates for vaccine adverse events, identical LLT after encoding",
        },
        1,
    ),
    (
        # Negative control from the rules_engine test suite -- confirmed
        # rules_engine.apply_rules() returns None for this spec.
        {
            "description": "List all lab values outside normal range",
            "logic": "Include LB records where LBNRIND is HIGH or LOW",
        },
        0,
    ),
    (
        # Near-miss negative control (overlap language present, but NOT
        # about coded AE terms) -- confirmed rules_engine.apply_rules()
        # correctly returns None despite the surface-level "overlap" match.
        {
            "description": "Report overlapping study visit windows",
            "logic": "Flag subjects with overlapping visit date ranges",
        },
        0,
    ),
]


def build_training_matrix():
    X = [features_to_vector(extract_features(spec)) for spec, _ in DATASET]
    y = [label for _, label in DATASET]
    return X, y


def leave_one_out_sanity_check(X, y):
    """With n=4, there is no meaningful train/test split -- leave-one-out
    is the least-dishonest way to get ANY signal on whether the features
    carry information, same approach your ADaM framework used at n=15.
    Report this number but do not call it accuracy in any report that
    implies it means something at production scale."""
    loo = LeaveOneOut()
    correct = 0
    predictions = []
    for train_idx, test_idx in loo.split(X):
        X_train = [X[i] for i in train_idx]
        y_train = [y[i] for i in train_idx]
        X_test = [X[i] for i in test_idx]
        y_test = y[test_idx[0]]

        model = xgb.XGBClassifier(n_estimators=10, max_depth=2, eval_metric="logloss")
        model.fit(X_train, y_train)
        pred = int(model.predict(X_test)[0])
        predictions.append((test_idx[0], y_test, pred))
        if pred == y_test:
            correct += 1

    return correct / len(X), predictions


def train_and_save():
    X, y = build_training_matrix()

    loo_accuracy, predictions = leave_one_out_sanity_check(X, y)

    print(f"Dataset size: {len(X)} examples ({sum(y)} positive, {len(y) - sum(y)} negative)")
    print(f"Leave-one-out sanity check: {loo_accuracy:.0%} ({sum(1 for _, t, p in predictions if t == p)}/{len(predictions)})")
    for idx, true_label, pred_label in predictions:
        status = "correct" if true_label == pred_label else "WRONG"
        print(f"  held-out example {idx}: true={true_label} pred={pred_label} [{status}]")
    print()
    print("*** THIS IS NOT A BENCHMARK. n=4 is nowhere near enough data to trust ***")
    print("*** this number at all -- it exists to confirm the pipeline runs, ***")
    print("*** not that the classifier generalizes. Do not report this accuracy ***")
    print("*** figure outside this file's own output. ***")

    # Final model trained on ALL 4 examples (not held out) -- this is what
    # ml_subagent.py actually loads for inference. Saved regardless of the
    # sanity-check result, same as ADaM's MlSubagent shipping despite its
    # own 60% leave-one-out number -- the corroboration gate in
    # ml_subagent.py is what makes shipping a weak model safe, not the
    # model's own accuracy.
    final_model = xgb.XGBClassifier(n_estimators=10, max_depth=2, eval_metric="logloss")
    final_model.fit(X, y)
    final_model.save_model(MODEL_PATH)

    with open(MODEL_PATH + ".meta.json", "w") as f:
        json.dump({
            "feature_names": FEATURE_NAMES,
            "dataset_size": len(X),
            "loo_accuracy": loo_accuracy,
            "trained_on": "4 real hand-verified examples -- see DATASET in train_xgboost.py",
        }, f, indent=2)

    print(f"\nModel saved to {MODEL_PATH} (+ {MODEL_PATH}.meta.json)")
    return final_model


if __name__ == "__main__":
    train_and_save()
