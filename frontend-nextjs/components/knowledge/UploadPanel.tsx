"use client";

import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, FileUp, Loader2, XCircle } from "lucide-react";
import { kbUpload } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import { DOC_TYPE_LABEL, type DocType, type KbScope, type KbUploadResult } from "@/lib/types";
import { ACCEPT, errText, toBase64 } from "./shared";

/** Upload any mix of documents. `scope` is fixed by the tab it sits in, or chosen when null. */
export default function UploadPanel({ scope, scopeRef = "", defaultDocType = "" }: {
  scope: KbScope | null; scopeRef?: string; defaultDocType?: DocType | "";
}) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const [pickScope, setPickScope] = useState<KbScope>("global");
  const [pickRef, setPickRef] = useState("");
  const [docType, setDocType] = useState<string>(defaultDocType);
  const [version, setVersion] = useState("");
  const [license, setLicense] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<KbUploadResult[] | null>(null);

  const eff = scope ?? pickScope;
  const effRef = scope ? scopeRef : eff === "global" ? "" : pickRef;
  const needsRef = eff !== "global" && !effRef.trim();

  async function upload(files: File[]) {
    if (!files.length) return;
    setBusy(true);
    setError(null);
    setResults(null);
    try {
      const encoded = await Promise.all(files.map(async (f) => ({ name: f.name, data: await toBase64(f) })));
      const r = await kbUpload(encoded, { scope: eff, scopeRef: effRef.trim(), docType, standardVersion: version, licenseNote: license }, tenantId);
      setResults(r.results);
    } catch (e) {
      setError(errText(e));
      const body = (e as { body?: { results?: KbUploadResult[] } }).body;
      if (body?.results) setResults(body.results);
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
      await Promise.all([qc.invalidateQueries({ queryKey: ["kb"] })]);
    }
  }

  return (
    <Card>
      <CardHeader title="Add documents" hint="PDF, Word, Excel, CSV, text, Markdown, HTML, SAS, JSON or XML. Uploads start as drafts and are not used until a person approves them." />
      <div className="space-y-3 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scope === null && (
            <>
              <label className="block text-xs font-medium text-muted">Applies to
                <select value={pickScope} onChange={(e) => setPickScope(e.target.value as KbScope)} className={inputCls} aria-label="Scope">
                  <option value="global">Global (all studies)</option>
                  <option value="sponsor">One sponsor</option>
                  <option value="ta">One therapeutic area</option>
                  <option value="study">One study</option>
                  <option value="report">One report</option>
                </select>
              </label>
              {eff !== "global" && (
                <label className="block text-xs font-medium text-muted">{eff === "report" ? "Report ID" : eff === "sponsor" ? "Sponsor" : eff === "ta" ? "Therapeutic area" : "Study ID"}
                  <input value={pickRef} onChange={(e) => setPickRef(e.target.value)} list={eff === "ta" ? "kb-tas" : eff === "sponsor" ? "kb-sponsors" : eff === "report" ? "kb-reports" : undefined} className={inputCls} placeholder={eff === "report" ? "e.g. RID002" : eff === "sponsor" ? "e.g. Merck" : eff === "ta" ? "e.g. Oncology" : "e.g. MK-1234-001"} />
                </label>
              )}
            </>
          )}
          <label className="block text-xs font-medium text-muted">Document type
            <select value={docType} onChange={(e) => setDocType(e.target.value)} className={inputCls} aria-label="Document type">
              <option value="">Detect from content</option>
              {(Object.keys(DOC_TYPE_LABEL) as DocType[]).map((d) => <option key={d} value={d}>{DOC_TYPE_LABEL[d]}</option>)}
            </select>
          </label>
          <label className="block text-xs font-medium text-muted">Standard version (optional)
            <input value={version} onChange={(e) => setVersion(e.target.value)} className={inputCls} placeholder="e.g. SDTM IG 3.4" />
          </label>
          <label className="block text-xs font-medium text-muted">Licence or source note (optional)
            <input value={license} onChange={(e) => setLicense(e.target.value)} className={inputCls} placeholder="e.g. CDISC member licence" />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input ref={ref} type="file" multiple accept={ACCEPT} className="hidden" aria-label="Choose knowledge files" onChange={(e) => void upload(Array.from(e.target.files ?? []))} />
          <Button variant="primary" onClick={() => ref.current?.click()} disabled={busy || needsRef}>
            {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <FileUp size={15} aria-hidden />} Choose files
          </Button>
          {needsRef && <span className="text-xs text-muted">Enter the {eff === "report" ? "report ID" : eff === "sponsor" ? "sponsor" : eff === "ta" ? "therapeutic area" : "study ID"} first.</span>}
          <span className="text-[11px] text-muted">Only upload content you are licensed to keep. Masking of sponsor-confidential text is not applied to the library itself.</span>
        </div>
        {error && !results && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        {results && (
          <ul className="divide-y divide-line rounded-lg border border-line text-sm">
            {results.map((r, i) => (
              <li key={i} className="flex items-start gap-2 px-3 py-2">
                {r.error ? <XCircle size={15} className="mt-0.5 shrink-0 text-bad" aria-hidden /> : <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-good" aria-hidden />}
                <div className="min-w-0">
                  <div className="truncate font-medium">{r.name}</div>
                  <div className="text-xs text-muted">
                    {r.error ?? (r.duplicate ? r.note : `${r.chunks} chunk${r.chunks === 1 ? "" : "s"} · ${DOC_TYPE_LABEL[(r.docType ?? "other") as DocType]} (${r.docTypeReason}) · saved as draft`)}
                    {!r.error && !r.duplicate && r.note ? ` · ${r.note}` : ""}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
