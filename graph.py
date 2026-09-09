"""
orchestration/graph.py — the LangGraph orchestrator for Spec-to-CQL.

Current shape::

    spec_review --route--> [blocked, no force_generate] --> END (status=blocked_needs_review)
                       |--> rag_retrieval -> tier1_rules --route--> [matched]  -> guardrails -> END
                                                                |--> [no match] -> tier3_xgboost(stub)
                                                                                -> tier4_finetuned(stub)
                                                                                -> tier5_claude -> guardrails -> END

Real nodes: spec_review, rag_retrieval, tier1_rules, tier5_claude, guardrails.
Stub nodes: tier3_xgboost, tier4_finetuned -- append "not_implemented" and
pass through unchanged. Same honesty principle as the ADaM/TLF framework's
early skeleton: a stub tier does nothing, and the cascade_trace says so
explicitly rather than implying it ran.

Tier 1 short-circuits Tier 3/4/5 on a match, same as the ADaM cascade --
if a deterministic rule renders the CQL, there's no reason to spend a
Claude call confirming it. Guardrails always run afterward regardless of
which tier produced the CQL.
"""

import logging
from typing import Optional

from langgraph.graph import END, StateGraph

from orchestration.state import PipelineState
import cql_agents
import guardrails as guardrails_module
import ml_subagent
import rules_engine

logger = logging.getLogger("orchestration.graph")

try:
    from rag_retriever import PrecedentStore
except ImportError:  # pragma: no cover
    PrecedentStore = None


def _forced_override(state: PipelineState) -> bool:
    return state.get("readiness") == "needs_revision" and bool(state.get("force_generate"))


# ---------------------------------------------------------------------
# Nodes
# ---------------------------------------------------------------------

def spec_review_node(state: PipelineState) -> dict:
    try:
        result = cql_agents.run_spec_review(state["spec"])
    except cql_agents.AgentError as e:
        logger.warning("spec_review failed for %s: %s", state.get("spec_id"), e)
        return {
            "readiness": None,
            "review_insights": [],
            "review_summary": None,
            "review_error": str(e),
            "status": "error",
        }

    return {
        "readiness": result["readiness"],
        "review_insights": result.get("insights", []),
        "review_summary": result.get("summary", ""),
        "review_error": None,
    }


def route_after_review(state: PipelineState) -> str:
    """Conditional edge: blocked specs stop here unless force_generate is
    set (the "Generate Anyway" override), matching the soft-stop design
    already shipped in main.py's UI flow."""
    if state.get("review_error"):
        return "blocked"
    if state.get("readiness") == "needs_revision" and not state.get("force_generate"):
        return "blocked"
    return "proceed"


def blocked_node(state: PipelineState) -> dict:
    return {
        "status": "error" if state.get("review_error") else "blocked_needs_review",
        "human_review_queue": True,
    }


def rag_retrieval_node(state: PipelineState) -> dict:
    store: Optional["PrecedentStore"] = state.get("_precedent_store")  # injected by run_pipeline, not persisted state
    if store is None:
        return {
            "retrieved_precedents": [],
            "few_shot_block": "",
            "cascade_trace": state.get("cascade_trace", []) + [
                {"tier": "rag", "status": "skipped", "detail": "no precedent store configured"}
            ],
        }

    matches = store.retrieve(state["spec"], k=3, min_score=0.15)
    few_shot_block = store.format_as_few_shot(matches)
    retrieved = [{"spec_id": p.get("spec_id", "?"), "score": round(s, 3)} for p, s in matches]

    return {
        "retrieved_precedents": retrieved,
        "few_shot_block": few_shot_block,
        "cascade_trace": state.get("cascade_trace", []) + [
            {"tier": "rag", "status": "ran", "detail": f"retrieved {len(retrieved)} precedent(s): {[r['spec_id'] for r in retrieved]}"}
        ],
    }


def tier1_rules_node(state: PipelineState) -> dict:
    match = rules_engine.apply_rules(state["spec"])
    if match is None:
        return {
            "cascade_trace": state.get("cascade_trace", []) + [
                {"tier": "rules", "status": "not_matched", "detail": "no deterministic rule matched this spec"}
            ],
        }

    return {
        "cql": match["cql"],
        "explanation": match["explanation"],
        "status": "generated_with_override" if _forced_override(state) else "generated",
        "cascade_trace": state.get("cascade_trace", []) + [
            {"tier": "rules", "status": "ran", "detail": f"matched rule '{match['rule_name']}' -- Tier 3/4/5 skipped"}
        ],
    }


def route_after_tier1(state: PipelineState) -> str:
    last_step = state.get("cascade_trace", [])[-1] if state.get("cascade_trace") else {}
    return "matched" if last_step.get("tier") == "rules" and last_step.get("status") == "ran" else "not_matched"


def _stub_tier_node(tier_name: str):
    """Factory for the tiers that don't exist yet. Each returns a node
    function that does nothing but honestly record that it did nothing,
    so the cascade_trace never implies a tier ran when it didn't."""
    def node(state: PipelineState) -> dict:
        return {
            "cascade_trace": state.get("cascade_trace", []) + [
                {"tier": tier_name, "status": "not_implemented", "detail": f"{tier_name} tier not yet built"}
            ],
        }
    return node


def tier3_xgboost_node(state: PipelineState) -> dict:
    """Runs the Tier 3 classifier in SHADOW MODE (ml_subagent.py) --
    predicts and logs for future evaluation, but the prediction is never
    used to alter routing, skip Tier 4/5, or affect the final CQL. See
    ml_subagent.py's module docstring for why (0% leave-one-out accuracy
    at n=4 -- no demonstrated signal to trust yet)."""
    result = ml_subagent.predict_shadow(state["spec"])
    return {
        "cascade_trace": state.get("cascade_trace", []) + [
            {
                "tier": "xgboost",
                "status": "shadow_mode" if result["ran"] else "not_implemented",
                "detail": (
                    f"predicted_match={result['predicted_match']} confidence={result['confidence']} "
                    f"(SHADOW MODE -- logged only, did not affect routing)"
                    if result["ran"]
                    else result["reason"]
                ),
            }
        ],
    }
tier4_finetuned_node = _stub_tier_node("finetuned_llm")


def tier5_claude_node(state: PipelineState) -> dict:
    metadata_lookup = state.get("_study_metadata_lookup") or {}
    metadata_block = cql_agents.format_metadata_block(metadata_lookup)
    learned_patterns = state.get("_learned_patterns") or []
    learned_patterns_block = cql_agents.format_learned_patterns_block(learned_patterns)
    supporting_doc = state.get("_supporting_doc") or []
    supporting_doc_block = cql_agents.format_supporting_doc_block(supporting_doc)
    try:
        result = cql_agents.run_cql_generation(state["spec"], state.get("few_shot_block", ""), metadata_block, learned_patterns_block, supporting_doc_block)
    except cql_agents.AgentError as e:
        logger.warning("tier5_claude failed for %s: %s", state.get("spec_id"), e)
        return {
            "cql": None,
            "explanation": None,
            "generation_error": str(e),
            "status": "error",
            "cascade_trace": state.get("cascade_trace", []) + [
                {"tier": "claude", "status": "error", "detail": str(e)}
            ],
        }

    return {
        "cql": result.get("cql"),
        "explanation": result.get("explanation"),
        "generation_error": None,
        "status": "generated_with_override" if _forced_override(state) else "generated",
        "cascade_trace": state.get("cascade_trace", []) + [
            {
                "tier": "claude",
                "status": "ran",
                "detail": (
                    "generated CQL via direct tool-free call, grounded in real study metadata"
                    if metadata_block
                    else "generated CQL via direct tool-free call (no study metadata loaded -- Form/Item names inferred)"
                ) + (f"; applied {len(learned_patterns)} confirmed learned pattern(s)" if learned_patterns else "")
                  + ("; grounded in this spec's supporting document" if supporting_doc_block else ""),
            }
        ],
    }


def guardrails_node(state: PipelineState) -> dict:
    if state.get("status") == "error":
        # Nothing to check -- generation already failed upstream.
        return {
            "cascade_trace": state.get("cascade_trace", []) + [
                {"tier": "guardrails", "status": "skipped", "detail": "upstream generation error, nothing to check"}
            ],
        }

    metadata_lookup = state.get("_study_metadata_lookup") or {}
    report = guardrails_module.run_guardrails_with_metadata(state.get("cql", ""), metadata_lookup)
    failed_checks = [c["check"] for c in report["checks"] if not c["passed"]]

    return {
        "guardrail_reports": state.get("guardrail_reports", []) + [report],
        "human_review_queue": state.get("human_review_queue", False) or not report["passed"],
        "cascade_trace": state.get("cascade_trace", []) + [
            {
                "tier": "guardrails",
                "status": "ran",
                "detail": "all checks passed" if report["passed"] else f"FAILED: {failed_checks}",
            }
        ],
    }


# ---------------------------------------------------------------------
# Graph assembly
# ---------------------------------------------------------------------

def build_graph():
    graph = StateGraph(PipelineState)

    graph.add_node("spec_review", spec_review_node)
    graph.add_node("blocked", blocked_node)
    graph.add_node("rag_retrieval", rag_retrieval_node)
    graph.add_node("tier1_rules", tier1_rules_node)
    graph.add_node("tier3_xgboost", tier3_xgboost_node)
    graph.add_node("tier4_finetuned", tier4_finetuned_node)
    graph.add_node("tier5_claude", tier5_claude_node)
    graph.add_node("guardrails", guardrails_node)

    graph.set_entry_point("spec_review")
    graph.add_conditional_edges(
        "spec_review", route_after_review, {"blocked": "blocked", "proceed": "rag_retrieval"}
    )
    graph.add_edge("blocked", END)
    graph.add_edge("rag_retrieval", "tier1_rules")
    graph.add_conditional_edges(
        "tier1_rules", route_after_tier1, {"matched": "guardrails", "not_matched": "tier3_xgboost"}
    )
    graph.add_edge("tier3_xgboost", "tier4_finetuned")
    graph.add_edge("tier4_finetuned", "tier5_claude")
    graph.add_edge("tier5_claude", "guardrails")
    graph.add_edge("guardrails", END)

    return graph.compile()


_compiled_graph = None
_compiled_generation_only_graph = None


def build_generation_only_graph():
    """Second entry point into the same node functions, starting at
    tier1_rules instead of spec_review. Used when spec review already
    happened as a separate call (main.py's /api/review) and re-running
    it here would just be a wasted, duplicate Claude call for a review
    result the caller already has."""
    graph = StateGraph(PipelineState)

    graph.add_node("rag_retrieval", rag_retrieval_node)
    graph.add_node("tier1_rules", tier1_rules_node)
    graph.add_node("tier3_xgboost", tier3_xgboost_node)
    graph.add_node("tier4_finetuned", tier4_finetuned_node)
    graph.add_node("tier5_claude", tier5_claude_node)
    graph.add_node("guardrails", guardrails_node)

    graph.set_entry_point("rag_retrieval")
    graph.add_edge("rag_retrieval", "tier1_rules")
    graph.add_conditional_edges(
        "tier1_rules", route_after_tier1, {"matched": "guardrails", "not_matched": "tier3_xgboost"}
    )
    graph.add_edge("tier3_xgboost", "tier4_finetuned")
    graph.add_edge("tier4_finetuned", "tier5_claude")
    graph.add_edge("tier5_claude", "guardrails")
    graph.add_edge("guardrails", END)

    return graph.compile()


def run_generation_pipeline(spec: dict, spec_id: str, tenant_id: str = "default", force_generate: bool = True, precedent_store=None, study_metadata_lookup: dict = None, learned_patterns: list = None, supporting_doc: list = None) -> PipelineState:
    """Runs tier1_rules -> ... -> guardrails only (no spec_review). Same
    node functions as run_pipeline(), just entered further downstream.
    force_generate defaults True here because by the time this is
    called, the caller (main.py's /api/generate) already knows review
    happened -- readiness gating is /api/review's job, not this one's.
    study_metadata_lookup ({form: {item, ...}}), when provided, grounds
    Tier 5 generation and enables Form-existence guardrail checking.
    learned_patterns (list of confirmed-pattern dicts), when provided,
    grounds Tier 5 generation in conventions discovered from prior
    spec+code migrations for this tenant -- see
    spec_code_crossref_agent.py's module docstring.
    supporting_doc (list of this spec's supporting-document row dicts,
    via store.get_spec_supporting_doc + store.spec_supporting_doc_to_dict),
    when provided, grounds Tier 5 generation in the exact View/Column
    pairs this specific report touches -- see SpecSupportingDocItem's
    docstring in models_db.py."""
    global _compiled_generation_only_graph
    if _compiled_generation_only_graph is None:
        _compiled_generation_only_graph = build_generation_only_graph()

    initial_state: PipelineState = {
        "tenant_id": tenant_id,
        "spec_id": spec_id,
        "spec": spec,
        "force_generate": force_generate,
        "cascade_trace": [],
        "guardrail_reports": [],
        "human_review_queue": False,
        "_precedent_store": precedent_store,
        "_study_metadata_lookup": study_metadata_lookup,
        "_learned_patterns": learned_patterns,
        "_supporting_doc": supporting_doc,
    }
    return _compiled_generation_only_graph.invoke(initial_state)


def run_pipeline(spec: dict, spec_id: str, tenant_id: str = "default", force_generate: bool = False, precedent_store=None, study_metadata_lookup: dict = None) -> PipelineState:
    """Entry point. Runs the full graph for one spec and returns the
    final PipelineState. precedent_store is injected here (not loaded
    inside the node) so callers control which tenant's/project's
    precedent corpus is used -- important now that multi-tenancy enforces
    tenant-scoped data."""
    global _compiled_graph
    if _compiled_graph is None:
        _compiled_graph = build_graph()

    initial_state: PipelineState = {
        "tenant_id": tenant_id,
        "spec_id": spec_id,
        "spec": spec,
        "force_generate": force_generate,
        "cascade_trace": [],
        "review_insights": [],
        "retrieved_precedents": [],
        "guardrail_reports": [],
        "human_review_queue": False,
        "_precedent_store": precedent_store,  # not a declared PipelineState field -- passed through for rag_retrieval_node only
        "_study_metadata_lookup": study_metadata_lookup,
    }

    return _compiled_graph.invoke(initial_state)
