"""
test_code_templates.py — behavioral verification for code_templates.py.

Executes the ACTUAL generated code string (not a hand-written
re-implementation of the same logic) against synthetic AE data covering
every edge case the original CQL precedent (ABC002_JR) was built for:
real overlap, same-LLT-no-overlap, overlap-but-different-LLT, an ongoing
(NULL end date) record, and a subject with only one record. Run this
after any change to the template string in code_templates.py.
"""

import pandas as pd

import code_templates


def _load_generated_function():
    spec = {
        "description": "overlapping adverse events based on matching LLT terms and overlapping onset/end dates",
        "logic": "overlapping onset dates/end dates for identical AE/VAE Terms, same LLT after encoding",
    }
    match = code_templates.apply_python_rules(spec)
    assert match is not None, "Template did not match its own reference spec"

    namespace = {}
    exec(match["code"], namespace)  # noqa: S102 -- executing our own generated template, not user input
    return namespace["find_overlapping_ae_records"]


def test_ae_overlap_edge_cases():
    find_overlapping_ae_records = _load_generated_function()

    ae_df = pd.DataFrame([
        {"SUBJID": "SUBJ-001", "AESEQ": 1, "AETERM": "Bad headache", "AETERM_LLT": "Headache", "AESTDAT": "2024-01-01", "AEENDAT": "2024-01-10"},
        {"SUBJID": "SUBJ-001", "AESEQ": 2, "AETERM": "Head pain", "AETERM_LLT": "Headache", "AESTDAT": "2024-01-05", "AEENDAT": "2024-01-15"},

        {"SUBJID": "SUBJ-002", "AESEQ": 1, "AETERM": "Nausea", "AETERM_LLT": "Nausea", "AESTDAT": "2024-01-01", "AEENDAT": "2024-01-05"},
        {"SUBJID": "SUBJ-002", "AESEQ": 2, "AETERM": "Nausea recur", "AETERM_LLT": "Nausea", "AESTDAT": "2024-02-01", "AEENDAT": "2024-02-05"},

        {"SUBJID": "SUBJ-003", "AESEQ": 1, "AETERM": "Rash", "AETERM_LLT": "Rash", "AESTDAT": "2024-01-01", "AEENDAT": "2024-01-10"},
        {"SUBJID": "SUBJ-003", "AESEQ": 2, "AETERM": "Fever", "AETERM_LLT": "Pyrexia", "AESTDAT": "2024-01-05", "AEENDAT": "2024-01-15"},

        {"SUBJID": "SUBJ-004", "AESEQ": 1, "AETERM": "Cough", "AETERM_LLT": "Cough", "AESTDAT": "2024-01-01", "AEENDAT": None},
        {"SUBJID": "SUBJ-004", "AESEQ": 2, "AETERM": "Cough worse", "AETERM_LLT": "Cough", "AESTDAT": "2024-01-20", "AEENDAT": "2024-01-25"},

        {"SUBJID": "SUBJ-005", "AESEQ": 1, "AETERM": "Dizziness", "AETERM_LLT": "Dizziness", "AESTDAT": "2024-01-01", "AEENDAT": "2024-01-05"},
    ])

    result = find_overlapping_ae_records(ae_df)
    subjects_flagged = set(result["SUBJID"])

    assert subjects_flagged == {"SUBJ-001", "SUBJ-004"}, f"Expected only SUBJ-001, SUBJ-004; got {subjects_flagged}"
    assert len(result) == 2


def test_no_match_for_unrelated_spec():
    spec = {"description": "List all lab values outside normal range", "logic": "Include LB records where LBNRIND is HIGH or LOW"}
    assert code_templates.apply_python_rules(spec) is None


if __name__ == "__main__":
    test_ae_overlap_edge_cases()
    test_no_match_for_unrelated_spec()
    print("All code_templates tests passed.")
