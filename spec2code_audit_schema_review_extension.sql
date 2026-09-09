SET search_path TO spec2code_audit;

ALTER TABLE reviews
    ADD COLUMN reviewer_role   TEXT NOT NULL DEFAULT 'programmer'
        CHECK (reviewer_role IN ('programmer','statistician','qa','lead')),
    ADD COLUMN round_number     INT NOT NULL DEFAULT 1;

CREATE TABLE review_assignments (
    assignment_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id              UUID NOT NULL REFERENCES runs(run_id),
    assigned_to          TEXT NOT NULL,
    assigned_role         TEXT NOT NULL CHECK (assigned_role IN ('programmer','statistician','qa','lead')),
    assigned_by          TEXT NOT NULL,
    assigned_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    due_at               TIMESTAMPTZ,
    status               TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','in_progress','completed','escalated')),
    completed_review_id   UUID REFERENCES reviews(review_id)
);
CREATE INDEX idx_assignments_run ON review_assignments (run_id);
CREATE INDEX idx_assignments_status ON review_assignments (status);

CREATE TRIGGER trg_assignments_append_only
    BEFORE DELETE ON review_assignments
    FOR EACH ROW EXECUTE FUNCTION block_modify();

CREATE TABLE review_checklist_items (
    item_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id           UUID NOT NULL REFERENCES reviews(review_id),
    checklist_item        TEXT NOT NULL,
    category             TEXT,
    passed               BOOLEAN NOT NULL,
    notes                TEXT
);
CREATE INDEX idx_checklist_review ON review_checklist_items (review_id);

CREATE TRIGGER trg_checklist_append_only
    BEFORE UPDATE OR DELETE ON review_checklist_items
    FOR EACH ROW EXECUTE FUNCTION block_modify();

CREATE VIEW run_signoff_status AS
SELECT
    r.run_id,
    r.status AS run_status,
    MAX(rv.round_number) AS latest_round,
    COUNT(*) FILTER (
        WHERE rv.round_number = (SELECT MAX(round_number) FROM reviews WHERE run_id = r.run_id)
          AND rv.review_status = 'approved'
    ) AS approvals_in_latest_round,
    ARRAY_AGG(DISTINCT rv.reviewer_role) FILTER (
        WHERE rv.round_number = (SELECT MAX(round_number) FROM reviews WHERE run_id = r.run_id)
          AND rv.review_status = 'approved'
    ) AS approved_roles,
    BOOL_AND(rv.review_status = 'approved') FILTER (
        WHERE rv.round_number = (SELECT MAX(round_number) FROM reviews WHERE run_id = r.run_id)
    ) AS latest_round_fully_approved
FROM runs r
LEFT JOIN reviews rv ON rv.run_id = r.run_id
GROUP BY r.run_id, r.status;

CREATE VIEW run_deployable AS
SELECT
    r.run_id,
    r.status AS run_status,
    rv.review_id AS approving_review_id,