import { Badge } from "@/components/ui/primitives";
import type { KbShadow } from "@/lib/types";

const SCOPE = { global: "Global", sponsor: "Sponsor", ta: "TA", study: "Study", report: "Report" } as const;

/** What the knowledge base contributed to a result: used, not used, or only previewed. */
export default function KnowledgeUsed({ k }: { k?: KbShadow | null }) {
  if (!k || k.error) return null;
  const empty = k.sources.length === 0 && k.rules.length === 0 && !(k.skipped?.length);
  if (k.mode === "shadow" && empty) return null;
  const title = k.mode === "applied" ? "Knowledge used" : k.mode === "not_used" ? "Knowledge not used" : "Knowledge preview (not used)";
  return (
    <div className="space-y-2 rounded-lg border border-line bg-surface2 p-3 text-xs" data-testid="knowledge-used">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">{title}</span>
        {k.mode === "applied" && <Badge tone="good">{k.sources.length} source{k.sources.length === 1 ? "" : "s"} · {k.rules.length} rule{k.rules.length === 1 ? "" : "s"}</Badge>}
        {k.ta ? <Badge>TA: {k.ta}</Badge> : null}
      </div>
      {k.note && <p className="text-muted">{k.note}</p>}
      {k.sources.length > 0 && (
        <ul className="space-y-1">{k.sources.map((s, i) => (
          <li key={i}><span className="font-medium">{s.title}</span>{s.heading ? <span className="text-muted"> · {s.heading}</span> : null} <Badge>{SCOPE[s.scope]}</Badge></li>
        ))}</ul>
      )}
      {k.rules.length > 0 && (
        <ul className="space-y-1 border-t border-line pt-2">{k.rules.map((r) => (
          <li key={r.id}><span className="font-medium">{r.name}</span> <Badge tone="accent">{r.actionType.replace("_", " ")}</Badge></li>
        ))}</ul>
      )}
      {!!k.skipped?.length && (
        <details className="text-muted"><summary className="cursor-pointer">Left out ({k.skipped.length})</summary>
          <ul className="mt-1 space-y-0.5">{k.skipped.map((s, i) => <li key={i}>{s.name}: {s.reason}</li>)}</ul></details>
      )}
    </div>
  );
}
