"""
rag_retriever.py — retrieval layer for the Spec-to-CQL pipeline.

Same pattern as the ADaM/TLF framework's orchestration/rag/: a pluggable
Embedder interface, with TfidfEmbedder as the real local implementation
(no network access to a model hub required) and SbertEmbedder documented
as the swap-in point once real SBERT/cross-encoder weights are reachable.

What this does: given a new CDM report spec, retrieve the k most similar
prior specs from a growing corpus of (spec, cql) pairs that have already
been generated and human-verified, and format them as few-shot examples
to inject into the CQL generation prompt. This is retrieval over your
own accumulated precedent -- not retrieval over CQL/CDISC documentation
(that's a separate, complementary corpus you could add later using the
same interface).

Precedent corpus format (JSONL, one object per line):
    {
      "spec_id": "ABC002_JR",
      "description": "...",
      "logic": "...",
      "report_scenarios": "...",
      "cql": "... the human-verified correct CQL for this spec ...",
      "notes": "optional: why this CQL is correct, edge cases it covers"
    }

A precedent only belongs in this corpus once a human has confirmed the
CQL is actually correct -- this is retrieval augmentation, not automatic
accumulation of whatever Claude generated last time. Feeding back
unverified model output would let errors compound across specs that
happen to look similar.

Usage:
    from rag_retriever import PrecedentStore

    store = PrecedentStore.from_jsonl("precedents.jsonl")
    matches = store.retrieve(new_spec, k=3)
    # matches: list of (precedent_dict, score) tuples, highest score first
"""

import json
import logging
from abc import ABC, abstractmethod
from typing import Optional

import guardrails as guardrails_module
import holdout

logger = logging.getLogger("rag_retriever")


def _spec_text(spec: dict) -> str:
    """Concatenate the fields that actually carry semantic content for
    matching -- report IDs and sorting fields are structural, not
    semantic, so they're deliberately excluded."""
    parts = [
        spec.get("description", "") or "",
        spec.get("logic", "") or "",
        spec.get("report_scenarios", "") or spec.get("reportScenarios", "") or "",
        spec.get("column_heading", "") or spec.get("columnHeading", "") or "",
    ]
    return "\n".join(p for p in parts if p)


class Embedder(ABC):
    """Pluggable embedding interface -- same shape as the ADaM/TLF
    framework's orchestration/rag/ Embedder, so a real SBERT
    implementation can swap in later without touching PrecedentStore."""

    @abstractmethod
    def fit(self, texts: list) -> None:
        """Fit/index the embedder against the corpus texts."""

    @abstractmethod
    def similarity(self, query: str, texts: list) -> list:
        """Return a similarity score (higher = more similar) for query
        against each text in texts, same order as texts."""


class TfidfEmbedder(Embedder):
    """Real local implementation: scikit-learn TF-IDF + cosine similarity.
    No network/model-hub access required -- same reasoning as the
    TfidfEmbedder in orchestration/rag/ for the ADaM framework."""

    def __init__(self):
        from sklearn.feature_extraction.text import TfidfVectorizer
        self._vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
        self._matrix = None
        self._fitted_texts: list = []

    def fit(self, texts: list) -> None:
        self._fitted_texts = texts
        self._matrix = self._vectorizer.fit_transform(texts) if texts else None

    def similarity(self, query: str, texts: list) -> list:
        from sklearn.metrics.pairwise import cosine_similarity
        if self._matrix is None or not texts:
            return [0.0] * len(texts)
        query_vec = self._vectorizer.transform([query])
        sims = cosine_similarity(query_vec, self._matrix)[0]
        return sims.tolist()


class SbertEmbedder(Embedder):
    """Documented swap-in point: real sentence-transformers SBERT +
    (optionally) a cross-encoder reranker, matching the setup described
    in cdisc-pipeline. NOT implemented here -- this sandbox has no
    network access to a model hub, same constraint noted in the ADaM
    framework's RAG tier. Swap TfidfEmbedder for this in PrecedentStore
    once run somewhere with model-hub access:

        from sentence_transformers import SentenceTransformer, util
        class SbertEmbedder(Embedder):
            def __init__(self, model_name="all-MiniLM-L6-v2"):
                self.model = SentenceTransformer(model_name)
            def fit(self, texts):
                self._embeddings = self.model.encode(texts, convert_to_tensor=True)
            def similarity(self, query, texts):
                q = self.model.encode(query, convert_to_tensor=True)
                return util.cos_sim(q, self._embeddings)[0].tolist()
    """

    def fit(self, texts: list) -> None:
        raise NotImplementedError("SbertEmbedder requires model-hub access -- see class docstring")

    def similarity(self, query: str, texts: list) -> list:
        raise NotImplementedError("SbertEmbedder requires model-hub access -- see class docstring")


class PrecedentStore:
    def __init__(self, precedents: list, embedder: Optional[Embedder] = None):
        self.precedents = precedents
        self.embedder = embedder or TfidfEmbedder()
        self._texts = [_spec_text(p) for p in precedents]
        self.embedder.fit(self._texts)

    @classmethod
    def from_jsonl(cls, path: str, embedder: Optional[Embedder] = None) -> "PrecedentStore":
        precedents = []
        with open(path, "r", encoding="utf-8") as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                try:
                    precedents.append(json.loads(line))
                except json.JSONDecodeError as e:
                    logger.warning("skipping malformed line %d in %s: %s", line_num, path, e)
        return cls(precedents, embedder=embedder)

    def retrieve(self, spec: dict, k: int = 3, min_score: float = 0.05) -> list:
        """Returns up to k (precedent, score) tuples, highest score first,
        filtering out anything below min_score (near-zero similarity is
        noise, not a useful few-shot example -- injecting an unrelated
        precedent can mislead the model more than including nothing).

        GUARDRAIL (defense in depth): also filters out any precedent
        whose stored CQL fails guardrails.py's structural checks, even
        though the save path (main.py's POST /api/precedents) should
        already prevent bad CQL from being stored at all. This is a
        second, independent check -- it protects against a bad row that
        got in some other way (a legacy seed file, a direct DB edit, a
        future bug in the save path) still being trusted as a "verified"
        few-shot example. A rejected precedent is logged, not silently
        dropped, so a growing rejection rate is visible rather than
        just quietly shrinking the effective corpus."""
        if not self.precedents or holdout.precedents_off():
            return []
        query = _spec_text(spec)
        scores = self.embedder.similarity(query, self._texts)
        ranked = sorted(zip(self.precedents, scores), key=lambda pair: pair[1], reverse=True)

        results = []
        for p, s in ranked:
            if s < min_score:
                continue
            if holdout.is_held_out(p.get("spec_id", "")):
                continue  # the report being evaluated must not be handed its own verified answer
            report = guardrails_module.run_guardrails(p.get("cql", ""))
            if not report["passed"]:
                failed = [c["check"] for c in report["checks"] if not c["passed"]]
                logger.warning(
                    "precedent %s failed guardrails at retrieval time (%s) -- excluded from few-shot results",
                    p.get("spec_id", "?"), failed,
                )
                continue
            results.append((p, s))
            if len(results) >= k:
                break
        return results

    def format_as_few_shot(self, matches: list) -> str:
        """Formats retrieved precedents as a block to inject into the
        prompt. Returns "" if matches is empty, so callers can always
        append the result without an extra if-check."""
        if not matches:
            return ""

        blocks = []
        for precedent, score in matches:
            block = (
                f"--- Similar prior spec (similarity {score:.2f}) ---\n"
                f"Description: {precedent.get('description', '')}\n"
                f"Logic: {precedent.get('logic', '')}\n"
                f"Report Scenarios: {precedent.get('report_scenarios', precedent.get('reportScenarios', ''))}\n"
                f"Correct CQL:\n{precedent.get('cql', '')}"
            )
            if precedent.get("notes"):
                block += f"\nNotes: {precedent['notes']}"
            blocks.append(block)

        return (
            "The following are similar prior specs with human-verified correct CQL. "
            "Use them as style/pattern examples where genuinely applicable -- do not "
            "copy structure that doesn't fit this spec's actual Logic:\n\n"
            + "\n\n".join(blocks)
        )
