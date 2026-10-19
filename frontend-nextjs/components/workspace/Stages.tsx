"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { AlertTriangle, ArrowRight, CheckCircle2, FileText, Info, Loader2, PanelRightClose, PanelRightOpen, Play, RotateCcw, X, XCircle } from "lucide-react";
import { savePrecedent } from "@/lib/api";
import { usePipeline } from "@/lib/usePipeline";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import CodeBlock from "@/components/CodeBlock";
import KnowledgeUsed from "./KnowledgeUsed";

const SEVERITY = { blocking: "bad", warning: "warn", info: "accent" } as const;

function Empty({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <Card>
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-16 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accentsoft text-accent"><FileText size={22} aria-hidden /></div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted">{body}</p>
        {action}
      </div>
    </Card>
  );
}

function RunButton({ stage, label }: { stage: "understand" | "review" | "generate"; label: string }) {
  const { stages, review } = useWorkspace();
  const p = usePipeline();
  const running = stages[stage] === "running";
  const disabled = p.busy || (stage === "generate" ? !p.canGenerate : !p.readyToSubmit);
  const go = () => (stage === "understand" ? p.understand() : stage === "review" ? p.review() : p.generate(review?.specId)).catch(() => {});
  const again = stages[stage] === "done" || stages[stage] === "blocked";
  return (
    <Button variant={again ? "secondary" : "primary"} onClick={go} disabled={disabled} title={stage === "generate" ? p.blockReason ?? undefined : undefined}>
      {running ? <Loader2 size={15} className="animate-spin" aria-hidden /> : again ? <RotateCcw size={15} aria-hidden /> : <Play size={15} aria-hidden />}
      {again ? "Run again" : label}
    </Button>
  );
}

const sectionTitle = "mb-2 text-xs font-semibold uppercase tracking-wide text-muted";

export function UnderstandTab() {
  const { understanding: u, setTab, stages } = useWorkspace();
  if (!u)
    return (
      <Empty
        title={stages.understand === "running" ? "Reading the spec" : "See how the logic is read"}
        body="The walkthrough shows every step the generator will rely on, and flags what it had to infer, before any code is written."
        action={<RunButton stage="understand" label="Run understanding" />}
      />
    );
  return (
    <div className="fade-up grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card>
        <CardHeader title="Logic, step by step" right={<RunButton stage="understand" label="Run understanding" />} />
        <div className="space-y-5 p-4 text-sm">
          <p className="leading-relaxed">{u.summary}</p>
          <KnowledgeUsed k={u.knowledge} />
          <ol className="space-y-3">
            {u.logic_steps.map((s) => (
              <li key={s.step_number} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accentsoft text-xs font-semibold text-accent">{s.step_number}</span>
                <span className="leading-relaxed">{s.explanation} {s.inferred && <Badge tone="warn" title="Not stated in the spec">Inferred</Badge>}</span>
              </li>
            ))}
          </ol>
          <div className="flex justify-end border-t border-line pt-4">
            <Button variant="primary" onClick={() => setTab("review")}>Continue to Review <ArrowRight size={15} aria-hidden /></Button>
          </div>
        </div>
      </Card>
      <div className="space-y-4">
        {u.domains_identified.length > 0 && (
          <Card><div className="p-4"><h3 className={sectionTitle}>Data domains</h3>
            <ul className="space-y-2 text-sm">{u.domains_identified.map((d, i) => <li key={i} className="rounded-lg bg-surface2 p-3"><span className="font-medium">{d.domain}</span><span className="block text-xs text-muted">{d.reasoning}</span></li>)}</ul></div></Card>
        )}
        {u.assumptions.length > 0 && (
          <Card><div className="p-4"><h3 className={sectionTitle}>Assumptions to confirm</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted">{u.assumptions.map((a, i) => <li key={i}>{a}</li>)}</ul></div></Card>
        )}
        {u.edge_cases.length > 0 && (
          <Card><div className="p-4"><h3 className={sectionTitle}>Edge cases</h3>
            <ul className="space-y-1.5 text-sm">{u.edge_cases.map((e, i) => <li key={i}><span className="font-medium">{e.case}.</span> <span className="text-muted">{e.handling}</span></li>)}</ul></div></Card>
        )}
        {u.key_definitions.length > 0 && (
          <Card><div className="p-4"><h3 className={sectionTitle}>Key definitions</h3>
            <dl className="space-y-1.5 text-sm">{u.key_definitions.map((d, i) => <div key={i}><dt className="font-medium">{d.term}</dt><dd className="text-muted">{d.meaning}</dd></div>)}</dl></div></Card>
        )}
      </div>
    </div>
  );
}

export function ReviewTab() {
  const { review, setTab, stages } = useWorkspace();
  const p = usePipeline();
  if (!review)
    return (
      <Empty
        title={stages.review === "running" ? "Reviewing the spec" : "Check the spec is ready"}
        body="The review is a gate: blocking findings stop generation unless you choose to generate anyway."
        action={<RunButton stage="review" label="Run review" />}
      />
    );
  const counts = { blocking: 0, warning: 0, info: 0 };
  review.insights.forEach((i) => (counts[i.severity] += 1));
  return (
    <Card className="fade-up">
      <CardHeader
        title="Readiness review"
        right={<span className="flex items-center gap-2"><RunButton stage="review" label="Run review" />
          {stages.review === "blocked"
            ? <Button variant="warn" onClick={() => p.generate(review.specId).catch(() => {})} disabled={p.busy || !p.canGenerate}><AlertTriangle size={15} aria-hidden /> Generate anyway</Button>
            : <Button variant="primary" onClick={() => setTab("generate")}>Continue <ArrowRight size={15} aria-hidden /></Button>}</span>}
      />
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={review.readiness === "ready" ? "good" : review.readiness === "ready_with_notes" ? "accent" : "bad"}>{review.readiness.replaceAll("_", " ")}</Badge>
          {counts.blocking > 0 && <Badge tone="bad">{counts.blocking} blocking</Badge>}
          {counts.warning > 0 && <Badge tone="warn">{counts.warning} warning</Badge>}
          {counts.info > 0 && <Badge tone="accent">{counts.info} info</Badge>}
          <p className="w-full text-sm sm:w-auto">{review.summary}</p>
        </div>
        <KnowledgeUsed k={review.knowledge} />
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
    </Card>
  );
}

export function GenerateTab() {
  const { result, spec, tenantId, stages } = useWorkspace();
  const [side, setSide] = useState(true);
  const [specOpen, setSpecOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState<string | null>(null);

  if (!result)
    return (
      <Empty
        title={stages.generate === "running" ? "Generating code" : "Generate code"}
        body="Rules run first, then retrieval and the model. Every result passes through guardrails and is a draft until a programmer signs it off."
        action={<RunButton stage="generate" label="Generate code" />}
      />
    );

  const guard = result.guardrail_reports.at(-1);
  const failed = guard?.checks.filter((c) => !c.passed) ?? [];

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

  return (
    <div className={clsx("fade-up grid gap-5", side && "xl:grid-cols-[minmax(0,1fr)_340px]")}>
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{spec.reportId || "untitled"}</Badge>
          {result.isBeta ? <Badge tone="warn">Unverified draft</Badge> : <Badge tone="good">Verified path</Badge>}
          {guard && (guard.passed ? <Badge tone="good">Guardrails passed</Badge> : <Badge tone="bad">{failed.length} guardrail failed</Badge>)}
          <span className="ml-auto flex items-center gap-2">
            <Button variant="ghost" onClick={() => setSpecOpen(true)}><FileText size={15} aria-hidden /> View spec</Button>
            <RunButton stage="generate" label="Generate code" />
            <Button variant="ghost" onClick={() => setSide((v) => !v)} aria-pressed={side} aria-label="Toggle details panel" className="hidden xl:inline-flex">
              {side ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />} Details
            </Button>
          </span>
        </div>

        {result.cql ? <CodeBlock code={result.cql} language={spec.language} fileStem={spec.reportId} /> : <Card><p className="p-10 text-center text-sm text-muted">No code was produced for this spec.</p></Card>}
        {result.explanation && <Card><p className="whitespace-pre-line p-4 text-sm leading-relaxed text-muted">{result.explanation}</p></Card>}

        {result.cql && spec.language === "cql" && (
          <Card>
            <div className="flex flex-wrap items-center gap-2 p-4">
              <input value={notes} onChange={(e) => setNotes(e.target.value)} disabled={saved} placeholder="Programmer note for this precedent (optional). Confirming also adds the spec and code to Report knowledge." className={clsx(inputCls, "mt-0 flex-1")} />
              <Button onClick={confirmPrecedent} disabled={saving || saved}>{saved ? "Saved as verified precedent" : saving ? "Saving" : "Confirm as verified precedent"}</Button>
              {saveErr && <p className="w-full text-xs text-bad">{saveErr}</p>}
              <p className="w-full text-[11px] text-muted">Only confirm code a programmer has checked. Confirmed code becomes retrieval context for future runs.</p>
            </div>
          </Card>
        )}
      </div>

      {side && (
        <aside className="min-w-0 space-y-4" aria-label="Generation details">
          <Card>
            <CardHeader title="Guardrail checks" />
            {guard ? (
              <ul className="divide-y divide-line">
                {guard.checks.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 px-4 py-2.5 text-sm">
                    {c.passed ? <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-good" /> : <XCircle size={16} className="mt-0.5 shrink-0 text-bad" />}
                    <div><div className="font-medium">{c.check.replaceAll("_", " ")}</div>{c.detail && <div className="text-xs text-muted">{c.detail}</div>}</div>
                  </li>
                ))}
              </ul>
            ) : <p className="p-4 text-sm text-muted">No guardrail report for this run.</p>}
          </Card>
          <Card>
            <CardHeader title="Tier trace" />
            <ol className="space-y-2 p-4">
              {result.cascade_trace.map((s, i) => (
                <li key={i} className="rounded-lg bg-surface2 p-3 text-sm">
                  <span className="font-medium">{s.tier.replaceAll("_", " ")}</span> <Badge tone={s.status === "ran" ? "good" : "neutral"}>{s.status.replaceAll("_", " ")}</Badge>
                  <p className="mt-0.5 text-xs text-muted">{s.detail}</p>
                </li>
              ))}
              {result.cascade_trace.length === 0 && <li className="text-sm text-muted">No trace recorded.</li>}
            </ol>
          </Card>
          {result.retrieved_precedents.length > 0 && (
            <Card><CardHeader title="Precedents used" hint="Verified examples shown to the model" />
              <div className="flex flex-wrap gap-2 p-4">{result.retrieved_precedents.map((id) => <Badge key={id}>{id}</Badge>)}</div></Card>
          )}
          <KnowledgeUsed k={result.knowledge} />
        </aside>
      )}

      {specOpen && (
        <div className="fixed inset-0 z-30 flex justify-end bg-black/40" onClick={() => setSpecOpen(false)}>
          <div role="dialog" aria-label="Spec" className="h-full w-full max-w-lg overflow-y-auto border-l border-line bg-surface p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">{spec.reportId}</h2>
              <button onClick={() => setSpecOpen(false)} aria-label="Close spec" className="rounded-lg p-1.5 text-muted hover:bg-surface2"><X size={18} /></button>
            </div>
            {([["Description", spec.description], ["Output columns", spec.columnHeading], ["Logic", spec.logic], ["Scenarios", spec.reportScenarios], ["Sorting", spec.sorting]] as [string, string][])
              .filter(([, v]) => v.trim())
              .map(([k, v]) => (
                <div key={k} className="mb-4"><div className={sectionTitle}>{k}</div><p className="whitespace-pre-line text-sm leading-relaxed">{v}</p></div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
