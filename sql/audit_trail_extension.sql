-- =====================================================================
-- audit_trail_extension.sql — run AFTER audit_trail.sql, against the
-- same database. Covers the three new tables from the training
-- corpus / model registry / observability work.
--
-- model_registry: audited, same reasoning as learned_patterns -- a
--   promotion is a governance decision (which model version is
--   currently trusted), not routine operational data. INSERT (register)
--   and UPDATE (promote) both legitimately happen through the app;
--   DELETE never does.
-- training_corpus: NOT audited, same reasoning as study_metadata_items
--   -- this is accumulated training data, not a governance decision.
--   INSERT-only through the app (add_to_training_corpus never updates
--   or deletes an existing row).
-- request_log: NOT audited -- high-volume observability data, not a
--   regulated record. INSERT-only through the app.
-- =====================================================================

DROP TRIGGER IF EXISTS audit_model_registry ON model_registry;
CREATE TRIGGER audit_model_registry
    AFTER INSERT OR UPDATE OR DELETE ON model_registry
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

GRANT SELECT, INSERT, UPDATE ON model_registry TO spec2code_app;
REVOKE DELETE ON model_registry FROM spec2code_app;

GRANT SELECT, INSERT ON training_corpus TO spec2code_app;
REVOKE UPDATE, DELETE ON training_corpus FROM spec2code_app;

GRANT SELECT, INSERT ON request_log TO spec2code_app;
REVOKE UPDATE, DELETE ON request_log FROM spec2code_app;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO spec2code_app;
