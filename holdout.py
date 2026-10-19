"""Evaluation switches for the knowledge sources and precedents.

Used only by the evaluation harness (eval_harness.py). Off by default, so normal runs are unchanged.

- held-out reports: while a report is being evaluated, its own report-scope sources, its report-scope rules and
  its precedent are invisible, so the model is not handed the answer.
- excluded scopes: knowledge of these scopes (for example "report") is ignored, to measure what a scope adds.
- no precedents: the few-shot precedents are not retrieved.

State is module-level and guarded for one evaluation at a time, not per-request: the web app runs requests on other
threads, so a per-thread variable would not reach them. Do not switch it on in a server that is serving users.
"""
from contextlib import contextmanager

_state = {"reports": frozenset(), "scopes": frozenset(), "no_precedents": False}


def configure(reports=(), scopes=(), no_precedents=False) -> None:
    _state["reports"] = frozenset(str(r).strip().lower() for r in reports if str(r).strip())
    _state["scopes"] = frozenset(str(s).strip().lower() for s in scopes if str(s).strip())
    _state["no_precedents"] = bool(no_precedents)


def reset() -> None:
    configure()


@contextmanager
def active(reports=(), scopes=(), no_precedents=False):
    configure(reports, scopes, no_precedents)
    try:
        yield
    finally:
        reset()


def is_held_out(report_label: str) -> bool:
    return bool(report_label) and str(report_label).strip().lower() in _state["reports"]


def scope_excluded(scope: str) -> bool:
    return str(scope).strip().lower() in _state["scopes"]


def precedents_off() -> bool:
    return _state["no_precedents"]
