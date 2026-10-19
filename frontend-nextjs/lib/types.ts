export type SpecFields = {
  reportId: string;
  description: string;
  columnHeading: string;
  logic: string;
  reportScenarios: string;
  sorting: string;
  specTemplate: string;
  edcSystem: string;
  language: string;
  studyId: string;
  specType: string;
  listingType: string;
  useKnowledge?: boolean;
};

export type ModuleStatus = "verified" | "template";

export type ListingTypeInfo = { id: string; label: string; summary: string };

export type ClinicalModule = {
  id: string;
  label: string;
  status: ModuleStatus;
  summary: string;
  typical_inputs: string[];
  typical_outputs: string[];
  listing_types: ListingTypeInfo[];
  example_spec: Partial<SpecFields>;
};

export type TargetStatus = "verified" | "built" | "unverified_beta" | "planned" | "needs_precedent";

export type Target = {
  edcSystem: string;
  edcLabel: string;
  language: string;
  languageLabel: string;
  status: TargetStatus;
  detail: string;
  coverage: "full" | "rules_only" | "draft" | "none";
  available: boolean;
  optInRequired: boolean;
};

export type Insight = {
  category: string;
  severity: "blocking" | "warning" | "info";
  finding: string;
  suggestion: string;
};

export type ReviewResult = {
  readiness: "ready" | "ready_with_notes" | "needs_revision";
  insights: Insight[];
  summary: string;
  specId: string;
  knowledge?: KbShadow | null;
};

export type UnderstandResult = {
  domains_identified: { domain: string; reasoning: string }[];
  logic_steps: { step_number: number; explanation: string; inferred: boolean }[];
  key_definitions: { term: string; meaning: string }[];
  assumptions: string[];
  edge_cases: { case: string; handling: string }[];
  summary: string;
  knowledge?: KbShadow | null;
};

export type GuardrailCheck = { check: string; passed: boolean; detail?: string };
export type GuardrailReport = { passed: boolean; checks: GuardrailCheck[] };
export type TraceStep = { tier: string; status: string; detail: string };

export type GenerateResult = {
  cql: string | null; // field name is historical: it carries code in any language
  explanation: string | null;
  retrieved_precedents: string[];
  cascade_trace: TraceStep[];
  guardrail_reports: GuardrailReport[];
  specId: string;
  isBeta?: boolean;
  metadata?: { studyId: string; version: number | null; items: number } | null;
  knowledge?: KbShadow | null;
};

export type SpecRow = {
  id: string;
  reportId: string;
  description: string;
  columnHeading: string;
  logic: string;
  reportScenarios: string;
  sorting: string;
  source: "app" | "imported";
  readiness: ReviewResult["readiness"] | null;
  reviews: number;
  runs: number;
  languages: string[];
  lastStatus: string | null;
  createdAt: string | null;
};

export type ReviewRow = {
  id: string;
  readiness: ReviewResult["readiness"];
  insights: Insight[];
  summary: string;
  createdAt: string | null;
};

export type HistoryImportRow = { label: string; reportId: string; hasReview: boolean; hasCode: boolean; language: string; error: string | null };
export type HistoryImportResult = {
  dryRun: boolean;
  rows?: HistoryImportRow[];
  created?: { reportId: string; specId: string; review: boolean; code: boolean }[];
  skipped?: { label: string; reportId: string; reason: string }[];
  failed?: { label: string; error: string }[];
};

export type RunRow = {
  id: string;
  cql: string | null;
  explanation: string | null;
  cascadeTrace: TraceStep[];
  guardrailReports: GuardrailReport[];
  status: string;
  error: string | null;
  language: string | null;
  source: "app" | "imported";
  createdAt: string | null;
};

// ---- Study setup ----------------------------------------------------------

export type StudyCounts = { items: number; forms: number; visits: number; codelists: number; carriedOver?: string[]; duplicatesDropped?: number };
export type StudyCheck = { severity: "error" | "warning" | "info"; text: string; count: number | null };
export type StudyMessage = { severity?: string; text: string };
export type StudySummary = {
  studyId: string; name: string; edcSystem: string; ta?: string; sponsor?: string; activeVersion: number | null; versions: number;
  counts: StudyCounts | null; createdAt: string | null;
};
export type StudyVersion = {
  version: number; createdAt: string | null; notes: string; sourceFiles: string[]; counts: StudyCounts; active: boolean;
};
export type StudyDetail = StudySummary & { versionList: StudyVersion[]; checks?: StudyCheck[] };
export type UploadResult = { version: StudyVersion; messages: StudyMessage[]; checks: StudyCheck[] };
export type StudyItem = { form: string; form_label: string; item: string; label: string; data_type: string; codelist: string };
export type StudyItems = { version: number | null; forms: { form: string; label: string; items: number }[]; items: StudyItem[]; total?: number };
export type EdcSystem = { id: string; label: string; vendor: string; export_hint: string };

export type PreflightResult = {
  key: string; studyId: string; status: "ok" | "unresolved" | "none_found" | "no_metadata";
  references: number; resolved: number; unresolved: { ref: string; problem: string }[];
};

export type StageState = "idle" | "running" | "done" | "blocked" | "error";

// ---- Batch runs -----------------------------------------------------------

export type ParsedItem = {
  name: string;
  source: string;
  kind: "spec" | "raw" | "error";
  spec: Partial<SpecFields> | null;
  rawText: string | null;
  reportId: string;
  error: string | null;
};

export type ParseResult = { items: ParsedItem[]; skipped: { name: string; reason: string }[]; root?: string };

export type BatchOptions = {
  language: string;
  edcSystem: string;
  specType: string;
  listingType: string;
  specTemplate: string;
  studyId: string;
  metadataVersion?: number | null;
  allowUnverified: boolean;
  concurrency: number;
  runUnderstanding: boolean;
  runReview: boolean;
  useKnowledge?: boolean;
  onBlocked: "skip" | "generate";
  autoRetry: boolean;
};

export type ItemStatus = "pending" | "running" | "done" | "needs_attention" | "failed" | "cancelled" | "interrupted";

export type BatchCounts = Record<ItemStatus | "total", number>;

export type BatchSummary = {
  id: string;
  name: string;
  status: "running" | "finished" | "cancelled" | "interrupted";
  options: BatchOptions;
  createdAt: string | null;
  finishedAt: string | null;
  counts: BatchCounts;
  active: boolean;
};

export type BatchItemSummary = {
  id: string;
  position: number;
  name: string;
  reportId: string;
  status: ItemStatus;
  stage: string;
  error: string;
  attempts: number;
  readiness: ReviewResult["readiness"] | null;
  hasCode: boolean;
  isBeta: boolean;
  guardrailsPassed: boolean | null;
  language: string;
  durationMs: number | null;
  studyId?: string;
  metadata?: { studyId: string; version: number | null; items: number } | null;
};

export type BatchDetail = BatchSummary & { items: BatchItemSummary[] };

export type BatchItemDetail = BatchItemSummary & {
  spec: Partial<SpecFields> | null;
  understanding: UnderstandResult | null;
  review: ReviewResult | null;
  result: GenerateResult | null;
};

// ---- Knowledge base -------------------------------------------------------

export type KbScope = "global" | "sponsor" | "ta" | "study" | "report";
export type KbStatus = "draft" | "approved" | "retired";
export type DocType = "standard" | "protocol" | "spec" | "sas_program" | "history" | "edc_guide" | "listing_standard" | "other";

export const DOC_TYPE_LABEL: Record<DocType, string> = {
  standard: "Standard (CDISC, SDTM, ADaM)",
  protocol: "Protocol",
  spec: "Specification",
  sas_program: "SAS program",
  history: "History",
  edc_guide: "EDC system reference",
  listing_standard: "Standard listing",
  other: "Other",
};

export type KbSource = {
  id: string; title: string; filename: string; docType: DocType; docTypeReason: string;
  scope: KbScope; scopeRef: string; standardVersion: string; licenseNote: string; status: KbStatus;
  extractStatus: "ok" | "needs_ocr" | "empty" | "error"; extractNote: string; textChars: number; chunks: number;
  embedBackend: string; sizeBytes: number; createdAt: string | null; createdBy: string; approvedAt: string | null; approvedBy: string;
};
export type KbChunkPreview = { id: string; position: number; heading: string; text: string; meta: Record<string, unknown> };
export type KbSourceDetail = KbSource & { preview: KbChunkPreview[] };
export type KbStats = {
  sources: number; chunks: number; byStatus: Record<string, number>; byScope: Record<string, number>;
  byType: Record<string, number>; tas: string[]; sponsors?: string[]; reports?: string[]; embedBackend: string; lexicalOnly: boolean;
};
export type KbUploadResult = {
  name: string; sourceId?: string; duplicate?: boolean; status?: string; extractStatus?: string; note?: string;
  chunks?: number; docType?: string; docTypeReason?: string; error?: string;
};
export type KbHit = {
  chunkId: string; sourceId: string; title: string; docType: DocType; scope: KbScope; scopeRef: string; status: KbStatus;
  standardVersion: string; heading: string; text: string; score: number; vectorScore: number; keywordScore: number;
};
export type KbSearchResult = {
  results: KbHit[]; excluded: { sourceId: string; title: string; scope: KbScope; scopeRef: string; reason: string }[];
  backend: string; candidates: number; warning?: string; ta?: string;
};

export type RuleAgent = "extract" | "understand" | "review" | "generate";
export type RuleActionType = "pattern" | "prompt" | "guardrail" | "name_map";
export type RuleTest = { spec: Record<string, string>; expect: "fires" | "not_fires" };
export type KbRule = {
  id: string; name: string; description: string; scope: KbScope; scopeRef: string; appliesTo: RuleAgent[];
  condition: { edcSystem?: string[]; listingType?: string[]; specType?: string[]; language?: string[]; forms?: string[]; textPattern?: string };
  actionType: RuleActionType; action: Record<string, string>; priority: number; status: KbStatus;
  evidenceSourceId: string | null; evidenceNote: string; tests: RuleTest[]; version: number;
  updatedAt: string | null; approvedBy: string; approvedAt: string | null;
};
export type RuleDraft = Omit<KbRule, "id" | "status" | "version" | "updatedAt" | "approvedBy" | "approvedAt">;
export type RuleTestResult = { n: number; expect: string; fired: boolean; passed: boolean; why: string };
export type FiredRule = KbRule & { why: string; overriddenBy?: string };
export type ReviewQueue = { sources: KbSource[]; rules: KbRule[]; problems: KbSource[] };
export type KbShadow = {
  mode: "shadow" | "applied" | "not_used"; ta?: string; backend?: string; error?: string; note?: string;
  skipped?: { name: string; reason: string }[];
  sources: { sourceId: string; title: string; heading: string; scope: KbScope; docType: DocType; score: number }[];
  rules: { id: string; name: string; actionType: RuleActionType; scope: KbScope; why: string }[];
};


// ---- Synthetic data -------------------------------------------------------

export type SynCondition = { id: string; text: string };
export type SynCase = {
  id: string;
  conditionId: string;
  expectation: "include" | "exclude";
  boundary: boolean;
  scenario: string;
  rationale: string;
  note: string;
  tables: { form: string; rows: Record<string, string>[] }[];
};
export type SynCoverage = {
  conditions: { id: string; text: string; include: number; exclude: number; boundary: number; covered: boolean; gap: string }[];
  uncovered: string[];
  orphanCases: string[];
  covered: number;
  total: number;
};
export type SynSet = {
  id: string;
  reportId: string;
  version: number;
  status: "draft" | "reviewed" | "retired";
  edited: boolean;
  specId: string;
  batchId: string;
  batchItemId: string;
  studyId: string;
  summary: string;
  usedKnowledge: boolean;
  reviewedBy: string;
  reviewedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  caseCount: number;
  include: number;
  exclude: number;
  coverage: SynCoverage;
  keyIssues: { noKey: string[]; shared: Record<string, string[]> };
  spec?: Partial<SpecFields>;
  conditions?: SynCondition[];
  cases?: SynCase[];
  openQuestions?: string[];
};

export type SynRun = {
  id: string;
  setId: string;
  setVersion: number;
  language: string;
  method: "executed" | "uploaded";
  status: "executed" | "uploaded" | "could_not_execute";
  code: string;
  results: { caseId: string; expectation: "include" | "exclude"; quadrant: "TP" | "TN" | "FP" | "FN" | null; subjects: string[]; returned: string[]; detail: string }[];
  counts: { TP?: number; TN?: number; FP?: number; FN?: number; not_judged?: number };
  issues: { noKey?: string[]; shared?: Record<string, string[]> };
  rowsReturned: number;
  sourceName: string;
  error: string;
  createdBy: string;
  createdAt: string | null;
  stale: boolean;
};

export type CatalogEntry = {
  id: string;
  kind: "file" | "manual" | "pack";
  title: string;
  scope: KbScope;
  scopeRef: string;
  docType: string;
  standardVersion: string;
  url: string;
  format: string;
  verified: boolean;
  verifiedHow: string;
  access: "open" | "login" | "check";
  licence: string;
  note: string;
  inLibrary: boolean;
};
export type CatalogFetchResult = { id: string; ok: boolean; sourceId?: string; duplicate?: boolean; chunks?: number; error?: string; note?: string };
