-- =====================================================================
-- Spec2Code Audit Schema — Identifier Registry Extension
-- Purpose: persist known proprietary identifiers (per study) so masking
-- no longer requires manually building the identifiers dict every run.
-- Depends on: spec2code_audit_schema.sql
-- =====================================================================

SET search_path TO spec2code_audit;

CREATE TABLE identifier_registry (
    registry_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_key        TEXT NOT NULL,          -- your internal key grouping a study's identifiers
    term             TEXT NOT NULL,          -- the real proprietary value, e.g. 'ACME-401'
    placeholder      TEXT NOT NULL,          -- the masked replacement, e.g. 'STUDY_A'
    term_type        TEXT NOT NULL CHECK (term_type IN
                        ('study_id','compound_name','protocol_id','sponsor_name','site_id','other')),
    added_by         TEXT NOT NULL,
    added_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (study_key, term)
);
CREATE INDEX idx_registry_study ON identifier_registry (study_key);

-- Access to this table should be as restricted as token_maps, since it
-- effectively holds the same class of sensitive real-world identifiers.
-- REVOKE ALL ON identifier_registry FROM PUBLIC;
-- GRANT SELECT, INSERT ON identifier_registry TO spec2code_masking_admin;

-- ---------------------------------------------------------------------
-- Candidate flags — unregistered terms detected in a raw spec that
-- LOOK like they might need masking, surfaced for human confirmation
-- rather than auto-masked (a false negative here is the dangerous
-- direction, so detection stays advisory, not automatic).
-- ---------------------------------------------------------------------
CREATE TABLE identifier_candidate_flags (
    flag_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spec_id          UUID REFERENCES specs(spec_id),
    candidate_text    TEXT NOT NULL,
    detection_reason  TEXT NOT NULL,          -- which heuristic flagged it
    status           TEXT NOT NULL DEFAULT 'pending_review'
                      CHECK (status IN ('pending_review','confirmed','dismissed')),
    reviewed_by       TEXT,
    reviewed_at       TIMESTAMPTZ,
    flagged_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_candidate_flags_status ON identifier_candidate_flags (status);
