"use client";

import { useEffect, useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import {
  extractSpec,
  reviewSpec,
  generateCode,
  savePrecedent,
  type SpecFields,
  type ReviewResult,
  type GenerateResult,
} from "@/lib/api";

const EMPTY_SPEC: SpecFields = {
  reportId: "",
  description: "",
  columnHeading: "",
  logic: "",
  reportScenarios: "",
  sorting: "",
  specTemplate: "merck_cdisc_report_library",
  edcSystem: "veeva",
  language: "cql",
};

const EXAMPLE_SPEC: SpecFields = {
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
  specTemplate: "merck_cdisc_report_library",
  edcSystem: "veeva",
  language: "cql",
};

const TENANT_STORAGE_KEY = "cdm_spec_to_cql_tenant_id";

const SEVERITY_STYLE: Record<string, string> = {
  blocking: "bg-red-950 text-red-300 border-red-800",
  warning: "bg-amber-950 text-amber-300 border-amber-800",
  info: "bg-sky-950 text-sky-300 border-sky-800",
};

export default function Home() {
  const [tenantId, setTenantId] = useState("default");
  const [rawText, setRawText] = useState("");
  const [spec, setSpec] = useState<SpecFields>(EMPTY_SPEC);
  const [extractionNotes, setExtractionNotes] = useState<string | null>(null);

  const [extracting, setExtracting] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [savingPrecedent, setSavingPrecedent] = useState(false);
  const [precedentSaved, setPrecedentSaved] = useState(false);
  const [precedentNotes, setPrecedentNotes] = useState("");

  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [generateResult, setGenerateResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(TENANT_STORAGE_KEY);
    if (saved) setTenantId(saved);
  }, []);

  function updateTenant(value: string) {
    const normalized = value.trim() || "default";
    setTenantId(normalized);
    window.localStorage.setItem(TENANT_STORAGE_KEY, normalized);
  }

  function updateField(field: keyof SpecFields, value: string) {
    setSpec((s) => ({ ...s, [field]: value }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setRawText(text);
  }

  async function handleExtract() {
    setError(null);
    setExtracting(true);
    setExtractionNotes(null);
    try {
      const result = await extractSpec(rawText, tenantId);
      setSpec((s) => ({
        ...s,
        reportId: result.reportId,
        description: result.description,
        columnHeading: result.columnHeading,
        logic: result.logic,
        reportScenarios: result.reportScenarios,
        sorting: result.sorting,
      }));
      setExtractionNotes(result.extraction_notes || null);
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
    } finally {
      setExtracting(false);
    }
  }

  async function handleReviewAndGenerate() {
    setError(null);
    setReviewResult(null);
    setGenerateResult(null);
    setPrecedentSaved(false);
    setReviewing(true);
    try {
      const review = await reviewSpec(spec, tenantId);
      setReviewResult(review);
      if (review.readiness === "needs_revision") {
        setReviewing(false);
        return; // wait for explicit "Generate Anyway"
      }
      setReviewing(false);
      await runGenerate(review.specId);
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
      setReviewing(false);
    }
  }

  async function runGenerate(specId: string) {
    setGenerating(true);
    try {
      const result = await generateCode(spec, specId, tenantId);
      setGenerateResult(result);
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
    } finally {
      setGenerating(false);
    }
  }

  async function handleSavePrecedent() {
    if (!generateResult?.cql) return;
    setSavingPrecedent(true);
    setError(null);
    try {
      await savePrecedent(spec, generateResult.cql, precedentNotes, tenantId);
      setPrecedentSaved(true);
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
    } finally {
      setSavingPrecedent(false);
    }
  }

  const busy = extracting || reviewing || generating;

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900 px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between gap-4 border-b border-neutral-300 pb-5 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Spec<span className="text-emerald-600 mx-2">&rarr;</span>Code
          </h1>
          <p className="text-xs uppercase tracking-wide text-neutral-500 font-mono mt-1">
            CDM report spec / Claude
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="tenant" className="text-xs uppercase tracking-wide text-neutral-500 font-mono">
            Tenant
          </label>
          <input
            id="tenant"
            defaultValue={tenantId}
            onBlur={(e) => updateTenant(e.target.value)}
            placeholder="default"
            className="border border-neutral-300 rounded-sm px-2 py-1 text-sm font-mono w-36"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-sm px-3 py-2 mb-5 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <section className="bg-white border border-neutral-200 rounded-sm p-4">
            <h2 className="text-sm font-semibold mb-2">Extract from raw spec text</h2>
            <p className="text-xs text-neutral-500 mb-3">
              Paste unstructured spec text (Notepad, Word, email — anything), or upload a .txt file.
              Extraction is a starting point: review and edit the fields below before submitting.
            </p>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={6}
              placeholder="Paste raw spec text here..."
              className="w-full border border-neutral-300 rounded-sm p-2 text-sm font-mono"
            />
            <div className="flex items-center gap-3 mt-2">
              <input type="file" accept=".txt" onChange={handleFileUpload} className="text-xs" />
              <button
                onClick={handleExtract}
                disabled={busy || !rawText.trim()}
                className="ml-auto bg-neutral-900 text-white text-sm px-3 py-1.5 rounded-sm disabled:opacity-40"
              >
                {extracting ? "Extracting…" : "Extract Fields"}
              </button>
            </div>
            {extractionNotes && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-sm p-2 mt-2">
                {extractionNotes}
              </p>
            )}
          </section>

          <section className="bg-white border border-neutral-200 rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Spec fields</h2>
              <button onClick={() => setSpec(EXAMPLE_SPEC)} className="text-xs text-neutral-500 underline">
                Load example
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                value={spec.edcSystem}
                onChange={(e) => updateField("edcSystem", e.target.value)}
                className="border border-neutral-300 rounded-sm px-2 py-1 text-xs font-mono"
              >
                <option value="veeva">Veeva</option>
                <option value="rave">Rave</option>
                <option value="oracle_clinical_one">Oracle Clinical One</option>
              </select>
              <select
                value={spec.language}
                onChange={(e) => updateField("language", e.target.value)}
                className="border border-neutral-300 rounded-sm px-2 py-1 text-xs font-mono"
              >
                <option value="cql">CQL</option>
                <option value="python">Python</option>
                <option value="sql">SQL</option>
                <option value="sas">SAS</option>
                <option value="r">R</option>
              </select>
              <input
                value={spec.specTemplate}
                onChange={(e) => updateField("specTemplate", e.target.value)}
                className="border border-neutral-300 rounded-sm px-2 py-1 text-xs font-mono"
                placeholder="spec template"
              />
            </div>
            <p className="text-[0.68rem] text-neutral-400">
              Only Veeva/CQL and Veeva/Python have a verified generation path today — other
              combinations will be refused with a specific reason. See the project README.
            </p>

            {(
              [
                ["reportId", "Report ID", false],
                ["studyId", "Study ID (optional — uses metadata uploaded via the API/vanilla UI)", false],
                ["description", "Description", true],
                ["columnHeading", "Column Heading", true],
                ["logic", "Logic", true],
                ["reportScenarios", "Report Scenarios", true],
                ["sorting", "Sorting", false],
              ] as [keyof SpecFields, string, boolean][]
            ).map(([field, label, multiline]) => (
              <div key={field}>
                <label className="text-xs font-mono uppercase tracking-wide text-neutral-500">{label}</label>
                {multiline ? (
                  <textarea
                    value={(spec[field] as string) || ""}
                    onChange={(e) => updateField(field, e.target.value)}
                    rows={3}
                    className="w-full border border-neutral-300 rounded-sm p-2 text-sm mt-1"
                  />
                ) : (
                  <input
                    value={(spec[field] as string) || ""}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="w-full border border-neutral-300 rounded-sm p-2 text-sm mt-1"
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleReviewAndGenerate}
              disabled={busy || !spec.reportId.trim() || !spec.description.trim()}
              className="w-full bg-neutral-900 text-white text-sm py-2 rounded-sm disabled:opacity-40"
            >
              {reviewing ? "Reviewing…" : generating ? "Generating…" : "Review & Generate"}
            </button>
          </section>
        </div>

        <div className="space-y-5">
          {reviewResult && (
            <section className="bg-white border border-neutral-200 rounded-sm overflow-hidden">
              <div className="px-4 py-3 text-sm bg-neutral-50 border-b border-neutral-200">
                {reviewResult.summary}
              </div>
              {reviewResult.insights.map((insight, i) => (
                <div key={i} className="px-4 py-2.5 border-b border-neutral-100 last:border-0 flex gap-3 items-start">
                  <span
                    className={`text-[0.65rem] uppercase font-mono px-2 py-0.5 rounded-full border shrink-0 ${SEVERITY_STYLE[insight.severity]}`}
                  >
                    {insight.severity}
                  </span>
                  <div className="text-sm">
                    <div className="text-neutral-500 text-xs font-mono uppercase">{insight.category}</div>
                    <div>{insight.finding}</div>
                    <div className="text-neutral-500 text-xs mt-0.5">&rarr; {insight.suggestion}</div>
                  </div>
                </div>
              ))}
              {reviewResult.readiness === "needs_revision" && !generateResult && (
                <div className="p-4">
                  <button
                    onClick={() => runGenerate(reviewResult.specId)}
                    disabled={busy}
                    className="w-full bg-amber-700 text-white text-sm py-2 rounded-sm disabled:opacity-40"
                  >
                    Generate Anyway
                  </button>
                </div>
              )}
            </section>
          )}

          {generateResult && (
            <section className="bg-white border border-neutral-200 rounded-sm p-4 space-y-3">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="font-mono border border-neutral-300 rounded-sm px-2 py-0.5">
                  {spec.reportId || "untitled"}
                </span>
                {generateResult.retrieved_precedents.length > 0 && (
                  <span className="font-mono border border-neutral-300 rounded-sm px-2 py-0.5">
                    RAG: {generateResult.retrieved_precedents.join(", ")}
                  </span>
                )}
                {generateResult.guardrail_reports.length > 0 && (
                  <span
                    className={`font-mono border rounded-sm px-2 py-0.5 ${
                      generateResult.guardrail_reports[generateResult.guardrail_reports.length - 1].passed
                        ? "border-emerald-300 text-emerald-700"
                        : "border-red-300 text-red-700"
                    }`}
                    title={generateResult.guardrail_reports[generateResult.guardrail_reports.length - 1].checks
                      .filter((c) => !c.passed)
                      .map((c) => c.check)
                      .join(", ")}
                  >
                    Guardrails:{" "}
                    {generateResult.guardrail_reports[generateResult.guardrail_reports.length - 1].passed
                      ? "passed"
                      : `${generateResult.guardrail_reports[generateResult.guardrail_reports.length - 1].checks.filter((c) => !c.passed).length} failed`}
                  </span>
                )}
              </div>

              <CodeBlock code={generateResult.cql || ""} />

              <p className="text-sm text-neutral-700">{generateResult.explanation}</p>

              {generateResult.cascade_trace.length > 0 && (
                <details className="text-xs text-neutral-500">
                  <summary className="cursor-pointer font-mono uppercase">Cascade trace</summary>
                  <ul className="mt-1 space-y-0.5 font-mono">
                    {generateResult.cascade_trace.map((step, i) => (
                      <li key={i}>
                        {step.tier}: {step.status} — {step.detail}
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {generateResult.cql && (
                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                  <input
                    value={precedentNotes}
                    onChange={(e) => setPrecedentNotes(e.target.value)}
                    placeholder="Optional note for this precedent..."
                    className="flex-1 border border-neutral-300 rounded-sm px-2 py-1.5 text-sm"
                    disabled={precedentSaved}
                  />
                  <button
                    onClick={handleSavePrecedent}
                    disabled={savingPrecedent || precedentSaved}
                    className="text-sm border border-neutral-300 rounded-sm px-3 py-1.5 disabled:opacity-60 whitespace-nowrap"
                  >
                    {precedentSaved ? "✓ Saved as precedent" : savingPrecedent ? "Saving…" : "Save as verified precedent"}
                  </button>
                </div>
              )}
            </section>
          )}

          {!reviewResult && !generateResult && (
            <div className="text-sm text-neutral-400 border border-dashed border-neutral-300 rounded-sm p-8 text-center">
              Extract or fill in a spec, then Review &amp; Generate.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
