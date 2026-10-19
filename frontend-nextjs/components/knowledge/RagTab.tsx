"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Loader2, RefreshCw, Search } from "lucide-react";
import { kbReindex, kbSearch, kbStats } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { useStudies } from "@/lib/useStudies";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import { DOC_TYPE_LABEL, type DocType, type KbSearchResult } from "@/lib/types";
import { errText, scopeLabel } from "./shared";

export default function RagTab() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const studies = useStudies();
  const stats = useQuery({ queryKey: ["kb", "stats", tenantId], queryFn: () => kbStats(tenantId) });
  const [query, setQuery] = useState("");
  const [studyId, setStudyId] = useState("");
  const [ta, setTa] = useState("");
  const [edc, setEdc] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [topK, setTopK] = useState(5);
  const [drafts, setDrafts] = useState(false);
  const [busy, setBusy] = useState<"" | "search" | "reindex">("");
  const [error, setError] = useState<string | null>(null);
  const [res, setRes] = useState<KbSearchResult | null>(null);
  const [note, setNote] = useState<string | null>(null);

  async function run() {
    setBusy("search"); setError(null);
    try { setRes(await kbSearch({ query, studyId, ta, edcSystem: edc, docTypes: types, topK, includeUnapproved: drafts }, tenantId)); }
    catch (e) { setError(errText(e)); } finally { setBusy(""); }
  }
  async function reindex() {
    setBusy("reindex"); setError(null); setNote(null);
    try { const r = await kbReindex(tenantId); setNote(`Re-embedded ${r.chunks} chunks with ${r.backend}.`); await qc.invalidateQueries({ queryKey: ["kb"] }); }
    catch (e) { setError(errText(e)); } finally { setBusy(""); }
  }
  const s = stats.data;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="RAG store" hint="The searchable index behind approved knowledge. Use the tester to see exactly what a run would retrieve and why anything was left out."
          right={<Button variant="secondary" onClick={reindex} disabled={busy !== ""}>{busy === "reindex" ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <RefreshCw size={15} aria-hidden />} Reindex</Button>} />
        <div className="space-y-3 p-4">
          {s && (
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge>{s.sources} sources</Badge><Badge>{s.chunks} chunks</Badge>
              <Badge tone="good">{s.byStatus.approved ?? 0} approved</Badge><Badge tone="warn">{s.byStatus.draft ?? 0} draft</Badge>
              <Badge tone="accent">Embeddings: {s.embedBackend}</Badge>
            </div>
          )}
          {s?.lexicalOnly && (
            <p className="flex gap-2 rounded-lg bg-warnsoft p-3 text-xs text-warn">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" aria-hidden />
              <span>Retrieval currently matches shared words, not meaning, because no embedding model is configured. Set SPEC2CODE_EMBED_MODEL to a local sentence-transformers model and press Reindex for semantic matching.</span>
            </p>
          )}
          {note && <p className="rounded-lg bg-goodsoft p-3 text-xs text-good">{note}</p>}
        </div>
      </Card>

      <Card>
        <CardHeader title="Retrieval tester" />
        <div className="space-y-3 p-4">
          <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={3} className={inputCls} placeholder="Paste a spec's logic or ask a question, e.g. how are deleted forms handled" aria-label="Query" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block text-xs font-medium text-muted">Study
              <select value={studyId} onChange={(e) => setStudyId(e.target.value)} className={inputCls} aria-label="Study">
                <option value="">No study</option>
                {studies.data?.map((x) => <option key={x.studyId} value={x.studyId}>{x.studyId}{x.ta || x.sponsor ? ` (${[x.sponsor, x.ta].filter(Boolean).join(" · ")})` : ""}</option>)}
              </select>
            </label>
            <label className="block text-xs font-medium text-muted">Therapeutic area (overrides the study's)
              <input value={ta} onChange={(e) => setTa(e.target.value)} className={inputCls} list="kb-tas" placeholder="optional" />
            </label>
            <label className="block text-xs font-medium text-muted">EDC system id
              <input value={edc} onChange={(e) => setEdc(e.target.value)} className={inputCls} placeholder="e.g. rave" />
            </label>
            <label className="block text-xs font-medium text-muted">Results
              <input type="number" min={1} max={50} value={topK} onChange={(e) => setTopK(Number(e.target.value) || 5)} className={inputCls} />
            </label>
          </div>
          <datalist id="kb-tas">{(s?.tas ?? []).map((t) => <option key={t} value={t} />)}</datalist>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <select multiple value={types} onChange={(e) => setTypes(Array.from(e.target.selectedOptions).map((o) => o.value))} className={`${inputCls} mt-0 h-20 w-56`} aria-label="Document types">
              {(Object.keys(DOC_TYPE_LABEL) as DocType[]).map((d) => <option key={d} value={d}>{DOC_TYPE_LABEL[d]}</option>)}
            </select>
            <span className="text-muted">Hold Ctrl to pick several types, or leave empty for all.</span>
            <label className="flex items-center gap-1.5"><input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={drafts} onChange={(e) => setDrafts(e.target.checked)} /> Include drafts</label>
            <Button variant="primary" className="ml-auto" onClick={run} disabled={busy !== "" || !query.trim()}>{busy === "search" ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Search size={15} aria-hidden />} Search</Button>
          </div>
          {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        </div>
      </Card>

      {res && (
        <Card>
          <CardHeader title={`Retrieved (${res.results.length} of ${res.candidates} eligible chunks)`} hint={`Therapeutic area used: ${res.ta || "none"} · embeddings ${res.backend}`} />
          <div className="space-y-3 p-4">
            {res.warning && <p className="rounded-lg bg-warnsoft p-3 text-xs text-warn">{res.warning}</p>}
            <ul className="space-y-2">
              {res.results.map((h, i) => (
                <li key={h.chunkId} className="rounded-lg border border-line p-3">
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold">{i + 1}. {h.title}</span>
                    {h.heading && <Badge>{h.heading}</Badge>}
                    <Badge tone="accent">{scopeLabel(h.scope, h.scopeRef)}</Badge>
                    <Badge>{DOC_TYPE_LABEL[h.docType]}</Badge>
                    {h.status !== "approved" && <Badge tone="warn">{h.status}</Badge>}
                    <span className="ml-auto tabular-nums text-muted" title={`vector ${h.vectorScore}, keyword ${h.keywordScore}`}>score {h.score.toFixed(3)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted">{h.text.length > 700 ? h.text.slice(0, 700) + "…" : h.text}</p>
                </li>
              ))}
              {res.results.length === 0 && <li className="py-6 text-center text-sm text-muted">Nothing approved and in scope matches this query.</li>}
            </ul>
            {res.excluded.length > 0 && (
              <details className="rounded-lg bg-surface2 p-3 text-xs">
                <summary className="cursor-pointer font-medium">Left out ({res.excluded.length} sources) and why</summary>
                <ul className="mt-2 space-y-1">{res.excluded.map((e) => <li key={e.sourceId}><span className="font-medium">{e.title}</span> <span className="text-muted">({scopeLabel(e.scope, e.scopeRef)}): {e.reason}</span></li>)}</ul>
              </details>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
