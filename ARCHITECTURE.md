# Spec-to-Code: Solution Architecture (for confirmation)

Status as of this build session. Every component below is marked:
**built** (real, tested), **stub** (wired into the graph, does nothing yet),
or **design-only** (not started, described here for sequencing/confirmation
purposes only). This mirrors the ADaM/TLF framework's ARCHITECTURE.md
convention — the point is to confirm what's real before adding more scope,
not to present a roadmap as if it were a status report.

---

## 1. Layer overview

```
Frontend (Next.js/React workspace)    -- built (classic HTML/JS UI kept as a minimal fallback)
        |
FastAPI (main.py)                     -- built
        |
LangGraph Orchestrator (orchestration/graph.py)  -- built
        |
   +----+--------------------------------------------+
   |    Agent Cascade                                |
   |  Spec Review -> RAG -> Tier1 Rules -> Tier3      |
   |  XGBoost(stub) -> Tier4 FineTuned(stub) ->        |
   |  Tier5 Claude -> Guardrails                       |
   +----+--------------------------------------------+
        |
Multi-tenant persistence (db.py / models_db.py / store.py)  -- built
        |
Code-Gen Matrix (EDC system x Language)  -- partially built (see section 5)
```

---

## 2. Frontend

| Component | Status | Detail |
|---|---|---|
| Vanilla HTML/JS UI (`static/`) | **built** | Form -> review -> generate flow, insight display, RAG chip |
| Next.js workspace (`frontend-nextjs/`) | **built** | App Router, TypeScript, Tailwind v4, TanStack Query. Pages: workspace (spec, pipeline timeline, results), clinical modules, spec library, platform. Static export |
| Review console (diff, comments, sign-off) | **design-only** | Not started |


## 2b. Spec types and output languages

| Component | Status | Detail |
|---|---|---|
| `clinical_modules.py` | **built** | Five spec types. EDC/CDM listings are verified; data review, safety monitoring, medical monitoring and ADaM listings are templates (no confirmed spec and code pair yet). Guidance reaches the SQL, SAS and R generators only |
| `GET /api/modules`, `GET /api/targets`, `GET /api/health` | **built** | The UI reads the support matrix from the backend. `coverage` says whether a language has the full pipeline, rules only, or an unverified draft |
| SAS-to-CQL migration | **removed** | The agents and `/api/migrate-sas` were deleted. SAS is an output target and a reference-code format, nothing more |
| Canonical spec IR | **design-only** | See the v2 architecture doc. Today every generator reads the spec fields directly |

## 3. API layer — FastAPI (`main.py`)

**Built.** Endpoints: `POST /api/review`, `POST /api/generate`, `GET /api/specs`, `GET /api/specs/{id}`, `GET /api/specs/{id}/runs`. Tenant-scoped via `X-Tenant-Id` header (defaults to `"default"`).

**Not yet wired:** `main.py`'s routes call Claude directly — they don't invoke `orchestration/graph.py`'s `run_pipeline()`. The LangGraph orchestrator and the FastAPI app currently run in parallel, not together. This was a deliberate deferral (flagged when the graph was first built) to avoid changing live app behavior unasked — still open.

## 4. Orchestration — LangGraph (`orchestration/graph.py`)

**Built and tested** (mocked Claude calls, real routing logic verified):

| Node | Status | Verified how |
|---|---|---|
| `spec_review` | built | Tool-forced Claude call, 3 branch cases tested |
| `route_after_review` (blocked/proceed) | built | 4 routing paths tested incl. force_generate override |
| `rag_retrieval` | built | TF-IDF match/no-match tested |
| `tier1_rules` | built | Byte-exact match against verified precedent |
| `route_after_tier1` (short-circuit) | built | Confirmed zero Claude generation calls on a Tier 1 hit |
| `tier3_xgboost` | **stub** | Appends `not_implemented`, passes through |
| `tier4_finetuned` | **stub** | Appends `not_implemented`, passes through |
| `tier5_claude` | built | Generation + error handling tested |
| `guardrails` | built | 5 structural checks, tested against real + deliberately-broken CQL |

**A2A (agent-to-agent):** Not implemented as a protocol. Current "communication" is LangGraph's own state-passing between nodes in one process — real, but not the standalone A2A protocol your `multi-agent-architecture` notes call for (agent-to-agent across process/service boundaries). Relevant once agents need to run as independent services rather than nodes in one graph — not needed at current scale.

**MCP (agent-to-tool):** Not implemented. Same ambiguity your ADaM framework hit — worth checking whether a verified MCP Python SDK version is available before building against it, rather than building against an unconfirmed package again.

## 5. Code-Gen Matrix (EDC system x Language)

Tracked in `code_gen_registry.py`. Current state:

| | CQL | SQL | SAS | R | Python |
|---|---|---|---|---|---|
| **Veeva** | ✅ verified | design-only | design-only | design-only | ✅ verified |
| **Rave** | n/a | needs precedent | needs precedent | needs precedent | needs precedent |
| **Oracle Clinical One** | n/a | needs precedent | needs precedent | needs precedent | needs precedent |

"Needs precedent" cells are a hard stop, not a to-do — see `code_gen_registry.py`'s docstring. They need a real human-confirmed example before any prompt gets written, same discipline as everything else here.

## 6. RAG / Retrieval

| Component | Status | Detail |
|---|---|---|
| TF-IDF retrieval (`rag_retriever.py`) | **built** | Cosine similarity over Description+Logic+Scenarios, 1 seed precedent |
| Vector DB | **design-only** | Currently in-memory, rebuilt on every startup from `precedents.jsonl`. Your stack already has PostgreSQL — pgvector is the natural fit, matching what `cdisc-pipeline` already uses |
| Hybrid BM25 + dense retrieval | **design-only** | ADaM framework's RAG tier has this pattern (RRF fusion); not ported here yet |
| Graph RAG | **design-only** | Needs an actual knowledge graph (Form/Item/domain relationships) — bigger lift than swapping the embedder, not started |

**Open question for confirmation:** pgvector (reuses your existing Postgres) vs. a standalone vector DB (Pinecone/Weaviate/Chroma) — given `cdisc-pipeline` already has an SBERT+FAISS+cross-encoder setup, is the intent to eventually reuse *that* retriever here, or build a separate one?

## 7. ML tiers

| Component | Status | Detail |
|---|---|---|
| Tier 3: XGBoost | **stub** | Same honest blocker as your ADaM framework hit: needs labeled data. We have exactly 1 precedent — nowhere near enough to train or even sanity-check a classifier |
| Tier 4: Fine-tuned LLM | **stub** | Needs training infrastructure + accumulated (spec, code) pairs. Accumulation mechanism (`export_finetune_data.py`-equivalent) not built yet either |

## 8. Guardrails (`guardrails.py`)

**Built.** 5 structural checks (non-empty, has FROM, no CTE, no bare Subject/Site table join, balanced parens) — all verified against real and deliberately-broken CQL. Explicitly scoped: these check *structure*, not whether a Form/Item actually exists in a real study's metadata (no live Veeva connection to check against).

## 9. Multi-tenant persistence

**Built and tested** — 7 store-level isolation tests + HTTP-level cross-tenant tests, all passing. SQLite locally, swaps to Postgres via `DATABASE_URL`.

## 10. Compliance / audit (21 CFR Part 11)

**Design-only.** ProtocolIQ's EDC platform has real Part 11 audit infrastructure (per your notes: audit trail configuration, 161-table schema). Nothing here yet tracks who generated what, when, or approved it — `GenerationRun` rows exist but there's no approval/sign-off workflow, no immutable audit trail, no electronic signature equivalent.

---

## Decisions needing your confirmation before the next build slice

1. **Wire `main.py` to actually call `run_pipeline()`** instead of running parallel logic? (Changes live behavior: review becomes a graph node, not a separate frontend-orchestrated call.)
2. **Vector DB choice** — pgvector (reuse Postgres) vs. reuse `cdisc-pipeline`'s existing SBERT/FAISS setup vs. something new?
3. **Rave / Oracle Clinical One precedents** — do you have real examples to unblock those, or should those stay parked?
4. **Next.js migration timing** — now, or after the API surface stabilizes further?
5. **A2A/MCP** — needed at current scale (single-process LangGraph), or premature until agents actually need to run as separate services?
