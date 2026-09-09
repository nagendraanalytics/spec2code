-- =====================================================================
-- Spec2Code Audit & Compliance Schema (PostgreSQL)
-- Purpose: 21 CFR Part 11 / ALCOA+ compliant audit trail for
--          spec -> generated code -> review -> final code lifecycle
-- =====================================================================

CREATE SCHEMA IF NOT EXISTS spec2code_audit;
SET search_path TO spec2code_audit;

-- ---------------------------------------------------------------------
-- 1. Prompt templates (versioned, immutable once created)
-- ---------------------------------------------------------------------
CREATE TABLE prompt_templates (
    template_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name       TEXT NOT NULL,
    version             TEXT NOT NULL,
    template_text        TEXT NOT NULL,
    created_by          TEXT NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (template_name, version)
);

-- ---------------------------------------------------------------------
-- 2. Specs (masked text only — never store unmasked proprietary spec here)
-- ---------------------------------------------------------------------
CREATE TABLE specs (
    spec_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spec_hash           TEXT NOT NULL,
    spec_version         TEXT,
    masked_spec_text     TEXT NOT NULL,
    domain              TEXT,
    ingested_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    ingested_by          TEXT NOT NULL
);
CREATE INDEX idx_specs_hash ON specs (spec_hash);

-- ---------------------------------------------------------------------
-- 3. Token maps (masking key) — SEPARATE table, tighter access control.
-- ---------------------------------------------------------------------
CREATE TABLE token_maps (
    map_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spec_id             UUID NOT NULL REFERENCES specs(spec_id),
    token_map           JSONB NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by          TEXT NOT NULL
);
CREATE INDEX idx_token_maps_spec ON token_maps (spec_id);

-- ---------------------------------------------------------------------
-- 4. Runs — one row per Spec2Code pipeline execution
-- ---------------------------------------------------------------------
CREATE TABLE runs (
    run_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spec_id              UUID NOT NULL REFERENCES specs(spec_id),
    prompt_template_id    UUID NOT NULL REFERENCES prompt_templates(template_id),
    model_name           TEXT NOT NULL,
    model_params          JSONB NOT NULL,
    pipeline_stage        TEXT NOT NULL,
    generated_output      TEXT NOT NULL,
    started_at           TIMESTAMPTZ NOT NULL,
    completed_at          TIMESTAMPTZ NOT NULL,
    status               TEXT NOT NULL DEFAULT 'generated'
                          CHECK (status IN ('generated','under_review','approved','rejected'))
);
CREATE INDEX idx_runs_spec ON runs (spec_id);
CREATE INDEX idx_runs_status ON runs (status);

-- ---------------------------------------------------------------------
-- 5. Reviews — the compliance gate; one or more per run
-- ---------------------------------------------------------------------
CREATE TABLE reviews (
    review_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id               UUID NOT NULL REFERENCES runs(run_id),
    reviewer             TEXT NOT NULL,
    review_status         TEXT NOT NULL CHECK (review_status IN ('approved','rejected','revision_requested')),
    comments             TEXT,
    final_code            TEXT,
    reviewed_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_reviews_run ON reviews (run_id);

-- ---------------------------------------------------------------------
-- 6. Known limitations register
-- ---------------------------------------------------------------------
CREATE TABLE known_limitations (
    limitation_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description          TEXT NOT NULL,
    category             TEXT,
    affected_domain        TEXT,
    added_by             TEXT NOT NULL,
    added_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at           TIMESTAMPTZ
);

--