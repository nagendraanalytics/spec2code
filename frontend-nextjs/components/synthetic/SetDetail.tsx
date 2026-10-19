"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { synApprove, synDelete, synDownload, synEdit, synGet, synReopen } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, inputCls } from "@/components/ui/primitives";
import RunPanel from "./RunPanel";
import type { SynCase, SynSet } from "@/lib/types";

export const STATUS = { draft: ["warn", "Draft"], reviewed: ["good", "Reviewed"], retired: ["neutral", "Retired"] } as const;

function Tables({ c }: { c: SynCase }) {
  return (
    <div className="space-y-2">
      {c.tables.map((t, i) => {
        const cols = Array.from(new Set(t.rows.flatMap((r) => Object.keys(r))));
        return (
          <div key={i} className="overflow-auto rounded-lg border border-line">
            <p className="border-b border-line bg-surface2 px-2 py-1 font-mono text-[11px]">{t.form || "(form)"}</p>
            <table className="w-full text-[11px]">
              <thead><tr>{cols.map((k) => <th key={k} className="px-2 py-1 text-left font-medium text-muted">{k}</th>)}</tr></thead>
              <tbody>{t.rows.map((r, j) => <tr key={j} className="border-t border-line">{cols.map((k) => <td key={k} className="px-2 py-1 font-mono">{r[k] ?? ""}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default function SetDetail({ id, reviewer, onClose }: { id: string; reviewer: string; onClose: () => void }) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["syn", id, tenantId], queryFn: () => synGet(id, tenantId) });
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const refresh = (d?: SynSet) => {
    if (d) qc.setQueryData(["syn", id, tenantId], d);
    qc.invalidateQueries({ queryKey: ["synlist"] });
  };
  const fail = (e: unknown) => setErr(e instanceof Error ? e.message : String(e));
  const edit = useMutation({ mutationFn: (cases: SynCase[]) => synEdit(id, { cases }, tenantId), onSuccess: (d) => { setErr(null); refresh(d); }, onError: fail });
  const sign = useMutation({
    mutationFn: async () => {
      try {
        return await synApprove(id, false, tenantId, reviewer);
      } catch (e) {
        const body = (e as { body?: { coverage?: { uncovered: string[] } } }).body;
        if (body?.coverage && window.confirm(`These conditions are not fully covered: ${body.coverage.uncovered.join(", ") || "(cases with no condition)"}.\n\nSign off with the gaps acknowledged?`)) return synApprove(id, true, tenantId, reviewer);
        throw e;
      }
    },
    onSuccess: (d) => { setErr(null); refresh(d); },
    onError: fail,
  });
  const reopen = useMutation({ mutationFn: () => synReopen(id, tenantId), onSuccess: refresh, onError: fail });
  const del = useMutation({ mutationFn: () => synDelete(id, tenantId), onSuccess: () => { refresh(); onClose(); }, onError: fail });

  if (q.isLoading) return <p className="p-4 text-sm text-muted">Loading</p>;
  if (q.isError || !q.data) return <p className="p-4 text-sm text-bad">{String(q.error)}</p>;
  const d = q.data;
  const cases = d.cases ?? [];
  const locked = d.status === "retired";
  const [tone, label] = STATUS[d.status];
  const change = (cid: string, patch: Partial<SynCase>) => edit.mutate(cases.map((c) => (c.id === cid ? { ...c, ...patch } : c)));
  const shown = cases.filter((c) => filter === "all" || (filter === "boundary" ? c.boundary : filter.startsWith("c:") ? c.conditionId === filter.slice(2) : c.expectation === filter));

  return (
    <Card>
      <div className="space-y-4 p-4" data-testid="syn-detail">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm font-semibold">{d.reportId}</span>
          <Badge>v{d.version}</Badge>
          <Badge tone={tone}>{label}</Badge>
          {d.edited && <Badge tone="accent">Edited</Badge>}
          {d.usedKnowledge && <Badge tone="accent">Knowledge used</Badge>}
          {d.reviewedBy && <span className="text-xs text-muted">signed off by {d.reviewedBy}</span>}
          <span className="flex-1" />
          <Button variant="ghost" onClick={() => synDownload(id, "csv", tenantId, `${d.reportId}_synthetic_v${d.version}`).catch(fail)}>CSV</Button>
          <Button variant="ghost" onClick={() => synDownload(id, "json", tenantId, `${d.reportId}_synthetic_v${d.version}`).catch(fail)}>JSON</Button>
          {d.status === "reviewed" && <Button onClick={() => reopen.mutate()}>Reopen</Button>}
          {d.status === "draft" && <Button variant="primary" disabled={!reviewer || sign.isPending} title={reviewer ? "" : "Enter your reviewer name above first"} onClick={() => sign.mutate()}>Sign off</Button>}
          <Button variant="ghost" onClick={() => window.confirm(`Delete ${d.reportId} v${d.version}?`) && del.mutate()}>Delete</Button>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        {err && <p className="rounded-lg bg-badsoft p-2 text-sm text-bad">{err}</p>}
        <p className="rounded-lg bg-warnsoft p-2 text-xs text-warn">
          Synthetic data built from the spec's wording by a model. It shows what the logic should do. It is not a run against real data, and a reviewer should correct any case whose expectation is wrong.
        </p>
        {d.summary && <p className="text-sm">{d.summary}</p>}
        {(d.openQuestions?.length ?? 0) > 0 && (
          <div className="rounded-lg border border-line p-3 text-sm">
            <p className="text-xs font-medium text-muted">Open questions for the spec author</p>
            <ul className="mt-1 list-disc pl-5">{d.openQuestions!.map((o, i) => <li key={i}>{o}</li>)}</ul>
          </div>
        )}

        <div>
          <p className="mb-1 text-xs font-medium text-muted">Logic coverage: {d.coverage.covered} of {d.coverage.total} conditions have both an include and an exclude case</p>
          <ul className="divide-y divide-line rounded-lg border border-line text-xs" data-testid="syn-coverage">
            {d.coverage.conditions.map((c) => (
              <li key={c.id} className="flex flex-wrap items-start gap-2 px-3 py-2">
                <span className="font-mono">{c.id}</span>
                <span className="min-w-0 flex-1">{c.text}</span>
                <Badge tone="good">{c.include} include</Badge><Badge tone="bad">{c.exclude} exclude</Badge>{c.boundary > 0 && <Badge>{c.boundary} boundary</Badge>}
                {c.gap ? <Badge tone="warn">{c.gap}</Badge> : <Badge tone="good">covered</Badge>}
                <button className="text-accent underline" onClick={() => setFilter(`c:${c.id}`)}>cases</button>
              </li>
            ))}
          </ul>
          {d.coverage.orphanCases.length > 0 && <p className="mt-1 text-xs text-warn">Cases not tied to a listed condition: {d.coverage.orphanCases.join(", ")}</p>}
        </div>

        {d.status !== "retired" && <RunPanel set={d} reviewer={reviewer} />}

        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-muted">Cases ({shown.length} of {cases.length})</p>
          <select className={inputCls} style={{ width: "auto", marginTop: 0 }} value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter cases">
            <option value="all">All</option><option value="include">Include</option><option value="exclude">Exclude</option><option value="boundary">Boundary only</option>
            {d.coverage.conditions.map((c) => <option key={c.id} value={`c:${c.id}`}>Condition {c.id}</option>)}
          </select>
        </div>
        <ul className="space-y-3">
          {shown.map((c) => (
            <li key={c.id} className="space-y-2 rounded-lg border border-line p-3 text-xs" data-testid="syn-case">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono">{c.id}</span><span className="text-muted">tests {c.conditionId || "?"}</span>
                {c.boundary && <Badge>boundary</Badge>}
                <span className="flex-1" />
                <select disabled={locked} className={inputCls} style={{ width: "auto", marginTop: 0 }} value={c.expectation} aria-label={`Expectation for ${c.id}`}
                  onChange={(e) => change(c.id, { expectation: e.target.value as SynCase["expectation"] })}>
                  <option value="include">Should be included</option><option value="exclude">Should be excluded</option>
                </select>
                {!locked && cases.length > 1 && <Button variant="ghost" onClick={() => edit.mutate(cases.filter((x) => x.id !== c.id))}>Remove</Button>}
              </div>
              <p className="text-sm">{c.scenario}</p>
              <p className="text-muted">{c.rationale}</p>
              <Tables c={c} />
              <input disabled={locked} className={inputCls} defaultValue={c.note} placeholder="Reviewer note" aria-label={`Note for ${c.id}`}
                onBlur={(e) => e.target.value !== c.note && change(c.id, { note: e.target.value })} />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
