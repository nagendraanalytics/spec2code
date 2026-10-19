"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, ScanSearch } from "lucide-react";
import { runPreflight } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader } from "@/components/ui/primitives";
import type { PreflightResult } from "@/lib/types";
import type { Staged } from "./shared";

const TONE = { ok: "good", unresolved: "warn", none_found: "neutral", no_metadata: "neutral" } as const;
const LABEL = { ok: "All found", unresolved: "Some not found", none_found: "No references seen", no_metadata: "No metadata" } as const;

/** Checks FORM.Item names in each selected spec against its study metadata before any model call is made. */
export default function PreflightPanel({ selected, batchStudy }: { selected: Staged[]; batchStudy: string }) {
  const { tenantId } = useWorkspace();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PreflightResult[] | null>(null);
  const [onlyProblems, setOnlyProblems] = useState(true);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const r = await runPreflight(batchStudy, selected.map((s) => ({ key: s.key, studyId: s.studyId, spec: s.spec, rawText: s.rawText })), tenantId);
      setResults(r.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const byKey = new Map(selected.map((s) => [s.key, s]));
  const count = (st: PreflightResult["status"]) => results?.filter((r) => r.status === st).length ?? 0;
  const shown = (results ?? []).filter((r) => !onlyProblems || r.status === "unresolved");

  return (
    <Card>
      <CardHeader
        title="Pre-flight check"
        hint="Looks for form and item names the study metadata does not contain, before any model call is spent. It is a heuristic and never blocks a run."
        right={
          <Button variant="secondary" onClick={run} disabled={busy || selected.length === 0}>
            {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <ScanSearch size={15} aria-hidden />}
            Check {selected.length || ""} listing{selected.length === 1 ? "" : "s"}
          </Button>
        }
      />
      <div className="space-y-3 p-4">
        {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        {!results && !error && <p className="text-sm text-muted">Run the check to see which listings refer to names the metadata lacks.</p>}
        {results && (
          <>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge tone="good"><CheckCircle2 size={11} aria-hidden /> {count("ok")} all found</Badge>
              <Badge tone="warn"><AlertTriangle size={11} aria-hidden /> {count("unresolved")} with names not found</Badge>
              <Badge>{count("none_found")} no references seen</Badge>
              <Badge>{count("no_metadata")} no metadata</Badge>
              <label className="ml-auto flex items-center gap-1.5">
                <input type="checkbox" className="h-3.5 w-3.5 accent-[var(--accent)]" checked={onlyProblems} onChange={(e) => setOnlyProblems(e.target.checked)} /> Only listings with problems
              </label>
            </div>
            <ul className="max-h-80 divide-y divide-line overflow-y-auto rounded-lg border border-line">
              {shown.map((r) => (
                <li key={r.key} className="space-y-1 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">{byKey.get(r.key)?.reportId ?? r.key}</span>
                    {r.studyId && <span className="text-muted">{r.studyId}</span>}
                    <span className="ml-auto"><Badge tone={TONE[r.status]}>{LABEL[r.status]}{r.status === "unresolved" || r.status === "ok" ? ` (${r.resolved}/${r.references})` : ""}</Badge></span>
                  </div>
                  {r.unresolved.map((u, i) => <p key={i} className="text-muted"><span className="font-mono">{u.ref}</span>: {u.problem}</p>)}
                </li>
              ))}
              {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{onlyProblems ? "No listing has names missing from the metadata." : "Nothing to show."}</li>}
            </ul>
          </>
        )}
      </div>
    </Card>
  );
}
