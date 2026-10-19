"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Database, Loader2, Plus } from "lucide-react";
import { createStudy, getEdcSystems } from "@/lib/api";
import { useStudies } from "@/lib/useStudies";
import { useWorkspace } from "@/lib/workspace";
import { Badge, Button, Card, CardHeader, Field, inputCls } from "@/components/ui/primitives";
import StudyDetail from "@/components/studies/StudyDetail";

export default function StudiesPage() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const studies = useStudies();
  const edcs = useQuery({ queryKey: ["edc", tenantId], queryFn: () => getEdcSystems(tenantId) });
  const [selected, setSelected] = useState<string>("");
  const [adding, setAdding] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [ta, setTa] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [edc, setEdc] = useState("veeva");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = studies.data ?? [];
  const active = list.find((s) => s.studyId === selected) ?? null;

  async function create() {
    setBusy(true);
    setError(null);
    try {
      const s = await createStudy(id.trim(), name.trim(), edc, tenantId, ta.trim(), sponsor.trim());
      await qc.invalidateQueries({ queryKey: ["studies"] });
      setSelected(s.studyId);
      setAdding(false);
      setId("");
      setName("");
      setTa("");
      setSponsor("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Study setup</h1>
        <p className="mt-1 text-sm text-muted">
          Load a study's metadata once (items, visits, code lists), then pick the study for a single listing or a whole batch. Generated code then uses the study's real form and item names.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Card className="self-start">
          <CardHeader title={`Studies (${list.length})`} right={<Button variant="secondary" onClick={() => setAdding((v) => !v)}><Plus size={15} aria-hidden /> New</Button>} />
          {adding && (
            <div className="space-y-3 border-b border-line bg-surface2 p-4">
              <Field label="Study ID" hint="Letters, numbers, dot, dash or underscore.">
                <input value={id} onChange={(e) => setId(e.target.value)} className={inputCls} placeholder="e.g. MK-1234-001" />
              </Field>
              <Field label="Name (optional)"><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></Field>
              <Field label="Sponsor (optional)" hint="Selects which sponsor knowledge applies to this study.">
                <input value={sponsor} onChange={(e) => setSponsor(e.target.value)} className={inputCls} placeholder="e.g. Merck" />
              </Field>
              <Field label="Therapeutic area (optional)" hint="Selects which TA knowledge applies to this study.">
                <input value={ta} onChange={(e) => setTa(e.target.value)} className={inputCls} placeholder="e.g. Oncology" />
              </Field>
              <Field label="EDC system">
                <select value={edc} onChange={(e) => setEdc(e.target.value)} className={inputCls} aria-label="EDC system">
                  {(edcs.data?.edcSystems ?? [{ id: "veeva", label: "Veeva Vault CDMS" }]).map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                </select>
              </Field>
              {error && <p className="text-xs text-bad" role="alert">{error}</p>}
              <Button variant="primary" className="w-full" onClick={create} disabled={busy || !id.trim()}>
                {busy && <Loader2 size={15} className="animate-spin" aria-hidden />} Create study
              </Button>
            </div>
          )}
          {list.length === 0 && !adding ? (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accentsoft text-accent"><Database size={20} aria-hidden /></div>
              <p className="text-sm text-muted">No studies yet. Create one, then upload its metadata.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {list.map((s) => (
                <li key={s.studyId}>
                  <button onClick={() => setSelected(s.studyId)} className={`w-full px-4 py-2.5 text-left hover:bg-surface2 ${s.studyId === selected ? "bg-accentsoft" : ""}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-xs font-semibold">{s.studyId}</span>
                      {s.counts ? <Badge tone="good">v{s.activeVersion}</Badge> : <Badge tone="warn">No metadata</Badge>}
                    </div>
                    <div className="truncate text-xs text-muted">{edcs.data?.edcSystems.find((e) => e.id === s.edcSystem)?.label ?? s.edcSystem}{s.counts ? ` · ${s.counts.items} items` : ""}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="min-w-0">
          {active ? (
            <StudyDetail key={active.studyId} studyId={active.studyId} edc={edcs.data?.edcSystems.find((e) => e.id === active.edcSystem)} onDeleted={() => setSelected("")} />
          ) : (
            <Card><p className="px-6 py-16 text-center text-sm text-muted">Select a study to manage its metadata, or create a new one.</p></Card>
          )}
        </div>
      </div>
    </div>
  );
}
