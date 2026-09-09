SET search_path TO spec2code_audit;

CREATE TABLE identifier_registry (
    registry_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_key        TEXT NOT NULL,
    term             TEXT NOT NULL,
    placeholder      TEXT NOT NULL,
    term_type        TEXT NOT NULL CHECK (term_type IN
                        ('study_id','compound_name','protocol_id','sponsor_name','site_id','other')),
    added_by         TEXT NOT NULL,
    added_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (study_key, term)
);
CREATE INDEX idx_registry_study ON identifier_registry (study_key);