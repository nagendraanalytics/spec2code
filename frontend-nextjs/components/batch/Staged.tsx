"use client";

import { useMemo, useState } from "react";
import { AlertCircle, FileText, Search, Trash2 } from "lucide-react";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import StudyPicker from "@/components/studies/StudyPicker";
import { useStudies } from "@/lib/useStudies";
import type { Staged } from "./shared";

export default function StagedList({
  items,
  setItems,
  batchStudy,
}: {
  items: Staged[];
  setItems: (fn: (prev: Staged[]) => Staged[]) => void;
  batchStudy: string;
}) {
  const [q, setQ] = useState("");
  const [assign, setAssign] = useState("");
  const studies = useStudies();
  const overridden = items.filter((i) => i.studyId).length;
  const dupIds = useMemo(() => {
    const seen = new Map<string, number>();
    items.forEach((i) => seen.set(i.reportId, (seen.get(i.reportId) ?? 0) + 1));
    return new Set([...seen].filter(([, n]) => n > 1).map(([id]) => id));
  }, [items]);

  const shown = items.filter((i) => !q || `${i.reportId} ${i.name}`.toLowerCase().includes(q.toLowerCase()));
  const selectable = shown.filter((i) => !i.error);
  const allShownSelected = selectable.length > 0 && selectable.every((i) => i.selected);
  const selectedCount = items.filter((i) => i.selected && !i.error).length;

  const setStudy = (key: string, studyId: string) => setItems((p) => p.map((i) => (i.key === key ? { ...i, studyId } : i)));
  const assignChecked = (studyId: string) =>
    setItems((p) => p.map((i) => (i.selected && !i.error ? { ...i, studyId } : i)));

  const toggle = (key: string) => setItems((p) => p.map((i) => (i.key === key ? { ...i, selected: !i.selected } : i)));
  const setShown = (v: boolean) => {
    const keys = new Set(selectable.map((i) => i.key));
    setItems((p) => p.map((i) => (keys.has(i.key) ? { ...i, selected: v } : i)));
  };

  return (
    <Card>
      <CardHeader
        title={`Listings in this batch (${items.length})`}
        hint={items.length ? `${selectedCount} selected to run` : "Nothing added yet."}
        right={
          items.length > 0 && (
            <div className="flex gap-1">
              <Button variant="ghost" onClick={() => setItems((p) => p.filter((i) => !i.selected))} disabled={!items.some((i) => i.selected)} title="Remove the checked listings from this list">
                <Trash2 size={15} aria-hidden /> Remove checked
              </Button>
              <Button variant="ghost" onClick={() => setItems(() => [])}>Clear all</Button>
            </div>
          )
        }
      />
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accentsoft text-accent"><FileText size={20} aria-hidden /></div>
          <p className="text-sm text-muted">Add a folder or files above. You can untick listings you do not want to run.</p>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={allShownSelected} onChange={(e) => setShown(e.target.checked)} />
              {q ? "Select shown" : "Select all"}
            </label>
            <div className="relative ml-auto w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by ID or file" className={`${inputCls} mt-0 py-1.5 pl-8`} aria-label="Filter listings" />
            </div>
          </div>
          <div className="rounded-lg bg-surface2 p-3">
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-[220px] flex-1">
                <span className="text-xs font-medium text-muted">Study for the checked listings</span>
                <StudyPicker value={assign} onChange={setAssign} showBadge={false} noneLabel="Use the batch study" label="Study for checked listings" />
              </div>
              <Button variant="secondary" disabled={!selectedCount} onClick={() => assignChecked(assign)}>
                Apply to {selectedCount} checked
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-muted">
              {overridden
                ? `${overridden} listing${overridden === 1 ? " has its own study" : "s have their own study"}. The rest use ${batchStudy || "no study"}.`
                : batchStudy ? `All listings use ${batchStudy}. Give a listing its own study here when it belongs to a different one.` : "Pick a study in the run settings for the whole batch, or give listings their own study here."}
            </p>
          </div>
          <ul className="max-h-[420px] divide-y divide-line overflow-y-auto rounded-lg border border-line">
            {shown.map((i) => (
              <li key={i.key}>
                <label className={`flex items-center gap-3 px-3 py-2 text-sm ${i.error ? "opacity-70" : "cursor-pointer hover:bg-surface2"}`}>
                  <input type="checkbox" className="h-4 w-4 shrink-0 accent-[var(--accent)]" disabled={!!i.error} checked={i.selected && !i.error} onChange={() => toggle(i.key)} />
                  <span className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-semibold">{i.reportId}</span>
                    <span className="block truncate text-xs text-muted">{i.name}</span>
                  </span>
                  {i.error ? (
                    <Badge tone="bad" title={i.error}><AlertCircle size={11} aria-hidden /> {i.error.length > 28 ? "Unreadable" : i.error}</Badge>
                  ) : i.kind === "raw" ? (
                    <Badge tone="accent" title="Free text. The model reads it into fields when the run starts.">Free text</Badge>
                  ) : (
                    <Badge tone="good">Structured</Badge>
                  )}
                  {!i.error && (
                    <select
                      value={i.studyId}
                      onClick={(e) => e.preventDefault()}
                      onChange={(e) => setStudy(i.key, e.target.value)}
                      className="max-w-[150px] rounded-md border border-line bg-surface px-1.5 py-0.5 text-[11px]"
                      aria-label={`Study for ${i.reportId}`}
                      title="Study for this listing"
                    >
                      <option value="">{batchStudy ? `Batch: ${batchStudy}` : "No study"}</option>
                      {i.studyId && !studies.data?.some((s) => s.studyId === i.studyId) && <option value={i.studyId}>{i.studyId} (no metadata)</option>}
                      {studies.data?.map((s) => <option key={s.studyId} value={s.studyId}>{s.studyId}</option>)}
                    </select>
                  )}
                  {dupIds.has(i.reportId) && <Badge tone="warn" title="Another listing has the same report ID">Duplicate ID</Badge>}
                </label>
              </li>
            ))}
            {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No listing matches the filter.</li>}
          </ul>
        </div>
      )}
    </Card>
  );
}
