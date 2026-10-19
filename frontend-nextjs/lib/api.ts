import type {
  BatchDetail,
  BatchItemDetail,
  BatchOptions,
  BatchSummary,
  ClinicalModule,
  EdcSystem,
  FiredRule,
  KbRule,
  KbSearchResult,
  KbSourceDetail,
  KbSource,
  KbStats,
  KbUploadResult,
  ReviewQueue,
  RuleDraft,
  RuleTestResult,
  PreflightResult,
  StudyDetail,
  StudyItems,
  StudySummary,
  UploadResult,
  GenerateResult,
  ParseResult,
  ReviewResult,
  ReviewRow,
  HistoryImportResult,
  RunRow,
  SpecFields,
  SpecRow,
  SynSet,
  CatalogEntry,
  CatalogFetchResult,
  SynRun,
  SynCase,
  SynCondition,
  Target,
  UnderstandResult,
} from "./types";

// The app is a static export, so there is no server-side proxy: the browser
// calls the FastAPI backend directly (CORS is configured in main.py).
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

async function request<T>(path: string, tenantId: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", "X-Tenant-Id": tenantId, ...(init?.headers ?? {}) },
    });
  } catch {
    throw new Error(`Cannot reach the Spec2Code API at ${API_BASE}. Is the backend running?`);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `Request failed (${res.status})`);
  return body as T;
}

const post = <T,>(path: string, tenantId: string, body: unknown) =>
  request<T>(path, tenantId, { method: "POST", body: JSON.stringify(body) });

export const getHealth = (tenantId: string) =>
  request<{ status: string; modelKeyConfigured: boolean }>("/api/health", tenantId);
export const getModules = (tenantId: string) =>
  request<{ defaultModule: string; modules: ClinicalModule[] }>("/api/modules", tenantId);
export const getTargets = (tenantId: string, studyId = "") =>
  request<{ targets: Target[] }>(`/api/targets${studyId ? `?studyId=${encodeURIComponent(studyId)}` : ""}`, tenantId);
export const getEdcSystems = (tenantId: string) => request<{ edcSystems: EdcSystem[] }>("/api/edc-systems", tenantId);

export const extractSpec = (rawText: string, tenantId: string) =>
  post<Omit<SpecFields, "specTemplate" | "edcSystem" | "language" | "studyId" | "specType" | "listingType" | "useKnowledge"> & { extraction_notes?: string }>(
    "/api/extract",
    tenantId,
    { rawText },
  );
export const understandSpec = (spec: SpecFields, tenantId: string) =>
  post<UnderstandResult>("/api/understand", tenantId, spec);
export const reviewSpec = (spec: SpecFields, tenantId: string) => post<ReviewResult>("/api/review", tenantId, spec);

export const generateCode = (spec: SpecFields, specId: string, allowUnverified: boolean, tenantId: string) => {
  const q = new URLSearchParams({ force_generate: "true", allow_unverified: String(allowUnverified) });
  if (specId) q.set("spec_id", specId);
  return post<GenerateResult>(`/api/generate?${q.toString()}`, tenantId, spec);
};

export const savePrecedent = (spec: SpecFields, code: string, notes: string, tenantId: string) =>
  post("/api/precedents", tenantId, {
    spec_id: spec.reportId,
    description: spec.description,
    logic: spec.logic,
    report_scenarios: spec.reportScenarios,
    column_heading: spec.columnHeading,
    cql: code,
    notes,
  });

export const listSpecs = (tenantId: string) => request<SpecRow[]>("/api/specs", tenantId);
export const listReviews = (specId: string, tenantId: string) => request<ReviewRow[]>(`/api/specs/${specId}/reviews`, tenantId);
export const importHistory = (files: { name: string; data: string }[], dryRun: boolean, tenantId: string) =>
  post<HistoryImportResult>("/api/specs/import", tenantId, { files, dryRun });
export const listRuns = (specId: string, tenantId: string) => request<RunRow[]>(`/api/specs/${specId}/runs`, tenantId);

// ---- Batch runs -----------------------------------------------------------

export const parseFiles = (files: { name: string; data: string }[], tenantId: string) =>
  post<ParseResult>("/api/batch/parse", tenantId, { files });
export const scanServerFolder = (path: string, recursive: boolean, tenantId: string) =>
  post<ParseResult>("/api/batch/scan", tenantId, { path, recursive });

export type BatchItemIn = { name: string; studyId?: string; spec?: Partial<SpecFields> | null; rawText?: string | null };
export const createBatch = (name: string, options: BatchOptions, items: BatchItemIn[], tenantId: string) =>
  post<BatchSummary>("/api/batch", tenantId, { name, options, items });
export const listBatches = (tenantId: string) => request<BatchSummary[]>("/api/batch", tenantId);
export const getBatch = (id: string, tenantId: string) => request<BatchDetail>(`/api/batch/${id}`, tenantId);
export const getBatchItem = (id: string, itemId: string, tenantId: string) =>
  request<BatchItemDetail>(`/api/batch/${id}/items/${itemId}`, tenantId);
export const cancelBatch = (id: string, tenantId: string) => post(`/api/batch/${id}/cancel`, tenantId, {});
export const retryBatch = (id: string, tenantId: string, itemIds?: string[], generateAnyway = false) =>
  post<{ queued: number }>(`/api/batch/${id}/retry`, tenantId, { itemIds: itemIds ?? null, generateAnyway });
export const deleteBatch = (id: string, tenantId: string) => request(`/api/batch/${id}`, tenantId, { method: "DELETE" });

/** The ZIP needs the tenant header, so it is fetched and saved as a blob rather than linked. */
export async function downloadBatch(id: string, name: string, tenantId: string) {
  const res = await fetch(`${API_BASE}/api/batch/${id}/download`, { headers: { "X-Tenant-Id": tenantId } });
  if (!res.ok) throw new Error(`Download failed (${res.status})`);
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.replace(/[^A-Za-z0-9._-]+/g, "_") || "batch"}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---- Study setup (metadata loader) -----------------------------------------

export const listStudies = (tenantId: string) => request<StudySummary[]>("/api/studies", tenantId);
export const getStudy = (id: string, tenantId: string) => request<StudyDetail>(`/api/studies/${encodeURIComponent(id)}`, tenantId);
export const createStudy = (studyId: string, name: string, edcSystem: string, tenantId: string, ta = "", sponsor = "") =>
  post<StudySummary>("/api/studies", tenantId, { studyId, name, edcSystem, ta, sponsor });
export const deleteStudy = (id: string, tenantId: string) =>
  request(`/api/studies/${encodeURIComponent(id)}`, tenantId, { method: "DELETE" });

/** Upload failures carry per-file messages, so the error text is joined with them. */
export async function uploadMetadata(
  id: string,
  files: { name: string; data: string }[],
  carryOver: boolean,
  notes: string,
  tenantId: string,
): Promise<UploadResult> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/studies/${encodeURIComponent(id)}/metadata`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Tenant-Id": tenantId },
      body: JSON.stringify({ files, carryOver, notes }),
    });
  } catch {
    throw new Error(`Cannot reach the Spec2Code API at ${API_BASE}. Is the backend running?`);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const b = body as { error?: string; messages?: { text: string }[] };
    throw new Error([b.error ?? `Upload failed (${res.status})`, ...(b.messages ?? []).map((m) => m.text)].join(" "));
  }
  return body as UploadResult;
}
export const activateVersion = (id: string, version: number, tenantId: string) =>
  post<StudyDetail>(`/api/studies/${encodeURIComponent(id)}/versions/${version}/activate`, tenantId, {});
export const getStudyItems = (id: string, tenantId: string, opts: { version?: number | null; form?: string; q?: string } = {}) => {
  const q = new URLSearchParams();
  if (opts.version) q.set("version", String(opts.version));
  if (opts.form) q.set("form", opts.form);
  if (opts.q) q.set("q", opts.q);
  return request<StudyItems>(`/api/studies/${encodeURIComponent(id)}/items?${q.toString()}`, tenantId);
};
export const runPreflight = (
  studyId: string,
  listings: { key: string; studyId?: string; spec?: Partial<SpecFields> | null; rawText?: string | null }[],
  tenantId: string,
) => post<{ results: PreflightResult[] }>("/api/preflight", tenantId, { studyId, listings });

// ---- Knowledge base ---------------------------------------------------------

/** Failures that carry details (per-file results, failed tests) are thrown with them attached. */
async function detailed<T>(path: string, tenantId: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", "X-Tenant-Id": tenantId, ...(init?.headers ?? {}) },
    });
  } catch {
    throw new Error(`Cannot reach the Spec2Code API at ${API_BASE}. Is the backend running?`);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((body as { error?: string }).error ?? `Request failed (${res.status})`) as Error & { body?: unknown };
    e.body = body;
    throw e;
  }
  return body as T;
}
const send = <T,>(method: string, path: string, tenantId: string, body?: unknown) =>
  detailed<T>(path, tenantId, { method, body: body === undefined ? undefined : JSON.stringify(body) });

export const kbStats = (t: string) => request<KbStats>("/api/knowledge/stats", t);
export const kbSources = (t: string, f: { scope?: string; scopeRef?: string; docType?: string; status?: string; q?: string } = {}) => {
  const q = new URLSearchParams();
  Object.entries(f).forEach(([k, v]) => v && q.set(k, v));
  return request<KbSource[]>(`/api/knowledge/sources?${q.toString()}`, t);
};
export const kbSource = (id: string, t: string) => request<KbSourceDetail>(`/api/knowledge/sources/${id}`, t);
export const kbUpload = (
  files: { name: string; data: string }[],
  meta: { scope: string; scopeRef: string; docType: string; standardVersion: string; licenseNote: string },
  t: string,
) => send<{ results: KbUploadResult[] }>("POST", "/api/knowledge/sources", t, { files, ...meta });
export const kbFromListings = (
  body: { listings: Record<string, string>[]; scope: string; scopeRef: string; standardVersion: string; approve: boolean },
  t: string,
) => send<{ results: KbUploadResult[]; added: number; duplicates: number; failed: number }>("POST", "/api/knowledge/from-listings", t, body);
export const kbPatch = (id: string, patch: Record<string, string>, t: string) => send<KbSource>("PATCH", `/api/knowledge/sources/${id}`, t, patch);
export const kbAction = (id: string, action: "approve" | "retire" | "restore", t: string) =>
  send<KbSource>("POST", `/api/knowledge/sources/${id}/${action}`, t, {});
export const kbDelete = (id: string, t: string) => send("DELETE", `/api/knowledge/sources/${id}`, t);
export const kbSearch = (
  body: { query: string; studyId: string; ta: string; sponsor?: string; reportId?: string; edcSystem: string; docTypes: string[]; topK: number; includeUnapproved: boolean },
  t: string,
) => send<KbSearchResult>("POST", "/api/knowledge/search", t, body);
export const kbReindex = (t: string) => send<{ chunks: number; backend: string }>("POST", "/api/knowledge/reindex", t, {});
export const kbReviewQueue = (t: string) => request<ReviewQueue>("/api/knowledge/review-queue", t);

export const listRules = (t: string) => request<KbRule[]>("/api/rules", t);
export const saveRule = (id: string | null, rule: RuleDraft, t: string) =>
  send<KbRule>(id ? "PUT" : "POST", id ? `/api/rules/${id}` : "/api/rules", t, rule);
export const ruleAction = (id: string, action: "approve" | "retire" | "restore", t: string) =>
  send<KbRule & { testResults?: RuleTestResult[] }>("POST", `/api/rules/${id}/${action}`, t, {});
export const ruleTests = (id: string, t: string) => send<{ results: RuleTestResult[] }>("POST", `/api/rules/${id}/run-tests`, t, {});
export const deleteRule = (id: string, t: string) => send("DELETE", `/api/rules/${id}`, t);
export const ruleDryRun = (
  body: { spec: Record<string, string>; studyId: string; edcSystem: string; language: string; includeDraft: boolean },
  t: string,
) => send<{ fired: FiredRule[]; ta: string }>("POST", "/api/rules/dry-run", t, body);
export const ruleBacktest = (rule: RuleDraft, t: string) =>
  send<{ checked: number; fired: number; examples: string[] }>("POST", "/api/rules/backtest", t, { rule });
export const patchStudy = (id: string, patch: { name?: string; ta?: string; sponsor?: string }, t: string) =>
  send<StudySummary>("PATCH", `/api/studies/${encodeURIComponent(id)}`, t, patch);


// ---- Synthetic data -------------------------------------------------------

const asUser = (reviewer: string) => (reviewer ? { headers: { "X-User-Id": reviewer } } : {});
export const synList = (t: string, f: { batchId?: string; status?: string } = {}) => {
  const q = new URLSearchParams();
  Object.entries(f).forEach(([k, v]) => v && q.set(k, v));
  return request<SynSet[]>(`/api/synthetic${q.size ? `?${q}` : ""}`, t);
};
export const synGet = (id: string, t: string) => request<SynSet>(`/api/synthetic/${id}`, t);
export const synGenerate = (body: { specId?: string; batchId?: string; batchItemId?: string; studyId?: string; useKnowledge?: boolean }, t: string, reviewer = "") =>
  request<SynSet>("/api/synthetic/generate", t, { method: "POST", body: JSON.stringify(body), ...asUser(reviewer) });
export const synEdit = (id: string, body: { cases?: SynCase[]; conditions?: SynCondition[] }, t: string) =>
  request<SynSet>(`/api/synthetic/${id}`, t, { method: "PATCH", body: JSON.stringify(body) });
export const synApprove = (id: string, acknowledgeGaps: boolean, t: string, reviewer: string) =>
  detailed<SynSet>(`/api/synthetic/${id}/approve`, t, { method: "POST", body: JSON.stringify({ acknowledgeGaps }), ...asUser(reviewer) });
export const synReopen = (id: string, t: string) => request<SynSet>(`/api/synthetic/${id}/reopen`, t, { method: "POST", body: "{}" });
export const synDelete = (id: string, t: string) => request(`/api/synthetic/${id}`, t, { method: "DELETE" });
export async function synDownload(id: string, format: "csv" | "json", t: string, name: string) {
  const res = await fetch(`${API_BASE}/api/synthetic/${id}/export?format=${format}`, { headers: { "X-Tenant-Id": t } });
  if (!res.ok) throw new Error(`Export failed (${res.status})`);
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}

export const synRuns = (id: string, t: string) => request<SynRun[]>(`/api/synthetic/${id}/runs`, t);
export const synRunSql = (id: string, code: string, t: string, reviewer = "") =>
  request<SynRun>(`/api/synthetic/${id}/runs/sql`, t, { method: "POST", body: JSON.stringify({ code }), ...asUser(reviewer) });
export const synUploadResult = (id: string, file: { name: string; data: string }, language: string, code: string, t: string, reviewer = "") =>
  request<SynRun>(`/api/synthetic/${id}/runs/upload`, t, { method: "POST", body: JSON.stringify({ files: [file], language, code }), ...asUser(reviewer) });
export async function synTestpack(id: string, language: string, t: string, name: string) {
  const res = await fetch(`${API_BASE}/api/synthetic/${id}/testpack?language=${encodeURIComponent(language)}`, { headers: { "X-Tenant-Id": t } });
  if (!res.ok) throw new Error(`Test pack failed (${res.status})`);
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

export const kbCatalog = (t: string) => request<{ hosts: string[]; entries: CatalogEntry[] }>("/api/knowledge/catalog", t);
export const kbCatalogFetch = (ids: string[], t: string, reviewer = "") =>
  request<{ results: CatalogFetchResult[]; note: string }>("/api/knowledge/catalog/fetch", t, { method: "POST", body: JSON.stringify({ ids }), ...(reviewer ? { headers: { "X-User-Id": reviewer } } : {}) });
