SET search_path TO spec2code_audit;

CREATE TABLE identifier_candidate_flags (
    flag_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spec_id          UUID REFERENCES specs(spec_id),
    candidate_text    TEXT NOT NULL,
    detection_reason  TEXT NOT NULL,
    status           TEXT NOT NULL DEFAULT 'pending_review'
                      CHECK (status IN ('pending_review','confirmed','dismissed')),
    reviewed_by       TEXT,
    reviewed_at       TIMESTAMPTZ,
    flagged_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_candidate_flags_status ON identifier_candidate_flags (status);