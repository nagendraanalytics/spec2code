"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealth } from "@/lib/api";
import { useTargets } from "@/lib/usePipeline";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Card, CardHeader } from "@/components/ui/primitives";
import type { Target } from "@/lib/types";

type Status = "Built" | "Partial" | "Shadow" | "Planned";
const TONE = { Built: "good", Partial: "accent", Shadow: "neutral", Planned: "warn" } as const;

const LAYERS: { name: string; items: { title: string; body: string; status: Status }[] }[] = [
  {
    name: "Experience",
    items: [
      { title: "Spec workspace", body: "Spec, logic walkthrough, review and code in one screen", status: "Built" },
      { title: "Clinical modules", body: "Starting templates per spec type", status: "Built" },
      { title: "Spec library", body: "History of specs and generation runs", status: "Built" },
      { title: "Review console", body: "Diff, comments and programmer sign-off", status: "Planned" },
    ],
  },
  {
    name: "API and orchestration",
    items: [
      { title: "FastAPI service", body: "Tenant-scoped REST API", status: "Built" },
      { title: "LangGraph orchestrator", body: "Rules, retrieval, generation and guardrails as one graph", status: "Built" },
      { title: "Authentication and roles", body: "SSO and role-based access", status: "Planned" },
      { title: "Job queue", body: "Long runs outside the request", status: "Planned" },
    ],
  },
  {
    name: "Intelligence",
    items: [
      { title: "Tier 1 rules", body: "Deterministic patterns bound before any model call", status: "Built" },
      { title: "Claude reasoning", body: "Forced tool-use steps for understanding and generation", status: "Built" },
      { title: "Precedent retrieval", body: "Verified examples as few-shot context", status: "Built" },
      { title: "ML tier", body: "Classifier observing in shadow mode only", status: "Shadow" },
    ],
  },
  {
    name: "Platform",
    items: [
      { title: "Relational store", body: "SQLite locally, Postgres through DATABASE_URL", status: "Partial" },
      { title: "Masking and audit", body: "Identifier masking and a database audit trail", status: "Partial" },
      { title: "Kubernetes manifests", body: "Deployment, service and ingress", status: "Built" },
      { title: "Object storage", body: "Specs, runs and exports as files", status: "Planned" },
    ],
  },
];

const LANGS = ["cql", "sql", "sas", "r", "python"];

function Cell({ t }: { t?: Target }) {
  if (!t) return <span className="text-muted">-</span>;
  if (t.coverage === "rules_only") return <Badge tone="accent" title={t.detail}>Rules only</Badge>;
  if (t.status === "verified" || t.status === "built") return <Badge tone="good" title={t.detail}>Verified</Badge>;
  if (t.status === "unverified_beta") return <Badge tone="warn" title={t.detail}>Unverified</Badge>;
  return <Badge title={t.detail}>Unavailable</Badge>;
}

export default function Platform() {
  const { tenantId } = useWorkspace();
  const targets = useTargets();
  const health = useQuery({ queryKey: ["health", tenantId], queryFn: () => getHealth(tenantId) });
  const all = targets.data?.targets ?? [];
  const edc = Array.from(new Map(all.map((t) => [t.edcSystem, t.edcLabel])).entries());

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Platform</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          How Spec2Code is put together and what is real today. Status labels come from the repository, not from the roadmap.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Solution architecture"
          hint="One pipeline serves every spec type and every output language."
          right={health.data ? <Badge tone="good">API online</Badge> : health.isError ? <Badge tone="bad">API offline</Badge> : null}
        />
        <div className="space-y-3 p-4">
          {LAYERS.map((layer) => (
            <div key={layer.name} className="grid gap-3 md:grid-cols-[150px_1fr]">
              <div className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted">{layer.name}</div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {layer.items.map((i) => (
                  <div key={i.title} className="rounded-lg border border-line p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium">{i.title}</div>
                      <Badge tone={TONE[i.status]}>{i.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted">{i.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Output languages" hint="Straight from the backend registry. Unverified targets need an explicit confirmation before they run." />
        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="pb-2 font-medium">EDC system</th>
                {LANGS.map((l) => (
                  <th key={l} className="pb-2 font-medium uppercase">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {edc.map(([id, label]) => (
                <tr key={id} className="border-t border-line">
                  <td className="py-2 pr-3 font-medium">{label}</td>
                  {LANGS.map((l) => (
                    <td key={l} className="py-2"><Cell t={all.find((t) => t.edcSystem === id && t.language === l)} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {targets.isError && <p className="mt-3 text-xs text-bad">{String(targets.error)}</p>}
        </div>
      </Card>
    </div>
  );
}
