const APP_BUILD_VERSION = "20260822-1";
console.log(`[Spec->Code] app.js loaded, build ${APP_BUILD_VERSION}`);
const versionEl = document.getElementById("rail-version");
if (versionEl) {
  // If this ever mismatches the "build ..." text already in index.html,
  // that alone proves index.html and app.js are out of sync -- one file
  // was updated on disk/deployed and the other wasn't (or the browser is
  // serving a cached copy of one but not the other). Cheap, unambiguous
  // diagnostic for exactly the class of bug this project kept hitting.
  versionEl.textContent = `build ${APP_BUILD_VERSION} (js confirmed loaded)`;
}

const EXAMPLE_SPEC = {
  reportId: "ABC002_JR",
  description:
    "This report identifies overlaps in adverse events based on matching LLT terms and overlapping onset/end dates.",
  columnHeading:
    "1. Country\n2. Site\n3. Subject Number\n4. AE/VAE 1 Seq\n5. AE/VAE 1 Verbatim\n6. AE/VAE LLT\n7. AE/VAE 1 Onset Dt\n8. AE/VAE 1 End Dt\n9. AE/VAE 2 Seq\n10. AE/VAE 2 Verbatim\n11. AE/VAE 2 Onset Dt\n12. AE/VAE 2 End Dt",
  logic:
    "This report lists subjects with overlapping onset dates/end dates for identical AE/VAE Terms. Identical AE/VAE terms are defined as having the same LLT after encoding. Each pair of overlapping adverse events should be output on one line. Note: Continuing adverse events (with no End Date) should also be included in the report.",
  reportScenarios:
    "Scenario 1 - YES: There are adverse events that have overlapping onset dates/end dates and identical LLT after encoding. Scenario 2 - NO: overlapping dates but LLT differs. Scenario 3 - NO: identical LLT but no overlapping dates.",
  sorting: "Country, Site, Subject Number, AE/VAE LLT, AE/VAE 1 Seq, AE/VAE 2 Seq",
};

const FIELD_IDS = ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting"];
let lastExtractionNotes = "";

let EXAMPLE_SPECS_BY_ID = { ABC002_JR: EXAMPLE_SPEC };

async function loadExampleSpecList() {
  const select = document.getElementById("load-example");
  try {
    const res = await fetch("/example_specs.json");
    if (!res.ok) throw new Error("could not load example specs");
    const examples = await res.json();
    for (const spec of examples) {
      EXAMPLE_SPECS_BY_ID[spec.reportId] = spec;
      const option = document.createElement("option");
      option.value = spec.reportId;
      option.textContent = spec.reportId;
      select.appendChild(option);
    }
  } catch (err) {
    console.warn("Failed to load additional example specs:", err);
    // Non-fatal -- the built-in ABC002_JR example still works via EXAMPLE_SPECS_BY_ID's seed entry.
  }
  // Seed the built-in example as a real option too, at the top.
  const builtIn = document.createElement("option");
  builtIn.value = "ABC002_JR";
  builtIn.textContent = "ABC002_JR (built-in, verified precedent)";
  select.insertBefore(builtIn, select.children[1] || null);
}

loadExampleSpecList();
const TENANT_STORAGE_KEY = "cdm_spec_to_cql_tenant_id";
const CATEGORIES = ["completeness", "ambiguity", "consistency", "testability", "naming"];

// Mirrors generation_router.py's routing tables -- kept in sync manually
// since this is small and deliberately conservative. If you add/change a
// verified combo on the backend, update this too.
//
// THREE states, not two -- "full" (works for any spec, has a Claude
// fallback) is genuinely different from "limited" (only works for one
// narrow deterministic pattern, no fallback). Treating those the same
// was the actual bug: Python was marked "available" identically to CQL,
// so nothing warned you before submitting that it only handles one exact
// pattern (AE/VAE overlap) -- everything else silently fails only AFTER
// you've gone through Review, which reads exactly like Python is broken
// rather than working exactly as designed for a narrow case.
const ROUTE_STATUS = {
  veeva: {
    cql: "full",
    python: "limited",
    sql: "beta",
    r: "beta",
    sas: "beta",
  },
};

const ROUTE_MESSAGES = {
  full: "Only Veeva/CQL and Veeva/Python have a verified generation path today.",
  limited: (edcSystem, language) =>
    `\u26a0 ${edcSystem}/${language} only works for ONE narrow pattern today (AE/VAE overlap detection via a deterministic rule) -- there is no general fallback for other specs in this language. If your spec isn't that exact pattern, generation will report "no path" after Review, not a bug. Use Veeva/CQL for general-purpose generation.`,
  beta: (edcSystem, language) =>
    `\u26a0 UNVERIFIED BETA: ${edcSystem}/${language} generation exists (a real, reasoned ${language.toUpperCase()} prompt), but has NEVER been checked against a confirmed-correct output -- the underlying table/column naming convention itself is an assumption, not confirmed for your study. Check the box below to proceed anyway.`,
  unavailable: (edcSystem, language) =>
    `\u26a0 No verified generation path for ${edcSystem}/${language} yet -- this combination will be refused. Switch to Veeva/CQL, or see the README for what it takes to add a new one.`,
};

function checkRouteAvailability() {
  const edcSystem = document.getElementById("edcSystem").value;
  const language = document.getElementById("language").value;
  const hint = document.getElementById("route-hint");
  const submitBtn = document.getElementById("submit-btn");
  const betaRow = document.getElementById("beta-optin-row");
  const betaCheckbox = document.getElementById("beta-optin-checkbox");
  const status = (ROUTE_STATUS[edcSystem] || {})[language] || "unavailable";

  hint.classList.remove("route-hint-blocked", "route-hint-limited", "route-hint-beta");
  betaRow.hidden = status !== "beta";
  if (status !== "beta") betaCheckbox.checked = false;

  if (status === "full") {
    hint.textContent = ROUTE_MESSAGES.full;
    submitBtn.disabled = false;
    submitBtn.textContent = "Understand Logic \u2192";
  } else if (status === "limited") {
    hint.textContent = ROUTE_MESSAGES.limited(edcSystem, language);
    hint.classList.add("route-hint-limited");
    submitBtn.disabled = false;  // not blocked -- it CAN work, just narrowly
    submitBtn.textContent = "Understand Logic \u2192";
  } else if (status === "beta") {
    hint.textContent = ROUTE_MESSAGES.beta(edcSystem, language);
    hint.classList.add("route-hint-beta");
    submitBtn.disabled = !betaCheckbox.checked;
    submitBtn.textContent = betaCheckbox.checked ? "Understand Logic \u2192" : "Check the box above to enable (unverified beta)";
  } else {
    hint.textContent = ROUTE_MESSAGES.unavailable(edcSystem, language);
    hint.classList.add("route-hint-blocked");
    submitBtn.disabled = true;
    submitBtn.textContent = "Not available for this EDC system / language";
  }
}

document.getElementById("edcSystem").addEventListener("change", checkRouteAvailability);
document.getElementById("language").addEventListener("change", checkRouteAvailability);
document.getElementById("beta-optin-checkbox").addEventListener("change", checkRouteAvailability);
checkRouteAvailability();

// ===== Tenant =====

function getTenantId() {
  const raw = document.getElementById("tenant-input").value.trim();
  return raw || "default";
}

function tenantHeaders(extra) {
  return { "X-Tenant-Id": getTenantId(), ...(extra || {}) };
}

(function initTenantSelector() {
  const input = document.getElementById("tenant-input");
  const saved = window.localStorage.getItem(TENANT_STORAGE_KEY);
  if (saved) input.value = saved;
  input.addEventListener("change", () => {
    const tenantId = getTenantId();
    window.localStorage.setItem(TENANT_STORAGE_KEY, tenantId);
    input.value = tenantId;
  });
})();

// ===== Step navigation =====

const STEP_ORDER = ["spec", "understand", "review", "generate"];

// Tracks the latest successful result of each stage, purely for the PDF
// export feature -- the interactive step panels already show this data,
// but only one at a time (data-active toggles the others to display:none),
// so export needs its own copy of everything to build a single combined
// document. Never used for anything except building #export-view.
const exportState = { spec: null, understanding: null, review: null, generateResult: null };

function updateExportButtonState() {
  const ready = exportState.spec && exportState.generateResult;

  const pdfBtn = document.getElementById("export-pdf-btn");
  pdfBtn.disabled = !ready;
  pdfBtn.title = ready ? "Export this spec, logic walkthrough, review, and generated code as one PDF" : "Complete Generate first";

  const copyBtn = document.getElementById("copy-all-btn");
  copyBtn.disabled = !ready;
  copyBtn.title = ready ? "Copy this spec, logic walkthrough, review, and generated code as plain text" : "Complete Generate first";
}

let currentStep = "spec";
let reachedSteps = new Set(["spec"]);

function showStep(name) {
  currentStep = name;
  for (const step of STEP_ORDER) {
    document.getElementById(`step-${step}`).dataset.active = String(step === name);
  }
  for (const btn of document.querySelectorAll(".rail-step")) {
    const step = btn.dataset.step;
    const reached = reachedSteps.has(step);
    btn.disabled = !reached;
    btn.classList.toggle("is-complete", reached && step !== name && STEP_ORDER.indexOf(step) < STEP_ORDER.indexOf(name));
    if (step === name) {
      btn.setAttribute("aria-current", "step");
    } else {
      btn.removeAttribute("aria-current");
    }
  }
}

function reachStep(name) {
  reachedSteps.add(name);
  showStep(name);
}

for (const btn of document.querySelectorAll(".rail-step")) {
  btn.addEventListener("click", () => {
    if (!btn.disabled) showStep(btn.dataset.step);
  });
}

// ===== SQL/CQL/SAS syntax highlighting =====

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON",
  "AND", "OR", "NOT", "NULL", "IS", "AS", "WITH", "CASE", "WHEN", "THEN",
  "ELSE", "END", "GROUP", "BY", "ORDER", "HAVING", "DISTINCT", "UNION", "ALL",
  "IN", "EXISTS", "BETWEEN", "LIKE", "COALESCE", "CAST", "TRY_CAST", "DATE",
  "DESC", "ASC", "COUNT", "SUM", "AVG", "MIN", "MAX",
  // SAS keywords -- purely additive, doesn't affect SQL/CQL highlighting
  "PROC", "SQL", "DATA", "RUN", "QUIT", "MERGE", "SET", "IF", "DO", "OUTPUT",
  "KEEP", "DROP", "RENAME", "FORMAT", "LABEL", "LIBNAME", "MISSING", "UPCASE",
  "PROPCASE", "INPUT", "PUT",
  // CQL-specific functions confirmed from real examples
  "DATE_FORMAT", "RAWDATE", "SUBDATE", "CODEDTERM", "IFNULL",
];

const LINE_BREAK_BEFORE = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "UNION ALL", "UNION",
  "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "JOIN",
  // SAS statement/block boundaries -- these start a new logical line almost always
  "PROC SQL", "PROC", "DATA", "RUN", "QUIT", "MERGE", "LIBNAME",
];
const LINE_BREAK_RE = new RegExp(
  "\\s+(" + [...LINE_BREAK_BEFORE].sort((a, b) => b.length - a.length).join("|") + ")\\b",
  "gi"
);

const INDENT = "  ";

const PIPE_BREAK_RE = /\s*%>%\s*/g;

function lightCleanup(sql) {
  // For input that already has real multi-line structure (R/SAS/Python
  // responses from Claude usually do -- there's no good token like SQL's
  // ";" to reconstruct statement boundaries for these languages if that
  // structure gets destroyed). Only trims trailing whitespace per line
  // and collapses runs of 3+ blank lines -- never touches indentation or
  // reflows content, since the original structure is more trustworthy
  // than anything a keyword-matching reflow could reconstruct.
  return sql
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Matches a top-level R assignment (identifier <-) as a line-break point --
// R has no semicolon-style statement separator, so without this, a response
// that comes back as one long line (see below) has no way to split multiple
// "x <- ..." statements apart from each other.
const R_ASSIGN_BREAK_RE = /\s+(?=[A-Za-z_][A-Za-z0-9_.]*\s*<-)/g;

// What can legitimately end a line/block comment when there's no real "\n"
// to rely on (see the comment-matching regex below for why this matters).
// Deliberately does NOT include bare "#"/"--" as a stop condition -- a
// decorative separator like "----" or "====" inside a comment contains
// "--" as a substring, which would incorrectly fragment the comment mid-
// text. Consecutive "#"/"--" comment lines merging into one paragraph
// (a granularity loss) is a far safer failure mode than that. Only
// genuine code-statement starters end a comment here.
const COMMENT_STOP_TOKEN = "(?:[A-Za-z_][A-Za-z0-9_.]*\\s*<-|\\blibrary\\s*\\(|\\brequire\\s*\\(|\\bPROC\\b|\\bDATA\\b|\\bRUN\\s*;|\\bQUIT\\s*;|\\bSELECT\\b|\\bWITH\\b)";
const LINE_COMMENT_RE = new RegExp(`(^|[ \\t\\n])(--|#)(?:(?!${COMMENT_STOP_TOKEN})[\\s\\S])*`, "g");

function formatSql(sql) {
  // Extract ALL comment styles FIRST, UNCONDITIONALLY -- regardless of
  // whether the input has real newlines. This has to happen before the
  // multi-line-vs-single-line decision below, not after: a response that
  // comes back with NO real embedded newlines at all (seen in practice --
  // Claude occasionally returns code as one long space-separated string
  // even with real comments/statements in it) would otherwise have most
  // of its "#"/"--" comments go undetected, because they're preceded by
  // an ordinary space rather than a newline or string-start. Matching on
  // "preceded by any whitespace or start-of-string" (not specifically a
  // newline) is what actually catches those.
  const comments = [];
  const protectComment = (m) => {
    comments.push(m.replace(/\s+/g, " ").trim());
    return `\u0002${comments.length - 1}\u0002`;
  };
  let withCommentMarkers = sql.replace(/\/\*[\s\S]*?\*\//g, protectComment);
  withCommentMarkers = withCommentMarkers.replace(LINE_COMMENT_RE, (m, pre) => pre + protectComment(m.slice(pre.length)));

  // Now decide: does the comment-free skeleton already have real multi-line
  // code structure? If so, trust it (light cleanup only). Only the ORIGINAL
  // code (not the interleaved comment prose, which is irrelevant to this
  // check and could itself contain newlines from earlier over-eager
  // splitting) should drive this decision.
  const skeletonForCheck = withCommentMarkers.replace(/\u0002\d+\u0002/g, "");
  const nonEmptyCodeLines = skeletonForCheck.split("\n").filter((l) => l.trim()).length;
  if (nonEmptyCodeLines > 3) {
    // Restore comments before returning -- they still need their own lines
    // even on the "trust existing structure" path.
    let result = sql.replace(/\/\*[\s\S]*?\*\//g, (m) => `\n${m.replace(/\s+/g, " ").trim()}\n`);
    result = result.replace(LINE_COMMENT_RE, (m, pre) => `${pre}\n${m.slice(pre.length).trim()}\n`);
    return lightCleanup(result);
  }

  // Protect string/quoted-identifier content (single AND double quotes,
  // plus R's backtick-quoted names like `AE/VAE 1 Seq`) from having
  // internal spaces collapsed.
  const withMarkers = withCommentMarkers
    .replace(/'[^']*'/g, (m) => m.replace(/\s+/g, "\u0001"))
    .replace(/"[^"]*"/g, (m) => m.replace(/\s+/g, "\u0001"))
    .replace(/`[^`]*`/g, (m) => m.replace(/\s+/g, "\u0001"));

  const singleSpaced = withMarkers.replace(/\s+/g, " ").trim();
  const ctesSeparated = singleSpaced.replace(/\),\s*(\w+\s+AS\s*\()/gi, "),\n$1");
  const semicolonSeparated = ctesSeparated.replace(/;\s*(?=\S)/g, ";\n");
  const assignSeparated = semicolonSeparated.replace(R_ASSIGN_BREAK_RE, "\n");
  const pipeSeparated = assignSeparated.replace(PIPE_BREAK_RE, " %>%\n");
  const breakable = pipeSeparated.replace(LINE_BREAK_RE, (_, kw) => `\n${kw}`);

  const lines = breakable.split("\n").map((l) => l.trim()).filter(Boolean);

  let depth = 0;
  const out = [];
  for (let line of lines) {
    const leadingCloses = (line.match(/^\)+/) || [""])[0].length;
    const thisDepth = Math.max(depth - leadingCloses, 0);
    out.push(INDENT.repeat(thisDepth) + line);
    const opens = (line.match(/\(/g) || []).length;
    const closes = (line.match(/\)/g) || []).length;
    depth = Math.max(depth + opens - closes, 0);
  }
  let result = out.join("\n").replace(/\u0001/g, " ");
  // Restore comments onto their own line(s).
  result = result.replace(/\u0002(\d+)\u0002/g, (_, i) => `\n${comments[Number(i)]}\n`);
  // Comment restoration happens after the per-line trim pass above, so any
  // leading/trailing space left on the lines immediately around a restored
  // comment (e.g. "... */ ;" splitting into a stray " ;" line) needs a
  // second trim pass.
  result = result.split("\n").map((l) => l.trim()).join("\n");
  return result.replace(/\n{3,}/g, "\n\n").trim();
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightSql(sql) {
  sql = formatSql(sql);
  const stringRe = /'[^']*'|"[^"]*"|`[^`]*`/g;
  const lineCommentRe = /(--|#).*$/gm;
  const blockCommentRe = /\/\*[\s\S]*?\*\//g;
  const marks = [];
  let m;
  while ((m = stringRe.exec(sql))) marks.push({ start: m.index, end: m.index + m[0].length, type: "str" });
  while ((m = lineCommentRe.exec(sql))) marks.push({ start: m.index, end: m.index + m[0].length, type: "com" });
  while ((m = blockCommentRe.exec(sql))) marks.push({ start: m.index, end: m.index + m[0].length, type: "com" });
  marks.sort((a, b) => a.start - b.start);

  let cursor = 0;
  let html = "";
  for (const mark of marks) {
    if (mark.start < cursor) continue;
    if (mark.start > cursor) html += highlightKeywords(sql.slice(cursor, mark.start));
    html += `<span class="sql-${mark.type}">${escapeHtml(sql.slice(mark.start, mark.end))}</span>`;
    cursor = mark.end;
  }
  if (cursor < sql.length) html += highlightKeywords(sql.slice(cursor));
  return html;
}

function highlightKeywords(chunk) {
  const re = new RegExp(`\\b(${KEYWORDS.join("|")})\\b`, "gi");
  return escapeHtml(chunk).replace(re, (kw) => `<span class="sql-kw">${kw}</span>`);
}

// ===== Spec form =====

function readSpec() {
  const spec = {};
  for (const id of FIELD_IDS) spec[id] = document.getElementById(id).value;
  spec.edcSystem = document.getElementById("edcSystem").value;
  spec.language = document.getElementById("language").value;
  spec.studyId = document.getElementById("studyId").value.trim();
  return spec;
}

function showError(message) {
  const banner = document.getElementById("error-banner");
  banner.textContent = message;
  banner.hidden = !message;
}

document.getElementById("metadataCsvFile").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById("metadataCsv").value = await file.text();
});

document.getElementById("upload-metadata-btn").addEventListener("click", async () => {
  const studyId = document.getElementById("metadataStudyId").value.trim();
  const csvText = document.getElementById("metadataCsv").value.trim();
  const statusEl = document.getElementById("metadata-upload-status");
  statusEl.hidden = true;
  showError("");

  if (!studyId) {
    showError("Enter a Study ID before uploading metadata.");
    return;
  }
  if (!csvText) {
    showError("Paste metadata CSV text first, or upload a .csv file.");
    return;
  }

  const btn = document.getElementById("upload-metadata-btn");
  btn.disabled = true;
  btn.textContent = "Uploading\u2026";

  try {
    const res = await fetch("/api/study-metadata/upload-csv", {
      method: "POST",
      headers: tenantHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ study_id: studyId, csv_text: csvText }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Metadata upload failed.");

    statusEl.textContent = `\u2713 Loaded ${data.rows_loaded} Form.Item row(s) for study "${data.study_id}". Set the same Study ID in the spec below to use it.`;
    statusEl.hidden = false;
    document.getElementById("studyId").value = data.study_id;
  } catch (err) {
    showError(String(err));
  } finally {
    btn.disabled = false;
    btn.textContent = "Upload Metadata";
  }
});

function renderSupportingDocStatus(reportId, message) {
  const statusEl = document.getElementById("supporting-doc-upload-status");
  statusEl.textContent = message;
  statusEl.hidden = false;
}

// Keyed by Report ID directly (not a generated spec row's id) -- see
// SpecSupportingDocItem's docstring in models_db.py for why: no Spec
// row exists yet at the point this needs to be usable, since it's
// meant to ground Understand Logic too, which runs before any Review.
async function loadAndRenderSupportingDoc() {
  const reportId = document.getElementById("reportId").value.trim();
  const tableEl = document.getElementById("supporting-doc-table");
  if (!reportId) {
    tableEl.innerHTML = "";
    return;
  }
  try {
    const res = await fetch(`/api/report/${encodeURIComponent(reportId)}/supporting-doc`, {
      headers: tenantHeaders(),
    });
    const rows = await res.json();
    if (!res.ok) throw new Error(rows.error || "Could not load supporting document rows.");
    tableEl.innerHTML = renderSupportingDocTable(rows);
  } catch (err) {
    tableEl.innerHTML = `<p class="extract-notes">Could not load existing supporting-document rows: ${escapeHtml(String(err))}</p>`;
  }
}

// Re-check whenever the Report ID changes -- so switching to a report
// that already has a document uploaded shows it without any extra click.
document.getElementById("reportId").addEventListener("blur", loadAndRenderSupportingDoc);

document.getElementById("supportingDocCsvFile").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById("supportingDocCsv").value = await file.text();
});

document.getElementById("upload-supporting-doc-btn").addEventListener("click", async () => {
  const reportId = document.getElementById("reportId").value.trim();
  const csvText = document.getElementById("supportingDocCsv").value.trim();
  const statusEl = document.getElementById("supporting-doc-upload-status");
  statusEl.hidden = true;
  showError("");

  if (!reportId) {
    showError("Enter a Report ID above before uploading a supporting document.");
    return;
  }
  if (!csvText) {
    showError("Paste supporting-document CSV text first, or upload a .csv file.");
    return;
  }

  const btn = document.getElementById("upload-supporting-doc-btn");
  btn.disabled = true;
  btn.textContent = "Uploading\u2026";

  try {
    const res = await fetch(`/api/report/${encodeURIComponent(reportId)}/supporting-doc/upload-csv`, {
      method: "POST",
      headers: tenantHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ csv_text: csvText }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Supporting document upload failed.");

    renderSupportingDocStatus(reportId, `\u2713 Loaded ${data.rows_loaded} View.Column row(s) for report "${reportId}". Understand Logic and Generate will use these exact column names.`);
    await loadAndRenderSupportingDoc();
  } catch (err) {
    showError(String(err));
  } finally {
    btn.disabled = false;
    btn.textContent = "Upload Supporting Document";
  }
});

document.getElementById("load-example").addEventListener("change", (e) => {
  const reportId = e.target.value;
  if (!reportId) return;
  const spec = EXAMPLE_SPECS_BY_ID[reportId];
  if (!spec) return;
  for (const id of FIELD_IDS) document.getElementById(id).value = spec[id] || "";
  e.target.value = ""; // reset to placeholder so the same example can be re-selected later
});

document.getElementById("raw-text-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById("raw-text-input").value = await file.text();
});

document.getElementById("ref-code-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById("ref-code-input").value = await file.text();
});

// ===== Cross-check spec against existing reference code (any language) =====

async function callCrossref(spec, legacyCode) {
  const res = await fetch("/api/crossref-spec-code", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ spec, legacyCode }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Cross-reference failed.");
  return data;
}

async function callSaveLearnedPattern(pattern) {
  const res = await fetch("/api/learned-patterns", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(pattern),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not save candidate pattern.");
  return data;
}

function renderCrossrefResult(result, reportId) {
  const asArray = (x) => (Array.isArray(x) ? x : []);
  const panel = document.getElementById("crossref-panel");

  const enrichmentHtml = result.logic_changed ? `
    <div class="suggestion-field" data-field="logic">
      <p class="export-field-label">Logic (enriched from the code)</p>
      <p class="suggestion-change-summary">${escapeHtml(result.enrichment_summary || "")}</p>
      <textarea class="suggestion-textarea" id="crossref-logic-textarea" rows="5">${escapeHtml(result.enriched_logic)}</textarea>
      <div class="review-actions" style="margin-top: 10px;">
        <button type="button" class="btn btn-primary" id="crossref-use-logic-btn">Use This Logic &rarr;</button>
        <button type="button" class="btn btn-secondary" id="crossref-keep-logic-btn">Keep Original</button>
      </div>
    </div>` : `<p class="lu-summary">${escapeHtml(result.enrichment_summary || "No report-specific gaps found between the spec and the code.")}</p>`;

  const patterns = asArray(result.candidate_patterns);
  const patternsHtml = patterns.length === 0
    ? `<p class="lu-empty">No candidate general patterns identified from this code.</p>`
    : patterns.map((p, i) => `
      <div class="scenario-card" data-pattern-index="${i}">
        <div class="scenario-header">
          <span class="scenario-label">${escapeHtml(p.category || "General pattern")}</span>
          <button type="button" class="btn btn-ghost btn-small save-pattern-btn" data-pattern-index="${i}">Save as Candidate Pattern</button>
        </div>
        <p class="scenario-desc">${escapeHtml(p.pattern_text)}</p>
        <p class="scenario-reasoning">${escapeHtml(p.evidence)}</p>
        <p class="pattern-saved-note" hidden>\u2713 Saved as an unconfirmed candidate -- review it under "Learned Patterns" to confirm before it affects generation.</p>
      </div>`).join("");

  panel.innerHTML = `
    <div class="stage-card crossref-result-card">
      <p class="export-field-label">Report-specific enrichment</p>
      ${enrichmentHtml}
      <p class="export-field-label" style="margin-top: 16px;">Candidate general patterns</p>
      ${patternsHtml}
    </div>`;

  if (result.logic_changed) {
    document.getElementById("crossref-use-logic-btn").addEventListener("click", () => {
      document.getElementById("logic").value = document.getElementById("crossref-logic-textarea").value;
      document.getElementById("crossref-use-logic-btn").closest(".suggestion-field").innerHTML =
        `<div class="suggestion-applied-note">\u2713 Using the enriched Logic above.</div>`;
    });
    document.getElementById("crossref-keep-logic-btn").addEventListener("click", () => {
      document.getElementById("crossref-keep-logic-btn").closest(".suggestion-field").innerHTML =
        `<div class="suggestion-applied-note">Keeping the original Logic unchanged.</div>`;
    });
  }

  panel.querySelectorAll(".save-pattern-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const i = Number(btn.dataset.patternIndex);
      const p = patterns[i];
      btn.disabled = true;
      btn.textContent = "Saving\u2026";
      try {
        await callSaveLearnedPattern({ category: p.category, pattern_text: p.pattern_text, source_report_id: reportId });
        const card = panel.querySelector(`.scenario-card[data-pattern-index="${i}"]`);
        card.querySelector(".pattern-saved-note").hidden = false;
        btn.remove();
      } catch (err) {
        showError(String(err));
        btn.disabled = false;
        btn.textContent = "Save as Candidate Pattern";
      }
    });
  });
}

document.getElementById("crossref-ref-btn").addEventListener("click", async () => {
  showError("");
  const spec = readSpec();
  const legacyCode = document.getElementById("ref-code-input").value.trim();

  if (!spec.reportId.trim() || !spec.description.trim()) {
    showError("Cross-checking needs an existing spec -- fill in Report ID and Description first (or run Extract Fields).");
    return;
  }
  if (!legacyCode) {
    showError("Paste the existing reference code (any language) to cross-check against, in the box above.");
    return;
  }

  const btn = document.getElementById("crossref-ref-btn");
  btn.disabled = true;
  btn.textContent = "Cross-referencing\u2026";
  try {
    const result = await callCrossref(spec, legacyCode);
    renderCrossrefResult(result, spec.reportId);
  } catch (err) {
    showError(String(err));
  } finally {
    btn.disabled = false;
    btn.textContent = "Cross-Reference Against Spec";
  }
});

// ===== Learned patterns (tenant-wide, not spec-specific) =====

async function callListLearnedPatterns() {
  const res = await fetch("/api/learned-patterns", { headers: tenantHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load learned patterns.");
  return data;
}

async function callConfirmLearnedPattern(id) {
  const res = await fetch(`/api/learned-patterns/${id}/confirm`, {
    method: "POST",
    headers: tenantHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not confirm pattern.");
  return data;
}

function renderLearnedPatternsList(patterns) {
  if (patterns.length === 0) {
    return `<p class="lu-empty">No learned patterns yet. These come from "Cross-Reference Against Spec" on the Spec step.</p>`;
  }
  return patterns.map((p) => `
    <div class="learned-pattern-row" data-id="${escapeHtml(p.id)}">
      <div class="learned-pattern-header">
        <span class="scenario-label">${escapeHtml(p.category || "General pattern")}</span>
        ${p.confirmed
          ? `<span class="verdict-badge quadrant-tp">LIVE</span>`
          : `<button type="button" class="btn btn-primary btn-small confirm-pattern-btn" data-id="${escapeHtml(p.id)}">Confirm &amp; Activate</button>`}
      </div>
      <p class="scenario-desc">${escapeHtml(p.pattern_text)}</p>
      ${p.source_report_id ? `<p class="gap-chat-context">From: ${escapeHtml(p.source_report_id)}</p>` : ""}
    </div>`).join("");
}

async function loadLearnedPatternsPanel() {
  const panel = document.getElementById("learned-patterns-panel");
  panel.innerHTML = `<p class="gap-chat-thinking">Loading\u2026</p>`;
  try {
    const patterns = await callListLearnedPatterns();
    panel.innerHTML = renderLearnedPatternsList(patterns);
    panel.querySelectorAll(".confirm-pattern-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Confirming\u2026";
        try {
          await callConfirmLearnedPattern(btn.dataset.id);
          await loadLearnedPatternsPanel();
        } catch (err) {
          showError(String(err));
          btn.disabled = false;
          btn.textContent = "Confirm & Activate";
        }
      });
    });
  } catch (err) {
    panel.innerHTML = `<p class="lu-empty">${escapeHtml(String(err))}</p>`;
  }
}

document.getElementById("learned-patterns-btn").addEventListener("click", () => {
  const panel = document.getElementById("learned-patterns-panel");
  panel.hidden = !panel.hidden;
  if (!panel.hidden) loadLearnedPatternsPanel();
});

document.getElementById("extract-btn").addEventListener("click", async () => {
  const rawText = document.getElementById("raw-text-input").value.trim();
  const notesEl = document.getElementById("extract-notes");
  const gapChatRow = document.getElementById("gap-chat-row");
  notesEl.hidden = true;
  gapChatRow.hidden = true;
  showError("");

  if (!rawText) {
    showError("Paste some spec text first, or upload a .txt file.");
    return;
  }

  const btn = document.getElementById("extract-btn");
  btn.disabled = true;
  btn.textContent = "Extracting\u2026";

  try {
    const res = await fetch("/api/extract", {
      method: "POST",
      headers: tenantHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ rawText }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Extraction failed.");

    for (const id of FIELD_IDS) {
      if (id in data) document.getElementById(id).value = data[id] || "";
    }
    lastExtractionNotes = data.extraction_notes || "";
    if (data.extraction_notes) {
      notesEl.textContent = data.extraction_notes;
      notesEl.hidden = false;
    }
    // Always offer the gap-filling chat after a real extraction, not
    // just when notes are non-empty -- a field can come back thin or
    // empty without extraction having flagged it explicitly.
    gapChatRow.hidden = false;
  } catch (err) {
    showError(String(err));
  } finally {
    btn.disabled = false;
    btn.textContent = "Extract Fields";
  }
});

// ===== Gap-filling chat (after extraction) =====

let gapChatTranscript = [];
let gapChatPendingQuestion = "";

async function callGapChat(spec, extractionNotes, transcript) {
  const res = await fetch("/api/spec-gap-chat", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ spec, extractionNotes, transcript }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Gap chat failed.");
  return data;
}

function renderGapChatPanel(latestGapContext) {
  const historyHtml = gapChatTranscript.map((t) => `
    <div class="gap-chat-turn">
      <div class="gap-chat-bubble gap-chat-bot">${escapeHtml(t.question)}</div>
      <div class="gap-chat-bubble gap-chat-user">${escapeHtml(t.answer)}</div>
    </div>`).join("");

  const pendingHtml = gapChatPendingQuestion ? `
    <div class="gap-chat-turn">
      <div class="gap-chat-bubble gap-chat-bot">${escapeHtml(gapChatPendingQuestion)}</div>
      ${latestGapContext ? `<p class="gap-chat-context">${escapeHtml(latestGapContext)}</p>` : ""}
      <div class="gap-chat-answer-row">
        <textarea id="gap-chat-answer-input" rows="2" placeholder="Your answer (or: that's all I know / proceed anyway)"></textarea>
        <button type="button" class="btn btn-primary" id="gap-chat-submit-btn">Send</button>
      </div>
    </div>` : `
    <div class="gap-chat-done-note">
      \u2713 No more gaps to fill.${latestGapContext ? ` ${escapeHtml(latestGapContext)}` : ""}
      The updated fields above are ready to use.
    </div>`;

  return `<div class="stage-card gap-chat-card">${historyHtml}${pendingHtml}</div>`;
}

function applyGapChatFields(updatedFields) {
  for (const field of ["description", "columnHeading", "logic", "reportScenarios", "sorting"]) {
    if (field in updatedFields) document.getElementById(field).value = updatedFields[field];
  }
}

async function advanceGapChat() {
  const spec = readSpec();
  const panel = document.getElementById("gap-chat-panel");
  try {
    const result = await callGapChat(spec, lastExtractionNotes, gapChatTranscript);
    applyGapChatFields(result.updated_fields);
    gapChatPendingQuestion = result.done ? "" : result.next_question;
    panel.innerHTML = renderGapChatPanel(result.gap_context);
    if (!result.done) {
      document.getElementById("gap-chat-submit-btn").addEventListener("click", submitGapChatAnswer);
    }
  } catch (err) {
    showError(String(err));
  }
}

function submitGapChatAnswer() {
  const input = document.getElementById("gap-chat-answer-input");
  const answer = input.value.trim();
  if (!answer) return;
  gapChatTranscript.push({ question: gapChatPendingQuestion, answer });
  const panel = document.getElementById("gap-chat-panel");
  panel.innerHTML = renderGapChatPanel("") + `<p class="gap-chat-thinking">Thinking\u2026</p>`;
  advanceGapChat();
}

document.getElementById("start-gap-chat-btn").addEventListener("click", () => {
  gapChatTranscript = [];
  gapChatPendingQuestion = "";
  document.getElementById("gap-chat-panel").innerHTML = `<p class="gap-chat-thinking">Thinking\u2026</p>`;
  advanceGapChat();
});



async function callReview(spec) {
  const res = await fetch("/api/review", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(spec),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Review failed.");
  return data;
}

async function callGenerate(spec, specId) {
  const params = new URLSearchParams();
  if (specId) params.set("spec_id", specId);
  const betaCheckbox = document.getElementById("beta-optin-checkbox");
  if (betaCheckbox && betaCheckbox.checked) params.set("allow_unverified", "true");
  const qs = params.toString();
  const url = qs ? `/api/generate?${qs}` : "/api/generate";
  const res = await fetch(url, {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(spec),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Generation failed.");
  return data;
}

async function callSavePrecedent(spec, cql, notes) {
  const body = {
    spec_id: spec.reportId,
    description: spec.description,
    logic: spec.logic,
    report_scenarios: spec.reportScenarios,
    column_heading: spec.columnHeading,
    cql: cql,
    notes: notes || "",
  };
  const res = await fetch("/api/precedents", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to save precedent.");
  return data;
}

// =====================================================================
// DIAGNOSTIC PANEL — signature review visualization: a lab-results-style
// readout. Readiness flag + severity tallies + a 5-category "analyte"
// breakdown (bar length = issue count, color = worst severity present).
// =====================================================================

const READINESS_LABEL = {
  ready: "Ready",
  ready_with_notes: "Ready, with notes",
  needs_revision: "Needs revision",
};

function worstSeverity(insights) {
  if (insights.some((i) => i.severity === "blocking")) return "blocking";
  if (insights.some((i) => i.severity === "warning")) return "warning";
  if (insights.some((i) => i.severity === "info")) return "info";
  return null;
}

function renderSupportingDocTable(rows) {
  if (!rows || rows.length === 0) {
    return `<p class="extract-notes">No supporting document uploaded yet for this report.</p>`;
  }
  const rowsHtml = rows.map((r) => `
    <tr>
      <td>${escapeHtml(r.viewName || "")}</td>
      <td>${escapeHtml(r.columnName || "")}</td>
      <td>${escapeHtml(r.itemQuestion || r.originalItemQuestion || "")}</td>
      <td>${escapeHtml(r.prefix || "")}</td>
    </tr>`).join("");
  return `
    <p class="extract-notes">${rows.length} row(s) loaded for this report:</p>
    <table class="synthetic-data-table">
      <thead><tr><th>View</th><th>Column</th><th>Question</th><th>Prefix</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>`;
}


function renderDiagnosticPanel(review) {
  const insights = review.insights || [];
  const counts = { blocking: 0, warning: 0, info: 0 };
  for (const i of insights) counts[i.severity] = (counts[i.severity] || 0) + 1;

  const maxCategoryCount = Math.max(1, ...CATEGORIES.map((c) => insights.filter((i) => i.category === c).length));

  const analyteRows = CATEGORIES.map((cat) => {
    const catInsights = insights.filter((i) => i.category === cat);
    const count = catInsights.length;
    const severity = worstSeverity(catInsights);
    const pct = count === 0 ? 100 : Math.max(14, Math.round((count / maxCategoryCount) * 100));
    const fillClass = severity || "clear";
    return `
      <div class="analyte-row">
        <span class="analyte-label">${cat}</span>
        <span class="analyte-track"><span class="analyte-fill ${fillClass}" style="width:${pct}%"></span></span>
        <span class="analyte-count">${count || "\u2014"}</span>
      </div>`;
  }).join("");

  return `
    <div class="diagnostic-panel">
      <div class="diagnostic-header">
        <span class="readiness-flag ${review.readiness}">${READINESS_LABEL[review.readiness] || review.readiness}</span>
        <p class="diagnostic-summary">${escapeHtml(review.summary || "")}</p>
      </div>
      <div class="tally-row">
        <div class="tally-cell blocking"><div class="tally-count">${counts.blocking}</div><div class="tally-label">Blocking</div></div>
        <div class="tally-cell warning"><div class="tally-count">${counts.warning}</div><div class="tally-label">Warning</div></div>
        <div class="tally-cell info"><div class="tally-count">${counts.info}</div><div class="tally-label">Info</div></div>
      </div>
      <div class="panel-grid">
        <p class="panel-grid-title">Findings by category</p>
        ${analyteRows}
      </div>
    </div>`;
}

function renderInsightList(insights) {
  if (!insights || insights.length === 0) return "";
  const sorted = [...insights].sort((a, b) => {
    const order = { blocking: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });
  const rows = sorted.map((i) => `
    <div class="insight-row insight-${i.severity}">
      <span class="insight-severity">${i.severity}</span>
      <span class="insight-category">${i.category}</span>
      <div class="insight-body">
        <p class="insight-finding">${escapeHtml(i.finding)}</p>
        <p class="insight-suggestion">&rarr; ${escapeHtml(i.suggestion)}</p>
      </div>
    </div>`).join("");
  return `<div class="insight-list">${rows}</div>`;
}

function renderGuardrailChip(guardrailReports) {
  if (!guardrailReports || guardrailReports.length === 0) return "";
  const latest = guardrailReports[guardrailReports.length - 1];
  if (latest.passed) return `<span class="meta-chip meta-chip-ok">Guardrails: passed</span>`;
  const failed = latest.checks.filter((c) => !c.passed).map((c) => c.check);
  return `<span class="meta-chip meta-chip-fail" title="${escapeHtml(failed.join(", "))}">Guardrails: ${failed.length} failed</span>`;
}

async function callSyntheticValidation(spec, generatedCode) {
  const res = await fetch("/api/synthetic-validation", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ spec, generatedCode, language: spec.language || "cql" }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Synthetic validation failed.");
  return data;
}

const QUADRANT_STYLE = {
  TP: { label: "TP", cls: "quadrant-tp", title: "True Positive \u2014 correctly included" },
  TN: { label: "TN", cls: "quadrant-tn", title: "True Negative \u2014 correctly excluded" },
  FP: { label: "FP", cls: "quadrant-fp", title: "False Positive \u2014 bug: incorrectly included" },
  FN: { label: "FN", cls: "quadrant-fn", title: "False Negative \u2014 bug: incorrectly excluded" },
};

function renderSyntheticValidation(result) {
  const asArray = (x) => (Array.isArray(x) ? x : []);
  const cases = asArray(result.test_cases);

  // Counts are computed HERE, from the actual sanitized test cases --
  // never trusted as a self-reported number from the model, so a
  // mismatched count can never reach the user.
  const counts = { TP: 0, TN: 0, FP: 0, FN: 0 };
  cases.forEach((c) => { if (counts[c.quadrant] !== undefined) counts[c.quadrant]++; });
  const bugsFound = counts.FP > 0 || counts.FN > 0;

  const summaryGridHtml = ["TP", "TN", "FP", "FN"].map((q) => `
    <div class="quadrant-stat ${QUADRANT_STYLE[q].cls}">
      <span class="quadrant-stat-count">${counts[q]}</span>
      <span class="quadrant-stat-label">${q}</span>
    </div>`).join("");

  const conditionsHtml = asArray(result.conditions_identified).map((c) => `<li>${escapeHtml(c)}</li>`).join("");

  function renderSyntheticDataTable(rows) {
    rows = asArray(rows);
    if (rows.length === 0) return `<p class="lu-empty">No synthetic data returned.</p>`;

    // Column union across all rows, in first-seen order -- rows aren't
    // guaranteed to share identical keys even with the sanitized backend
    // shape, so a missing cell just renders blank rather than breaking
    // the table's column alignment.
    const columns = [];
    rows.forEach((row) => {
      Object.keys(row).forEach((k) => { if (!columns.includes(k)) columns.push(k); });
    });

    const headHtml = columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
    const bodyHtml = rows.map((row) =>
      `<tr>${columns.map((c) => `<td>${escapeHtml(row[c] ?? "")}</td>`).join("")}</tr>`
    ).join("");

    return `
      <table class="synthetic-data-table">
        <thead><tr>${headHtml}</tr></thead>
        <tbody>${bodyHtml}</tbody>
      </table>`;
  }

  const casesHtml = cases.map((c) => {
    const style = QUADRANT_STYLE[c.quadrant] || QUADRANT_STYLE.TN;
    return `
      <div class="scenario-card">
        <div class="scenario-header">
          <span class="scenario-label">${escapeHtml(c.condition_tested)}</span>
          <span class="verdict-badge ${style.cls}" title="${escapeHtml(style.title)}">${style.label}</span>
        </div>
        <p class="scenario-field-label">Synthetic data</p>
        ${renderSyntheticDataTable(c.synthetic_data)}
        <div class="scenario-outcomes">
          <div><span class="scenario-field-label">Expected</span><p>${escapeHtml(c.expected_outcome)}</p></div>
          <div><span class="scenario-field-label">Traced</span><p>${escapeHtml(c.traced_outcome)}</p></div>
        </div>
        <p class="scenario-reasoning">${escapeHtml(c.explanation)}</p>
      </div>`;
  }).join("");

  return `
    <div class="stage-card synthetic-test-card">
      <div class="synthetic-caveat">
        \u26a0 This is a reasoned trace of the code's logic against synthetic data \u2014
        <strong>not a real execution against a live system.</strong> Clean results mean the
        logic appears correct on paper; always confirm with an actual test run before relying on it.
      </div>
      <div class="quadrant-summary">${summaryGridHtml}</div>
      ${bugsFound ? `<p class="synthetic-bug-banner">\u26a0 ${counts.FP + counts.FN} case(s) below reveal a divergence between expected and actual logic \u2014 review the FP/FN cases closely.</p>` : ""}
      <p class="lu-summary">${escapeHtml(result.overall_summary || "")}</p>
      ${conditionsHtml ? `<p class="scenario-field-label">Conditions covered</p><ul class="lu-list">${conditionsHtml}</ul>` : ""}
      ${casesHtml}
    </div>`;
}

async function runSyntheticValidation(spec, generatedCode) {
  showError("");
  const btn = document.getElementById("run-synthetic-validation-btn");
  const panel = document.getElementById("synthetic-test-panel");
  btn.disabled = true;
  btn.textContent = "Constructing test matrix\u2026";
  try {
    const result = await callSyntheticValidation(spec, generatedCode);
    panel.innerHTML = renderSyntheticValidation(result);
  } catch (err) {
    showError(String(err));
  } finally {
    btn.disabled = false;
    btn.textContent = "\u25b6 Synthetic Data & Validation";
  }
}

function renderGeneratedOutput(spec, data) {
  const precedentsNote = (data.retrieved_precedents && data.retrieved_precedents.length)
    ? `<span class="meta-chip">RAG: ${data.retrieved_precedents.map(escapeHtml).join(", ")}</span>`
    : "";
  const guardrailChip = renderGuardrailChip(data.guardrail_reports);
  const betaChip = data.isBeta ? `<span class="meta-chip meta-chip-beta">\u26a0 UNVERIFIED BETA -- review before use</span>` : "";
  const cascade = (data.cascade_trace || []).map((s) => `<li>${s.tier}: ${s.status} \u2014 ${escapeHtml(s.detail)}</li>`).join("");

  document.getElementById("generate-content").innerHTML = `
    <div class="stage-card">
      <div class="meta-row">
        <span class="meta-chip">${escapeHtml(spec.reportId || "untitled")}</span>
        ${betaChip}${precedentsNote}${guardrailChip}
      </div>
      <p class="code-block-label">${escapeHtml((spec.language || "cql").toUpperCase())}</p>
      <pre class="code-block">${highlightSql(data.cql || "")}</pre>
      <p class="explanation-label">Explanation</p>
      <p class="explanation-text">${escapeHtml(data.explanation || "")}</p>
      ${cascade ? `<details class="cascade-trace"><summary>Cascade trace</summary><ul>${cascade}</ul></details>` : ""}
      ${data.cql ? `
        <div class="precedent-row">
          <input type="text" id="precedent-notes-input" placeholder="Optional note for this precedent..." />
          <button type="button" class="btn btn-ghost" id="save-precedent-btn">Save as verified precedent</button>
        </div>
        <p class="precedent-status" id="precedent-status"></p>
        <div class="synthetic-test-row">
          <button type="button" class="btn btn-secondary" id="run-synthetic-validation-btn">\u25b6 Synthetic Data &amp; Validation</button>
        </div>
        <div id="synthetic-test-panel"></div>
      ` : ""}
    </div>`;

  if (data.cql) {
    document.getElementById("run-synthetic-validation-btn").addEventListener("click", () => {
      runSyntheticValidation(spec, data.cql);
    });
    document.getElementById("save-precedent-btn").addEventListener("click", async () => {
      const btn = document.getElementById("save-precedent-btn");
      const notes = document.getElementById("precedent-notes-input").value;
      btn.disabled = true;
      btn.textContent = "Saving\u2026";
      try {
        await callSavePrecedent(spec, data.cql, notes);
        btn.textContent = "\u2713 Saved as precedent";
        document.getElementById("precedent-status").textContent = "Future similar specs will retrieve this as a few-shot example.";
      } catch (err) {
        btn.disabled = false;
        btn.textContent = "Save as verified precedent";
        showError(String(err));
      }
    });
  }
}

// ===== Main flow =====

async function runGenerate(spec, specId) {
  document.getElementById("generate-content").innerHTML = `<div class="empty-state">Generating\u2026</div>`;
  reachStep("generate");
  try {
    const data = await callGenerate(spec, specId);
    exportState.generateResult = data;
    updateExportButtonState();
    renderGeneratedOutput(spec, data);
  } catch (err) {
    showError(String(err));
    document.getElementById("generate-content").innerHTML = `<div class="empty-state">Generation failed. See error above.</div>`;
  }
}

async function callUnderstand(spec) {
  const res = await fetch("/api/understand", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(spec),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Logic understanding failed.");
  return data;
}

function renderLogicUnderstanding(understanding) {
  // asArray() guards against more than just missing/null -- a real API
  // response once returned a truthy-but-non-array value for one of these
  // fields (cause unconfirmed: schema-adherence slip, or a truncated tool
  // call producing a partial/wrong-shaped value), which crashed .map()
  // even though "x || []" was already in place -- that fallback only
  // catches falsy values, not "truthy but the wrong type". Array.isArray()
  // is the actual guard needed here, on every field, not just some.
  const asArray = (x) => (Array.isArray(x) ? x : []);

  const domainsHtml = asArray(understanding.domains_identified).map((d) => `
    <div class="lu-domain"><strong>${escapeHtml(String(d?.domain ?? ""))}</strong> &mdash; ${escapeHtml(String(d?.reasoning ?? ""))}</div>
  `).join("");

  const stepsHtml = asArray(understanding.logic_steps).map((s) => `
    <div class="lu-step">
      <span class="lu-step-num">${escapeHtml(String(s?.step_number ?? "?"))}</span>
      <div class="lu-step-body">
        <p>${escapeHtml(String(s?.explanation ?? ""))}</p>
        ${s?.inferred ? `<span class="lu-inferred-tag">INFERRED</span>` : ""}
      </div>
    </div>
  `).join("");

  const definitionsHtml = asArray(understanding.key_definitions).map((d) => `
    <div class="lu-definition"><strong>${escapeHtml(String(d?.term ?? ""))}:</strong> ${escapeHtml(String(d?.meaning ?? ""))}</div>
  `).join("");

  const assumptionsHtml = asArray(understanding.assumptions).map((a) => `<li>${escapeHtml(String(a ?? ""))}</li>`).join("");

  const edgeCasesHtml = asArray(understanding.edge_cases).map((e) => `
    <div class="lu-edge-case"><strong>${escapeHtml(String(e?.case ?? ""))}:</strong> ${escapeHtml(String(e?.handling ?? ""))}</div>
  `).join("");

  return `
    <div class="stage-card">
      <h2 class="stage-card-title">Logic Understanding</h2>
      <p class="lu-summary">${escapeHtml(understanding.summary || "")}</p>

      <p class="lu-section-label">Domains identified</p>
      ${domainsHtml || `<p class="lu-empty">None identified.</p>`}

      <p class="lu-section-label">Reasoning, step by step</p>
      <div class="lu-steps">${stepsHtml || `<p class="lu-empty">No steps returned.</p>`}</div>

      <p class="lu-section-label">Key definitions</p>
      ${definitionsHtml || `<p class="lu-empty">None.</p>`}

      <p class="lu-section-label">Assumptions</p>
      ${assumptionsHtml ? `<ul class="lu-list">${assumptionsHtml}</ul>` : `<p class="lu-empty">None stated.</p>`}

      <p class="lu-section-label">Edge cases</p>
      ${edgeCasesHtml || `<p class="lu-empty">None identified.</p>`}

      <div class="review-actions" style="margin-top: 18px;">
        <button type="button" class="btn btn-primary" id="proceed-to-review-btn">This matches my intent \u2014 Proceed to Review &rarr;</button>
      </div>
    </div>`;
}

document.getElementById("spec-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  showError("");
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Understanding\u2026";

  const spec = readSpec();

  try {
    const understanding = await callUnderstand(spec);
    exportState.spec = spec;
    exportState.understanding = understanding;
    exportState.review = null;       // a fresh Understand run invalidates any prior downstream export data
    exportState.generateResult = null;
    updateExportButtonState();
    document.getElementById("understand-content").innerHTML = renderLogicUnderstanding(understanding);
    reachStep("understand");

    document.getElementById("proceed-to-review-btn").addEventListener("click", async () => {
      await runReview(spec);
    });
  } catch (err) {
    showError(String(err));
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Understand Logic \u2192";
  }
});

async function callSpecSuggestion(spec, review) {
  const res = await fetch("/api/suggest-spec", {
    method: "POST",
    headers: tenantHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ spec, review }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Spec suggestion failed.");
  return data;
}

const FIELD_LABELS = {
  description: "Description", columnHeading: "Column Heading", logic: "Logic",
  reportScenarios: "Report Scenarios", sorting: "Sorting",
};

async function runSpecSuggestion(originalSpec, review, onAccept) {
  showError("");
  const btn = document.getElementById("suggest-spec-btn");
  const panel = document.getElementById("suggestion-panel");
  btn.disabled = true;
  btn.textContent = "Thinking through suggestions\u2026";

  try {
    const suggestion = await callSpecSuggestion(originalSpec, review);
    const asArray = (x) => (Array.isArray(x) ? x : []);
    const changedFields = asArray(suggestion.fields).filter((f) => f.changed);

    if (changedFields.length === 0) {
      panel.innerHTML = `
        <div class="stage-card suggestion-card">
          <p class="lu-summary">${escapeHtml(suggestion.overall_summary || "No changes suggested -- the review findings don't concern the spec's content fields.")}</p>
        </div>`;
      btn.disabled = false;
      btn.textContent = "\u270e Suggest Spec Improvements";
      return;
    }

    const fieldsHtml = changedFields.map((f) => `
      <div class="suggestion-field" data-field="${escapeHtml(f.field)}">
        <p class="export-field-label">${escapeHtml(FIELD_LABELS[f.field] || f.field)}</p>
        <p class="suggestion-change-summary">${escapeHtml(f.change_summary || "")}</p>
        <textarea class="suggestion-textarea" rows="4">${escapeHtml(f.suggested_text)}</textarea>
      </div>`).join("");

    panel.innerHTML = `
      <div class="stage-card suggestion-card">
        <p class="lu-summary">${escapeHtml(suggestion.overall_summary || "")}</p>
        ${fieldsHtml}
        <div class="review-actions">
          <button type="button" class="btn btn-primary" id="use-suggestions-btn">Use These Suggestions &rarr;</button>
          <button type="button" class="btn btn-secondary" id="keep-original-btn">Keep Original, No Changes</button>
        </div>
      </div>`;

    document.getElementById("use-suggestions-btn").addEventListener("click", () => {
      const updated = { ...originalSpec };
      panel.querySelectorAll(".suggestion-field").forEach((el) => {
        const field = el.dataset.field;
        const textarea = el.querySelector(".suggestion-textarea");
        updated[field] = textarea.value;
      });
      onAccept(updated);
      panel.innerHTML = `<div class="suggestion-applied-note">\u2713 Using the suggested spec above for generation.</div>`;
    });
    document.getElementById("keep-original-btn").addEventListener("click", () => {
      onAccept(originalSpec);
      panel.innerHTML = `<div class="suggestion-applied-note">Keeping the original spec unchanged.</div>`;
    });
  } catch (err) {
    showError(String(err));
  } finally {
    btn.disabled = false;
    btn.textContent = "\u270e Suggest Spec Improvements";
  }
}

async function runReview(spec) {
  showError("");
  const proceedBtn = document.getElementById("proceed-to-review-btn");
  if (proceedBtn) {
    proceedBtn.disabled = true;
    proceedBtn.textContent = "Reviewing\u2026";
  }

  try {
    const review = await callReview(spec);
    exportState.review = review;
    exportState.generateResult = null;  // a fresh Review run invalidates any prior Generate export data
    updateExportButtonState();
    const reviewHtml = renderDiagnosticPanel(review) + renderInsightList(review.insights);
    const content = document.getElementById("review-content");

    // activeSpec is what Generate actually runs against -- starts as the
    // reviewed spec, but gets REASSIGNED if the user accepts suggested
    // spec improvements below. Declared with `let` and captured by
    // closure so both the suggestion-accept handler and the generate
    // button's handler see the same, current value.
    let activeSpec = spec;

    // Always require an explicit click before generating, regardless of
    // readiness -- review must actually be looked at, never silently
    // skipped just because nothing blocking was found. Only the button's
    // label/styling differs by readiness, not whether it's required.
    const isBlocking = review.readiness === "needs_revision";
    const btnLabel = isBlocking ? "Generate Anyway" : "Confirm &amp; Generate \u2192";
    const btnClass = isBlocking ? "btn-warn" : "btn-primary";

    content.innerHTML = reviewHtml + `
      <div class="review-actions">
        <button type="button" class="btn btn-secondary" id="suggest-spec-btn">\u270e Suggest Spec Improvements</button>
        <button type="button" class="btn ${btnClass}" id="confirm-generate-btn">${btnLabel}</button>
      </div>
      <div id="suggestion-panel"></div>`;

    document.getElementById("confirm-generate-btn").addEventListener("click", () => {
      runGenerate(activeSpec, review.specId);
    });
    document.getElementById("suggest-spec-btn").addEventListener("click", () => {
      runSpecSuggestion(spec, review, (updatedSpec) => { activeSpec = updatedSpec; });
    });

    reachStep("review");
  } catch (err) {
    showError(String(err));
    if (proceedBtn) {
      proceedBtn.disabled = false;
      proceedBtn.textContent = "This matches my intent \u2014 Proceed to Review \u2192";
    }
  }
}

function buildExportHtml() {
  const { spec, understanding, review, generateResult } = exportState;
  const asArray = (x) => (Array.isArray(x) ? x : []);

  const specFieldsHtml = [
    ["Report ID", spec.reportId], ["EDC System / Language", `${spec.edcSystem || "veeva"} / ${(spec.language || "cql").toUpperCase()}`],
    ["Description", spec.description], ["Column Heading", spec.columnHeading],
    ["Logic", spec.logic], ["Report Scenarios", spec.reportScenarios], ["Sorting", spec.sorting],
  ].map(([label, value]) => `
    <div class="export-field">
      <p class="export-field-label">${escapeHtml(label)}</p>
      <p class="export-field-value">${escapeHtml(value || "\u2014")}</p>
    </div>`).join("");

  const luStepsHtml = understanding
    ? asArray(understanding.logic_steps).map((s) =>
        `<div class="export-lu-step"><strong>${escapeHtml(String(s?.step_number ?? "?"))}.</strong> ${escapeHtml(String(s?.explanation ?? ""))}${s?.inferred ? " <em>(inferred)</em>" : ""}</div>`
      ).join("")
    : "<p>Not run.</p>";
  const luSummary = understanding ? escapeHtml(understanding.summary || "") : "";

  const insightsHtml = review
    ? asArray(review.insights).map((i) =>
        `<div class="export-insight export-insight-${escapeHtml(i.severity)}"><strong>${escapeHtml(i.severity.toUpperCase())} (${escapeHtml(i.category)}):</strong> ${escapeHtml(i.finding)} &rarr; ${escapeHtml(i.suggestion)}</div>`
      ).join("") || "<p>No findings.</p>"
    : "<p>Not run.</p>";
  const readinessLabel = review ? (READINESS_LABEL[review.readiness] || review.readiness) : "";

  const guardrailReport = generateResult?.guardrail_reports?.[generateResult.guardrail_reports.length - 1];
  const guardrailLine = guardrailReport
    ? (guardrailReport.passed ? "Guardrails: passed" : `Guardrails: ${guardrailReport.checks.filter((c) => !c.passed).length} check(s) failed (${guardrailReport.checks.filter((c) => !c.passed).map((c) => c.check).join(", ")})`)
    : "";

  return `
    <h1 class="export-title">Spec &rarr; Code: ${escapeHtml(spec.reportId || "untitled")}</h1>
    <p class="export-subtitle">Exported ${new Date().toLocaleString()} &middot; Tenant: ${escapeHtml(getTenantId())}</p>

    <div class="export-section">
      <h2>1. Spec</h2>
      ${specFieldsHtml}
    </div>

    <div class="export-section">
      <h2>2. Logic Understanding</h2>
      ${understanding ? `<p class="export-field-value">${luSummary}</p>` : ""}
      ${luStepsHtml}
    </div>

    <div class="export-section">
      <h2>3. Spec Review</h2>
      ${review ? `<p class="export-meta">Readiness: ${escapeHtml(readinessLabel)} &mdash; ${escapeHtml(review.summary || "")}</p>` : ""}
      ${insightsHtml}
    </div>

    <div class="export-section">
      <h2>4. Generated Code</h2>
      ${generateResult ? `
        <p class="export-meta">${escapeHtml((spec.language || "cql").toUpperCase())}${generateResult.isBeta ? " \u2014 UNVERIFIED BETA" : ""} \u2014 ${escapeHtml(guardrailLine)}</p>
        <pre class="export-code">${escapeHtml(formatSql(generateResult.cql || ""))}</pre>
        <p class="export-field-value">${escapeHtml(generateResult.explanation || "")}</p>
      ` : "<p>Not run.</p>"}
    </div>`;
}

document.getElementById("export-pdf-btn").addEventListener("click", () => {
  if (!exportState.spec || !exportState.generateResult) return;
  document.getElementById("export-view").innerHTML = buildExportHtml();
  document.body.classList.add("exporting");
  window.print();
  // afterprint fires whether the user completed the "Save as PDF" dialog
  // or cancelled it -- either way the interactive UI should come back.
  const cleanup = () => {
    document.body.classList.remove("exporting");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
});

function buildExportPlainText() {
  // Same 4 sections as buildExportHtml(), but genuinely plain text --
  // this exists specifically because a browser's print-to-PDF pipeline
  // is outside this page's control (OS print driver, or IT-managed DLP
  // software, can rasterize the output regardless of what CSS says), so
  // "can't select/copy PDF text" needs a fix that doesn't depend on PDF
  // rendering at all. Clipboard text is unconditionally real text.
  const { spec, understanding, review, generateResult } = exportState;
  const asArray = (x) => (Array.isArray(x) ? x : []);
  const lines = [];
  const rule = "=".repeat(70);

  lines.push(`SPEC -> CODE EXPORT: ${spec.reportId || "untitled"}`);
  lines.push(`Exported ${new Date().toLocaleString()} | Tenant: ${getTenantId()}`);
  lines.push("");

  lines.push(rule, "1. SPEC", rule);
  const specFields = [
    ["Report ID", spec.reportId], ["EDC System / Language", `${spec.edcSystem || "veeva"} / ${(spec.language || "cql").toUpperCase()}`],
    ["Description", spec.description], ["Column Heading", spec.columnHeading],
    ["Logic", spec.logic], ["Report Scenarios", spec.reportScenarios], ["Sorting", spec.sorting],
  ];
  for (const [label, value] of specFields) {
    lines.push(`${label}:`, value || "(none)", "");
  }

  lines.push(rule, "2. LOGIC UNDERSTANDING", rule);
  if (understanding) {
    lines.push(understanding.summary || "", "");
    for (const s of asArray(understanding.logic_steps)) {
      lines.push(`${s?.step_number ?? "?"}. ${s?.explanation ?? ""}${s?.inferred ? " (inferred)" : ""}`);
    }
  } else {
    lines.push("Not run.");
  }
  lines.push("");

  lines.push(rule, "3. SPEC REVIEW", rule);
  if (review) {
    lines.push(`Readiness: ${READINESS_LABEL[review.readiness] || review.readiness} -- ${review.summary || ""}`, "");
    for (const i of asArray(review.insights)) {
      lines.push(`[${i.severity.toUpperCase()}] (${i.category}) ${i.finding}`);
      lines.push(`  -> ${i.suggestion}`);
    }
    if (asArray(review.insights).length === 0) lines.push("No findings.");
  } else {
    lines.push("Not run.");
  }
  lines.push("");

  lines.push(rule, "4. GENERATED CODE", rule);
  if (generateResult) {
    const guardrailReport = generateResult.guardrail_reports?.[generateResult.guardrail_reports.length - 1];
    const guardrailLine = guardrailReport
      ? (guardrailReport.passed ? "Guardrails: passed" : `Guardrails: ${guardrailReport.checks.filter((c) => !c.passed).length} check(s) failed`)
      : "";
    lines.push(`${(spec.language || "cql").toUpperCase()}${generateResult.isBeta ? " -- UNVERIFIED BETA" : ""} -- ${guardrailLine}`, "");
    lines.push(formatSql(generateResult.cql || ""), "");
    lines.push("Explanation:", generateResult.explanation || "");
  } else {
    lines.push("Not run.");
  }

  return lines.join("\n");
}

document.getElementById("copy-all-btn").addEventListener("click", async () => {
  if (!exportState.spec || !exportState.generateResult) return;
  const btn = document.getElementById("copy-all-btn");
  const originalText = btn.textContent;
  try {
    await navigator.clipboard.writeText(buildExportPlainText());
    btn.textContent = "\u2713 Copied!";
  } catch (err) {
    showError("Could not access the clipboard: " + String(err));
  } finally {
    setTimeout(() => { btn.textContent = originalText; }, 2000);
  }
});

document.getElementById("generate-content").innerHTML = `<div class="empty-state">Review a spec first. Once code is generated here, you'll also be able to run Synthetic Data &amp; Validation and export the whole result.</div>`;
document.getElementById("review-content").innerHTML = `<div class="empty-state">Understand the logic first.</div>`;
document.getElementById("understand-content").innerHTML = `<div class="empty-state">Fill in a spec and submit to see the logic walkthrough.</div>`;
