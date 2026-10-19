"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { synRuns, synRunSql, synTestpack, synUploadResult } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, inputCls } from "@/components/ui/primitives";
import type { SynRun, SynSet } from "@/lib/types";

async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

const Q = { TP: "good", TN: "good", FP: "bad", FN: "bad" } as const;

function Result({ run }: { run: SynRun }) {
  const c = run.counts;
  const wrong = (c.FP ?? 0) + (c.FN ?? 0);
  return (
    <div className="space-y-2 rounded-lg border border-line p-3 text-xs" data-testid="syn-run">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={run.status === "could_not_execute" ? "warn" : "accent"}>{run.status === "executed" ? "Executed here (SQLite)" : run.status === "uploaded" ? `Uploaded${run.language ? ` (${run.language.toUpperCase()})` : ""}` : "Could not execute"}</Badge>
        {run.status !== "could_not_execute" && (wrong === 0 && (c.not_judged ?? 0) === 0 ? <Badge tone="good">All cases match</Badge> : <Badge tone="bad">{wrong} mismatch{wrong === 1 ? "" : "es"}</Badge>)}
        {run.stale && <Badge tone="warn" title="The cases were edited after this run">Stale</Badge>}
        <span className="text-muted">v{run.setVersion} · {run.createdAt ? new Date(run.createdAt).toLocaleString() : ""}{run.sourceName ? ` · ${run.sourceName}` : ""}{run.createdBy ? ` · ${run.createdBy}` : ""}</span>
      </div>
      {run.error && <p className="text-bad">{run.error}</p>}
      {run.status !== "could_not_execute" && (
        <>
          <p className="text-muted">{run.rowsReturned} rows returned. TP {c.TP ?? 0} · TN {c.TN ?? 0} · FP {c.FP ?? 0} · FN {c.FN ?? 0}{c.not_judged ? ` · ${c.not_judged} not judged` : ""}</p>
          <ul className="divide-y divide-line rounded-lg border border-line">
            {run.results.map((r) => (
              <li key={r.caseId} className="flex flex-wrap items-center gap-2 px-2 py-1.5">
                <span className="font-mono">{r.caseId}</span>
                <Badge tone={r.expectation === "include" ? "good" : "bad"}>{r.expectation}</Badge>
                {r.quadrant ? <Badge tone={Q[r.quadrant]}>{r.quadrant}</Badge> : <Badge tone="warn">not judged</Badge>}
                <span className={r.quadrant === "FP" || r.quadrant === "FN" || !r.quadrant ? "text-bad" : "text-muted"}>{r.detail || (r.quadrant ? "matches" : "")}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function RunPanel({ set, reviewer }: { set: SynSet; reviewer: string }) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const runs = useQuery({ queryKey: ["synruns", set.id, tenantId], queryFn: () => synRuns(set.id, tenantId) });
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("cql");
  const [err, setErr] = useState<string | null>(null);
  const file = useRef<HTMLInputElement>(null);
  const done = () => { setErr(null); qc.invalidateQueries({ queryKey: ["synruns", set.id, tenantId] }); };
  const fail = (e: unknown) => setErr(e instanceof Error ? e.message : String(e));
  const sql = useMutation({ mutationFn: () => synRunSql(set.id, code, tenantId, reviewer), onSuccess: done, onError: fail });
  const upload = useMutation({
    mutationFn: async (f: File) => synUploadResult(set.id, { name: f.name, data: await toBase64(f) }, lang, "", tenantId, reviewer),
    onSuccess: done, onError: fail,
  });
  const issues = set.keyIssues;
  const sharedN = Object.keys(issues.shared).length;

  return (
    <div className="space-y-3" data-testid="syn-runpanel">
      <p className="text-xs font-medium text-muted">Run against code</p>
      {set.status !== "reviewed" && <p className="rounded-lg bg-warnsoft p-2 text-xs text-warn">This set is not signed off yet. A result is only as reliable as the expectations it is compared with.</p>}
      {(issues.noKey.length > 0 || sharedN > 0) && (
        <p className="rounded-lg bg-warnsoft p-2 text-xs text-warn">
          {issues.noKey.length > 0 && <>Cases with no subject ID: {issues.noKey.join(", ")}. </>}
          {sharedN > 0 && <>Subject IDs used by more than one case: {Object.keys(issues.shared).join(", ")}. </>}
          These cases cannot be judged. Give each case its own subject IDs.
        </p>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-line p-3">
          <p className="text-sm font-medium">SQL: run here</p>
          <p className="text-xs text-muted">Runs in a throwaway read-only SQLite database. Empty values load as NULL. Leave the box empty to use the newest SQL stored for {set.reportId}. SQL written for another database may not run unchanged, and that is reported as "could not execute", not as a failure.</p>
          <textarea className={`${inputCls} font-mono text-xs`} rows={5} value={code} onChange={(e) => setCode(e.target.value)} placeholder="SELECT SubjectId FROM AE WHERE ..." aria-label="SQL to run" />
          <Button variant="primary" disabled={sql.isPending} onClick={() => sql.mutate()}>{sql.isPending ? "Running" : "Run SQL"}</Button>
        </div>
        <div className="space-y-2 rounded-lg border border-line p-3">
          <p className="text-sm font-medium">CQL, SAS and others: run in the real system</p>
          <p className="text-xs text-muted">These cannot run here. Download the test pack, load the data and run the code in your system (Veeva, SAS), then upload the CSV it returns. The comparison is the same.</p>
          <div className="flex flex-wrap items-center gap-2">
            <select className={inputCls} style={{ width: "auto", marginTop: 0 }} value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language of the code">
              <option value="cql">CQL</option><option value="sas">SAS</option><option value="r">R</option><option value="python">Python</option><option value="sql">SQL</option>
            </select>
            <Button onClick={() => synTestpack(set.id, lang, tenantId, `${set.reportId}_testpack_v${set.version}`).catch(fail)}>Download test pack</Button>
            <input ref={file} type="file" accept=".csv" className="hidden" data-testid="syn-upload" onChange={(e) => e.target.files?.[0] && upload.mutate(e.target.files[0])} />
            <Button disabled={upload.isPending} onClick={() => file.current?.click()}>{upload.isPending ? "Reading" : "Upload result CSV"}</Button>
          </div>
        </div>
      </div>
      {err && <p className="rounded-lg bg-badsoft p-2 text-sm text-bad">{err}</p>}
      {(runs.data ?? []).map((r) => <Result key={r.id} run={r} />)}
    </div>
  );
}
