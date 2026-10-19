"use client";

import { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { kbReviewQueue } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import LibraryTab from "@/components/knowledge/LibraryTab";
import PublicTab from "@/components/knowledge/PublicTab";
import RagTab from "@/components/knowledge/RagTab";
import ReviewTab from "@/components/knowledge/ReviewTab";
import RulesTab from "@/components/knowledge/RulesTab";

type Tab = "library" | "globals" | "sponsor" | "report" | "ta" | "public" | "rules" | "rag" | "review";

export default function KnowledgePage() {
  const { tenantId } = useWorkspace();
  const [tab, setTab] = useState<Tab>("library");
  const queue = useQuery({ queryKey: ["kb", "review", tenantId], queryFn: () => kbReviewQueue(tenantId) });
  const waiting = (queue.data?.sources.length ?? 0) + (queue.data?.rules.length ?? 0);
  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "library", label: "Library" }, { id: "globals", label: "Globals" }, { id: "sponsor", label: "Sponsor knowledge" }, { id: "report", label: "Report knowledge" }, { id: "ta", label: "TA knowledge" }, { id: "public", label: "Public sources" },
    { id: "rules", label: "Rules" }, { id: "rag", label: "RAG store" }, { id: "review", label: "Review queue", badge: waiting },
  ];
  return (
    <div className="mx-auto max-w-[1300px] space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Knowledge</h1>
        <p className="mt-1 text-sm text-muted">
          Standards, protocols, EDC references, SAS programs and history, in any common format. Everything starts as a draft and is only used after a programmer approves it. Studies and metadata live in Study setup.
        </p>
      </div>
      <div role="tablist" aria-label="Knowledge sections" className="flex flex-wrap gap-1 border-b border-line">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={clsx("-mb-px flex items-center gap-2 border-b-2 px-4 py-2 text-sm", tab === t.id ? "border-accent font-medium text-accent" : "border-transparent text-muted hover:text-ink")}>
            {t.label}
            {!!t.badge && <span className="rounded-full bg-warnsoft px-1.5 text-[11px] font-semibold text-warn">{t.badge}</span>}
          </button>
        ))}
      </div>
      {tab === "library" && <LibraryTab mode="all" />}
      {tab === "globals" && <LibraryTab mode="global" />}
      {tab === "sponsor" && <LibraryTab mode="sponsor" />}
      {tab === "report" && <LibraryTab mode="report" />}
      {tab === "ta" && <LibraryTab mode="ta" />}
      {tab === "public" && <PublicTab />}
      {tab === "rules" && <RulesTab />}
      {tab === "rag" && <RagTab />}
      {tab === "review" && <ReviewTab />}
    </div>
  );
}
