"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronDown, FileUp, Sparkles, Wand2 } from "lucide-react";
import clsx from "clsx";
import { extractSpec, getModules, parseFiles } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader, Field, inputCls } from "@/components/ui/primitives";
import type { ParsedItem, SpecFields } from "@/lib/types";
import StudyPicker from "@/components/studies/StudyPicker";
import TargetPicker from "./TargetPicker";

const FILE_TYPES = ".xlsx,.csv,.docx,.txt,.md,.json";

async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

type TextKey = "description" | "columnHeading" | "logic" | "reportScenarios" | "sorting";
const FIELDS: [TextKey, string, boolean][] = [
  ["description", "Description", true],
  ["columnHeading", "Output columns", true],
  ["logic", "Logic", true],
  ["reportScenarios", "Scenarios", true],
  ["sorting", "Sorting", false],
];

export default function SpecEditor() {
  const { spec, patchSpec, loadModule, tenantId, setTab } = useWorkspace();
  const modules = useQuery({ queryKey: ["modules", tenantId], queryFn: () => getModules(tenantId) });
  const [rawOpen, setRawOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [notes, setNotes] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [reading, setReading] = useState(false);
  const [choices, setChoices] = useState<ParsedItem[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const current = modules.data?.modules.find((m) => m.id === spec.specType);

  /** Fills the form from a structured listing. Empty values do not wipe what is already there. */
  function applyParsed(item: ParsedItem) {
    const f = (item.spec ?? {}) as Partial<SpecFields>;
    const keys = ["reportId", "description", "columnHeading", "logic", "reportScenarios", "sorting", "studyId"] as const;
    patchSpec(Object.fromEntries(keys.filter((k) => (f[k] ?? "").toString().trim()).map((k) => [k, f[k]])) as Partial<SpecFields>);
    setChoices(null);
    setNotes(null);
    setRawOpen(false);
  }

  async function uploadFile(file: File) {
    setErr(null);
    setChoices(null);
    setReading(true);
    try {
      const r = await parseFiles([{ name: file.name, data: await toBase64(file) }], tenantId);
      const ok = r.items.filter((i) => !i.error);
      if (!ok.length) {
        const why = r.items[0]?.error ?? r.skipped[0]?.reason ?? "no listing found";
        throw new Error(`Could not read ${file.name}: ${why}. Use Excel, CSV, Word (.docx), text, Markdown or JSON.`);
      }
      if (ok.length > 1) return setChoices(ok);
      const one = ok[0];
      if (one.kind === "raw" && one.rawText) {
        setRawText(one.rawText);
        await extract(one.rawText);
      } else applyParsed(one);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setReading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function extract(text: string = rawText) {
    setErr(null);
    setExtracting(true);
    try {
      const r = await extractSpec(text, tenantId);
      patchSpec({
        reportId: r.reportId,
        description: r.description,
        columnHeading: r.columnHeading,
        logic: r.logic,
        reportScenarios: r.reportScenarios,
        sorting: r.sorting,
      });
      setNotes(r.extraction_notes || null);
      setRawOpen(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setExtracting(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0 space-y-4">
      <Card>
        <CardHeader
          title="Specification"
          right={
            <Button variant="ghost" onClick={() => setRawOpen((v) => !v)} aria-expanded={rawOpen}>
              <Wand2 size={14} aria-hidden /> Paste raw text
              <ChevronDown size={14} className={clsx("transition", rawOpen && "rotate-180")} aria-hidden />
            </Button>
          }
        />
        {rawOpen && (
          <div className="space-y-2 border-b border-line bg-surface2 p-4">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={6}
              placeholder="Paste unstructured spec text from Word, email or a PDF"
              className={clsx(inputCls, "font-mono text-xs")}
            />
            <div className="flex items-center gap-3">
              <input ref={fileRef} type="file" accept={FILE_TYPES} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadFile(f); }} aria-label="Upload spec file" />
              <Button variant="secondary" onClick={() => fileRef.current?.click()} disabled={reading || extracting}>
                <FileUp size={14} aria-hidden /> {reading ? "Reading file" : "Upload spec file"}
              </Button>
              <span className="text-[11px] text-muted">Excel, CSV, Word (.docx), text, Markdown or JSON</span>
              <Button variant="primary" className="ml-auto" onClick={() => extract()} disabled={extracting || !rawText.trim()}>
                {extracting ? "Extracting" : "Extract fields"}
              </Button>
            </div>
            {err && <p className="text-xs text-bad" role="alert">{err}</p>}
            {choices && (
              <div className="rounded-lg border border-line bg-surface p-3">
                <p className="text-xs">This file has {choices.length} listings. Pick the one to work on here, or use <a href="/batch/" className="text-accent hover:underline">Batch runs</a> to run them all.</p>
                <ul className="mt-2 max-h-48 divide-y divide-line overflow-y-auto text-sm">
                  {choices.map((c, n) => (
                    <li key={n} className="flex items-center gap-3 py-1.5">
                      <span className="font-mono text-xs font-semibold">{c.reportId || `Row ${n + 1}`}</span>
                      <span className="min-w-0 flex-1 truncate text-xs text-muted">{c.spec?.description || c.name}</span>
                      <Button variant="secondary" onClick={async () => { if (c.kind === "raw" && c.rawText) { setChoices(null); setRawText(c.rawText); await extract(c.rawText); } else applyParsed(c); }}>Use</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {notes && <p className="border-b border-line bg-warnsoft px-4 py-2 text-xs text-warn">{notes}</p>}
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Report ID">
              <input value={spec.reportId} onChange={(e) => patchSpec({ reportId: e.target.value })} className={inputCls} placeholder="e.g. SAF_001" />
            </Field>
            <div>
              <span className="text-xs font-medium text-muted">Study</span>
              <StudyPicker value={spec.studyId} onChange={(v) => patchSpec({ studyId: v })} />
            </div>
          </div>
          {FIELDS.map(([key, label, multi]) => (
            <Field key={key} label={label}>
              {multi ? (
                <textarea value={spec[key]} onChange={(e) => patchSpec({ [key]: e.target.value })} rows={key === "logic" ? 5 : 3} className={inputCls} />
              ) : (
                <input value={spec[key]} onChange={(e) => patchSpec({ [key]: e.target.value })} className={inputCls} />
              )}
            </Field>
          ))}
        </div>
      </Card>


        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted">{!spec.reportId.trim() || !spec.description.trim() ? "Add a report ID and description to continue." : "Ready. Run the whole pipeline from the header, or one stage at a time."}</p>
          <Button variant="primary" onClick={() => setTab("understand")} disabled={!spec.reportId.trim() || !spec.description.trim()}>
            Continue to Understand <ArrowRight size={15} aria-hidden />
          </Button>
        </div>
      </div>
      <div className="min-w-0 space-y-4">
      <Card>
        <CardHeader title="Spec type" hint="What kind of clinical specification is this?" />
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Spec type">
            {(modules.data?.modules ?? []).map((m) => (
              <button
                key={m.id}
                role="radio"
                aria-checked={m.id === spec.specType}
                onClick={() => patchSpec({ specType: m.id })}
                className={clsx(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  m.id === spec.specType ? "border-accent bg-accentsoft text-accent" : "border-line bg-surface text-muted hover:text-ink",
                )}
              >
                {m.label}
              </button>
            ))}
            {modules.isError && <span className="text-xs text-bad">Could not load spec types.</span>}
          </div>
          {current && current.listing_types.length > 0 && (
            <label className="block">
              <span className="text-xs font-medium text-muted">Listing type <span className="font-normal">(optional, sharpens the generator)</span></span>
              <select
                value={spec.listingType}
                onChange={(e) => patchSpec({ listingType: e.target.value })}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
                aria-label="Listing type"
              >
                <option value="">Not specified</option>
                {current.listing_types.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              {spec.listingType && (
                <span className="mt-1 block text-[11px] text-muted">{current.listing_types.find((t) => t.id === spec.listingType)?.summary}</span>
              )}
            </label>
          )}
          {current && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <Badge tone={current.status === "verified" ? "good" : "warn"}>
                {current.status === "verified" ? "Verified module" : "Template module"}
              </Badge>
              <span>{current.summary}</span>
              <button onClick={() => loadModule(current)} className="ml-auto inline-flex items-center gap-1 font-medium text-accent hover:underline">
                <Sparkles size={13} aria-hidden /> Load example spec
              </button>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <TargetPicker />
        </div>
      </Card>
      <Card>
        <label className="flex cursor-pointer items-start gap-3 p-4 text-sm">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={!!spec.useKnowledge} onChange={(e) => patchSpec({ useKnowledge: e.target.checked })} aria-label="Use approved knowledge" />
          <span>
            <span className="font-medium">Use approved knowledge</span>
            <span className="block text-xs text-muted">Adds approved library sources and rules (global, this study's therapeutic area, this study) to the understanding, review and code steps. The spec stays authoritative. Off by default so you can compare. <a href="/knowledge/" className="text-accent hover:underline">Manage knowledge</a></span>
          </span>
        </label>
      </Card>
      </div>
    </div>
  );
}
