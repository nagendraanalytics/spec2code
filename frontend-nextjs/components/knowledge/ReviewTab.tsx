"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { kbAction, kbReviewQueue, ruleAction } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader } from "@/components/ui/primitives";
import { DOC_TYPE_LABEL } from "@/lib/types";
import SourceDrawer from "./SourceDrawer";
import { errText, extractBadge, scopeLabel } from "./shared";

export default function ReviewTab() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["kb", "review", tenantId], queryFn: () => kbReviewQueue(tenantId) });
  const [open, setOpen] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const done = () => qc.invalidateQueries({ queryKey: ["kb"] });
  const approveSource = useMutation({ mutationFn: (id: string) => kbAction(id, "approve", tenantId), onSuccess: done, onError: (e) => setError(errText(e)) });
  const approveRule = useMutation({
    mutationFn: (id: string) => ruleAction(id, "approve", tenantId), onSuccess: done,
    onError: (e) => setError(errText(e) + " Open the Rules tab to see which tests fail."),
  });
  const d = q.data;
  const empty = d && d.sources.length === 0 && d.rules.length === 0;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Review queue" hint="Nothing here influences a run until a programmer approves it. Open a source to check what was read before approving." />
        {error && <p className="m-4 rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        {empty && (
          <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-goodsoft text-good"><CheckCircle2 size={20} aria-hidden /></div>
            <p className="text-sm text-muted">Nothing is waiting for review.</p>
          </div>
        )}
        {d && d.sources.length > 0 && (
          <>
            <h3 className="border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">Documents ({d.sources.length})</h3>
            <ul className="divide-y divide-line">
              {d.sources.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center gap-3 px-4 py-2.5">
                  <button onClick={() => setOpen(s.id)} className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-medium">{s.title}</span>
                    <span className="block truncate text-xs text-muted">{s.filename} · {s.chunks} chunks · {s.docTypeReason}</span>
                  </button>
                  <Badge>{DOC_TYPE_LABEL[s.docType]}</Badge><Badge tone="accent">{scopeLabel(s.scope, s.scopeRef)}</Badge>{extractBadge(s)}
                  <Button variant="secondary" onClick={() => setOpen(s.id)}>Inspect</Button>
                  <Button variant="primary" disabled={s.extractStatus !== "ok" || approveSource.isPending} onClick={() => { setError(null); approveSource.mutate(s.id); }}><ClipboardCheck size={15} aria-hidden /> Approve</Button>
                </li>
              ))}
            </ul>
          </>
        )}
        {d && d.rules.length > 0 && (
          <>
            <h3 className="border-y border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">Rules ({d.rules.length})</h3>
            <ul className="divide-y divide-line">
              {d.rules.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{r.name}</span>
                    <span className="block truncate text-xs text-muted">{r.actionType.replace("_", " ")} · {r.appliesTo.join(", ")} · {r.tests.length} test{r.tests.length === 1 ? "" : "s"}</span>
                  </span>
                  <Badge tone="accent">{scopeLabel(r.scope, r.scopeRef)}</Badge>
                  <Button variant="primary" disabled={approveRule.isPending} onClick={() => { setError(null); approveRule.mutate(r.id); }}><ClipboardCheck size={15} aria-hidden /> Approve</Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
      {open && <SourceDrawer id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
