"use client";

import clsx from "clsx";
import { AlertCircle, Check, CircleDot, Loader2, Play } from "lucide-react";
import { useWorkspace } from "@/lib/workspace";
import type { StageState } from "@/lib/types";
import { Button, Card } from "@/components/ui/primitives";
import { usePipeline } from "@/lib/usePipeline";

const STEPS = [
  { key: "spec", label: "Spec", hint: "Write or paste" },
  { key: "understand", label: "Understand", hint: "Logic walkthrough" },
  { key: "review", label: "Review", hint: "Readiness gate" },
  { key: "generate", label: "Generate", hint: "Code and checks" },
] as const;

function Node({ state, index }: { state: StageState | "spec"; index: number }) {
  const base = "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition";
  if (state === "running") return <span className={clsx(base, "pulse-ring border-accent bg-accentsoft text-accent")}><Loader2 size={16} className="animate-spin" aria-hidden /></span>;
  if (state === "done" || state === "spec") return <span className={clsx(base, "border-transparent bg-accent text-accentink")}>{state === "spec" ? index + 1 : <Check size={16} aria-hidden />}</span>;
  if (state === "blocked") return <span className={clsx(base, "border-transparent bg-warnsoft text-warn")}><CircleDot size={16} aria-hidden /></span>;
  if (state === "error") return <span className={clsx(base, "border-transparent bg-badsoft text-bad")}><AlertCircle size={16} aria-hidden /></span>;
  return <span className={clsx(base, "border-line bg-surface text-muted")}>{index + 1}</span>;
}

export default function Pipeline() {
  const { stages, spec, review } = useWorkspace();
  const p = usePipeline();
  const busy = Object.values(stages).some((s) => s === "running");
  const blocked = stages.review === "blocked";

  return (
    <Card>
      <div className="p-4">
        <ol className="flex items-start gap-1" aria-label="Pipeline progress">
          {STEPS.map((s, i) => {
            const state: StageState | "spec" = s.key === "spec" ? "spec" : stages[s.key];
            return (
              <li key={s.key} className="flex min-w-0 flex-1 items-start">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <Node state={state} index={i} />
                  <div className="text-xs font-medium">{s.label}</div>
                  <div className="hidden text-[11px] text-muted sm:block">{s.hint}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={clsx("mx-1 mt-4 h-0.5 flex-1 rounded", state === "done" || state === "spec" ? "bg-accent" : "bg-line")} />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={p.runAll} disabled={busy || !p.canGenerate} title={p.blockReason ?? undefined}>
            {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Play size={15} aria-hidden />}
            Run pipeline
          </Button>
          <Button onClick={() => p.understand().catch(() => {})} disabled={busy || !p.readyToSubmit}>Understand only</Button>
          <Button onClick={() => p.review().catch(() => {})} disabled={busy || !p.readyToSubmit}>Review only</Button>
          {blocked && review && (
            <Button variant="warn" className="ml-auto" onClick={() => p.generate(review.specId).catch(() => {})} disabled={busy || !p.canGenerate}>
              Generate anyway
            </Button>
          )}
        </div>
        {p.blockReason && !busy && <p className="mt-2 text-xs text-muted">{p.blockReason}</p>}
        {blocked && <p className="mt-2 text-xs text-warn">The review found blocking issues for {spec.reportId || "this spec"}. Fix them, or generate anyway at your own risk.</p>}
        {p.error && (
          <p role="alert" className="mt-3 rounded-lg bg-badsoft p-3 text-xs text-bad">
            {p.error}
          </p>
        )}
      </div>
    </Card>
  );
}
