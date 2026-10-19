"use client";

import { useEffect } from "react";
import Header from "@/components/workspace/Header";
import SpecEditor from "@/components/workspace/SpecEditor";
import StageTabs, { TABS } from "@/components/workspace/StageTabs";
import { GenerateTab, ReviewTab, UnderstandTab } from "@/components/workspace/Stages";
import { usePipeline } from "@/lib/usePipeline";
import { useWorkspace } from "@/lib/workspace";

export default function Workspace() {
  const { tab, setTab } = useWorkspace();
  const p = usePipeline();

  // Ctrl+Enter runs the pipeline; Ctrl+1..4 switch stage tabs.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === "Enter" && p.canGenerate && !p.busy) {
        e.preventDefault();
        p.runAll();
      }
      const n = Number(e.key);
      if (n >= 1 && n <= TABS.length) {
        e.preventDefault();
        setTab(TABS[n - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [p, setTab]);

  return (
    <div className="mx-auto max-w-[1500px] space-y-4">
      <Header />
      <StageTabs />
      <div role="tabpanel" className="min-w-0">
        {tab === "spec" && <SpecEditor />}
        {tab === "understand" && <UnderstandTab />}
        {tab === "review" && <ReviewTab />}
        {tab === "generate" && <GenerateTab />}
      </div>
    </div>
  );
}
