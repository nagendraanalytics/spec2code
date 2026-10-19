# Spec2Code

Turns a clinical specification into reviewed, traceable code in the
language your team needs. Any clinical spec goes in (EDC/CDM listing,
data review, safety monitoring, medical monitoring, ADaM listing) and
code comes out in CQL, SQL, SAS, R or Python. It is not a migration tool:
nothing here translates one language into another.

The pipeline is Spec, Understand, Review, Generate. Under it sit a
deterministic rules tier, RAG over human-verified precedents, real
study-metadata grounding, guardrails at several layers, a shadow-mode ML
classifier, and a router that decides which (spec template x EDC system x
language) combinations are safe to attempt. `ARCHITECTURE.md` has the
component-by-component build status.

**Spec types** (`clinical_modules.py`, `GET /api/modules`): each spec type
carries a starting template and domain guidance for the SQL, SAS and R
generators. Only EDC/CDM listings are verified against real specs. The
other four are templates: output is a draft for programmer review, and a
module becomes "verified" only after a real spec and confirmed code pair.

**Output languages** (`GET /api/targets`): the support matrix comes straight
from `code_gen_registry.py`, so the UI never claims more than the backend
attempts. Unverified targets need `allow_unverified=true`, and the UI makes
the user confirm that first.

**Reference code**: existing code in any language (SAS included) can still
be used as reference. `POST /api/crossref-spec-code` compares it against a
spec to surface conventions the spec never states. Findings stay candidates
until a human confirms them.

Two frontends ship against the same backend: the new Next.js workspace
(`frontend-nextjs/`, the main UI) and a minimal classic HTML/JS one
(`static/`, no build step, served by the backend at `/`).

## Backend setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY

uvicorn main:app --reload --port 8002
```

The classic UI is served directly at `http://127.0.0.1:8002`. The new workspace is described below.

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

## Study setup and EDC systems (v2.7)

- **EDC systems**: 10 are registered (`edc_registry.py`): Veeva Vault CDMS, Medidata Rave, Oracle Clinical One, OpenClinica, Castor, Medrio, Viedoc, REDCap, TrialMaster and Marvin. The list is a suggestion, not an authoritative ranking. Veeva/CQL stays the only verified path. For any other system, SQL, SAS and R can produce an **unverified, metadata-grounded draft**, and only when the study has metadata loaded. CQL and Python stay unavailable for them.
- **Study setup** (UI: Study setup): create a study, upload CSV/XLSX files with items, visits and code lists. Columns are matched by heading aliases, and the upload reports which columns it matched. Every upload is a new immutable **version**; visits and code lists carry over when not re-uploaded; any version can be made active again. The aliases come from general knowledge of common export layouts and have **not been tested against real exports** from each system.
- **Choosing metadata**: per listing in the Workspace, for a whole batch (run settings), or per listing inside a batch (list > study picker, "Apply to checked", or a `studyId` column in the spec file). A listing's own study wins over the batch's. The batch pins the study version at start.
- **Pre-flight check** (`POST /api/preflight`): finds `FORM.Item` references the metadata does not contain, before any model call. Heuristic; never blocks a run.
- Existing SQLite files gain the new column automatically at startup (`db.ensure_columns`).
- Not built yet: knowledge-source uploads (text/CSV/Excel/SAS/CDISC standards, URLs).

## Knowledge base: library, RAG store and rules (v2.8)

UI: **Knowledge** (Library, Globals, TA knowledge, Rules, RAG store, Review queue). Backend: `knowledge_ingest.py`, `knowledge_store.py`, `knowledge_rules.py`, `knowledge_api.py`, `embeddings.py`.

- **Any format in**: PDF, Word (.docx; .doc/.rtf/.odt need LibreOffice), Excel, CSV, text, Markdown, HTML, SAS, JSON, XML. Tables in Word and Excel stay tables; SAS is split by macro or step; prose is split by heading then paragraph.
- **Honest limits**: a scanned PDF is flagged `Needs OCR` (no OCR is run). Tables inside PDFs are read as plain text and may lose their structure. The document-type suggestion is a keyword heuristic, not a model. Nothing was tested on real protocols.
- **Scope chain**: Global, then the study's therapeutic area (set in Study setup), then the study. A more specific scope gets a small ranking boost. EDC references can be limited to one EDC system.
- **Trust**: uploads start as drafts. Only approved sources are retrieved, and changing the scope or type of an approved source sends it back to draft. There is no real authentication yet, so the approver label is not proof of identity.
- **Retrieval**: filter by approval and scope, then a vector plus keyword score. Without `SPEC2CODE_EMBED_MODEL` (a local sentence-transformers model) embeddings are a **lexical hashing fallback** that matches shared words, not meaning. Set the variable and press Reindex for semantic matching.
- **Rules**: scope, condition, action, agents, evidence and example tests. Approval is refused while a rule's own tests fail; editing an approved rule makes a new draft version. The dry run shows what fires, most specific first. **Rules and retrieved knowledge reach the model only when a run has "Use approved knowledge" switched on (Workspace, or a Batch run setting); it is off by default.** See the next section.
- **Postgres**: `schema_knowledge_postgres.sql` is the pgvector, full-text and row-level-security version. It is untested and not wired in; the app currently ranks in Python on SQLite or Postgres.
- Not built yet: protocol structured extraction (visits, schedule of assessments), Claude-proposed rule candidates, history feedback loop, OCR, and binding knowledge into generation.

### Using the knowledge in a run (v2.9)

Switch **Use approved knowledge** on in the Workspace or in a Batch run (`useKnowledge` on the API). It is off by default so the same listing can be run with and without it and compared.

- **Where it goes**: the understanding, review and generate prompts (CQL, SQL, SAS and R). Spec extraction does not use it.
- **What goes in**: approved chunks in the study's scope chain that clear a relevance floor (`SPEC2CODE_KB_MIN_COVERAGE`, default 0.10 of query words, or `SPEC2CODE_KB_MIN_COSINE`, default 0.35, with a real embedding model), at most 5 chunks and `SPEC2CODE_KB_MAX_CHARS` (default 6000) characters; plus approved rules whose condition matches and that bind to that agent. Drafts, retired items and other studies' or areas' content never go in. The floor is a heuristic: tune it on real specs.
- **How the model is told to use it**: as guidance under "REFERENCE KNOWLEDGE". The spec is authoritative; on a conflict the model follows the spec and says so.
- **Rules**: instruction rules, name maps and guardrail rules are given to the model as instructions. A guardrail rule is **not** a check run on the generated code. Tier 1 pattern rules are listed as skipped (not yet executed). A rule overridden by a more specific one is skipped.
- **Recorded on every result**: "Knowledge used" with the sources and rules, what was left out and why, or "not used" when a deterministic Tier 1 rule produced the code without the model.
- **Not measured yet**: nothing here shows the knowledge improves accuracy. Run the same real listings with and without it before relying on it.

## Next.js workspace (main UI)

Stack: Next.js (App Router, static export), React, TypeScript, Tailwind CSS
v4, TanStack Query for server state, a small context store for the
workspace, react-syntax-highlighter for code. Layout: `app/` pages
(workspace, clinical modules, spec library, platform), `components/shell`,
`components/workspace`, `components/ui`, `lib/` (typed API client, workspace
state, pipeline hook).

```bash
cd frontend-nextjs
npm install
npm run dev          # http://localhost:3000, calls the backend by CORS
npm run build        # static export in out/, serve with any static host
# python -m http.server 3000   (run inside out/)
```

The API base URL is `NEXT_PUBLIC_API_BASE` (default `http://127.0.0.1:8002`).
The backend's CORS list allows `localhost:3000` only; add your host in
`main.py` for any other origin.

Note for git: the repository `.gitignore` ignores every `lib/` folder.
`frontend-nextjs/lib/` is explicitly un-ignored; if it ever goes missing
from a checkout, that rule is why.

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
submit** — the language/EDC-system selectors in the UI check
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
selector in the UI).

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

## Adding a new spec type

1. Add an entry to `MODULES` in `clinical_modules.py` with `status: "template"`,
   a summary, typical inputs and outputs, short domain `guidance`, and an
   example spec.
2. It appears in `GET /api/modules` and the UI automatically. The SQL, SAS and
   R generators receive its guidance; the verified CQL path does not.
3. Promote it to `"verified"` only after a real spec and human-confirmed code
   pair exists for it.

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

## Batch runs (many listings in parallel)

Open **Batch runs** in the UI (or use `POST /api/batch`). Add listings from a folder
(browser upload), individual files, a server folder, or the spec library; untick any you
do not want; pick spec type, output language and how many run in parallel; start. Several
batches can run at once and each keeps its own progress, results and ZIP download.

* Inputs: `.json` (one spec or a list), `.csv` / `.xlsx` (one row per listing, columns matched by
  name), `.docx` / `.txt` / `.md` (free text, read into fields by the model when the run starts).
* Each listing runs `[read] -> [understand, optional] -> [review, optional] -> generate`. A review
  with blocking findings skips generation (status *Needs attention*) unless you choose
  "Generate anyway". One failing listing never stops the rest.
* Runs are stored in the database, so they survive a server reload: interrupted work is marked
  *Interrupted* and can be resumed with Retry.
* Settings: `BATCH_MAX_WORKERS` (default 8, listings in flight across all batches),
  `BATCH_MAX_ITEMS` (default 1000 per batch), and `SPEC2CODE_SPEC_ROOTS` (folders the server may
  read for the *Server path* option, separated by `;` on Windows or `:` elsewhere; unset means that
  option is disabled). `pip install openpyxl` is needed for `.xlsx` input.
* Generated code stays a draft until a programmer signs it off. A batch never writes to the
  verified precedent store.


## Spec library: reviews, code and imported history (v2.10)

The library now shows, per spec, its latest review (readiness, findings, summary) and its stored code (language, status, guardrail result, cascade trace, copy button), with filters for source, review outcome and a text search. Runs made in the Workspace and in batches were already stored; they are now visible with their review. Runs store their language from this version on (older rows show no language badge).

**Import executed specs** accepts Excel, CSV or JSON, one row per spec: `Report ID, Description, Logic, Column Heading, Report Scenarios, Sorting`, then optional `Readiness, Review Summary, Review Notes` and `Code` + `Language` (or a column named SAS, SQL, CQL, R or Python), plus `Status`. A dry run shows what will be written. Rows are marked `imported`; a report ID already in the tenant's library is skipped, never overwritten. Imported code is history only. It is not added to the trusted precedent store, which still needs a programmer to confirm code.

API: `GET /api/specs` (with overview), `GET /api/specs/{id}/reviews`, `POST /api/specs/import` (`dryRun` defaults to true). Not stored per run yet: the study/metadata version and the knowledge used.

## Synthetic data management (v2.11)

A **Synthetic data** tab builds test data from a listing's logic, for one listing or a whole batch, so the logic can be reviewed before or after code exists.

- **Generate:** pick library specs, or a batch's listings. One model call per listing, three at a time. Optional study (real Form.Item names come from its metadata) and the "Use approved knowledge" switch. Each run is the next version for that Report ID and retires the previous one.
- **Content of a set:** the distinct conditions found in the logic, and small multi-form cases, each tied to one condition with an expected include or exclude, a boundary flag, a rationale quoting the spec, and open questions where the spec does not decide.
- **Coverage:** per condition, counts of include, exclude and boundary cases. A condition is covered when it has both an include and an exclude case. Cases tied to no known condition are listed.
- **Review:** correct an expectation, add a note, remove a case. Any edit returns a signed-off set to draft. Sign-off needs a reviewer name and refuses while conditions have gaps unless the reviewer acknowledges them. Retired versions are read-only.
- **Export:** CSV (one row per data row, with case, condition, expectation and form first) or JSON.
- API: `POST /api/synthetic/generate`, `GET /api/synthetic`, `GET|PATCH|DELETE /api/synthetic/{id}`, `POST .../approve`, `POST .../reopen`, `GET .../export?format=csv|json`.

Limits: the data is built by a model from the spec's wording, not executed against anything. It does not yet trace generated code against the stored cases (the existing code-tracing check is a separate call and is not wired to these sets). Cases cannot be added in the UI yet (the API accepts them). Batch-wide generation runs from the browser, so closing the tab stops the remaining listings.

## Running code against synthetic data (v2.12)

On an open synthetic set, **Run against code** compares generated code with the set's expectations. Each case has its own subject IDs; code returns rows; an include case passes when all its subjects are returned, an exclude case when none are. Results are TP / TN / FP / FN per case with the reason for each mismatch.

- **SQL: executed here.** The tables are loaded into a throwaway in-memory SQLite database (empty values become NULL), the query runs read-only with a 5 second limit, a single SELECT/WITH only. Leave the box empty to use the newest stored SQL for the Report ID. SQL for another database (names, dialect) may not run; that is recorded as "could not execute", never as a pass or fail.
- **CQL, SAS, others: not executable here.** Download the test pack (data CSVs, expected.csv, the code, README), run it in the real system, upload the result CSV (needs a subject column such as SubjectId or USUBJID). The same comparison runs. An uploaded result is only as good as the run that produced it.
- Cases with no subject ID, or sharing one with another case, are listed and not judged. The generation prompt now asks for a SubjectId column and unique IDs per case; sets made before v2.12 may need fixing.
- A run is marked stale if the set was edited after it. Runs are kept as history per set.
- API: `POST /api/synthetic/{id}/runs/sql`, `POST .../runs/upload`, `GET .../runs`, `GET .../testpack`.

## Public knowledge sources (v2.13)

The Knowledge page has a **Public sources** tab: a catalogue (`knowledge_catalog.json`, edit it to add your own) of public reference material by scope (global, therapeutic area, study). Each entry says how it is obtained, whether its link was checked, and the terms.

- **Fetched by the app (`kind: file`):** CDISC controlled terminology (SDTM, CDASH, ADaM, Define-XML, Protocol, DDF) and the CDISC glossary from NCI EVS, plus ICH E6(R3) and the ICH M11 draft. The fetch runs on the machine the app runs on, so that machine needs internet access. Each file becomes a **draft** source with its URL, retrieval date and terms in the licence note. Nothing is approved automatically.
- **Download by hand, then upload (`kind: manual`):** CDISC implementation guides and Therapeutic Area User Guides, the FDA and PMDA conformance guides, Pinnacle 21 documentation, EDC vendor documentation (Veeva, Rave: customer logins, never fetched), ClinicalTrials.gov protocols for public trials.
- **Built from GitHub (`kind: pack`):** the 823 published CDISC CORE conformance rules. `scripts/build_core_rules_reference.py` turns a clone of github.com/cdisc-org/cdisc-open-rules (MIT) into one CSV of descriptions, messages and citations. Upload it at global scope, type standard. A ready-made copy, `knowledge-pack-core-rules.zip`, was delivered alongside this release.
- **Fetch guards:** https only, host allowlist (`SPEC2CODE_FETCH_HOSTS` adds hosts), public addresses only, redirects re-checked, size cap (`SPEC2CODE_FETCH_MAX_MB`), and a web page returned in place of a file is rejected. DNS rebinding is not fully excluded.
- **Not on the internet:** your studies' protocols, metadata and specs. They come from Study setup and Upload. Therapeutic-area and EDC-specific material beyond the CDISC TAUGs is mostly vendor- or sponsor-held.
- **Not done:** CDISC implementation guides are not fetched automatically (their terms and download links were not verified). The CDISC pilot project data was left out because its terms restrict modification and competing use.

## Loading the CDISC publications (v2.14)

`scripts/import_knowledge_folder.py` loads a folder or zip of reference documents straight into the knowledge library. Built for the full CDISC set (about 150 MB, too big for a browser upload):

    DATABASE_URL=<the app's database> python scripts/import_knowledge_folder.py knowledge_sources.zip --tenant default

- `cdisc_files.py` recognises the usual CDISC file names and sets title, scope and version: SDTMIG 3.2 / 3.3 / 3.4, ADaMIG 1.2 / 1.3, ADaM and SDTM metadata submission guidelines, CDASH Model 1.3, CDASH SAE supplement go in at global scope. The 35 Therapeutic Area User Guides go in at TA scope under a broad area name (Oncology, Diabetes, Infectious Disease, Cardiovascular, Neurology, Nephrology, Respiratory, Dermatology, Gastroenterology, Psychiatry, Pain, Pediatrics, Rare Diseases, Nutrition, Traditional Chinese Medicine). A study uses TA knowledge only when its TA equals the scope name (case-insensitive), so use these names in Study setup, or edit the manifest.
- Everything is stored as a **draft**. Approve in the Review queue, or pass `--approve-as NAME` after reading the manifest. Files it does not recognise go in at global scope as "other" and are flagged. Scripts, styles, images and saved-page asset folders are skipped. Exact duplicates are stored once. Safe to re-run.
- `--dry-run` shows what would happen. A manifest CSV is written; edit it and pass it back with `--overrides` to change any title, scope, TA or version.
- Tested on the supplied 47 documents: 44 stored, 3 exact duplicates, 0 unreadable, 0 unrecognised, about 22,000 chunks, 12 seconds to read.

Known limit: SDTMIG 3.2, 3.3 and 3.4 are all searchable at the same scope, and retrieval does not yet prefer the version a study uses. Approve only the versions in use, or ask for version-aware retrieval. PDF tables are read as plain text and can lose their layout. Retrieval is lexical until an embedding model is configured.

## v2.15 Rules and the vector index from the CDISC sources

Two steps, run where the app's database is (they write to `DATABASE_URL`):

1. `python scripts/import_knowledge_folder.py knowledge_sources.zip --tenant default` stores the documents, splits them into chunks and builds the search index (embeddings are built at import).
2. `python scripts/load_cdisc_starter_rules.py --tenant default` creates 8 hand-written global rules from SDTMIG 3.4 (study day, durations, ISO 8601 partial dates, nulls, tests not done, unplanned visits, ongoing events, USUBJID). Each rule's evidence quote is looked up in the stored text first; a rule whose quote is not found is skipped. Use `--dry-run` to preview.

Optional, needs `ANTHROPIC_API_KEY`: `python scripts/propose_rules_from_source.py --tenant default --source "SDTM Implementation Guide v3.4" --limit 20` (also `POST /api/rules/propose`) sends that one source's strongest requirement passages to Claude and asks for rules. A rule is kept only if its quote is found in the passage, it passes validation, and its own two examples pass. Therapeutic-area sources produce rules scoped to that area.

All rules are created as drafts. Approve them in the Rules tab. The rules are instructions to the model, not code checks. The proposer has been tested with a stubbed model only.

## v2.16 Markdown headings, and a Veeva CDB reference source

The chunker now recognises markdown `#` headings and ignores lines inside code fences, so a `.md` upload keeps its section titles in search results. `veeva_cdb_reference.md` (supplied separately) is a draft summary of Veeva's public CQL, listings and REST API pages. Upload it in Knowledge as Global, type EDC guide, EDC system `veeva`, then approve it. It is a summary that may be out of date; check anything critical against Veeva's current pages.

## v2.17 Draft CQL rules for Veeva CDB

`python scripts/load_cql_starter_rules.py --tenant default` creates 5 draft prompt rules (compare dates as dates and not as RawDate text, state how partial dates are treated, join forms on IDs, filter aggregates with HAVING, state the form status filter). They apply only to CQL runs on Veeva. Each rule's evidence quote must be found in the stored Veeva CDB reference source (`reference_sources/veeva_cdb_reference.md`, upload it first as Global, EDC guide, EDC system `veeva`). The reference is a summary of Veeva's pages, so check each rule against Veeva's current documentation before approving it.

## v2.18 Listing library (AI-drafted)

`listing_library/` holds 101 listing definitions in 18 documents: 70 EDC-neutral listings (enrollment, safety, medications and exposure, labs/vitals/ECG, visits and dates, data management status, and 14 complex cross-form edit checks) and 31 therapeutic-area listings (Oncology, Diabetes, Cardiovascular, Respiratory, Infectious Disease, Neurology, Dermatology, Gastroenterology, Psychiatry, Nephrology, Pediatrics). Each has columns, scenario logic, a "Displays when / Does not display when" pair, sorting and notes.

They are written from general knowledge, not from a specific study, and are marked as AI drafts in their title and text. Each therapeutic-area listing records which imported guide mentions its topic, and only if the guide's stored text contains the term.

Load them as drafts: `python scripts/import_listing_library.py --tenant default` (use `--dry-run` to preview). Nothing is approved by the script. A programmer reads each document and approves it in the Review queue. `python listing_library/build.py` regenerates the documents from `content_*.py`; with `--db` and `--tenant` it re-checks the guide topics against an imported library.

## v2.19 Sponsor knowledge (new scope)
Scope chain is now **global → sponsor → therapeutic area → study**. A study records its sponsor (Study setup, or the `sponsor` field of `/api/studies`). A source or rule with scope `sponsor` applies only to studies of that sponsor; names match ignoring case. A sponsor source or rule never applies to a study with no sponsor set, or to another sponsor's study. Retrieval boost: study 1.15, sponsor 1.10, TA 1.07, global 1.0. Rules of the more specific scope win ties (study 4, sponsor 3, TA 2, global 1).

- Knowledge page has a **Sponsor knowledge** tab; every scope picker (upload, source drawer, rules, public sources) offers "One sponsor".
- `scripts/import_knowledge_folder.py --scope sponsor --scope-ref "Merck"` stores files without a built-in CDISC naming rule at sponsor scope, as drafts.
- Existing databases gain the `studies.sponsor` column automatically at startup.
- Tests: `test_sponsor_scope.py`.

**Isolation.** Sponsor scope separates knowledge for retrieval and rules inside one tenant. It is not a security boundary: anyone with access to the tenant can browse every sponsor's sources. If sponsors' material is confidential from each other, use one tenant (`X-Tenant-Id`) per sponsor.

**Content.** The scope is the structure only. Sponsor-specific content (SAS programs, conventions, SOPs) has to come from the sponsor and is not generated here.

## v2.20 Listing library: all listing types
`listing_library/content_types.py` adds 69 listings in 9 documents beyond EDC edit checks, for 170 listings in 27 documents in total: external (vendor) data, safety reconciliation and coding, protocol deviations, site and operational, SDTM conformance, ADaM checks, patient data listings (CSR appendix style), medical review, and data-management status. All are system-neutral AI drafts, marked as such, and import as drafts through `scripts/import_listing_library.py` (already-imported documents are skipped). Thresholds, windows and code lists are written as `[placeholders]` because they come from the protocol or plan.

## v2.21 Reference sources for other EDC systems
`reference_sources/` now holds draft summaries for REDCap, Oracle Clinical One, Medidata Rave, OpenClinica, Medrio and Castor, beside the Veeva one. They are written only from public pages that could be read, and each says what it does not cover. REDCap (logic syntax and functions) and Oracle Clinical One (custom rules) are substantial. Rave (data access only), OpenClinica, Medrio and Castor are thin: their documentation bodies were not readable or not public, and the files say so. They contain no invented syntax.

Load them as drafts: `python scripts/import_edc_references.py --tenant default` (`--dry-run` to preview). Each is an EDC guide scoped to its EDC system id, so it is used only for runs on that EDC. A programmer checks each against the vendor's current documentation and approves it. Test: `test_edc_references.py`.

## v2.22 Report knowledge: every report is a similarity-searched reference
Scope chain is now **global → sponsor → TA → study → report**. A source with scope `report` carries a report label (usually its Report ID) and is **not** limited to a spec with the same ID. Every report's code and documents sit in the vector index and are found by similarity to the spec being generated.

- **Ranking:** the spec's own report is boosted (report 1.25; study 1.15, sponsor 1.10, TA 1.07, global 1.0). Other reports compete on similarity alone.
- **Prompt:** another report's material is included only if it is clearly similar (vector score at least `SPEC2CODE_KB_SIMILAR_MIN_COSINE`, default 0.50, or keyword coverage at least `SPEC2CODE_KB_SIMILAR_MIN_COVERAGE`, default 0.30), at most `SPEC2CODE_KB_SIMILAR_MAX` (default 3) chunks, and it is labelled "similar report X: a precedent for a similar listing, not this report's own logic". The spec stays authoritative. The three numbers are starting guesses, not tuned on real data.
- **Why it can match:** a report's code often does not use the words of its spec. When the report is in the Spec library, its description, column heading and logic are added to the text that is embedded and keyword-matched for all its chunks. Add the report to the Spec library, then press **Reindex** so already-stored code is re-embedded with that text.
- **Rules** with scope `report` stay exact: they fire only for that Report ID. The per-report supporting document (column mapping, `SpecSupportingDocItem`) also stays keyed by exact Report ID, because it is that report's real column names.
- **Screens:** new **Report knowledge** tab, "One report" in the scope pickers. Search results show whether a hit is the spec's own report.
- **Bulk load:** `python scripts/import_report_knowledge.py <folder-or-zip> --tenant default [--dry-run]`. The label comes from `--map FILE.csv` (file, reportId), `--report-id`, or the file or folder name matched with `--pattern` (default `RID\d+`). A file with no label is stored under its file name. Everything is a draft; `.sas` files become SAS program sources.
- Tests: `test_report_scope.py` (similarity across reports, exact-match boost, spec-text context, floors, labels, importer).

Sponsor-specific knowledge (v2.19) stays separate: a sponsor's shared programs and conventions go in sponsor scope, which is limited to that sponsor's studies.

## v2.24 Evaluation harness
`scripts/run_eval.py` answers the question the earlier versions left open: does the knowledge library make generated code more accurate? See `eval/README.md`.

- **run** generates held-out reports through the real `/api/generate` in several arms: `baseline` (no knowledge), `knowledge` (all approved knowledge) and `knowledge_no_report` (without report-scope material). It calls the model with your API key, so it asks for `--yes` above 20 calls. It is resumable, can repeat each cell (`--repeats`), samples a fixed random subset (`--sample N --seed S`), and removes the Spec rows the run creates.
- **Hold-out:** while a report runs, its own report-scope sources, its report-scope rules and its precedent are hidden (`holdout.py`, off by default, for evaluation only). Reference code kept in global, sponsor or study scope is not hidden, so keep answer keys in report scope.
- **Cases:** a CSV/JSON/JSONL file (`eval/golden_template.csv`) or `--from-library`: reports in the Spec library that have approved SAS programs in report scope, used as the reference code.
- **Grading:** `run` writes a blinded `review_sheet.xlsx` (shuffled, arm hidden) and a separate `review_key.json`. Programmers mark each row correct, partial or wrong, and optionally count conditions handled. `score` then writes `report.md`: accuracy per arm with 95% intervals, and a paired comparison against baseline (better, worse, same, mean difference with a bootstrap interval, sign test).
- **Automatic measures** are proxies and are labelled so: guardrail pass rate, identifier overlap with the reference code, flags for failure patterns seen in earlier runs (RawDate compared with text, `@HDR.Event.Date` as a date source, NOT EXISTS, sorting on a formatted date), whether any knowledge or another report's material reached the prompt, and time.
- **retrieval** needs no model calls: it labels a hit useful when it shares identifiers with the reference code, reports hit rates at 1/3/5, and sweeps a vector-score floor showing the precision and coverage each would give. Use it to set `SPEC2CODE_KB_MIN_COSINE` and `SPEC2CODE_KB_SIMILAR_MIN_COSINE` instead of the current guesses.
- Tests: `test_eval_harness.py`, with the model stubbed.

## v2.25 How a report gets into Report knowledge
Running a report does not store it in Report knowledge, and nothing stores unconfirmed model output. A report enters in three ways:
1. **A programmer confirms the result** ("Confirm as verified precedent" in the Workspace). As well as the precedent store, the spec and the verified CQL are now stored as an approved report-scope source (approved in the confirming user's name, since the confirmation is the verification). Confirming the same report again retires the earlier copy, so there is one current version per report. The response includes `reportKnowledge`.
2. **Files uploaded or imported with a report label:** the Report knowledge tab (type a Report ID first), or `scripts/import_report_knowledge.py`. These arrive as drafts.
3. **Backfill:** `python scripts/backfill_report_knowledge.py --tenant default` adds precedents confirmed before this version (`--dry-run` to preview, `--by` sets the approver name).

Tests: `test_report_scope.py`.

## v2.26 The listing library as specs
`listing_library/listing_specs.json` and `listing_specs.xlsx` hold all 170 listings as specs in the upload format of Batch runs and the Workspace: Report ID (`LIB-ENR-01` and so on), description (title first), numbered column headings, logic, scenarios (the displays-when and does-not-display-when text) and sorting. The xlsx adds three columns for people: Document, Placeholders to fill, and Notes. `python listing_library/build.py` regenerates them with the markdown files.

Use: upload the file in **Batch runs** (Add listings), choose a study so the generated code uses real form and item names, and run. 58 specs have `[placeholders]` (thresholds, windows, protocol limits) in their logic; fill those in first, or the model will have to guess. Results are drafts. When a programmer confirms one as a verified precedent, the spec and code enter Report knowledge. The Spec library fills as these runs are made; it is not filled by the file itself.

The listings carry no verified code. They are AI-drafted starting points: expect to edit the logic as well as the output.

## Troubleshooting: "Could not load the target list"
The screen now shows the real error. A batch can still be started when the list cannot be loaded; the server validates each listing.
1. Make sure the backend is running (default http://127.0.0.1:8002) and restart it after updating the code.
2. Open http://127.0.0.1:8002/api/targets in the browser. A JSON answer means the API is fine; an error text is the cause.
3. From the app folder run `python scripts/diagnose.py` and send any FAIL lines.

## Listings as knowledge
Batch runs → "Use selected listings as knowledge" saves the specification text of the selected listings (never code) at a chosen scope: global, standard, therapeutic area, sponsor or study. They are drafts unless "Approve now" is ticked.
