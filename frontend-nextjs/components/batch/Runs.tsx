"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { ChevronDown, ChevronRight, Download, Layers, RotateCcw, Square, Trash2 } from "lucide-react";
import { cancelBatch, deleteBatch, downloadBatch, getBatch, listBatches, retryBatch } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card } from "@/components/ui/primitives";
import type { BatchCounts, BatchSummary, ItemStatus } from "@/lib/types";
import ItemDrawer from "./ItemDrawer";
import { fmtDuration, Stat, STATUS, StatusBadge } from "./shared";

const SEGMENTS: { key: ItemStatus; cls: string }[] = [
  { key: "done", cls: "bg-good" },
  { key: "needs_attention", cls: "bg-warn" },
  { key: "interrupted", cls: "bg-warn/60" },
  { key: "failed", cls: "bg-bad" },
  { key: "running", cls: "bg-accent animate-pulse" },
  { key: "cancelled", cls: "bg-muted/40" },
  { key: "pending", cls: "bg-line" },
];

function Progress({ counts }: { counts: BatchCounts }) {
  const total = Math.max(counts.total, 1);
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={counts.total} aria-valuenow={counts.done}>
      {SEGMENTS.map(({ key, cls }) => (counts[key] ? <div key={key} className={cls} style={{ width: `${(counts[key] / total) * 100}%` }} /> : null))}
    </div>
  );
}

const FILTERS: { id: "all" | ItemStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "done", label: "Done" },
  { id: "needs_attention", label: "Needs attention" },
  { id: "failed", label: "Failed" },
  { id: "running", label: "Running" },
  { id: "pending", label: "Waiting" },
];

function JobCard({ job, defaultOpen }: { job: BatchSummary; defaultOpen: boolean }) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const [open, setOpen] = useState(defaultOpen);
  const [filter, setFilter] = useState<"all" | ItemStatus>("all");
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const c = job.counts;

  const detail = useQuery({
    queryKey: ["batch", job.id, tenantId, JSON.stringify(c)],
    queryFn: () => getBatch(job.id, tenantId),
    enabled: open,
    refetchInterval: job.active ? 2000 : false,
    placeholderData: (prev) => prev,
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ["batches"] });
  const act = (fn: () => Promise<unknown>) => async () => {
    setErr(null);
    try {
      await fn();
      await refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  };

  const retryable = c.failed + c.cancelled + c.interrupted;
  const items = (detail.data?.items ?? []).filter((i) => filter === "all" || i.status === filter);
  const finished = c.done + c.needs_attention + c.failed + c.cancelled;
  const language = job.options.language.toUpperCase();

  return (
    <Card>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-2 text-left">
            {open ? <ChevronDown size={16} aria-hidden /> : <ChevronRight size={16} aria-hidden />}
            <span className="truncate font-semibold">{job.name}</span>
          </button>
          <Badge tone="accent">{language}</Badge>
          {job.options.allowUnverified && <Badge tone="warn">Unverified</Badge>}
          <Badge tone={job.active ? "accent" : job.status === "finished" ? "good" : "warn"}>
            {job.active ? "Running" : job.status === "finished" ? "Finished" : job.status === "cancelled" ? "Cancelled" : "Interrupted"}
          </Badge>
          <span className="text-xs text-muted">{job.createdAt ? new Date(job.createdAt).toLocaleString() : ""}</span>
        </div>

        <Progress counts={c} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="font-medium text-ink">{finished} of {c.total} finished</span>
          {SEGMENTS.filter(({ key }) => c[key] > 0).map(({ key }) => <span key={key}>{c[key]} {STATUS[key].label.toLowerCase()}</span>)}
        </div>

        <div className="flex flex-wrap gap-2">
          {job.active && <Button variant="secondary" onClick={act(() => cancelBatch(job.id, tenantId))}><Square size={14} aria-hidden /> Cancel run</Button>}
          {!job.active && retryable > 0 && <Button variant="secondary" onClick={act(() => retryBatch(job.id, tenantId))}><RotateCcw size={14} aria-hidden /> Retry {retryable} unfinished</Button>}
          {!job.active && c.needs_attention > 0 && job.options.runReview && (
            <Button variant="ghost" onClick={act(() => retryBatch(job.id, tenantId, undefined, true))} title="Generate code for listings that review blocked">
              Generate {c.needs_attention} blocked anyway
            </Button>
          )}
          <Button variant="ghost" disabled={c.done === 0} onClick={act(() => downloadBatch(job.id, job.name, tenantId))}><Download size={14} aria-hidden /> Download ZIP</Button>
          <Button
            variant="ghost"
            className="ml-auto text-bad"
            onClick={() => { if (confirm(`Delete "${job.name}" and its results?`)) void act(() => deleteBatch(job.id, tenantId))(); }}
          >
            <Trash2 size={14} aria-hidden /> Delete
          </Button>
        </div>
        {err && <p className="text-xs text-bad" role="alert">{err}</p>}
      </div>

      {open && (
        <div className="space-y-3 border-t border-line p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Done" value={c.done} tone="text-good" />
            <Stat label="Needs attention" value={c.needs_attention} tone={c.needs_attention ? "text-warn" : ""} />
            <Stat label="Failed" value={c.failed} tone={c.failed ? "text-bad" : ""} />
            <Stat label="Waiting or running" value={c.pending + c.running} />
          </div>
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter listings">
            {FILTERS.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
                className={clsx("rounded-full px-3 py-1 text-xs", filter === f.id ? "bg-accentsoft font-medium text-accent" : "text-muted hover:bg-surface2")}>
                {f.label}{f.id !== "all" && c[f.id] ? ` ${c[f.id]}` : ""}
              </button>
            ))}
          </div>
          <div className="max-h-[480px] overflow-auto rounded-lg border border-line">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="sticky top-0 bg-surface2 text-xs text-muted">
                <tr><th className="px-3 py-2 font-medium">Listing</th><th className="px-3 py-2 font-medium">Status</th><th className="px-3 py-2 font-medium">Review</th><th className="px-3 py-2 font-medium">Checks</th><th className="px-3 py-2 text-right font-medium">Time</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((i) => (
                  <tr key={i.id} tabIndex={0} onClick={() => setOpenItem(i.id)} onKeyDown={(e) => e.key === "Enter" && setOpenItem(i.id)} className="cursor-pointer hover:bg-surface2 focus:bg-surface2">
                    <td className="max-w-[260px] px-3 py-2">
                      <div className="truncate font-mono text-xs font-semibold">{i.reportId || i.name}</div>
                      {i.error && <div className="truncate text-[11px] text-muted" title={i.error}>{i.error}</div>}
                    </td>
                    <td className="px-3 py-2"><StatusBadge status={i.status} stage={i.stage} /></td>
                    <td className="px-3 py-2 text-xs text-muted">{i.readiness ? i.readiness.replaceAll("_", " ") : ""}</td>
                    <td className="px-3 py-2">
                      {i.guardrailsPassed === true && <Badge tone="good">Passed</Badge>}
                      {i.guardrailsPassed === false && <Badge tone="bad">Failed</Badge>}
                      {i.isBeta && <span className="ml-1"><Badge tone="warn">Draft</Badge></span>}
                    </td>
                    <td className="px-3 py-2 text-right text-xs tabular-nums text-muted">{fmtDuration(i.durationMs)}</td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-muted">{detail.isLoading ? "Loading" : "No listings in this view."}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {openItem && <ItemDrawer job={job} itemId={openItem} onClose={() => setOpenItem(null)} />}
    </Card>
  );
}

export default function Runs({ newestId }: { newestId?: string }) {
  const { tenantId } = useWorkspace();
  const q = useQuery({
    queryKey: ["batches", tenantId],
    queryFn: () => listBatches(tenantId),
    refetchInterval: (query) => (query.state.data?.some((j) => j.active) ? 2000 : 10000),
  });
  const jobs = q.data ?? [];
  const running = jobs.filter((j) => j.active).length;

  useEffect(() => {
    document.title = running ? `(${running} running) Spec2Code` : "Spec2Code";
    return () => { document.title = "Spec2Code"; };
  }, [running]);

  return (
    <section className="space-y-3" aria-label="Batch runs">
      <div className="flex items-center gap-2">
        <Layers size={18} className="text-accent" aria-hidden />
        <h2 className="text-lg font-semibold tracking-tight">Runs</h2>
        {running > 0 && <Badge tone="accent">{running} running</Badge>}
      </div>
      {q.isError && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{String(q.error)}</p>}
      {q.data && jobs.length === 0 && <Card><p className="p-8 text-center text-sm text-muted">No batch runs yet. Add listings above and start one.</p></Card>}
      {jobs.map((j, i) => <JobCard key={j.id} job={j} defaultOpen={j.id === newestId || (i === 0 && jobs.length === 1)} />)}
    </section>
  );
}
