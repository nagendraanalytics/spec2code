SET search_path TO spec2code_audit;

CREATE VIEW run_deployable AS
SELECT
    r.run_id,
    r.status AS run_status,
    rv.review_id AS approving_review_id,
    rv.reviewer AS approved_by,
    rv.reviewed_at AS approved_at,
    rv.final_code
FROM runs r
JOIN reviews rv ON rv.run_id = r.run_id
WHERE rv.reviewer_role = 'programmer'
  AND rv.review_status = 'approved'
  AND rv.round_number = (
      SELECT MAX(round_number) FROM reviews WHERE run_id = r.run_id
  );

CREATE VIEW review_queue AS
SELECT
    a.assignment_id,
    a.run_id,
    a.assigned_to,
    a.assigned_role,
    a.status,
    a.due_at,
    (a.due_at IS NOT NULL AND a.due_at < now() AND a.status <> 'completed') AS is_overdue
FROM review_assignments a
WHERE a.status IN ('pending','in_progress','escalated')
ORDER BY a.due_at ASC NULLS LAST;