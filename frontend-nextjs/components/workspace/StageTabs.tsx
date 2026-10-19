"use client";

import clsx from "clsx";
import { AlertCircle, Check, CircleDot, Loader2 } from "lucide-react";
import { useWorkspace, type Tab } from "@/lib/workspace";
import type { StageState } from "@/lib/types";

export const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: "spec", label: "Spec", hint: "Write or paste" },
  { id: "understand", label: "Understand", hint: "Logic walkthrough" },
  { id: "review", label: "Review", hint: "Readiness gate" },
  { id: "generate", label: "Generate", hint: "Code and checks" },
];

function Mark({ state, n }: { state: StageState | "spec"; n: number }) {
  const base = "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold";
  if (state === "running") return <span className={clsx(base, "bg-accentsoft text-accent")}><Loader2 size={13} className="animate-spin" aria-label="Running" /></span>;
  if (state === "done") return <span className={clsx(base, "bg-accent text-accentink")}><Check size={13} aria-label="Done" /></span>;
  if (state === "blocked") return <span className={clsx(base, "bg-warnsoft text-warn")}><CircleDot size={13} aria-label="Blocked" /></span>;
  if (state === "error") return <span className={clsx(base, "bg-badsoft text-bad")}><AlertCircle size={13} aria-label="Error" /></span>;
  return <span className={clsx(base, "bg-surface2 text-muted")}>{n}</span>;
}

export default function StageTabs() {
  const { tab, setTab, stages } = useWorkspace();
  return (
    <div role="tablist" aria-label="Pipeline stages" className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface p-1 sm:grid-cols-4">
      {TABS.map((t, i) => {
        const state: StageState | "spec" = t.id === "spec" ? "spec" : stages[t.id];
        const on = tab === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => setTab(t.id)}
            title={`Ctrl+${i + 1}`}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
              on ? "bg-accentsoft shadow-sm" : "hover:bg-surface2",
            )}
          >
            <Mark state={state} n={i + 1} />
            <span className="min-w-0">
              <span className={clsx("block text-sm font-medium", on ? "text-accent" : "text-ink")}>{t.label}</span>
              <span className="block truncate text-[11px] text-muted">{t.hint}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
