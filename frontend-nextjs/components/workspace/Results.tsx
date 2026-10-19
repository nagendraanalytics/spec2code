"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { savePrecedent } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, inputCls } from "@/components/ui/primitives";
import CodeBlock from "@/components/CodeBlock";

type Tab = "code" | "understanding" | "review" | "checks" | "trace";
const SEVERITY = { blocking: "bad", warning: "warn", info: "accent" } as const;

export default function Results() {
  const { understanding, review, result, spec, tenantId, stages } = useWorkspace();
  const [tab, setTab] = useState<Tab>("code");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState<string | null>(null);

  // Follow the pipeline: show whichever stage finished last.
  useEffect(() => {
    if (stages.generate === "done") setTab("code");
    else if (stages.review === "done" || stages.review === "blocked") setTab("review");
    else if (stages.understand === "done") setTab("understanding");
  }, [stages.understand, stages.review, stages.generate]);

  useEffect(() => setSaved(false), [result]);

  const lastGuard = result?.guardrail_reports.at(-1);
  const failedChecks = lastGuard?.checks.filter((c) => !c.passed) ?? [];

  const tabs: { id: Tab; label: string; show: boolean; badge?: string }[] = [
    { id: "code", label: "Code", show: true },
    { id: "understanding", label: "Understanding", show: true },
    { id: "review", label: "Review", show: true, badge: review?.insights.length ? String(review.insights.length) : undefined },
    { id: "checks", label: "Checks", show: true, badge: failedChecks.length ? String(failedChecks.length) : undefined },
    { id: "trace", label: "Trace", show: true },
  ];

  async function confirmPrecedent() {
    if (!result?.cql) return;
    setSaving(true);
    setSaveErr(null);
    try {
      await savePrecedent(spec, result.cql, notes, tenantId);
      setSaved(true);
    } catch (e) {
      setSaveErr(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  const empty = (text: string) => <p className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted">{text}</p>;

  return (
    <Card className="min-h-[72vh]">
      <div role="tablist" aria-label="Results" className="flex gap-1 overflow-x-auto border-b border-line px-2 pt-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              "flex items-center gap-1.5 whitespace-nowrap rounded-t-lg border-b-2 px-3 py-2 text-sm transition",
              tab === t.id ? "border-accent font-medium text-ink" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {t.label}
            {t.badge && <span className="rounded-full bg-surface2 px-1.5 text-[11px]">{t.badge}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4 p-4" role="tabpanel">
        {tab === "code" &&
          (result?.cql ? (
            <div className="fade-up space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{spec.reportId || "untitled"}</Badge>
                {result.isBeta ? <Badge tone="warn">Unverified draft</Badge> : <Badge tone="good">Verified path</Badge>}
                {lastGuard && (lastGuard.passed ? <Badge tone="good">Guardrails passed</Badge> : <Badge tone="bad">{failedChecks.length} guardrail failed</Badge>)}
                {result.retrieved_precedents.length > 0 && <Badge title="Verified precedents used as examples">Precedents: {result.retrieved_precedents.join(", ")}</Badge>}
              </div>
              <CodeBlock code={result.cql} language={spec.language} fileStem={spec.reportId} />
              {result.explanation && <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{result.explanation}</p>}
              {spec.language === "cql" && (
                <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={saved}
                    placeholder="Programmer note for this precedent (optional)"
                    className={clsx(inputCls, "mt-0 flex-1")}
                  />
                  <Button onClick={confirmPrecedent} disabled={saving || saved}>
                    {saved ? "Saved as verified precedent" : saving ? "Saving" : "Confirm as verified precedent"}
                  </Button>
                  {saveErr && <p className="w-full text-xs text-bad">{saveErr}</p>}
                  <p className="w-full text-[11px] text-muted">Only confirm code a programmer has checked. Confirmed code becomes retrieval context for future runs.</p>
                </div>
              )}
            </div>
          ) : result ? (
            <div className="space-y-2">
              {empty("No code was produced for this spec.")}
              {result.explanation && <p className="text-sm text-muted">{result.explanation}</p>}
            </div>
          ) : (
            empty("Run the pipeline to generate code.")
          ))}

        {tab === "understanding" &&
          (understanding ? (
            <div className="fade-up space-y-5 text-sm">
              <p className="leading-relaxed">{understanding.summary}</p>
              {understanding.domains_identified.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Data domains</h3>
                  <ul className="space-y-2">
                    {understanding.domains_identified.map((d, i) => (
                      <li key={i} className="rounded-lg bg-surface2 p-3"><span className="font-medium">{d.domain}</span><span className="text-muted"> {d.reasoning}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Logic, step by step</h3>
                <ol className="space-y-2">
                  {understanding.logic_steps.map((s) => (
                    <li key={s.step_number} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accentsoft text-xs font-semibold text-accent">{s.step_number}</span>
                      <span>
                        {s.explanation} {s.inferred && <Badge tone="warn" title="Not stated in the spec">Inferred</Badge>}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              {understanding.assumptions.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Assumptions to confirm</h3>
                  <ul className="list-disc space-y-1 pl-5 text-muted">{understanding.assumptions.map((a, i) => <li key={i}>{a}</li>)}</ul>
                </div>
              )}
              {understanding.edge_cases.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Edge cases</h3>
                  <ul className="space-y-1.5">{understanding.edge_cases.map((e, i) => <li key={i}><span className="font-medium">{e.case}.</span> <span className="text-muted">{e.handling}</span></li>)}</ul>
                </div>
              )}
              {understanding.key_definitions.length > 0 && (
                <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[max-content_1fr]">
                  {understanding.key_definitions.map((d, i) => (
                    <div key={i} className="contents"><dt className="font-medium">{d.term}</dt><dd className="text-muted">{d.meaning}</dd></div>
                  ))}
                </dl>
              )}
            </div>
          ) : (
            empty("Run Understand to see how the logic is read before any code is written.")
          ))}

        {tab === "review" &&
          (review ? (
            <div className="fade-up space-y-3">
              <div className="flex items-center gap-2">
                <Badge tone={review.readiness === "ready" ? "good" : review.readiness === "ready_with_notes" ? "accent" : "bad"}>
                  {review.readiness.replaceAll("_", " ")}
                </Badge>
                <p className="text-sm">{review.summary}</p>
              </div>
              <ul className="space-y-2">
                {review.insights.map((ins, i) => (
                  <li key={i} className="flex gap-3 rounded-lg border border-line p-3 text-sm">
                    <span className="mt-0.5">{ins.severity === "blocking" ? <XCircle size={16} className="text-bad" /> : ins.severity === "warning" ? <AlertTriangle size={16} className="text-warn" /> : <Info size={16} className="text-accent" />}</span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2"><Badge tone={SEVERITY[ins.severity]}>{ins.severity}</Badge><span className="text-xs text-muted">{ins.category}</span></div>
                      <p>{ins.finding}</p>
                      <p className="text-xs text-muted">Suggestion: {ins.suggestion}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            empty("Run Review to check the spec is ready before generating.")
          ))}

        {tab === "checks" &&
          (lastGuard ? (
            <ul className="fade-up space-y-2">
              {lastGuard.checks.map((c, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-line p-3 text-sm">
                  {c.passed ? <CheckCircle2 size={16} className="mt-0.5 text-good" /> : <XCircle size={16} className="mt-0.5 text-bad" />}
                  <div><div className="font-medium">{c.check.replaceAll("_", " ")}</div>{c.detail && <div className="text-xs text-muted">{c.detail}</div>}</div>
                </li>
              ))}
            </ul>
          ) : (
            empty("Guardrail results appear after generation.")
          ))}

        {tab === "trace" &&
          (result?.cascade_trace.length ? (
            <ol className="fade-up space-y-2">
              {result.cascade_trace.map((s, i) => (
                <li key={i} className="flex gap-3 rounded-lg bg-surface2 p-3 text-sm">
                  <span className="font-mono text-xs text-muted">{i + 1}</span>
                  <div><span className="font-medium">{s.tier.replaceAll("_", " ")}</span> <Badge tone={s.status === "ran" ? "good" : "neutral"}>{s.status.replaceAll("_", " ")}</Badge><p className="mt-0.5 text-xs text-muted">{s.detail}</p></div>
                </li>
              ))}
            </ol>
          ) : (
            empty("The tier-by-tier trace appears after generation.")
          ))}
      </div>
    </Card>
  );
}
