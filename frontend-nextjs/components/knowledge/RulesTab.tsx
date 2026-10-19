"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, FlaskConical, Loader2, Plus, Trash2, XCircle } from "lucide-react";
import { deleteRule, kbSources, listRules, ruleAction, ruleBacktest, ruleDryRun, ruleTests, saveRule } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { useStudies } from "@/lib/useStudies";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import type { FiredRule, KbRule, RuleAgent, RuleActionType, RuleDraft, RuleTestResult } from "@/lib/types";
import { errText, scopeLabel, StatusBadge } from "./shared";

const AGENTS: RuleAgent[] = ["extract", "understand", "review", "generate"];
const ACTIONS: { id: RuleActionType; label: string; field: string; hint: string }[] = [
  { id: "prompt", label: "Add an instruction to the agent", field: "text", hint: "Instruction text the agent should follow" },
  { id: "guardrail", label: "Add a guardrail check", field: "text", hint: "What the generated code must satisfy" },
  { id: "pattern", label: "Bind a Tier 1 pattern", field: "pattern", hint: "Name of the pattern or SQL building block" },
  { id: "name_map", label: "Map one name to another", field: "from", hint: "Name to replace" },
];
const csv = (v?: string[]) => (v ?? []).join(", ");
const list = (s: string) => s.split(/[,\n]/).map((x) => x.trim()).filter(Boolean);

type Form = {
  name: string; description: string; scope: "global" | "sponsor" | "ta" | "study" | "report"; scopeRef: string; appliesTo: RuleAgent[];
  edc: string; listingTypes: string; forms: string; language: string; textPattern: string;
  actionType: RuleActionType; actionMain: string; actionTo: string; priority: number; evidenceSourceId: string; evidenceNote: string;
  tests: { logic: string; edcSystem: string; expect: "fires" | "not_fires" }[];
};
const blank: Form = {
  name: "", description: "", scope: "global", scopeRef: "", appliesTo: ["generate"], edc: "", listingTypes: "", forms: "", language: "", textPattern: "",
  actionType: "prompt", actionMain: "", actionTo: "", priority: 100, evidenceSourceId: "", evidenceNote: "", tests: [],
};
const fromRule = (r: KbRule): Form => {
  const a = ACTIONS.find((x) => x.id === r.actionType)!;
  return {
    name: r.name, description: r.description, scope: r.scope, scopeRef: r.scopeRef, appliesTo: r.appliesTo, edc: csv(r.condition.edcSystem),
    listingTypes: csv(r.condition.listingType), forms: csv(r.condition.forms), language: csv(r.condition.language), textPattern: r.condition.textPattern ?? "",
    actionType: r.actionType, actionMain: r.action[a.field] ?? "", actionTo: r.action.to ?? "", priority: r.priority,
    evidenceSourceId: r.evidenceSourceId ?? "", evidenceNote: r.evidenceNote,
    tests: r.tests.map((t) => ({ logic: t.spec.logic ?? "", edcSystem: t.spec.edcSystem ?? "", expect: t.expect })),
  };
};
function toDraft(f: Form): RuleDraft {
  const a = ACTIONS.find((x) => x.id === f.actionType)!;
  const condition: RuleDraft["condition"] = {};
  if (list(f.edc).length) condition.edcSystem = list(f.edc);
  if (list(f.listingTypes).length) condition.listingType = list(f.listingTypes);
  if (list(f.forms).length) condition.forms = list(f.forms);
  if (list(f.language).length) condition.language = list(f.language);
  if (f.textPattern.trim()) condition.textPattern = f.textPattern.trim();
  return {
    name: f.name, description: f.description, scope: f.scope, scopeRef: f.scopeRef, appliesTo: f.appliesTo, condition, actionType: f.actionType,
    action: { [a.field]: f.actionMain, ...(f.actionType === "name_map" ? { to: f.actionTo } : {}) }, priority: f.priority,
    evidenceSourceId: f.evidenceSourceId || null, evidenceNote: f.evidenceNote,
    tests: f.tests.filter((t) => t.logic.trim()).map((t) => ({ spec: { logic: t.logic, ...(t.edcSystem ? { edcSystem: t.edcSystem } : {}) }, expect: t.expect })),
  };
}

export default function RulesTab() {
  const { tenantId } = useWorkspace();
  const qc = useQueryClient();
  const rules = useQuery({ queryKey: ["kb", "rules", tenantId], queryFn: () => listRules(tenantId) });
  const sources = useQuery({ queryKey: ["kb", "sources", tenantId, "", "", "approved", "", ""], queryFn: () => kbSources(tenantId, { status: "approved" }) });
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Form>(blank);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<RuleTestResult[] | null>(null);
  const [back, setBack] = useState<{ checked: number; fired: number; examples: string[] } | null>(null);
  const patch = (p: Partial<Form>) => setForm((f) => ({ ...f, ...p }));
  const refresh = () => qc.invalidateQueries({ queryKey: ["kb"] });

  function open(r: KbRule | null) {
    setEditing(r ? r.id : "new"); setForm(r ? fromRule(r) : blank); setError(null); setTests(null); setBack(null);
  }
  async function guard<T>(label: string, fn: () => Promise<T>): Promise<T | undefined> {
    setBusy(label); setError(null);
    try { return await fn(); }
    catch (e) {
      setError(errText(e));
      const b = (e as { body?: { tests?: RuleTestResult[] } }).body;
      if (b?.tests) setTests(b.tests);
    } finally { setBusy(""); }
  }
  async function save() {
    const r = await guard("save", () => saveRule(editing === "new" ? null : editing, toDraft(form), tenantId));
    if (r) { await refresh(); setEditing(r.id); setForm(fromRule(r)); }
  }
  const act = (id: string) => ({
    approve: async () => { const r = await guard("approve", () => ruleAction(id, "approve", tenantId)); if (r) { setTests(r.testResults ?? null); await refresh(); } },
    retire: async () => { await guard("retire", () => ruleAction(id, "retire", tenantId)); await refresh(); },
    restore: async () => { await guard("restore", () => ruleAction(id, "restore", tenantId)); await refresh(); },
  });
  const current = rules.data?.find((r) => r.id === editing);
  const a = ACTIONS.find((x) => x.id === form.actionType)!;

  return (
    <div className="space-y-5">
      <p className="rounded-lg bg-warnsoft p-3 text-xs text-warn">
        Approved rules are added to the prompts of the chosen agents only when a run has <strong>Use approved knowledge</strong> switched on. Instruction, name-map and guardrail rules are given to the model as instructions; a guardrail rule is a requirement the model is told to meet, <strong>not a check run on the generated code</strong>. Tier 1 pattern rules are recorded but not yet executed.
      </p>
      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="self-start">
          <CardHeader title={`Rules (${rules.data?.length ?? 0})`} right={<Button variant="secondary" onClick={() => open(null)}><Plus size={15} aria-hidden /> New</Button>} />
          <ul className="max-h-[560px] divide-y divide-line overflow-y-auto">
            {rules.data?.map((r) => (
              <li key={r.id}>
                <button onClick={() => open(r)} className={`w-full px-4 py-2.5 text-left hover:bg-surface2 ${editing === r.id ? "bg-accentsoft" : ""}`}>
                  <div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-medium">{r.name}</span><StatusBadge status={r.status} /></div>
                  <div className="truncate text-xs text-muted">{scopeLabel(r.scope, r.scopeRef)} · {r.actionType.replace("_", " ")} · {r.appliesTo.join(", ")}</div>
                </button>
              </li>
            ))}
            {rules.data?.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">No rules yet.</li>}
          </ul>
        </Card>

        {editing ? (
          <Card>
            <CardHeader title={editing === "new" ? "New rule" : `Edit rule (version ${current?.version ?? ""})`} hint="When the condition matches a spec in this scope, the action applies to the chosen agents."
              right={current && <StatusBadge status={current.status} />} />
            <div className="space-y-4 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-muted sm:col-span-2">Name<input value={form.name} onChange={(e) => patch({ name: e.target.value })} className={inputCls} /></label>
                <label className="block text-xs font-medium text-muted">Applies to
                  <select value={form.scope} onChange={(e) => patch({ scope: e.target.value as Form["scope"] })} className={inputCls} aria-label="Rule scope">
                    <option value="global">Global</option><option value="sponsor">One sponsor</option><option value="ta">One therapeutic area</option><option value="study">One study</option><option value="report">One report</option>
                  </select>
                </label>
                {form.scope !== "global" && <label className="block text-xs font-medium text-muted">{form.scope === "report" ? "Report ID" : form.scope === "sponsor" ? "Sponsor" : form.scope === "ta" ? "Therapeutic area" : "Study ID"}<input value={form.scopeRef} onChange={(e) => patch({ scopeRef: e.target.value })} className={inputCls} /></label>}
              </div>
              <fieldset><legend className="text-xs font-medium text-muted">Agents the rule binds to</legend>
                <div className="mt-1 flex flex-wrap gap-3 text-sm">
                  {AGENTS.map((g) => (
                    <label key={g} className="flex items-center gap-1.5"><input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={form.appliesTo.includes(g)}
                      onChange={(e) => patch({ appliesTo: e.target.checked ? [...form.appliesTo, g] : form.appliesTo.filter((x) => x !== g) })} />{g}</label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="rounded-lg border border-line p-3"><legend className="px-1 text-xs font-medium text-muted">When (all that are filled in must match)</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-xs text-muted">EDC systems<input value={form.edc} onChange={(e) => patch({ edc: e.target.value })} className={inputCls} placeholder="veeva, rave" /></label>
                  <label className="block text-xs text-muted">Output languages<input value={form.language} onChange={(e) => patch({ language: e.target.value })} className={inputCls} placeholder="cql, sas" /></label>
                  <label className="block text-xs text-muted">Listing types<input value={form.listingTypes} onChange={(e) => patch({ listingTypes: e.target.value })} className={inputCls} placeholder="teae, ae_listing" /></label>
                  <label className="block text-xs text-muted">Forms mentioned in the spec<input value={form.forms} onChange={(e) => patch({ forms: e.target.value })} className={inputCls} placeholder="DS01, AE" /></label>
                  <label className="block text-xs text-muted sm:col-span-2">Text pattern (regular expression)<input value={form.textPattern} onChange={(e) => patch({ textPattern: e.target.value })} className={`${inputCls} font-mono`} placeholder="deleted|erroneous" /></label>
                </div>
              </fieldset>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-muted">Then
                  <select value={form.actionType} onChange={(e) => patch({ actionType: e.target.value as RuleActionType })} className={inputCls} aria-label="Action type">
                    {ACTIONS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                  </select>
                </label>
                <label className="block text-xs font-medium text-muted">Priority (higher wins when equally specific)<input type="number" value={form.priority} onChange={(e) => patch({ priority: Number(e.target.value) || 0 })} className={inputCls} /></label>
                <label className="block text-xs font-medium text-muted sm:col-span-2">{a.hint}
                  {form.actionType === "prompt" || form.actionType === "guardrail"
                    ? <textarea value={form.actionMain} onChange={(e) => patch({ actionMain: e.target.value })} rows={3} className={inputCls} />
                    : <input value={form.actionMain} onChange={(e) => patch({ actionMain: e.target.value })} className={inputCls} />}
                </label>
                {form.actionType === "name_map" && <label className="block text-xs font-medium text-muted sm:col-span-2">Replace with<input value={form.actionTo} onChange={(e) => patch({ actionTo: e.target.value })} className={inputCls} /></label>}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-muted">Evidence (approved source)
                  <select value={form.evidenceSourceId} onChange={(e) => patch({ evidenceSourceId: e.target.value })} className={inputCls} aria-label="Evidence source">
                    <option value="">None</option>{sources.data?.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </label>
                <label className="block text-xs font-medium text-muted">Evidence note<input value={form.evidenceNote} onChange={(e) => patch({ evidenceNote: e.target.value })} className={inputCls} placeholder="e.g. section 4.2 of the SDTM IG" /></label>
              </div>
              <fieldset className="rounded-lg border border-line p-3"><legend className="px-1 text-xs font-medium text-muted">Example tests (an approval needs them all to pass)</legend>
                <ul className="space-y-2">
                  {form.tests.map((t, i) => (
                    <li key={i} className="grid gap-2 sm:grid-cols-[1fr_120px_130px_auto]">
                      <input value={t.logic} onChange={(e) => patch({ tests: form.tests.map((x, j) => (j === i ? { ...x, logic: e.target.value } : x)) })} className={`${inputCls} mt-0`} placeholder="Spec logic text" aria-label={`Test ${i + 1} logic`} />
                      <input value={t.edcSystem} onChange={(e) => patch({ tests: form.tests.map((x, j) => (j === i ? { ...x, edcSystem: e.target.value } : x)) })} className={`${inputCls} mt-0`} placeholder="EDC (optional)" aria-label={`Test ${i + 1} EDC`} />
                      <select value={t.expect} onChange={(e) => patch({ tests: form.tests.map((x, j) => (j === i ? { ...x, expect: e.target.value as "fires" | "not_fires" } : x)) })} className={`${inputCls} mt-0`} aria-label={`Test ${i + 1} expectation`}>
                        <option value="fires">should fire</option><option value="not_fires">should not fire</option>
                      </select>
                      <button onClick={() => patch({ tests: form.tests.filter((_, j) => j !== i) })} aria-label={`Remove test ${i + 1}`} className="rounded-lg p-2 text-muted hover:bg-surface2"><Trash2 size={15} /></button>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="mt-2" onClick={() => patch({ tests: [...form.tests, { logic: "", edcSystem: "", expect: "fires" }] })}><Plus size={14} aria-hidden /> Add test</Button>
              </fieldset>

              {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
              {tests && (
                <ul className="space-y-1 rounded-lg bg-surface2 p-3 text-xs">
                  {tests.map((t) => <li key={t.n} className="flex items-start gap-2">{t.passed ? <CheckCircle2 size={14} className="mt-0.5 text-good" aria-hidden /> : <XCircle size={14} className="mt-0.5 text-bad" aria-hidden />}<span>Test {t.n}: expected {t.expect.replace("_", " ")}, {t.fired ? "it fired" : "it did not fire"} ({t.why})</span></li>)}
                </ul>
              )}
              {back && <p className="rounded-lg bg-surface2 p-3 text-xs">This rule would fire for <strong>{back.fired}</strong> of {back.checked} specs in the Spec library{back.examples.length ? `, for example ${back.examples.slice(0, 8).join(", ")}` : ""}.</p>}
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" onClick={save} disabled={busy !== ""}>{busy === "save" && <Loader2 size={15} className="animate-spin" aria-hidden />} Save rule</Button>
                {current && <Button variant="secondary" onClick={async () => { const r = await guard("tests", () => ruleTests(current.id, tenantId)); if (r) setTests(r.results); }} disabled={busy !== ""}><FlaskConical size={15} aria-hidden /> Run saved tests</Button>}
                <Button variant="secondary" onClick={async () => { const r = await guard("back", () => ruleBacktest(toDraft(form), tenantId)); if (r) setBack(r); }} disabled={busy !== ""}>Back-test on the Spec library</Button>
                {current && current.status !== "approved" && <Button variant="secondary" onClick={act(current.id).approve} disabled={busy !== ""}>Approve</Button>}
                {current?.status === "approved" && <Button variant="secondary" onClick={act(current.id).retire} disabled={busy !== ""}>Retire</Button>}
                {current?.status === "retired" && <Button variant="secondary" onClick={act(current.id).restore} disabled={busy !== ""}>Back to draft</Button>}
                {current && <Button variant="ghost" className="ml-auto" onClick={async () => { if (window.confirm("Delete this rule?")) { await guard("delete", () => deleteRule(current.id, tenantId)); setEditing(null); await refresh(); } }}><Trash2 size={15} aria-hidden /> Delete</Button>}
              </div>
              <p className="text-[11px] text-muted">Saving an approved rule creates a new version that needs approval again. The back-test uses the specs stored in this app, not your full spec corpus.</p>
            </div>
          </Card>
        ) : (
          <Card><p className="px-6 py-16 text-center text-sm text-muted">Select a rule to edit it, or create a new one.</p></Card>
        )}
      </div>
      <DryRun />
    </div>
  );
}

function DryRun() {
  const { tenantId } = useWorkspace();
  const studies = useStudies();
  const [logic, setLogic] = useState("");
  const [studyId, setStudyId] = useState("");
  const [edc, setEdc] = useState("");
  const [lang, setLang] = useState("");
  const [drafts, setDrafts] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fired, setFired] = useState<FiredRule[] | null>(null);
  const [ta, setTa] = useState("");

  async function run() {
    setBusy(true); setError(null);
    try { const r = await ruleDryRun({ spec: { logic, description: logic }, studyId, edcSystem: edc, language: lang, includeDraft: drafts }, tenantId); setFired(r.fired); setTa(r.ta); }
    catch (e) { setError(errText(e)); } finally { setBusy(false); }
  }
  return (
    <Card>
      <CardHeader title="Dry run" hint="Paste a spec's text and see which rules would fire for it, most specific first." />
      <div className="space-y-3 p-4">
        <textarea value={logic} onChange={(e) => setLogic(e.target.value)} rows={3} className={inputCls} placeholder="Paste the spec's logic or description" aria-label="Spec text for dry run" />
        <div className="grid gap-3 sm:grid-cols-4">
          <select value={studyId} onChange={(e) => setStudyId(e.target.value)} className={`${inputCls} mt-0`} aria-label="Dry run study"><option value="">No study</option>{studies.data?.map((s) => <option key={s.studyId} value={s.studyId}>{s.studyId}</option>)}</select>
          <input value={edc} onChange={(e) => setEdc(e.target.value)} className={`${inputCls} mt-0`} placeholder="EDC system id" />
          <input value={lang} onChange={(e) => setLang(e.target.value)} className={`${inputCls} mt-0`} placeholder="Output language" />
          <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={drafts} onChange={(e) => setDrafts(e.target.checked)} /> Include drafts</label>
        </div>
        <Button variant="primary" onClick={run} disabled={busy || !logic.trim()}>{busy && <Loader2 size={15} className="animate-spin" aria-hidden />} Run</Button>
        {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        {fired && (
          <ul className="divide-y divide-line rounded-lg border border-line">
            {fired.map((r) => (
              <li key={r.id} className="space-y-0.5 px-3 py-2 text-sm">
                <div className="flex flex-wrap items-center gap-2"><span className="font-medium">{r.name}</span><Badge tone="accent">{scopeLabel(r.scope, r.scopeRef)}</Badge><Badge>{r.actionType.replace("_", " ")}</Badge><StatusBadge status={r.status} />
                  {r.overriddenBy && <Badge tone="warn"><AlertTriangle size={11} aria-hidden /> Overridden by {r.overriddenBy}</Badge>}</div>
                <div className="text-xs text-muted">Matched: {r.why}{ta ? ` · TA: ${ta}` : ""}</div>
              </li>
            ))}
            {fired.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No rule fires for this spec.</li>}
          </ul>
        )}
      </div>
    </Card>
  );
}
