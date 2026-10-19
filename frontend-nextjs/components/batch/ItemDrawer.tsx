"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { AlertTriangle, ExternalLink, Info, RotateCcw, X, XCircle } from "lucide-react";
import { getBatchItem, retryBatch } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button } from "@/components/ui/primitives";
import CodeBlock from "@/components/CodeBlock";
import type { BatchSummary } from "@/lib/types";
import KnowledgeUsed from "@/components/workspace/KnowledgeUsed";
import { StatusBadge } from "./shared";

type Tab = "code" | "review" | "walkthrough" | "spec";

export default function ItemDrawer({ job, itemId, onClose }: { job: BatchSummary; itemId: string; onClose: () => void }) {
  const { tenantId, loadSpec } = useWorkspace();
  const router = useRouter();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("code");
  const q = useQuery({ queryKey: ["batch-item", job.id, itemId, tenantId], queryFn: () => getBatchItem(job.id, itemId, tenantId) });
  const it = q.data;

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: "code", label: "Code", show: true },
    { id: "review", label: "Review", show: !!it?.review },
    { id: "walkthrough", label: "Walkthrough", show: !!it?.understanding },
    { id: "spec", label: "Spec", show: true },
  ];

  async function retry(generateAnyway: boolean) {
    await retryBatch(job.id, tenantId, [itemId], generateAnyway);
    await qc.invalidateQueries({ queryKey: ["batches"] });
    onClose();
  }

  const openInWorkspace = () => {
    if (!it?.spec) return;
    loadSpec({ ...it.spec, language: job.options.language, edcSystem: job.options.edcSystem, specType: job.options.specType });
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-black/40" onClick={onClose}>
      <div role="dialog" aria-label="Listing result" className="flex h-full w-full max-w-3xl flex-col border-l border-line bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 border-b border-line p-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-mono text-base font-semibold">{it?.reportId ?? "Loading"}</h2>
              {it && <StatusBadge status={it.status} stage={it.stage} />}
              {it?.isBeta && <Badge tone="warn">Unverified draft</Badge>}
              {it?.guardrailsPassed === true && <Badge tone="good">Guardrails passed</Badge>}
              {it?.guardrailsPassed === false && <Badge tone="bad">Guardrail failed</Badge>}
            </div>
            <p className="mt-0.5 truncate text-xs text-muted">{it?.name}</p>
            {it?.metadata?.studyId && (
              <p className="mt-1 text-xs text-muted">Grounded in study <span className="font-mono">{it.metadata.studyId}</span> metadata v{it.metadata.version} ({it.metadata.items} items)</p>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-muted hover:bg-surface2"><X size={18} /></button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-2">
          <div role="tablist" className="flex gap-1">
            {tabs.filter((t) => t.show).map((t) => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                className={clsx("rounded-md px-3 py-1.5 text-sm", tab === t.id ? "bg-accentsoft font-medium text-accent" : "text-muted hover:bg-surface2")}>
                {t.label}
              </button>
            ))}
          </div>
          <span className="ml-auto flex gap-2">
            {it && (it.status === "failed" || it.status === "needs_attention" || it.status === "cancelled" || it.status === "interrupted") && !job.active && (
              <Button variant="secondary" onClick={() => retry(it.status === "needs_attention" && it.readiness === "needs_revision")}>
                <RotateCcw size={15} aria-hidden /> {it.status === "needs_attention" && it.readiness === "needs_revision" ? "Generate anyway" : "Retry"}
              </Button>
            )}
            <Button variant="ghost" onClick={openInWorkspace} disabled={!it?.spec}><ExternalLink size={15} aria-hidden /> Open in Workspace</Button>
          </span>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {q.isError && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{String(q.error)}</p>}
          {it?.error && <p className={clsx("rounded-lg p-3 text-sm", it.status === "failed" ? "bg-badsoft text-bad" : "bg-warnsoft text-warn")}>{it.error}</p>}

          {tab === "code" && it && (
            <>
              {it.result?.cql ? (
                <CodeBlock code={it.result.cql} language={job.options.language} fileStem={it.reportId} />
              ) : (
                <p className="py-10 text-center text-sm text-muted">No code for this listing.</p>
              )}
              {it.result?.explanation && <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{it.result.explanation}</p>}
              <KnowledgeUsed k={it.result?.knowledge} />
            </>
          )}

          {tab === "review" && it?.review && (
            <>
              <p className="text-sm">{it.review.summary}</p>
              <ul className="space-y-2">
                {it.review.insights.map((ins, i) => (
                  <li key={i} className="flex gap-3 rounded-lg border border-line p-3 text-sm">
                    <span className="mt-0.5">{ins.severity === "blocking" ? <XCircle size={16} className="text-bad" /> : ins.severity === "warning" ? <AlertTriangle size={16} className="text-warn" /> : <Info size={16} className="text-accent" />}</span>
                    <div><p>{ins.finding}</p><p className="text-xs text-muted">Suggestion: {ins.suggestion}</p></div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {tab === "walkthrough" && it?.understanding && (
            <>
              <p className="text-sm">{it.understanding.summary}</p>
              <ol className="space-y-2">
                {it.understanding.logic_steps.map((s) => (
                  <li key={s.step_number} className="flex gap-3 text-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accentsoft text-xs font-semibold text-accent">{s.step_number}</span>
                    <span>{s.explanation} {s.inferred && <Badge tone="warn">Inferred</Badge>}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {tab === "spec" && it && (
            it.spec ? (
              (["description", "columnHeading", "logic", "reportScenarios", "sorting"] as const)
                .filter((k) => it.spec?.[k]?.trim())
                .map((k) => (
                  <div key={k}>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">{k.replace(/([A-Z])/g, " $1")}</div>
                    <p className="whitespace-pre-line text-sm leading-relaxed">{it.spec?.[k]}</p>
                  </div>
                ))
            ) : (
              <p className="text-sm text-muted">The spec has not been read yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
