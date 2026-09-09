SET search_path TO spec2code_audit;

CREATE OR REPLACE FUNCTION block_modify() RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'This table is append-only (audit trail). % not permitted.', TG_OP;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_specs_append_only
    BEFORE UPDATE OR DELETE ON specs
    FOR EACH ROW EXECUTE FUNCTION block_modify();

CREATE TRIGGER trg_runs_append_only
    BEFORE UPDATE OR DELETE ON runs
    FOR EACH ROW EXECUTE FUNCTION block_modify();

CREATE TRIGGER trg_reviews_append_only
    BEFORE UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION block_modify();

CREATE VIEW run_lineage AS
SELECT
    r.run_id,
    s.spec_id,
    s.spec_hash,
    s.domain,
    pt.template_name,
    pt.version AS prompt_version,
    r.model_name,
    r.model_params,
    r.pipeline_stage,
    r.status AS run_status,
    rv.reviewer,
    rv.review_status,
    rv.final_code,
    r.started_at,
    rv.reviewed_at
FROM runs r
JOIN specs s ON s.spec_id = r.spec_id
JOIN prompt_templates pt ON pt.template_id = r.prompt_template_id
LEFT JOIN reviews rv ON rv.run_id = r.run_id;