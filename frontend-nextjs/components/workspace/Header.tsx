"use client";

import { AlertTriangle, Loader2, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getModules } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { usePipeline } from "@/lib/usePipeline";
import { Badge, Button, Card } from "@/components/ui/primitives";

export default function Header() {
  const { spec, tenantId, error, review, stages } = useWorkspace();
  const p = usePipeline();
  const modules = useQuery({ queryKey: ["modules", tenantId], queryFn: () => getModules(tenantId) });
  const moduleLabel = modules.data?.modules.find((m) => m.id === spec.specType)?.label ?? spec.specType;
  const lang = p.cell?.languageLabel ?? spec.language.toUpperCase();
  const blocked = stages.review === "blocked";

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-semibold tracking-tight">{spec.reportId.trim() || "Untitled spec"}</h1>
            <Badge tone="accent">{moduleLabel}</Badge>
            <Badge tone={p.cell?.coverage === "full" ? "good" : p.cell?.coverage === "rules_only" ? "accent" : "warn"}>
              {lang}
              {p.cell?.coverage === "draft" ? " · unverified" : p.cell?.coverage === "rules_only" ? " · rules only" : ""}
            </Badge>
          </div>
          <p className="mt-0.5 truncate text-xs text-muted">{spec.description.trim() || "Describe a clinical specification in the Spec tab."}</p>
        </div>
        <div className="flex items-center gap-2">
          {blocked && review && (
            <Button variant="warn" onClick={() => p.generate(review.specId).catch(() => {})} disabled={p.busy || !p.canGenerate}>
              <AlertTriangle size={15} aria-hidden /> Generate anyway
            </Button>
          )}
          <Button variant="primary" onClick={p.runAll} disabled={p.busy || !p.canGenerate} title={p.blockReason ?? "Ctrl+Enter"}>
            {p.busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Play size={15} aria-hidden />}
            Run pipeline
          </Button>
        </div>
      </div>
      {p.blockReason && !p.busy && <p className="border-t border-line px-4 py-2 text-xs text-muted">{p.blockReason}</p>}
      {error && (
        <p role="alert" className="border-t border-line bg-badsoft px-4 py-3 text-xs text-bad">
          {error}
        </p>
      )}
    </Card>
  );
}
