"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { getModules } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card } from "@/components/ui/primitives";

export default function Modules() {
  const { tenantId, loadModule } = useWorkspace();
  const router = useRouter();
  const q = useQuery({ queryKey: ["modules", tenantId], queryFn: () => getModules(tenantId) });
  const [open, setOpen] = useState<string | null>(null);
  const total = (q.data?.modules ?? []).reduce((n, m) => n + m.listing_types.length, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Clinical modules</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          One pipeline for any clinical specification. {q.data ? `${q.data.modules.length} families covering ${total} listing types.` : ""} Pick the family that matches your document, optionally narrow it to a listing type, and choose the output language in the workspace.
        </p>
      </div>
      {q.isError && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{String(q.error)}</p>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(q.data?.modules ?? []).map((m) => (
          <Card key={m.id} className="flex flex-col">
            <div className="flex-1 space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-[15px] font-semibold">{m.label}</h2>
                <Badge tone={m.status === "verified" ? "good" : "warn"}>{m.status === "verified" ? "Verified" : "Template"}</Badge>
              </div>
              <p className="text-sm text-muted">{m.summary}</p>
              <div className="text-xs">
                <div className="font-medium text-muted">Typical inputs</div>
                <p>{m.typical_inputs.join(", ")}</p>
              </div>
              <div className="text-xs">
                <div className="font-medium text-muted">Typical outputs</div>
                <p>{m.typical_outputs.join(", ")}</p>
              </div>
              <div>
                <button onClick={() => setOpen(open === m.id ? null : m.id)} aria-expanded={open === m.id} className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                  {open === m.id ? <ChevronDown size={14} aria-hidden /> : <ChevronRight size={14} aria-hidden />}
                  {m.listing_types.length} listing types
                </button>
                {open === m.id && (
                  <ul className="mt-2 space-y-1.5">
                    {m.listing_types.map((t) => (
                      <li key={t.id} className="rounded-lg bg-surface2 px-3 py-2 text-xs">
                        <span className="font-medium">{t.label}</span>
                        <span className="block text-muted">{t.summary}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {m.status !== "verified" && (
                <p className="text-[11px] leading-relaxed text-muted">
                  No real spec and code pair has confirmed this module yet. Output is a draft for programmer review.
                </p>
              )}
            </div>
            <div className="border-t border-line p-3">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  loadModule(m);
                  router.push("/");
                }}
              >
                Start from template <ArrowRight size={15} aria-hidden />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
