"""
orchestration/state.py — the shared state object every node in the graph
reads from and writes to. Same role as the ADaM/TLF framework's
orchestration/state.py PipelineState, adapted to CQL generation.

Every field a node doesn't touch stays whatever the previous node left it
as -- LangGraph merges partial dict returns from each node into this
state, it does not require every node to return every key.
"""

from typing import Any, Dict, List, Optional, TypedDict


class InsightRecord(TypedDict):
    category: str  # completeness | ambiguity | consistency | testability | naming
    severity: str  # info | warning | blocking
    finding: str
    suggestion: str


class RagMatch(TypedDict):
    spec_id: str
    score: float


class CascadeStep(TypedDict):
    """One entry per tier the pipeline passed through, in order. Tiers
    not yet built (rules/xgboost/finetuned) log status="not_implemented"
    rather than being silently skipped -- same honesty principle as the
    ADaM framework's cascade_trace: the trace should show what actually
    ran, not imply tiers exist that don't yet."""
    tier: str  # "rules" | "rag" | "xgboost" | "finetuned_llm" | "claude" | "guardrails"
    status: str  # "not_implemented" | "skipped" | "ran" | "error"
    detail: str


class PipelineState(TypedDict, total=False):
    # --- input ---
    tenant_id: str
    spec_id: str
    spec: Dict[str, Any]  # raw spec fields: reportId, description, columnHeading, logic, reportScenarios, sorting
    force_generate: bool  # soft-stop override -- proceed to generation even if readiness == needs_revision
    _precedent_store: Any  # injected PrecedentStore instance, not persisted/serialized state -- see rag_retrieval_node
    _study_metadata_lookup: Any  # injected {form: {item, ...}} dict, not persisted/serialized state -- see tier5_claude_node/guardrails_node
    _learned_patterns: Any  # injected list of confirmed-pattern dicts (store.learned_pattern_to_dict) for this tenant, not persisted/serialized -- see tier5_claude_node

    # --- spec review (gate) ---
    readiness: Optional[str]  # ready | ready_with_notes | needs_revision
    review_insights: List[InsightRecord]
    review_summary: Optional[str]
    review_error: Optional[str]

    # --- RAG (tier 2) ---
    retrieved_precedents: List[RagMatch]
    few_shot_block: str

    # --- tier cascade trace (built up by every tier node, real or stub) ---
    cascade_trace: List[CascadeStep]

    # --- generation output (tier 5 / Claude, currently the only tier that renders) ---
    cql: Optional[str]
    explanation: Optional[str]
    generation_error: Optional[str]

    # --- guardrails (stub for now) ---
    guardrail_reports: List[Dict[str, Any]]

    # --- overall pipeline outcome ---
    status: str  # "blocked_needs_review" | "generated" | "generated_with_override" | "error"
    human_review_queue: bool
