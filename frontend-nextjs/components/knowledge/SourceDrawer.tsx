"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { kbAction, kbDelete, kbPatch, kbSource } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, inputCls } from "@/components/ui/primitives";
import { DOC_TYPE_LABEL, type DocType } from "@/lib/types";
import { errText, extractBadge, fmtSize, scopeLabel, StatusBadge } from "./shared";

export default function SourceDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["kb", "source", id, tenantId], queryFn: () => kbSource(id, tenantId) });
  const s = q.data;
  const [error, setError] = useState<string | null>(null);
  const refresh = () => qc.invalidateQueries({ queryKey: ["kb"] });
  const run = useMutation({
    mutationFn: async (fn: () => Promise<unknown>) => fn(),
    onSuccess: refresh,
    onError: (e) => setError(errText(e)),
  });
  const act = (a: "approve" | "retire" | "restore") => { setError(null); run.mutate(() => kbAction(id, a, tenantId)); };
  const patch = (p: Record<string, string>) => { setError(null); run.mutate(() => kbPatch(id, p, tenantId)); };

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-black/40" onClick={onClose}>
      <div role="dialog" aria-label="Source details" className="flex h-full w-full max-w-3xl flex-col border-l border-line bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 border-b border-line p-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold">{s?.title ?? "Loading"}</h2>
            {s && (
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                <StatusBadge status={s.status} /> {extractBadge(s)}
                <span>{s.filename} · {fmtSize(s.sizeBytes)} · {s.chunks} chunks</span>
              </div>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-muted hover:bg-surface2"><X size={18} /></button>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {q.isError && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{errText(q.error)}</p>}
          {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
          {s?.extractNote && <p className="rounded-lg bg-surface2 p-3 text-xs text-muted">{s.extractNote}</p>}
          {s && (
            <>
              <div className="flex flex-wrap gap-2">
                {s.status !== "approved" && <Button variant="primary" onClick={() => act("approve")} disabled={run.isPending}>Approve for use</Button>}
                {s.status === "approved" && <Button variant="secondary" onClick={() => act("retire")} disabled={run.isPending}>Retire</Button>}
                {s.status === "retired" && <Button variant="secondary" onClick={() => act("restore")} disabled={run.isPending}>Back to draft</Button>}
                <Button variant="ghost" className="ml-auto" onClick={async () => { if (window.confirm("Delete this source and its chunks?")) { await kbDelete(id, tenantId).catch((e) => setError(errText(e))); await refresh(); onClose(); } }}>
                  <Trash2 size={15} aria-hidden /> Delete
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-muted">Title
                  <input defaultValue={s.title} onBlur={(e) => e.target.value !== s.title && patch({ title: e.target.value })} className={inputCls} />
                </label>
                <label className="block text-xs font-medium text-muted">Document type
                  <select value={s.docType} onChange={(e) => patch({ docType: e.target.value })} className={inputCls}>
                    {(Object.keys(DOC_TYPE_LABEL) as DocType[]).map((d) => <option key={d} value={d}>{DOC_TYPE_LABEL[d]}</option>)}
                  </select>
                  <span className="mt-1 block font-normal">{s.docTypeReason}</span>
                </label>
                <label className="block text-xs font-medium text-muted">Applies to
                  <select value={s.scope} onChange={(e) => patch({ scope: e.target.value, scopeRef: e.target.value === "global" ? "" : s.scopeRef })} className={inputCls}>
                    <option value="global">Global</option><option value="sponsor">One sponsor</option><option value="ta">One therapeutic area</option><option value="study">One study</option><option value="report">One report</option>
                  </select>
                </label>
                <label className="block text-xs font-medium text-muted">{s.scope === "global" ? "Limit to EDC system id (optional)" : s.scope === "report" ? "Report ID" : s.scope === "sponsor" ? "Sponsor" : s.scope === "ta" ? "Therapeutic area" : "Study ID"}
                  <input defaultValue={s.scopeRef} key={s.scope + s.scopeRef} onBlur={(e) => e.target.value !== s.scopeRef && patch({ scopeRef: e.target.value })} className={inputCls} />
                </label>
                <label className="block text-xs font-medium text-muted">Standard version
                  <input defaultValue={s.standardVersion} onBlur={(e) => e.target.value !== s.standardVersion && patch({ standardVersion: e.target.value })} className={inputCls} />
                </label>
                <label className="block text-xs font-medium text-muted">Licence or source note
                  <input defaultValue={s.licenseNote} onBlur={(e) => e.target.value !== s.licenseNote && patch({ licenseNote: e.target.value })} className={inputCls} />
                </label>
              </div>
              <p className="text-[11px] text-muted">Changing the scope or type of an approved source sends it back to draft, because it changes what retrieval would return.</p>
              <div>
                <h3 className="mb-2 text-sm font-semibold">What was read ({s.preview.length} of {s.chunks} chunks shown)</h3>
                <ul className="space-y-2">
                  {s.preview.map((c) => (
                    <li key={c.id} className="rounded-lg border border-line p-3">
                      <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                        <span>#{c.position + 1}</span>{c.heading && <Badge>{c.heading}</Badge>}
                        {Object.entries(c.meta ?? {}).map(([k, v]) => <span key={k}>{k}: {String(v)}</span>)}
                      </div>
                      <p className="whitespace-pre-wrap text-xs leading-relaxed">{c.text}</p>
                    </li>
                  ))}
                  {s.preview.length === 0 && <li className="py-6 text-center text-sm text-muted">No text was read from this file.</li>}
                </ul>
              </div>
              <p className="text-[11px] text-muted">{scopeLabel(s.scope, s.scopeRef)} · embedded with {s.embedBackend || "n/a"}{s.approvedBy ? ` · approved by ${s.approvedBy}` : ""}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
