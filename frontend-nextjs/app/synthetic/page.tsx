"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getBatch, listBatches, listSpecs, synGenerate, synList } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import StudyPicker from "@/components/studies/StudyPicker";
import SetDetail, { STATUS } from "@/components/synthetic/SetDetail";
import type { SynSet } from "@/lib/types";

type Target = { key: string; label: string; body: { specId?: string; batchId?: string; batchItemId?: string } };
const CONCURRENCY = 3;

function readLocal(k: string) {
  try { return localStorage.getItem(k) ?? ""; } catch { return ""; }
}

export default function Synthetic() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const [reviewer, setReviewer] = useState("");
  useEffect(() => setReviewer(readLocal("s2c.reviewer")), []);
  const saveReviewer = (v: string) => { setReviewer(v); try { localStorage.setItem("s2c.reviewer", v); } catch { /* storage unavailable */ } };

  const [source, setSource] = useState<"library" | "batch">("library");
  const [batchId, setBatchId] = useState("");
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [studyId, setStudyId] = useState("");
  const [useKnowledge, setUseKnowledge] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number; failed: { label: string; error: string }[] } | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const specs = useQuery({ queryKey: ["specs", tenantId], queryFn: () => listSpecs(tenantId), enabled: source === "library" });
  const batches = useQuery({ queryKey: ["batches", tenantId], queryFn: () => listBatches(tenantId) });
  const batch = useQuery({ queryKey: ["batch", batchId, tenantId], queryFn: () => getBatch(batchId, tenantId), enabled: source === "batch" && !!batchId });
  const sets = useQuery({ queryKey: ["synlist", tenantId], queryFn: () => synList(tenantId) });

  const latest = useMemo(() => {
    const m = new Map<string, SynSet>();
    (sets.data ?? []).filter((s) => s.status !== "retired").forEach((s) => m.set(s.reportId, s));
    return m;
  }, [sets.data]);

  const targets: Target[] = useMemo(() => {
    if (source === "library") return (specs.data ?? []).map((s) => ({ key: s.id, label: s.reportId, body: { specId: s.id } }));
    return (batch.data?.items ?? []).filter((i) => i.reportId).map((i) => ({ key: i.id, label: i.reportId, body: { batchId, batchItemId: i.id } }));
  }, [source, specs.data, batch.data, batchId]);
  const chosen = targets.filter((t) => picked[t.key]);

  const run = useMutation({
    mutationFn: async (list: Target[]) => {
      setProgress({ done: 0, total: list.length, failed: [] });
      const queue = [...list];
      const worker = async () => {
        for (let t = queue.shift(); t; t = queue.shift()) {
          try {
            await synGenerate({ ...t.body, studyId, useKnowledge }, tenantId, reviewer);
          } catch (e) {
            setProgress((p) => p && { ...p, failed: [...p.failed, { label: t.label, error: e instanceof Error ? e.message : String(e) }] });
          }
          setProgress((p) => p && { ...p, done: p.done + 1 });
          qc.invalidateQueries({ queryKey: ["synlist"] });
        }
      };
      await Promise.all(Array.from({ length: Math.min(CONCURRENCY, list.length) }, worker));
    },
  });

  const toggleAll = (on: boolean) => setPicked(Object.fromEntries(targets.map((t) => [t.key, on])));
  const shownSets = (sets.data ?? []).filter((s) => !status || s.status === status);

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">Synthetic data</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Build test data from a listing's logic, check the expected include and exclude outcome for each condition, correct what is wrong, and sign it off. Works for one listing or a whole batch. Use it to review the logic before, or after, code is generated.
          </p>
        </div>
        <label className="text-xs font-medium text-muted">Reviewer name
          <input className={inputCls} style={{ width: "11rem" }} value={reviewer} onChange={(e) => saveReviewer(e.target.value)} placeholder="needed to sign off" aria-label="Reviewer name" />
        </label>
      </div>

      <Card>
        <CardHeader title="Generate" hint="One model call per listing, three at a time. A new run of a listing becomes the next version and retires the old one." />
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant={source === "library" ? "primary" : "secondary"} onClick={() => { setSource("library"); setPicked({}); }}>Library specs</Button>
            <Button variant={source === "batch" ? "primary" : "secondary"} onClick={() => { setSource("batch"); setPicked({}); }}>A batch</Button>
            {source === "batch" && (
              <select className={inputCls} style={{ width: "auto", marginTop: 0 }} value={batchId} onChange={(e) => { setBatchId(e.target.value); setPicked({}); }} aria-label="Batch">
                <option value="">Choose a batch</option>
                {(batches.data ?? []).map((b) => <option key={b.id} value={b.id}>{b.name || b.id.slice(0, 8)} ({b.counts.total} listings)</option>)}
              </select>
            )}
          </div>
          {targets.length === 0 ? (
            <p className="text-sm text-muted">{source === "batch" ? (batchId ? "This batch has no extracted listings." : "Choose a batch.") : "No specs in the library yet."}</p>
          ) : (
            <>
              <div className="flex items-center gap-3 text-xs">
                <button className="text-accent underline" onClick={() => toggleAll(true)}>Select all</button>
                <button className="text-accent underline" onClick={() => toggleAll(false)}>None</button>
                <span className="text-muted">{chosen.length} selected</span>
              </div>
              <ul className="max-h-56 divide-y divide-line overflow-auto rounded-lg border border-line text-sm" data-testid="syn-targets">
                {targets.map((t) => {
                  const cur = latest.get(t.label);
                  return (
                    <li key={t.key} className="flex items-center gap-3 px-3 py-1.5">
                      <input type="checkbox" checked={!!picked[t.key]} onChange={(e) => setPicked({ ...picked, [t.key]: e.target.checked })} aria-label={`Select ${t.label}`} />
                      <span className="font-mono text-xs">{t.label}</span>
                      {cur ? <><Badge tone={STATUS[cur.status][0]}>{STATUS[cur.status][1]} v{cur.version}</Badge><span className="text-xs text-muted">{cur.coverage.covered}/{cur.coverage.total} conditions covered</span></> : <span className="text-xs text-muted">no synthetic data yet</span>}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <StudyPicker value={studyId} onChange={setStudyId} noneLabel="No study (use the listing's own, if any)" label="Study for field names" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useKnowledge} onChange={(e) => setUseKnowledge(e.target.checked)} />Use approved knowledge</label>
          </div>
          <Button variant="primary" disabled={!chosen.length || run.isPending} onClick={() => run.mutate(chosen)}>
            {run.isPending ? "Generating" : `Generate for ${chosen.length || "selected"} listing${chosen.length === 1 ? "" : "s"}`}
          </Button>
          {progress && (
            <div className="text-sm" data-testid="syn-progress">
              <p>{progress.done} of {progress.total} done{progress.failed.length ? `, ${progress.failed.length} failed` : ""}.</p>
              {progress.failed.map((f, i) => <p key={i} className="text-xs text-bad">{f.label}: {f.error}</p>)}
            </div>
          )}
        </div>
      </Card>

      {open && <SetDetail key={open} id={open} reviewer={reviewer} onClose={() => setOpen(null)} />}

      <Card>
        <CardHeader title="Sets" right={
          <select className={inputCls} style={{ width: "auto", marginTop: 0 }} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
            <option value="">All statuses</option><option value="draft">Draft</option><option value="reviewed">Reviewed</option><option value="retired">Retired</option>
          </select>} />
        {shownSets.length === 0 ? <p className="p-6 text-center text-sm text-muted">No synthetic data yet.</p> : (
          <ul className="divide-y divide-line" data-testid="syn-sets">
            {shownSets.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm">
                <span className="font-mono text-xs font-semibold">{s.reportId}</span><Badge>v{s.version}</Badge>
                <Badge tone={STATUS[s.status][0]}>{STATUS[s.status][1]}</Badge>
                <span className="text-xs text-muted">{s.caseCount} cases ({s.include} include, {s.exclude} exclude) · {s.coverage.covered}/{s.coverage.total} conditions covered</span>
                {s.coverage.uncovered.length > 0 && <Badge tone="warn">{s.coverage.uncovered.length} gap{s.coverage.uncovered.length === 1 ? "" : "s"}</Badge>}
                <span className="flex-1" />
                <Button variant="ghost" onClick={() => setOpen(s.id)}>Open</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
