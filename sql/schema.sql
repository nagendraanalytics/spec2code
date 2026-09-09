-- =====================================================================
-- schema.sql — the COMPLETE spec2code database schema in one file:
-- every table, the audit trigger function and its 6 triggers, and the
-- least-privilege application role with correct per-table grants.
--
-- PROVENANCE: the table/function/trigger DDL below (down to the role
-- and grants section) was NOT hand-written -- it is the real output of
-- `pg_dump --schema-only` against a database that was actually built
-- from the live SQLAlchemy models (db.init_db()) plus audit_trail.sql
-- and audit_trail_extension.sql, then verified end-to-end (real writes,
-- real reads, tenant isolation, permission enforcement, atomic model
-- promotion). This file is a faithful capture of a database that was
-- proven to work, not a fresh re-typing of what it should contain.
--
-- This consolidates what previously required 3 separate steps
-- (db.init_db() + audit_trail.sql + audit_trail_extension.sql, in that
-- order) into one script, for a clean, fresh, real Postgres database.
--
-- USAGE:
--   createdb spec2code
--   psql -d spec2code -f schema.sql
--   -- then change the placeholder password below, and point
--   -- DATABASE_URL at spec2code_app, not postgres/superuser.
--
-- This does NOT replace db.init_db() for an app instance that's
-- already running against SQLite locally -- that path is unaffected.
-- This is specifically for standing up a real, complete Postgres
-- database in one step.
-- =====================================================================

--
-- PostgreSQL database dump
--


-- Dumped from database version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: audit_trigger_function(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.audit_trigger_function() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
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
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_log (
    id bigint NOT NULL,
    table_name text NOT NULL,
    record_id text NOT NULL,
    action text NOT NULL,
    tenant_id text,
    app_user text,
    old_data jsonb,
    new_data jsonb,
    changed_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT audit_log_action_check CHECK ((action = ANY (ARRAY['INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


--
-- Name: audit_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.audit_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: audit_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.audit_log_id_seq OWNED BY public.audit_log.id;


--
-- Name: generation_runs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.generation_runs (
    id character varying NOT NULL,
    spec_id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    cql text,
    explanation text,
    retrieved_precedents_json text,
    cascade_trace_json text,
    guardrail_reports_json text,
    status character varying NOT NULL,
    error text,
    created_at timestamp without time zone
);


--
-- Name: learned_patterns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.learned_patterns (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    category character varying,
    pattern_text text NOT NULL,
    source_report_id character varying,
    confirmed boolean NOT NULL,
    created_at timestamp without time zone
);


--
-- Name: model_registry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model_registry (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    model_name character varying NOT NULL,
    version integer NOT NULL,
    status character varying NOT NULL,
    training_data_snapshot json,
    metrics json,
    artifact_path character varying,
    notes text,
    trained_at timestamp without time zone,
    promoted_at timestamp without time zone
);


--
-- Name: precedents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.precedents (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    external_spec_id character varying NOT NULL,
    description text NOT NULL,
    logic text,
    report_scenarios text,
    column_heading text,
    cql text NOT NULL,
    notes text,
    embedding_json text,
    created_at timestamp without time zone
);


--
-- Name: request_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.request_log (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    endpoint character varying NOT NULL,
    method character varying,
    status_code integer,
    latency_ms integer,
    error text,
    created_at timestamp without time zone
);


--
-- Name: spec_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.spec_reviews (
    id character varying NOT NULL,
    spec_id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    readiness character varying NOT NULL,
    insights_json text,
    summary text,
    created_at timestamp without time zone
);


--
-- Name: specs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specs (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    report_id character varying NOT NULL,
    description text NOT NULL,
    column_heading text,
    logic text,
    report_scenarios text,
    sorting text,
    created_at timestamp without time zone
);


--
-- Name: study_metadata_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.study_metadata_items (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    study_id character varying NOT NULL,
    form character varying NOT NULL,
    item character varying NOT NULL,
    label text,
    data_type character varying,
    created_at timestamp without time zone
);


--
-- Name: training_corpus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.training_corpus (
    id character varying NOT NULL,
    tenant_id character varying NOT NULL,
    spec_id character varying NOT NULL,
    generation_run_id character varying,
    spec_features json NOT NULL,
    chosen_tier character varying,
    outcome_label character varying,
    guardrails_passed boolean,
    synthetic_validation_summary json,
    confirmation_source character varying NOT NULL,
    created_at timestamp without time zone
);


--
-- Name: audit_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_log ALTER COLUMN id SET DEFAULT nextval('public.audit_log_id_seq'::regclass);


--
-- Name: audit_log audit_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT audit_log_pkey PRIMARY KEY (id);


--
-- Name: generation_runs generation_runs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generation_runs
    ADD CONSTRAINT generation_runs_pkey PRIMARY KEY (id);


--
-- Name: learned_patterns learned_patterns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.learned_patterns
    ADD CONSTRAINT learned_patterns_pkey PRIMARY KEY (id);


--
-- Name: model_registry model_registry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_registry
    ADD CONSTRAINT model_registry_pkey PRIMARY KEY (id);


--
-- Name: precedents precedents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.precedents
    ADD CONSTRAINT precedents_pkey PRIMARY KEY (id);


--
-- Name: request_log request_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request_log
    ADD CONSTRAINT request_log_pkey PRIMARY KEY (id);


--
-- Name: spec_reviews spec_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spec_reviews
    ADD CONSTRAINT spec_reviews_pkey PRIMARY KEY (id);


--
-- Name: specs specs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specs
    ADD CONSTRAINT specs_pkey PRIMARY KEY (id);


--
-- Name: study_metadata_items study_metadata_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.study_metadata_items
    ADD CONSTRAINT study_metadata_items_pkey PRIMARY KEY (id);


--
-- Name: training_corpus training_corpus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.training_corpus
    ADD CONSTRAINT training_corpus_pkey PRIMARY KEY (id);


--
-- Name: idx_audit_log_changed_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_audit_log_changed_at ON public.audit_log USING btree (changed_at);


--
-- Name: idx_audit_log_table_record; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_audit_log_table_record ON public.audit_log USING btree (table_name, record_id);


--
-- Name: ix_generation_runs_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_generation_runs_tenant_id ON public.generation_runs USING btree (tenant_id);


--
-- Name: ix_learned_patterns_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_learned_patterns_tenant_id ON public.learned_patterns USING btree (tenant_id);


--
-- Name: ix_model_registry_model_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_model_registry_model_name ON public.model_registry USING btree (model_name);


--
-- Name: ix_model_registry_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_model_registry_tenant_id ON public.model_registry USING btree (tenant_id);


--
-- Name: ix_precedents_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_precedents_tenant_id ON public.precedents USING btree (tenant_id);


--
-- Name: ix_request_log_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_request_log_created_at ON public.request_log USING btree (created_at);


--
-- Name: ix_request_log_endpoint; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_request_log_endpoint ON public.request_log USING btree (endpoint);


--
-- Name: ix_request_log_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_request_log_tenant_id ON public.request_log USING btree (tenant_id);


--
-- Name: ix_spec_reviews_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_spec_reviews_tenant_id ON public.spec_reviews USING btree (tenant_id);


--
-- Name: ix_specs_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_specs_tenant_id ON public.specs USING btree (tenant_id);


--
-- Name: ix_study_metadata_items_study_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_study_metadata_items_study_id ON public.study_metadata_items USING btree (study_id);


--
-- Name: ix_study_metadata_items_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_study_metadata_items_tenant_id ON public.study_metadata_items USING btree (tenant_id);


--
-- Name: ix_training_corpus_spec_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_training_corpus_spec_id ON public.training_corpus USING btree (spec_id);


--
-- Name: ix_training_corpus_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_training_corpus_tenant_id ON public.training_corpus USING btree (tenant_id);


--
-- Name: generation_runs audit_generation_runs; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_generation_runs AFTER INSERT OR DELETE OR UPDATE ON public.generation_runs FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();


--
-- Name: learned_patterns audit_learned_patterns; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_learned_patterns AFTER INSERT OR DELETE OR UPDATE ON public.learned_patterns FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();


--
-- Name: model_registry audit_model_registry; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_model_registry AFTER INSERT OR DELETE OR UPDATE ON public.model_registry FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();


--
-- Name: precedents audit_precedents; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_precedents AFTER INSERT OR DELETE OR UPDATE ON public.precedents FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();


--
-- Name: spec_reviews audit_spec_reviews; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_spec_reviews AFTER INSERT OR DELETE OR UPDATE ON public.spec_reviews FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();


--
-- Name: specs audit_specs; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_specs AFTER INSERT OR DELETE OR UPDATE ON public.specs FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();


--
-- Name: generation_runs generation_runs_spec_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generation_runs
    ADD CONSTRAINT generation_runs_spec_id_fkey FOREIGN KEY (spec_id) REFERENCES public.specs(id);


--
-- Name: spec_reviews spec_reviews_spec_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spec_reviews
    ADD CONSTRAINT spec_reviews_spec_id_fkey FOREIGN KEY (spec_id) REFERENCES public.specs(id);


--
-- PostgreSQL database dump complete
--




-- =====================================================================
-- Least-privilege application role + grants
--
-- CHANGE THE PASSWORD before running this anywhere real. After running
-- this script, DATABASE_URL must connect as spec2code_app, not
-- postgres/superuser -- every guarantee below is meaningless against a
-- superuser connection, which bypasses all grants.
-- =====================================================================

-- REQUIRED: pg_dump's own preamble (above) sets search_path to an empty
-- string for its own safety, and never resets it -- without this line,
-- every unqualified table name below fails with "relation ... does not
-- exist" even though the tables genuinely exist (a real bug caught by
-- testing this file end-to-end on a fresh database, not by inspection).
SET search_path TO public;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'spec2code_app') THEN
        CREATE ROLE spec2code_app WITH LOGIN PASSWORD 'CHANGE_ME_BEFORE_REAL_USE';
    END IF;
END
$$;

-- Insert-only: specs, spec_reviews, generation_runs, precedents --
-- matches verified store.py behavior (no UPDATE/DELETE ever used).
GRANT SELECT, INSERT ON specs, spec_reviews, generation_runs, precedents TO spec2code_app;
REVOKE UPDATE, DELETE ON specs, spec_reviews, generation_runs, precedents FROM spec2code_app;

-- learned_patterns: insert + update (confirm_learned_pattern legitimately
-- updates), delete revoked (never used, never should be).
GRANT SELECT, INSERT, UPDATE ON learned_patterns TO spec2code_app;
REVOKE DELETE ON learned_patterns FROM spec2code_app;

-- model_registry: insert (register) + update (promote), delete revoked.
GRANT SELECT, INSERT, UPDATE ON model_registry TO spec2code_app;
REVOKE DELETE ON model_registry FROM spec2code_app;

-- training_corpus, request_log: insert-only, never updated/deleted
-- through the app.
GRANT SELECT, INSERT ON training_corpus TO spec2code_app;
REVOKE UPDATE, DELETE ON training_corpus FROM spec2code_app;
GRANT SELECT, INSERT ON request_log TO spec2code_app;
REVOKE UPDATE, DELETE ON request_log FROM spec2code_app;

-- study_metadata_items: full CRUD -- replace_study_metadata legitimately
-- deletes and re-inserts on every re-upload; deliberately out of the
-- strict-lockdown/audit scope (reference metadata, not a generation
-- record or governance decision).
GRANT SELECT, INSERT, UPDATE, DELETE ON study_metadata_items TO spec2code_app;

-- audit_log: the app may READ it (the /api/audit-log review endpoint),
-- but can NEVER write to it directly -- only the SECURITY DEFINER
-- trigger function can. This is the actual tamper-resistance guarantee.
GRANT SELECT ON audit_log TO spec2code_app;
REVOKE INSERT, UPDATE, DELETE ON audit_log FROM spec2code_app;
REVOKE ALL ON audit_log FROM PUBLIC;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO spec2code_app;
