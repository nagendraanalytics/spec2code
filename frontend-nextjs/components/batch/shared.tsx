import type { ReactNode } from "react";
import { Badge } from "@/components/ui/primitives";
import type { ItemStatus, ParsedItem } from "@/lib/types";

/** studyId is the per-listing override; empty means the batch-level study applies. */
export type Staged = ParsedItem & { key: string; selected: boolean; studyId: string };

export const STATUS: Record<ItemStatus, { label: string; tone: "neutral" | "good" | "warn" | "bad" | "accent" }> = {
  pending: { label: "Waiting", tone: "neutral" },
  running: { label: "Running", tone: "accent" },
  done: { label: "Done", tone: "good" },
  needs_attention: { label: "Needs attention", tone: "warn" },
  failed: { label: "Failed", tone: "bad" },
  cancelled: { label: "Cancelled", tone: "neutral" },
  interrupted: { label: "Interrupted", tone: "warn" },
};

export const STAGE_LABEL: Record<string, string> = {
  extract: "Reading spec",
  understand: "Understanding",
  review: "Reviewing",
  generate: "Generating",
};

export function StatusBadge({ status, stage }: { status: ItemStatus; stage?: string }) {
  const s = STATUS[status];
  return (
    <Badge tone={s.tone}>
      {status === "running" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden />}
      {status === "running" && stage ? STAGE_LABEL[stage] ?? s.label : s.label}
    </Badge>
  );
}

export function Stat({ label, value, tone }: { label: string; value: ReactNode; tone?: string }) {
  return (
    <div className="rounded-lg bg-surface2 px-3 py-2">
      <div className={`text-lg font-semibold tabular-nums ${tone ?? ""}`}>{value}</div>
      <div className="text-[11px] text-muted">{label}</div>
    </div>
  );
}

export const fmtDuration = (ms: number | null) => (ms == null ? "" : ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`);
