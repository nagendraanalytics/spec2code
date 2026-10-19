-- schema_knowledge_postgres.sql
--
-- Production shape of the knowledge base on PostgreSQL + pgvector.
--
-- STATUS: written but NOT executed or tested anywhere yet (no Postgres server
-- was available where it was written), and the application does not use it
-- yet: the app's SQLAlchemy models (models_db.py) store embeddings as bytes
-- and rank in Python, which works on SQLite and Postgres alike at library
-- scale. Moving retrieval into the database means (1) running this file,
-- (2) copying the rows across, (3) replacing knowledge_store.search() with the
-- query at the bottom. Test it on a copy first.
--
-- The vector dimension must match your embedding model. The built-in hashing
-- fallback is 1024; many sentence-transformers models are 384 or 768.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS knowledge_sources (
    id               text PRIMARY KEY,
    tenant_id        text NOT NULL,
    title            text, filename text, file_hash text, size_bytes integer, raw_path text,
    doc_type         text NOT NULL DEFAULT 'other',
    doc_type_reason  text,
    scope            text NOT NULL DEFAULT 'global' CHECK (scope IN ('global','ta','study')),
    scope_ref        text NOT NULL DEFAULT '',
    standard_version text, license_note text,
    status           text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved','retired')),
    extract_status   text, extract_note text, text_chars integer, chunk_count integer, embed_backend text,
    created_by       text, created_at timestamptz DEFAULT now(),
    approved_by      text, approved_at timestamptz
);
CREATE INDEX IF NOT EXISTS ix_ks_tenant_status ON knowledge_sources (tenant_id, status, scope, scope_ref);
CREATE INDEX IF NOT EXISTS ix_ks_hash ON knowledge_sources (tenant_id, file_hash);

CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id            text PRIMARY KEY,
    tenant_id     text NOT NULL,
    source_id     text NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    position      integer, heading text, text text NOT NULL, meta jsonb DEFAULT '{}'::jsonb,
    embedding     vector(1024),
    embed_backend text,
    tsv           tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(heading,'') || ' ' || text)) STORED
);
CREATE INDEX IF NOT EXISTS ix_kc_source ON knowledge_chunks (source_id);
CREATE INDEX IF NOT EXISTS ix_kc_tsv ON knowledge_chunks USING gin (tsv);
CREATE INDEX IF NOT EXISTS ix_kc_vec ON knowledge_chunks USING hnsw (embedding vector_cosine_ops);

CREATE TABLE IF NOT EXISTS knowledge_rules (
    id text PRIMARY KEY, tenant_id text NOT NULL, name text NOT NULL, description text,
    scope text NOT NULL DEFAULT 'global' CHECK (scope IN ('global','ta','study')), scope_ref text NOT NULL DEFAULT '',
    applies_to jsonb NOT NULL DEFAULT '[]', condition jsonb NOT NULL DEFAULT '{}',
    action_type text NOT NULL, action jsonb NOT NULL DEFAULT '{}', priority integer NOT NULL DEFAULT 100,
    status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved','retired')),
    evidence_source_id text REFERENCES knowledge_sources(id) ON DELETE SET NULL, evidence_note text,
    tests jsonb NOT NULL DEFAULT '[]', version integer NOT NULL DEFAULT 1,
    created_by text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(),
    approved_by text, approved_at timestamptz
);
CREATE INDEX IF NOT EXISTS ix_kr_tenant_status ON knowledge_rules (tenant_id, status, scope, scope_ref);

-- Tenant isolation enforced by the database, not only by application filters.
-- The application sets it per connection:  SET app.tenant_id = '<tenant>';
ALTER TABLE knowledge_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_rules   ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON knowledge_sources USING (tenant_id = current_setting('app.tenant_id', true));
CREATE POLICY tenant_isolation ON knowledge_chunks  USING (tenant_id = current_setting('app.tenant_id', true));
CREATE POLICY tenant_isolation ON knowledge_rules   USING (tenant_id = current_setting('app.tenant_id', true));
-- Row-level security does not apply to the table owner: run the app as a separate, non-owner role.

-- Retrieval: filter by approval and scope chain first, then rank vector + keyword.
-- $1 query vector, $2 query text, $3 study id, $4 therapeutic area, $5 EDC system id, $6 k
--
-- SELECT c.id, s.title, c.heading, c.text,
--        0.55 * (1 - (c.embedding <=> $1)) + 0.45 * ts_rank(c.tsv, plainto_tsquery('english', $2)) AS score
--   FROM knowledge_chunks c JOIN knowledge_sources s ON s.id = c.source_id
--  WHERE s.status = 'approved'
--    AND ( s.scope = 'global'
--       OR (s.scope = 'ta'    AND lower(s.scope_ref) = lower($4))
--       OR (s.scope = 'study' AND lower(s.scope_ref) = lower($3)) )
--    AND ( s.doc_type <> 'edc_guide' OR s.scope_ref = '' OR lower(s.scope_ref) = lower($5) OR s.scope <> 'global' )
--    AND c.embed_backend = $7
--  ORDER BY score * CASE s.scope WHEN 'study' THEN 1.15 WHEN 'ta' THEN 1.07 ELSE 1.0 END DESC
--  LIMIT $6;
