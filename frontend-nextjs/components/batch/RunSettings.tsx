"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Rocket } from "lucide-react";
import { createBatch, getModules } from "@/lib/api";
import { useTargets } from "@/lib/usePipeline";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader, Field, inputCls } from "@/components/ui/primitives";
import StudyPicker from "@/components/studies/StudyPicker";
import { TargetPickerView } from "@/components/workspace/TargetPicker";
import type { BatchOptions } from "@/lib/types";
import type { Staged } from "./shared";

const stamp = () => `Batch ${new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`;

export default function RunSettings({
  selected,
  studyId,
  onStudyId,
  onStarted,
}: {
  selected: Staged[];
  studyId: string;
  onStudyId: (v: string) => void;
  onStarted: () => void;
}) {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const modules = useQuery({ queryKey: ["modules", tenantId], queryFn: () => getModules(tenantId) });

  const [name, setName] = useState("");
  const [opts, setOpts] = useState<BatchOptions>({
    language: "cql", edcSystem: "veeva", specType: "edc_cdm_listing", listingType: "", specTemplate: "merck_cdisc_report_library",
    studyId: "", allowUnverified: false, concurrency: 4, runUnderstanding: false, runReview: true, useKnowledge: false,
    onBlocked: "skip", autoRetry: true,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Availability of non-Veeva targets depends on a study having metadata. When every listing names its own
  // study and the batch has none, the first one stands in for the availability check; the server validates each.
  const everyHasOwn = selected.length > 0 && selected.every((s) => s.studyId);
  const effectiveStudy = studyId || (everyHasOwn ? selected[0].studyId : "");
  const targets = useTargets(effectiveStudy);
  const patch = (p: Partial<BatchOptions>) => setOpts((o) => ({ ...o, ...p }));

  const cell = targets.data?.targets.find((t) => t.edcSystem === opts.edcSystem && t.language === opts.language);
  let blockReason: string | null = null;
  if (!selected.length) blockReason = "Select at least one listing.";
  else if (!cell && !targets.isError) blockReason = "Loading targets";
  else if (cell && !cell.available && !cell.optInRequired) blockReason = cell.detail;
  else if (cell?.optInRequired && !opts.allowUnverified) blockReason = "Confirm the unverified target to continue.";

  async function start() {
    setBusy(true);
    setError(null);
    try {
      await createBatch(
        name.trim() || stamp(),
        { ...opts, studyId },
        selected.map((s) => ({ name: s.name, studyId: s.studyId, spec: s.spec, rawText: s.rawText })),
        tenantId,
      );
      await qc.invalidateQueries({ queryKey: ["batches"] });
      setName("");
      onStarted();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader title="Run settings" hint="Applied to every selected listing in this run." />
      <div className="space-y-5 p-4">
        <Field label="Run name">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Study 1234 safety listings" className={inputCls} />
        </Field>

        <div>
          <span className="text-xs font-medium text-muted">Spec type</span>
          <select value={opts.specType} onChange={(e) => patch({ specType: e.target.value, listingType: "" })} className={inputCls} aria-label="Spec type">
            {(modules.data?.modules ?? [{ id: "edc_cdm_listing", label: "EDC / CDM listings", status: "verified" }]).map((m) => (
              <option key={m.id} value={m.id}>{m.label}{m.status === "template" ? " (template)" : ""}</option>
            ))}
          </select>
          {(modules.data?.modules.find((m) => m.id === opts.specType)?.listing_types.length ?? 0) > 0 && (
            <select value={opts.listingType} onChange={(e) => patch({ listingType: e.target.value })} className={inputCls} aria-label="Listing type">
              <option value="">Listing type: not specified</option>
              {modules.data?.modules.find((m) => m.id === opts.specType)?.listing_types.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          )}
        </div>

        <div>
          <span className="text-xs font-medium text-muted">Study metadata for the whole batch</span>
          <StudyPicker value={studyId} onChange={onStudyId} noneLabel="None (set a study per listing, or run without)" />
          <p className="mt-1 text-[11px] text-muted">The study's active version is pinned when the batch starts, so a later upload does not change a run in progress. A listing with its own study (set in the list) uses that instead.</p>
        </div>

        <TargetPickerView
          studyId={effectiveStudy}
          value={opts}
          onChange={(p) => patch(p)}
          allowUnverified={opts.allowUnverified}
          onAllowUnverified={(v) => patch({ allowUnverified: v })}
        />

        <div className="space-y-3 border-t border-line pt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="conc" className="text-xs font-medium text-muted">Listings in parallel</label>
            <Badge tone="accent">{opts.concurrency}</Badge>
          </div>
          <input id="conc" type="range" min={1} max={16} value={opts.concurrency} onChange={(e) => patch({ concurrency: Number(e.target.value) })} className="w-full accent-[var(--accent)]" />
          <p className="text-[11px] text-muted">Higher is faster but sends more model requests at once, which can hit your API rate limit. 4 to 8 is a sensible start.</p>
        </div>

        <div className="space-y-2 border-t border-line pt-4 text-sm">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={opts.runReview} onChange={(e) => patch({ runReview: e.target.checked })} />
            <span>Review each spec first<span className="block text-[11px] text-muted">Catches unclear specs before code is generated.</span></span>
          </label>
          {opts.runReview && (
            <label className="ml-6 block text-xs">
              <span className="text-muted">If a review finds blocking issues</span>
              <select value={opts.onBlocked} onChange={(e) => patch({ onBlocked: e.target.value as BatchOptions["onBlocked"] })} className={inputCls} aria-label="On blocked review">
                <option value="skip">Skip it and mark Needs attention</option>
                <option value="generate">Generate anyway</option>
              </select>
            </label>
          )}
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={!!opts.useKnowledge} onChange={(e) => patch({ useKnowledge: e.target.checked })} aria-label="Use approved knowledge" />
            <span>Use approved knowledge<span className="block text-[11px] text-muted">Adds approved library sources and rules to review and code. Off by default; run the same listings with and without it to compare.</span></span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={opts.runUnderstanding} onChange={(e) => patch({ runUnderstanding: e.target.checked })} />
            <span>Also write a logic walkthrough<span className="block text-[11px] text-muted">One more model call per listing. Stored for review, not used to generate.</span></span>
          </label>
        </div>

        {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        {targets.isError && selected.length > 0 && (
          <p className="text-xs text-warn">The target list could not be checked ({targets.error instanceof Error ? targets.error.message : "unknown error"}). You can still start; the server validates every listing.</p>
        )}
        {blockReason && selected.length > 0 && <p className="text-xs text-muted">{blockReason}</p>}
        <Button variant="primary" className="w-full" disabled={busy || blockReason !== null} onClick={start}>
          {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Rocket size={15} aria-hidden />}
          Start batch{selected.length ? ` (${selected.length} listing${selected.length === 1 ? "" : "s"})` : ""}
        </Button>
        <p className="text-[11px] text-muted">You can change the settings and start another batch while this one runs. Runs are independent.</p>
      </div>
    </Card>
  );
}
