"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { kbCatalog, kbCatalogFetch } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader } from "@/components/ui/primitives";
import type { CatalogEntry, CatalogFetchResult } from "@/lib/types";

const SCOPE = { global: "Global", sponsor: "Sponsor", ta: "Therapeutic area", study: "Study", report: "Report" } as const;
const ACCESS = { open: ["good", "Open access"], login: ["bad", "Needs a login"], check: ["warn", "Terms to check"] } as const;

export default function PublicTab() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["kb", "catalog", tenantId], queryFn: () => kbCatalog(tenantId) });
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, CatalogFetchResult>>({});
  const [note, setNote] = useState("");
  const fetchIt = useMutation({
    mutationFn: (ids: string[]) => kbCatalogFetch(ids, tenantId, (() => { try { return localStorage.getItem("s2c.reviewer") ?? ""; } catch { return ""; } })()),
    onSuccess: (r) => {
      setResults((p) => ({ ...p, ...Object.fromEntries(r.results.map((x) => [x.id, x])) }));
      setNote(r.note);
      setPicked({});
      qc.invalidateQueries({ queryKey: ["kb"] });
    },
  });
  const entries = q.data?.entries ?? [];
  const fetchable = entries.filter((e) => e.kind === "file" && !e.inLibrary);
  const chosen = Object.keys(picked).filter((k) => picked[k]);

  const row = (e: CatalogEntry) => {
    const r = results[e.id];
    const [tone, label] = ACCESS[e.access];
    return (
      <li key={e.id} className="space-y-1 px-4 py-3 text-sm" data-testid="catalog-row">
        <div className="flex flex-wrap items-center gap-2">
          {e.kind === "file" && !e.inLibrary && <input type="checkbox" checked={!!picked[e.id]} onChange={(ev) => setPicked({ ...picked, [e.id]: ev.target.checked })} aria-label={`Select ${e.title}`} />}
          <span className="font-medium">{e.title}</span>
          <Badge tone={tone}>{label}</Badge>
          {e.kind === "file" ? <Badge tone="accent">Fetched by the app</Badge> : e.kind === "pack" ? <Badge>Built from GitHub, then uploaded</Badge> : <Badge>Download by hand, then upload</Badge>}
          {e.inLibrary && <Badge tone="good">In your library</Badge>}
          {e.scopeRef && <Badge>{SCOPE[e.scope]}: {e.scopeRef}</Badge>}
        </div>
        <p className="text-xs text-muted">{e.note}</p>
        <p className="text-xs text-muted">
          {e.url ? <a className="text-accent underline" href={e.url} target="_blank" rel="noreferrer">{e.url}</a> : "No link verified. Search for the title."}
          {" · "}{e.verified ? "Link read from an official page" : "Link not verified"}: {e.verifiedHow}
        </p>
        <p className="text-xs text-muted">Terms: {e.licence}</p>
        {r && <p className={r.ok ? "text-xs text-good" : "text-xs text-bad"}>{r.ok ? (r.duplicate ? "Already in the library (same file)." : `Stored as a draft (${r.chunks} chunks).`) : r.error}</p>}
      </li>
    );
  };

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-sm text-muted">
        Public reference material for all listing types. The app fetches the open files itself, from the machine it runs on, which needs internet access. Everything else is listed with where to get it. Fetched files are drafts: review and approve them in the Review queue. Your own studies' protocols and metadata are private and never come from here.
      </p>
      {q.isError && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad">{String(q.error)}</p>}
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setPicked(Object.fromEntries(fetchable.map((e) => [e.id, true])))}>Select all fetchable ({fetchable.length})</Button>
        <Button variant="primary" disabled={!chosen.length || fetchIt.isPending} onClick={() => fetchIt.mutate(chosen)}>{fetchIt.isPending ? "Fetching" : `Fetch ${chosen.length || "selected"}`}</Button>
        {fetchIt.isError && <span className="text-sm text-bad">{String(fetchIt.error)}</span>}
      </div>
      {note && <p className="rounded-lg bg-goodsoft p-2 text-sm text-good">{note}</p>}
      {(["global", "sponsor", "ta", "study", "report"] as const).map((sc) => {
        const list = entries.filter((e) => e.scope === sc);
        return list.length === 0 ? null : (
          <Card key={sc}>
            <CardHeader title={SCOPE[sc]} />
            <ul className="divide-y divide-line">{list.map(row)}</ul>
          </Card>
        );
      })}
      {q.data && <p className="text-xs text-muted">Allowed download hosts: {q.data.hosts.join(", ")}. Add others with SPEC2CODE_FETCH_HOSTS.</p>}
    </div>
  );
}
