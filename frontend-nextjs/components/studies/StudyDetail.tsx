"use client";

import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Info, Loader2, Trash2, Upload, XCircle } from "lucide-react";
import { activateVersion, deleteStudy, getStudy, getStudyItems, patchStudy, uploadMetadata } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import type { EdcSystem, StudyCheck, StudyMessage } from "@/lib/types";

async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

const SEV_ICON = {
  error: <XCircle size={14} className="mt-0.5 shrink-0 text-bad" aria-hidden />,
  warning: <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warn" aria-hidden />,
  info: <Info size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />,
} as const;

function Checks({ checks }: { checks: StudyCheck[] }) {
  return (
    <ul className="space-y-1.5">
      {checks.map((c, i) => (
        <li key={i} className="flex gap-2 text-xs">
          {SEV_ICON[c.severity]}
          <span>{c.text}{c.count != null && <span className="text-muted"> ({c.count})</span>}</span>
        </li>
      ))}
    </ul>
  );
}

export default function StudyDetail({ studyId, edc, onDeleted }: { studyId: string; edc?: EdcSystem; onDeleted: () => void }) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [carryOver, setCarryOver] = useState(true);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState<{ messages: StudyMessage[]; checks: StudyCheck[]; version: number } | null>(null);
  const [form, setForm] = useState("");
  const [q, setQ] = useState("");

  const study = useQuery({ queryKey: ["study", studyId, tenantId], queryFn: () => getStudy(studyId, tenantId) });
  const d = study.data;
  const items = useQuery({
    queryKey: ["study-items", studyId, tenantId, d?.activeVersion, form, q],
    queryFn: () => getStudyItems(studyId, tenantId, { form, q }),
    enabled: !!d?.activeVersion,
  });
  const refresh = () => Promise.all([
    qc.invalidateQueries({ queryKey: ["studies"] }),
    qc.invalidateQueries({ queryKey: ["study", studyId] }),
    qc.invalidateQueries({ queryKey: ["study-items", studyId] }),
    qc.invalidateQueries({ queryKey: ["targets"] }),
  ]);

  async function upload(files: File[]) {
    if (!files.length) return;
    setBusy(true);
    setError(null);
    setLast(null);
    try {
      const encoded = await Promise.all(files.map(async (f) => ({ name: f.name, data: await toBase64(f) })));
      const r = await uploadMetadata(studyId, encoded, carryOver, notes, tenantId);
      setLast({ messages: r.messages, checks: r.checks, version: r.version.version });
      setNotes("");
      setForm("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function activate(v: number) {
    setError(null);
    try {
      await activateVersion(studyId, v, tenantId);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function remove() {
    if (!window.confirm(`Delete study ${studyId} and all of its metadata versions? Finished batch runs keep their results.`)) return;
    try {
      await deleteStudy(studyId, tenantId);
      await refresh();
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  if (study.isLoading) return <p className="p-6 text-sm text-muted">Loading</p>;
  if (!d) return <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{String(study.error ?? "Study not found")}</p>;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title={`${d.studyId}${d.name ? `: ${d.name}` : ""}`}
          hint={`${edc?.label ?? d.edcSystem}${edc ? ` · ${edc.vendor}` : ""}`}
          right={<Button variant="ghost" onClick={remove} title="Delete this study"><Trash2 size={15} aria-hidden /> Delete</Button>}
        />
        <div className="space-y-4 p-4">
          <label className="block max-w-sm text-xs font-medium text-muted">Therapeutic area
            <input key={d.ta ?? ""} defaultValue={d.ta ?? ""} placeholder="e.g. Oncology" className={inputCls} aria-label="Therapeutic area"
              onBlur={async (e) => { if (e.target.value.trim() !== (d.ta ?? "")) { try { await patchStudy(studyId, { ta: e.target.value }, tenantId); await refresh(); } catch (x) { setError(x instanceof Error ? x.message : String(x)); } } }} />
            <span className="mt-1 block font-normal">Selects which therapeutic-area knowledge and rules apply to this study.</span>
          </label>
          <label className="block max-w-sm text-xs font-medium text-muted">Sponsor
            <input key={`sp-${d.sponsor ?? ""}`} defaultValue={d.sponsor ?? ""} placeholder="e.g. Merck" className={inputCls} aria-label="Sponsor"
              onBlur={async (e) => { if (e.target.value.trim() !== (d.sponsor ?? "")) { try { await patchStudy(studyId, { sponsor: e.target.value }, tenantId); await refresh(); } catch (x) { setError(x instanceof Error ? x.message : String(x)); } } }} />
            <span className="mt-1 block font-normal">Selects which sponsor knowledge and rules apply to this study.</span>
          </label>
          {d.counts ? (
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge tone="good">Active: version {d.activeVersion}</Badge>
              <Badge>{d.counts.items} items</Badge>
              <Badge>{d.counts.forms} forms</Badge>
              <Badge>{d.counts.visits} visits</Badge>
              <Badge>{d.counts.codelists} code lists</Badge>
            </div>
          ) : (
            <p className="rounded-lg bg-warnsoft p-3 text-xs text-warn">No metadata yet. Upload the study's item list below to ground generated code in real form and item names.</p>
          )}

          <div className="rounded-lg border border-dashed border-line p-4">
            <div className="flex flex-wrap items-center gap-3">
              <input ref={fileRef} type="file" multiple accept=".csv,.xlsx,.xlsm" className="hidden" id="meta-files" onChange={(e) => void upload(Array.from(e.target.files ?? []))} />
              <Button variant="primary" onClick={() => fileRef.current?.click()} disabled={busy}>
                {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Upload size={15} aria-hidden />}
                Upload metadata files
              </Button>
              <span className="text-xs text-muted">CSV or Excel. Items, visits and code lists are told apart by their column headings, so one workbook or several files both work.</span>
            </div>
            <label className="mt-3 flex items-start gap-2 text-xs">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={carryOver} onChange={(e) => setCarryOver(e.target.checked)} />
              <span>Keep visits and code lists from the previous version when this upload does not include them</span>
            </label>
            <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Version note (optional), e.g. Amendment 3 CRF changes" className={inputCls} aria-label="Version note" />
            {edc && (
              <p className="mt-3 text-[11px] leading-relaxed text-muted">
                <span className="font-medium">{edc.label} export:</span> {edc.export_hint} Column matching is based on general knowledge of common export layouts and has not been tested against real {edc.label} exports, so check the matched columns reported after each upload.
              </p>
            )}
          </div>

          {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
          {last && (
            <div className="space-y-3 rounded-lg bg-surface2 p-3">
              <p className="flex items-center gap-1.5 text-sm font-medium"><CheckCircle2 size={15} className="text-good" aria-hidden /> Saved as version {last.version}</p>
              <ul className="space-y-1 text-xs text-muted">{last.messages.map((m, i) => <li key={i}>{m.text}</li>)}</ul>
              <Checks checks={last.checks} />
            </div>
          )}
          {!last && d.checks && d.checks.length > 0 && <Checks checks={d.checks} />}
        </div>
      </Card>

      {d.versionList.length > 0 && (
        <Card>
          <CardHeader title="Versions" hint="Each upload is a new version. Runs pin the version they used, so older results stay explainable." />
          <ul className="divide-y divide-line">
            {d.versionList.map((v) => (
              <li key={v.version} className="flex flex-wrap items-center gap-3 px-4 py-2.5 text-sm">
                <span className="font-semibold">v{v.version}</span>
                {v.active && <Badge tone="good">Active</Badge>}
                <span className="text-xs text-muted">{v.counts.items} items · {v.counts.forms} forms{v.counts.carriedOver?.length ? ` · kept ${v.counts.carriedOver.join(", ")}` : ""}</span>
                <span className="min-w-0 flex-1 truncate text-xs text-muted">{v.notes || v.sourceFiles.join(", ")}</span>
                <span className="text-xs tabular-nums text-muted">{v.createdAt ? new Date(v.createdAt).toLocaleDateString() : ""}</span>
                {!v.active && <Button variant="secondary" onClick={() => void activate(v.version)}>Make active</Button>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {d.activeVersion && (
        <Card>
          <CardHeader title="Forms and items" hint={`Active version ${d.activeVersion}`} />
          <div className="grid gap-4 p-4 md:grid-cols-[220px_minmax(0,1fr)]">
            <ul className="max-h-80 space-y-0.5 overflow-y-auto text-sm" aria-label="Forms">
              <li>
                <button onClick={() => setForm("")} className={`w-full rounded-md px-2 py-1 text-left ${form === "" ? "bg-accentsoft font-medium text-accent" : "hover:bg-surface2"}`}>All forms</button>
              </li>
              {items.data?.forms.map((f) => (
                <li key={f.form}>
                  <button onClick={() => setForm(f.form)} className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left ${form === f.form ? "bg-accentsoft font-medium text-accent" : "hover:bg-surface2"}`} title={f.label}>
                    <span className="truncate font-mono text-xs">{f.form}</span><span className="text-[11px] text-muted">{f.items}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="min-w-0 space-y-2">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search item, label or form" className={`${inputCls} mt-0`} aria-label="Search items" />
              <div className="max-h-80 overflow-auto rounded-lg border border-line">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-surface2 text-muted"><tr><th className="px-3 py-2 font-medium">Form</th><th className="px-3 py-2 font-medium">Item</th><th className="px-3 py-2 font-medium">Label</th><th className="px-3 py-2 font-medium">Type</th></tr></thead>
                  <tbody className="divide-y divide-line">
                    {items.data?.items.map((i, n) => (
                      <tr key={`${i.form}.${i.item}.${n}`}><td className="px-3 py-1.5 font-mono">{i.form}</td><td className="px-3 py-1.5 font-mono">{i.item}</td><td className="px-3 py-1.5">{i.label}</td><td className="px-3 py-1.5 text-muted">{i.data_type}</td></tr>
                    ))}
                    {items.data && items.data.items.length === 0 && <tr><td colSpan={4} className="px-3 py-6 text-center text-muted">Nothing matches.</td></tr>}
                  </tbody>
                </table>
              </div>
              {items.data?.total != null && items.data.total > items.data.items.length && <p className="text-[11px] text-muted">Showing {items.data.items.length} of {items.data.total}. Narrow with a form or search.</p>}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
