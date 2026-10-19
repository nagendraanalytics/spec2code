"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BookPlus, Loader2 } from "lucide-react";
import { kbFromListings } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Button, Card, CardHeader, Field, inputCls } from "@/components/ui/primitives";
import StudyPicker from "@/components/studies/StudyPicker";
import type { Staged } from "./shared";

const SCOPES = [
  { id: "global", label: "Global (all studies)", ref: "" },
  { id: "standard", label: "Standard (listing standard, global)", ref: "" },
  { id: "ta", label: "Therapeutic area", ref: "Therapeutic area, e.g. Oncology" },
  { id: "sponsor", label: "Sponsor", ref: "Sponsor name" },
  { id: "study", label: "Study", ref: "" },
] as const;

/** Saves the selected listings' specifications (never code) as reference knowledge at the chosen scope. */
export default function KnowledgePanel({ selected }: { selected: Staged[] }) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const [scope, setScope] = useState<string>("global");
  const [ref, setRef] = useState("");
  const [version, setVersion] = useState("");
  const [approve, setApprove] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const def = SCOPES.find((s) => s.id === scope)!;
  const needsRef = scope === "ta" || scope === "sponsor" || scope === "study";
  const disabled = busy || selected.length === 0 || (needsRef && !ref.trim());

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const listings = selected.map((s) => ({
        name: s.name,
        reportId: s.spec?.reportId || s.reportId || s.name,
        description: s.spec?.description ?? "",
        columnHeading: s.spec?.columnHeading ?? "",
        logic: s.spec?.logic ?? "",
        reportScenarios: s.spec?.reportScenarios ?? "",
        sorting: s.spec?.sorting ?? "",
        rawText: s.rawText ?? "",
      }));
      const r = await kbFromListings({ listings, scope, scopeRef: ref.trim(), standardVersion: version.trim(), approve }, tenantId);
      const failed = r.results.filter((x) => x.error);
      await qc.invalidateQueries({ queryKey: ["kb"] });
      setMsg({
        ok: r.failed === 0,
        text: `${r.added} saved${r.duplicates ? `, ${r.duplicates} already there` : ""}${r.failed ? `, ${r.failed} failed (${failed.map((f) => `${f.name}: ${f.error}`).join("; ")})` : ""}. ${approve ? "Approved, so they are used right away." : "Saved as drafts: approve them in Knowledge → Review queue."}`,
      });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader title="Use selected listings as knowledge" hint="Saves the specification text of the selected listings so later reviews and code generation can refer to them. No code is stored." />
      <div className="grid gap-4 p-4 md:grid-cols-2">
        <Field label="Where should it apply?">
          <select value={scope} onChange={(e) => { setScope(e.target.value); setRef(""); }} className={inputCls} aria-label="Knowledge scope">
            {SCOPES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </Field>
        {scope === "study" ? (
          <Field label="Study"><StudyPicker value={ref} onChange={setRef} noneLabel="Choose a study" showBadge={false} /></Field>
        ) : needsRef ? (
          <Field label={scope === "ta" ? "Therapeutic area" : "Sponsor"}>
            <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder={def.ref} className={inputCls} />
          </Field>
        ) : scope === "standard" ? (
          <Field label="Standard version (optional)"><input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="e.g. CDASH 2.1" className={inputCls} /></Field>
        ) : <div />}
        <label className="flex items-start gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={approve} onChange={(e) => setApprove(e.target.checked)} className="mt-1" />
          <span>Approve now<span className="block text-xs text-muted">Skip the review queue. Leave off if these listings were drafted by AI and not yet checked.</span></span>
        </label>
        <div className="flex items-center gap-3 md:col-span-2">
          <Button variant="primary" disabled={disabled} onClick={save}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookPlus className="h-4 w-4" />} Save {selected.length} listing{selected.length === 1 ? "" : "s"} as knowledge
          </Button>
          {selected.length === 0 && <span className="text-xs text-muted">Select listings above first.</span>}
        </div>
        {msg && <p className={`text-xs md:col-span-2 ${msg.ok ? "text-good" : "text-bad"}`} role="status">{msg.text}</p>}
      </div>
    </Card>
  );
}
