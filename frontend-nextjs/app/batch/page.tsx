"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AddListings from "@/components/batch/AddListings";
import RunSettings from "@/components/batch/RunSettings";
import Runs from "@/components/batch/Runs";
import KnowledgePanel from "@/components/batch/KnowledgePanel";
import PreflightPanel from "@/components/batch/PreflightPanel";
import StagedList from "@/components/batch/Staged";
import type { Staged } from "@/components/batch/shared";
import { useWorkspace } from "@/lib/workspace";
import type { ParsedItem } from "@/lib/types";

export default function BatchPage() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const [items, setItems] = useState<Staged[]>([]);
  const [newestId, setNewestId] = useState<string | undefined>();
  const [batchStudy, setBatchStudy] = useState("");

  const add = (incoming: ParsedItem[]) =>
    setItems((prev) => {
      const have = new Set(prev.map((p) => p.key));
      const fresh = incoming
        .map((i, n) => ({ ...i, key: `${i.source}|${i.name}|${i.reportId}|${n}`, selected: !i.error, studyId: (i.spec?.studyId ?? "").trim() }))
        // adding the same folder twice must not duplicate listings
        .filter((i) => !have.has(i.key) && !prev.some((p) => p.source === i.source && p.name === i.name));
      return [...prev, ...fresh];
    });

  const selected = items.filter((i) => i.selected && !i.error);

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Batch runs</h1>
        <p className="mt-1 text-sm text-muted">
          Run many listings through the pipeline at once. Start several batches side by side, for example the same listings in CQL and in SAS.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-5">
          <AddListings onAdd={add} />
          <StagedList items={items} setItems={setItems} batchStudy={batchStudy} />
          <PreflightPanel selected={selected} batchStudy={batchStudy} />
          <KnowledgePanel selected={selected} />
        </div>
        <div className="lg:sticky lg:top-4 lg:self-start">
          <RunSettings
            selected={selected}
            studyId={batchStudy}
            onStudyId={setBatchStudy}
            onStarted={() => {
              void qc.invalidateQueries({ queryKey: ["batches", tenantId] }).then(() => {
                const list = qc.getQueryData<{ id: string }[]>(["batches", tenantId]);
                setNewestId(list?.[0]?.id);
              });
            }}
          />
        </div>
      </div>

      <Runs newestId={newestId} />
    </div>
  );
}
