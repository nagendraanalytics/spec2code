"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { kbSources, kbStats } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import { DOC_TYPE_LABEL, type DocType, type KbScope } from "@/lib/types";
import SourceDrawer from "./SourceDrawer";
import UploadPanel from "./UploadPanel";
import { extractBadge, fmtSize, scopeLabel, StatusBadge } from "./shared";

/** One library, three views: everything, global only, or one therapeutic area. */
export default function LibraryTab({ mode }: { mode: "all" | "global" | "ta" | "sponsor" | "report" }) {
  const { tenantId } = useWorkspace();
  const stats = useQuery({ queryKey: ["kb", "stats", tenantId], queryFn: () => kbStats(tenantId) });
  const [ta, setTa] = useState("");
  const [status, setStatus] = useState("");
  const [docType, setDocType] = useState("");
  const [scope, setScope] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const tas = stats.data?.tas ?? [];
  const sponsors = stats.data?.sponsors ?? [];
  const reports = stats.data?.reports ?? [];
  const byRef = mode === "ta" || mode === "sponsor" || mode === "report";
  const fixedScope: KbScope | null = mode === "all" ? null : mode;
  const effScope = mode === "all" ? scope : mode;
  const listQ = useQuery({
    queryKey: ["kb", "sources", tenantId, effScope, byRef ? ta : "", status, docType, q],
    queryFn: () => kbSources(tenantId, { scope: effScope, scopeRef: byRef ? ta : "", status, docType, q }),
  });
  const list = listQ.data ?? [];

  return (
    <div className="space-y-5">
      <datalist id="kb-tas">{tas.map((t) => <option key={t} value={t} />)}</datalist>
      <datalist id="kb-sponsors">{sponsors.map((t) => <option key={t} value={t} />)}</datalist>
      <datalist id="kb-reports">{reports.map((t) => <option key={t} value={t} />)}</datalist>
      {mode === "report" && (
        <Card>
          <CardHeader title="Report" hint="Knowledge for one report: the SAS program it is being migrated from, notes and supporting documents. Every report is stored in the vector index and found by similarity to the spec being generated, whatever its Report ID. The ID only ranks a report higher when it is the spec's own. Other reports' material reaches the prompt only if it is clearly similar, labelled as a precedent." />
          <div className="flex flex-wrap items-center gap-2 p-4">
            <input value={ta} onChange={(e) => setTa(e.target.value)} placeholder="Report ID, e.g. RID002" className={`${inputCls} mt-0 max-w-xs`} aria-label="Report ID" list="kb-reports" />
            <span className="text-xs text-muted">{reports.length} report{reports.length === 1 ? "" : "s"} have knowledge. Reports get here when a programmer confirms a result as a verified precedent in the Workspace, when you upload files with a Report ID, or with the report import script. Running a report on its own does not store it.</span>
          </div>
        </Card>
      )}
      {mode === "sponsor" && (
        <Card>
          <CardHeader title="Sponsor" hint="Knowledge that applies only to studies of this sponsor: its SAS programs, conventions, SOPs and listing standards. A study picks its sponsor in Study setup. Names match ignoring case." />
          <div className="flex flex-wrap items-center gap-2 p-4">
            {sponsors.map((t) => (
              <button key={t} onClick={() => setTa(t)} className={`rounded-full border px-3 py-1 text-sm ${ta === t ? "border-accent bg-accentsoft text-accent" : "border-line hover:bg-surface2"}`}>{t}</button>
            ))}
            <input value={ta} onChange={(e) => setTa(e.target.value)} placeholder={sponsors.length ? "or type a new sponsor" : "Type a sponsor, e.g. Merck"} className={`${inputCls} mt-0 max-w-xs`} aria-label="Sponsor" list="kb-sponsors" />
          </div>
        </Card>
      )}
      {mode === "ta" && (
        <Card>
          <CardHeader title="Therapeutic area" hint="Knowledge that applies only to studies in this area. A study picks its area in Study setup." />
          <div className="flex flex-wrap items-center gap-2 p-4">
            {tas.map((t) => (
              <button key={t} onClick={() => setTa(t)} className={`rounded-full border px-3 py-1 text-sm ${ta === t ? "border-accent bg-accentsoft text-accent" : "border-line hover:bg-surface2"}`}>{t}</button>
            ))}
            <input value={ta} onChange={(e) => setTa(e.target.value)} placeholder={tas.length ? "or type a new area" : "Type an area, e.g. Oncology"} className={`${inputCls} mt-0 max-w-xs`} aria-label="Therapeutic area" list="kb-tas" />
          </div>
        </Card>
      )}
      {(!byRef || ta.trim()) && <UploadPanel scope={fixedScope} scopeRef={ta.trim()} defaultDocType="" />}

      <Card>
        <CardHeader
          title={`${mode === "report" ? (ta ? `${ta} knowledge` : "Report knowledge") : mode === "sponsor" ? (ta ? `${ta} knowledge` : "Sponsor knowledge") : mode === "ta" ? (ta ? `${ta} knowledge` : "Therapeutic-area knowledge") : mode === "global" ? "Global knowledge" : "All sources"} (${list.length})`}
          hint="Only approved sources are used in retrieval."
        />
        <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or file" className={`${inputCls} mt-0 py-1.5 pl-8`} aria-label="Search sources" />
          </div>
          {mode === "all" && (
            <select value={scope} onChange={(e) => setScope(e.target.value)} className={`${inputCls} mt-0 w-auto py-1.5`} aria-label="Scope filter">
              <option value="">All scopes</option><option value="global">Global</option><option value="sponsor">Sponsor</option><option value="ta">Therapeutic area</option><option value="study">Study</option><option value="report">Report</option>
            </select>
          )}
          <select value={docType} onChange={(e) => setDocType(e.target.value)} className={`${inputCls} mt-0 w-auto py-1.5`} aria-label="Type filter">
            <option value="">All types</option>
            {(Object.keys(DOC_TYPE_LABEL) as DocType[]).map((d) => <option key={d} value={d}>{DOC_TYPE_LABEL[d]}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputCls} mt-0 w-auto py-1.5`} aria-label="Status filter">
            <option value="">Any status</option><option value="draft">Draft</option><option value="approved">Approved</option><option value="retired">Retired</option>
          </select>
        </div>
        {listQ.isError && <p className="p-4 text-sm text-bad">{String(listQ.error)}</p>}
        <ul className="divide-y divide-line">
          {list.map((s) => (
            <li key={s.id}>
              <button onClick={() => setOpen(s.id)} className="flex w-full flex-wrap items-center gap-3 px-4 py-2.5 text-left hover:bg-surface2">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{s.title}</span>
                  <span className="block truncate text-xs text-muted">{s.filename} · {fmtSize(s.sizeBytes)} · {s.chunks} chunks{s.standardVersion ? ` · ${s.standardVersion}` : ""}</span>
                </span>
                <Badge>{DOC_TYPE_LABEL[s.docType]}</Badge>
                {mode !== "global" && <Badge tone="accent">{scopeLabel(s.scope, s.scopeRef)}</Badge>}
                {extractBadge(s)}
                <StatusBadge status={s.status} />
              </button>
            </li>
          ))}
          {list.length === 0 && !listQ.isLoading && <li className="px-4 py-10 text-center text-sm text-muted">{byRef && !ta ? `Choose or type a ${mode === "report" ? "report ID" : mode === "sponsor" ? "sponsor" : "therapeutic area"} to see and add its knowledge.` : "Nothing here yet. Add documents above."}</li>}
        </ul>
      </Card>
      {open && <SourceDrawer id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
