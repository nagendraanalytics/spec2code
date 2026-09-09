-- =====================================================================
-- audit_trail.sql — a real, trigger-populated, tamper-resistant audit
-- trail for the tables that matter for 21 CFR Part 11 §11.10(e): "record
-- changes shall not obscure previously recorded information."
--
-- Scope, verified against actual store.py write patterns (not guessed):
--   specs, spec_reviews, generation_runs, precedents  -- INSERT-ONLY
--     through the app today -- UPDATE and DELETE revoked entirely.
--   learned_patterns                                   -- INSERT + UPDATE
--     (confirm_learned_pattern legitimately sets confirmed=True) --
--     UPDATE stays permitted, DELETE revoked, and the audit log still
--     captures the before/after of every legitimate update.
--   study_metadata_items                               -- deliberately
--     OUT of scope: replace_study_metadata legitimately DELETEs and
--     re-inserts on every re-upload -- it's reference/supporting
--     metadata, not a record of what was generated, so full lockdown
--     doesn't apply the way it does to the other five.
--
-- CRITICAL, easy to miss: none of the REVOKE statements below mean
-- anything if the app connects as a Postgres superuser (which is what
-- local testing used). This script creates a real least-privilege role,
-- spec2code_app, and the application's DATABASE_URL must connect AS
-- THAT ROLE, not as `postgres`, for any of this enforcement to be real.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. The audit log itself
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS audit_log (
    id            BIGSERIAL PRIMARY KEY,
    table_name    TEXT NOT NULL,
    record_id     TEXT NOT NULL,
    action        TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    tenant_id     TEXT,               -- best available "who" today -- see note below
    app_user      TEXT,               -- populated once real per-user auth exists (see step 4)
    old_data      JSONB,              -- full previous row; NULL for INSERT
    new_data      JSONB,              -- full new row; NULL for DELETE
    changed_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Queries by table+record (reconstruct one row's history) and by time
-- window (what changed between two dates) are the two real access
-- patterns for an audit review -- both need to be fast, not a table scan.
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log (table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_changed_at ON audit_log (changed_at);


-- ---------------------------------------------------------------------
-- 2. The generic trigger function
--
-- SECURITY DEFINER is what makes the lockdown real: this function runs
-- with the privileges of whoever OWNS it (the account running this
-- script, typically an admin/superuser), not the privileges of the role
-- that fired the trigger. That means spec2code_app can be given ZERO
-- direct grants on audit_log at all, and audit rows still get written
-- correctly -- the app can insert/update/delete the tracked tables (per
-- its actual grants below), which fires this trigger, which writes to
-- audit_log using the DEFINER's privileges, not the app's.
-- ---------------------------------------------------------------------

CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_record_id TEXT;
    v_tenant_id TEXT;
    v_app_user TEXT;
BEGIN
    -- current_setting(..., true) with the "missing_ok" flag returns NULL
    -- instead of raising if the app hasn't set this session variable --
    -- safe today (no real per-user auth exists yet), and the exact hook
    -- a future auth system uses: SET LOCAL app.current_user = '<email>'
    -- once each request, before any write, and this starts capturing
    -- genuine user identity with no other change needed here.
    v_app_user := current_setting('app.current_user', true);

    IF TG_OP = 'DELETE' THEN
        v_record_id := (row_to_json(OLD)->>'id');
        v_tenant_id := (row_to_json(OLD)->>'tenant_id');
        INSERT INTO audit_log (table_name, record_id, action, tenant_id, app_user, old_data, new_data)
        VALUES (TG_TABLE_NAME, v_record_id, 'DELETE', v_tenant_id, v_app_user, row_to_json(OLD)::jsonb, NULL);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        v_record_id := (row_to_json(NEW)->>'id');
        v_tenant_id := (row_to_json(NEW)->>'tenant_id');
        INSERT INTO audit_log (table_name, record_id, action, tenant_id, app_user, old_data, new_data)
        VALUES (TG_TABLE_NAME, v_record_id, 'UPDATE', v_tenant_id, v_app_user, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        RETURN NEW;
    ELSE -- INSERT
        v_record_id := (row_to_json(NEW)->>'id');
        v_tenant_id := (row_to_json(NEW)->>'tenant_id');
        INSERT INTO audit_log (table_name, record_id, action, tenant_id, app_user, old_data, new_data)
        VALUES (TG_TABLE_NAME, v_record_id, 'INSERT', v_tenant_id, v_app_user, NULL, row_to_json(NEW)::jsonb);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- ---------------------------------------------------------------------
-- 3. Attach the trigger to every audit-scoped table
-- ---------------------------------------------------------------------

DROP TRIGGER IF EXISTS audit_specs ON specs;
CREATE TRIGGER audit_specs
    AFTER INSERT OR UPDATE OR DELETE ON specs
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_spec_reviews ON spec_reviews;
CREATE TRIGGER audit_spec_reviews
    AFTER INSERT OR UPDATE OR DELETE ON spec_reviews
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_generation_runs ON generation_runs;
CREATE TRIGGER audit_generation_runs
    AFTER INSERT OR UPDATE OR DELETE ON generation_runs
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_precedents ON precedents;
CREATE TRIGGER audit_precedents
    AFTER INSERT OR UPDATE OR DELETE ON precedents
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_learned_patterns ON learned_patterns;
CREATE TRIGGER audit_learned_patterns
    AFTER INSERT OR UPDATE OR DELETE ON learned_patterns
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();


-- ---------------------------------------------------------------------
-- 4. Least-privilege application role
--
-- CHANGE THE PASSWORD before running this anywhere real -- this is a
-- placeholder. After running this script, update DATABASE_URL to
-- connect as spec2code_app, not postgres.
-- ---------------------------------------------------------------------

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'spec2code_app') THEN
        CREATE ROLE spec2code_app WITH LOGIN PASSWORD 'CHANGE_ME_BEFORE_REAL_USE';
    END IF;
END
$$;

-- Insert-only on the four fully-locked tables -- matches verified
-- store.py behavior exactly, nothing more.
GRANT SELECT, INSERT ON specs, spec_reviews, generation_runs, precedents TO spec2code_app;
REVOKE UPDATE, DELETE ON specs, spec_reviews, generation_runs, precedents FROM spec2code_app;

-- learned_patterns: insert + update permitted (confirm_learned_pattern),
-- delete revoked (never used, never should be -- a rejected/superseded
-- pattern should stay in the audit history as confirmed=false, not
-- disappear).
GRANT SELECT, INSERT, UPDATE ON learned_patterns TO spec2code_app;
REVOKE DELETE ON learned_patterns FROM spec2code_app;

-- study_metadata_items: full CRUD -- legitimately out of audit scope,
-- see the header note.
GRANT SELECT, INSERT, UPDATE, DELETE ON study_metadata_items TO spec2code_app;

-- The audit log itself: the app may READ it (that's what the
-- /api/audit-log review endpoint needs), but can never INSERT, UPDATE,
-- or DELETE it directly -- only the SECURITY DEFINER trigger function
-- can write here, regardless of what the app code does or what bug it
-- might have. This is the actual tamper-resistance guarantee, not just
-- a convention the app is expected to follow.
GRANT SELECT ON audit_log TO spec2code_app;
REVOKE INSERT, UPDATE, DELETE ON audit_log FROM spec2code_app;
REVOKE ALL ON audit_log FROM PUBLIC;

-- Sequence usage for the tables spec2code_app can insert into (Postgres
-- requires this separately from table INSERT grants).
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO spec2code_app;
