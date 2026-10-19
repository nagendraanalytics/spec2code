"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { importHistory, listReviews, listRuns, listSpecs } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, inputCls } from "@/components/ui/primitives";
import type { HistoryImportResult, RunRow, SpecRow } from "@/lib/types";

const READY = { ready: ["good", "Ready"], ready_with_notes: ["warn", "Ready with notes"], needs_revision: ["bad", "Needs revision"] } as const;
const SEV = { blocking: "bad", warning: "warn", info: "neutral" } as const;

async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function Reviews({ spec }: { spec: SpecRow }) {
  const { tenantId } = useWorkspace();
  const q = useQuery({ queryKey: ["reviews", spec.id, tenantId], queryFn: () => listReviews(spec.id, tenantId) });
  if (q.isLoading) return <p className="p-4 text-xs text-muted">Loading reviews</p>;
  if (q.isError) return <p className="p-4 text-xs text-bad">{String(q.error)}</p>;
  if (!q.data?.length) return <p className="p-4 text-xs text-muted">No review stored for this spec.</p>;
  return (
    <ul className="divide-y divide-line">
      {q.data.map((r) => {
        const [tone, label] = READY[r.readiness] ?? ["neutral", r.readiness];
        return (
          <li key={r.id} className="space-y-2 px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <Badge tone={tone}>{label}</Badge>
              <span className="text-muted">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</span>
            </div>
            {r.summary && <p className="text-sm">{r.summary}</p>}
            {r.insights.map((i, n) => (
              <div key={n} className="rounded-lg border border-line p-2">
                <div className="flex items-center gap-2"><Badge tone={SEV[i.severity] ?? "neutral"}>{i.severity}</Badge><span className="text-muted">{i.category}</span></div>
                <p className="mt-1">{i.finding}</p>
                {i.suggestion && <p className="mt-1 text-muted">Suggestion: {i.suggestion}</p>}
              </div>
            ))}
          </li>
        );
      })}
    </ul>
  );
}

function RunItem({ r }: { r: RunRow }) {
  const [more, setMore] = useState(false);
  const guard = r.guardrailReports?.at(-1);
  const failed = guard?.checks.filter((c) => !c.passed) ?? [];
  return (
    <li className="space-y-1 px-4 py-3 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={r.status.startsWith("generated") ? "good" : r.status === "error" ? "bad" : r.status === "imported" ? "accent" : "warn"}>{r.status.replaceAll("_", " ")}</Badge>
        {r.language && <Badge>{r.language.toUpperCase()}</Badge>}
        {r.source === "imported" && <Badge tone="accent" title="Executed outside this tool">Imported</Badge>}
        {guard && (guard.passed ? <Badge tone="good">Guardrails passed</Badge> : <Badge tone="bad">{failed.length} guardrail failed</Badge>)}
        <span className="text-muted">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</span>
        {r.cql && <Button variant="ghost" onClick={() => navigator.clipboard?.writeText(r.cql ?? "")}>Copy code</Button>}
      </div>
      {r.error && <p className="text-bad">{r.error}</p>}
      {r.explanation && <p className="text-muted">{r.explanation}</p>}
      {r.cql && <pre className="max-h-48 overflow-auto rounded-lg bg-surface2 p-2 font-mono text-[11px]">{r.cql}</pre>}
      {(r.cascadeTrace?.length > 0 || failed.length > 0) && (
        <button className="text-accent underline" onClick={() => setMore(!more)}>{more ? "Hide" : "Show"} trace and checks</button>
      )}
      {more && (
        <div className="space-y-1 rounded-lg border border-line p-2">
          {r.cascadeTrace.map((t, i) => <p key={i}><span className="font-mono">{t.tier}</span> · {t.status} · <span className="text-muted">{t.detail}</span></p>)}
          {guard?.checks.map((c, i) => <p key={`g${i}`} className={c.passed ? "text-muted" : "text-bad"}>{c.passed ? "pass" : "FAIL"} · {c.check}{c.detail ? ` — ${c.detail}` : ""}</p>)}
        </div>
      )}
    </li>
  );
}

function Runs({ spec }: { spec: SpecRow }) {
  const { tenantId } = useWorkspace();
  const q = useQuery({ queryKey: ["runs", spec.id, tenantId], queryFn: () => listRuns(spec.id, tenantId) });
  if (q.isLoading) return <p className="p-4 text-xs text-muted">Loading runs</p>;
  if (q.isError) return <p className="p-4 text-xs text-bad">{String(q.error)}</p>;
  if (!q.data?.length) return <p className="p-4 text-xs text-muted">No code stored for this spec yet.</p>;
  return <ul className="divide-y divide-line">{q.data.map((r) => <RunItem key={r.id} r={r} />)}</ul>;
}

function ImportPanel({ onDone }: { onDone: () => void }) {
  const { tenantId } = useWorkspace();
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{ name: string; data: string }[]>([]);
  const [preview, setPreview] = useState<HistoryImportResult | null>(null);
  const [saved, setSaved] = useState<HistoryImportResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const check = useMutation({
    mutationFn: async (picked: FileList) => {
      const fs = await Promise.all(Array.from(picked).map(async (f) => ({ name: f.name, data: await toBase64(f) })));
      setFiles(fs);
      return importHistory(fs, true, tenantId);
    },
    onSuccess: (r) => { setPreview(r); setSaved(null); setErr(null); },
    onError: (e) => setErr(String(e)),
  });
  const save = useMutation({
    mutationFn: () => importHistory(files, false, tenantId),
    onSuccess: (r) => { setSaved(r); setPreview(null); setFiles([]); onDone(); },
    onError: (e) => setErr(String(e)),
  });
  const good = preview?.rows?.filter((r) => !r.error).length ?? 0;

  return (
    <Card>
      <div className="space-y-3 p-4 text-sm">
        <p className="text-muted">
          Bring in specs that were executed elsewhere. One row per spec, in Excel, CSV or JSON. Columns: <span className="font-mono text-xs">Report ID, Description, Logic, Column Heading, Report Scenarios, Sorting</span>, then the review
          (<span className="font-mono text-xs">Readiness, Review Summary, Review Notes</span>) and the code (<span className="font-mono text-xs">Code + Language</span>, or a column named SAS, SQL, CQL, R or Python).
          Imported rows are marked as imported history. They do not become trusted precedents until a programmer approves the code.
        </p>
        <input ref={ref} type="file" multiple accept=".csv,.xlsx,.json" className="hidden" data-testid="import-file" onChange={(e) => e.target.files?.length && check.mutate(e.target.files)} />
        <Button onClick={() => ref.current?.click()}>{check.isPending ? "Reading" : "Choose files"}</Button>
        {err && <p className="rounded-lg bg-badsoft p-2 text-bad">{err}</p>}
        {preview?.rows && (
          <div className="space-y-2" data-testid="import-preview">
            <p>{good} of {preview.rows.length} rows can be imported. Existing report IDs are skipped, never overwritten.</p>
            <ul className="max-h-48 divide-y divide-line overflow-auto rounded-lg border border-line text-xs">
              {preview.rows.map((r, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2 px-3 py-1.5">
                  <span className="font-mono">{r.reportId || "(no id)"}</span>
                  {r.hasReview && <Badge>review</Badge>}
                  {r.hasCode && <Badge>{r.language || "code"}</Badge>}
                  {r.error ? <span className="text-bad">{r.error}</span> : <Badge tone="good">ok</Badge>}
                </li>
              ))}
            </ul>
            <Button variant="primary" disabled={!good || save.isPending} onClick={() => save.mutate()}>{save.isPending ? "Importing" : `Import ${good} spec${good === 1 ? "" : "s"}`}</Button>
          </div>
        )}
        {saved && (
          <p className="rounded-lg bg-goodsoft p-2 text-good" data-testid="import-done">
            Imported {saved.created?.length ?? 0}. Skipped {saved.skipped?.length ?? 0} already in the library. {saved.failed?.length ?? 0} could not be read.
          </p>
        )}
      </div>
    </Card>
  );
}

export default function Library() {
  const { tenantId, loadSpec } = useWorkspace();
  const router = useRouter();
  const qc = useQueryClient();
  const [open, setOpen] = useState<{ id: string; tab: "review" | "runs" } | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [text, setText] = useState("");
  const [source, setSource] = useState("all");
  const [ready, setReady] = useState("all");
  const q = useQuery({ queryKey: ["specs", tenantId], queryFn: () => listSpecs(tenantId) });

  const rows = useMemo(() => {
    const t = text.trim().toLowerCase();
    return (q.data ?? []).filter((s) =>
      (source === "all" || s.source === source) &&
      (ready === "all" || (ready === "none" ? !s.readiness : s.readiness === ready)) &&
      (!t || s.reportId.toLowerCase().includes(t) || s.description.toLowerCase().includes(t)));
  }, [q.data, text, source, ready]);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">Spec library</h1>
          <p className="mt-1 text-sm text-muted">Every spec under tenant <span className="font-mono">{tenantId}</span> with its review and code, whether it was run here or imported.</p>
        </div>
        <Button onClick={() => setShowImport(!showImport)} aria-expanded={showImport}>Import executed specs</Button>
      </div>
      {showImport && <ImportPanel onDone={() => qc.invalidateQueries({ queryKey: ["specs", tenantId] })} />}
      {q.isError && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{String(q.error)}</p>}
      {(q.data?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2">
          <input className={inputCls} style={{ maxWidth: "20rem" }} placeholder="Search report ID or description" value={text} onChange={(e) => setText(e.target.value)} aria-label="Search specs" />
          <select className={inputCls} style={{ width: "auto" }} value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source">
            <option value="all">All sources</option><option value="app">Run in this tool</option><option value="imported">Imported</option>
          </select>
          <select className={inputCls} style={{ width: "auto" }} value={ready} onChange={(e) => setReady(e.target.value)} aria-label="Review">
            <option value="all">Any review</option><option value="ready">Ready</option><option value="ready_with_notes">Ready with notes</option><option value="needs_revision">Needs revision</option><option value="none">No review</option>
          </select>
          <span className="self-center text-xs text-muted">{rows.length} of {q.data?.length}</span>
        </div>
      )}
      {q.data?.length === 0 && <Card><p className="p-8 text-center text-sm text-muted">Nothing here yet. Run a spec in the workspace, or import specs that were executed elsewhere.</p></Card>}
      <div className="space-y-3">
        {rows.map((s) => {
          const rd = s.readiness ? READY[s.readiness] : null;
          return (
            <Card key={s.id}>
              <div className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-semibold">{s.reportId}</span>
                    {s.source === "imported" && <Badge tone="accent" title="Executed outside this tool">Imported</Badge>}
                    {rd && <Badge tone={rd[0]}>{rd[1]}</Badge>}
                    {s.languages.map((l) => <Badge key={l}>{l.toUpperCase()}</Badge>)}
                    <span className="text-xs text-muted">{s.reviews} review{s.reviews === 1 ? "" : "s"} · {s.runs} run{s.runs === 1 ? "" : "s"} · {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{s.description}</p>
                </div>
                <Button variant="ghost" onClick={() => setOpen(open?.id === s.id && open.tab === "review" ? null : { id: s.id, tab: "review" })} aria-expanded={open?.id === s.id && open.tab === "review"}>Review</Button>
                <Button variant="ghost" onClick={() => setOpen(open?.id === s.id && open.tab === "runs" ? null : { id: s.id, tab: "runs" })} aria-expanded={open?.id === s.id && open.tab === "runs"}>Code</Button>
                <Button
                  onClick={() => {
                    loadSpec({ reportId: s.reportId, description: s.description, columnHeading: s.columnHeading, logic: s.logic, reportScenarios: s.reportScenarios, sorting: s.sorting });
                    router.push("/");
                  }}
                >
                  Open
                </Button>
              </div>
              {open?.id === s.id && <div className="border-t border-line">{open.tab === "review" ? <Reviews spec={s} /> : <Runs spec={s} />}</div>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
