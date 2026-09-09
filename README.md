# Spec-to-Code

Generates code (currently CQL, and Python for one pattern) from CDM
report specifications, using Claude — with raw-text entity extraction,
a spec-review gate, a deterministic rules tier, RAG over verified
precedents, real study-metadata grounding, guardrails at multiple layers
(including Form-existence verification when metadata is loaded), a
shadow-mode ML classifier, and a router that gates which (sponsor spec
format × EDC system × target language) combinations are actually safe to
attempt. See `ARCHITECTURE.md` for the full component-by-component build
status (note: written before some of this session's changes — cross-check
against the code, don't trust it blindly).

Two frontends ship against the same backend: a vanilla HTML/JS one
(`static/`, always available, no build step) and a Next.js one
(`frontend-nextjs/`, adds nothing extra over the vanilla one anymore
except its own UI — raw-text extraction now exists in both).

## Backend setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY

uvicorn main:app --reload --port 8002
```

The vanilla UI is served directly at `http://127.0.0.1:8002`.

**If you have a previous `cdm_spec_to_cql.db` file from an earlier
version of this project, delete it before starting.** The database schema
gained new tables/columns this session (`study_metadata_items`,
`guardrail_reports_json` on generation runs) and `create_all()` only
creates missing tables — it does not add columns to ones that already
exist. There's no migration tool set up yet (no Alembic); a fresh `.db`
file is the only clean path right now.

On first run, the app seeds the `default` tenant's precedent corpus from
`precedents.jsonl` — after that, the database is the source of truth for
precedents; the JSONL file is never read again.

## Study metadata — grounding generation in real Form/Item names

Every generated query up to this point carried the same caveat: Form and
Item names were *inferred* from CDISC convention, not verified against a
real study. That's now optional to fix per-study:

1. **Load it**: `POST /api/study-metadata/upload-csv` with `study_id` and
   `csv_text` (columns: `form`, `item`, optionally `label`/`data_type`) —
   or use the "Study metadata (optional)" panel in either frontend, which
   accepts pasted CSV or a `.csv` file upload.
2. **Use it**: set the same `studyId` on a spec. Generation then gets a
   real `"Known Forms and Items for this study"` block in the prompt
   (instructed to use ONLY those names), and guardrails gain a
   `metadata_grounding` check that verifies every referenced Form
   actually exists in what was loaded — catching a hallucinated Form the
   same way a human QC reviewer would.
3. **Without it**, behavior is unchanged from before: inference from
   CDISC convention, and the metadata guardrail check reports "skipped,
   unverifiable" rather than silently passing.

Metadata is tenant + study_id scoped — same isolation discipline as
everything else (specs, precedents, generation runs).

Known gap: only **Form** existence is checked, not **Item** existence.
Item references are alias-qualified in generated CQL (`a1.AETERM`), and
reliably resolving which alias maps to which Form to check the Item
against needs real alias-resolution logic — deliberately not built yet
rather than risk false positives from a rushed version.

## Next.js frontend (optional, adds raw-text extraction)

**Option A — no Node.js/npm needed at all:** unzip `frontend-static.zip`
(inside `frontend-nextjs/`) and serve the `out/` folder with anything
(`python -m http.server 3000` works, or just open `out/index.html`
directly). Pre-built, hard-coded to call the backend at
`http://127.0.0.1:8002` — rebuild from source (Option B) if your backend
runs elsewhere.

**Option B — build from source:**
```bash
cd frontend-nextjs
npm install
npm run dev          # dev server at :3000, calls backend directly via CORS
# or: npm run build  # regenerates the static export in out/
```

## The (sponsor × EDC system × language) matrix

Every spec carries three routing fields — `specTemplate` (default
`"merck_cdisc_report_library"`), `edcSystem` (default `"veeva"`), and
`language` (default `"cql"`). `generation_router.py` checks whether that
exact combination has a real, verified path before anything runs:

| | CQL | Python | SQL / SAS / R |
|---|---|---|---|
| **Veeva** | ✅ full pipeline (Tier 1→5, guardrails, metadata grounding) | ✅ Tier 1 only, no Claude fallback | ❌ refused |
| **Rave / Oracle Clinical One** | ❌ refused (CQL is Veeva-specific) | ❌ refused | ❌ refused |

Anything marked ❌ is refused with a specific reason **before you can even
submit** — the language/EDC-system selectors in both frontends check
availability client-side and disable the submit button, rather than let
you find out after a wasted round trip. Adding a new verified combination
is a data change in `code_gen_registry.py`/`spec_templates.py` plus a
small dispatch entry in `generation_router.py`, not a pipeline rewrite.

## What actually happens when you submit a Veeva/CQL spec (the default)

1. **(Optional) Extraction** — raw text in, structured fields out, for
   human review. Both frontends.
2. **Spec Review** — a gate, not a suggestion. Blocking findings stop
   generation unless you click "Generate Anyway."
3. **RAG retrieval** — TF-IDF match against your tenant's verified
   precedents, filtered a second time by guardrails before use as a
   few-shot example.
4. **Tier 1 rules** — if the spec matches a known, verified pattern, CQL
   is rendered from a template. **No Claude call for generation.**
5. **Tier 3 (shadow mode)** — predicts and logs, never affects output
   (0% leave-one-out accuracy at 4 training examples).
6. **Tier 5 Claude** — only reached if Tier 1 didn't match. Grounded in
   real study metadata if you loaded any for this spec's `studyId`.
7. **Guardrails** — structural checks, plus Form-existence verification
   if metadata was loaded.

Every generation is persisted, tenant-scoped (`X-Tenant-Id` header —
selector in both UIs).

## Growing the precedent corpus

After a generation, use **"Save as verified precedent"**. Submitted CQL
is guardrail-checked before it's allowed to save. No automatic promotion
from generation output — a human confirms correctness first, always.

## Adding a new language, EDC system, or sponsor format

1. Get one real, human-verified example first. Nothing below should be
   done from general knowledge alone.
2. Register the spec format in `spec_templates.py` if it's a new sponsor.
3. Add the verified cell to `code_gen_registry.py`'s `MATRIX`.
4. Add a Tier 1 rule and/or Tier 5 prompt+handler, wire the dispatch in
   `generation_router.py`.

## Retraining Tier 3

```bash
python train_xgboost.py
```

Trains on the 4 hand-verified examples in `DATASET` inside that file.
Read its docstring before adding more — synthetic/paraphrased examples
are explicitly discouraged there.

## What's NOT wired in yet, even though the code is real and tested

- **`spec_review_agents.py`** (5-field-agent + master multi-agent review)
  and **`code_gen_agents.py`** (7-step sequential multi-agent generation)
  are standalone, tested modules — `main.py` doesn't call either one
  (6x/7x Claude-call cost, a real decision not yet made).
- **A2A / MCP** — not implemented.
- **Graph RAG / real vector embeddings** — retrieval is TF-IDF; no
  model-hub access has been available.
- **SQL, SAS, R (any EDC system) and everything for Rave/Oracle Clinical
  One** — refused by the router, not built.
- **Item-level metadata verification** — only Form existence is checked
  (see above).

## Known gaps in the repo itself, not just the product

- **`ARCHITECTURE.md` is not guaranteed current** — predates several
  sessions of changes including this one. Cross-check against the code.
- **Most of this project's tests were run and passed, but only
  `test_code_templates.py` was ever saved as a file.** Multi-tenancy
  isolation, the rules engine, guardrails at every layer (including the
  new metadata grounding check), both multi-agent systems, the router's
  gate logic, and multiple real end-to-end browser tests all exist only
  as verifications that ran once. Re-running any of them means
  rebuilding the test first.
