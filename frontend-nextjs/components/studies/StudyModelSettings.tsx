"use client";

/*
 * StudyModelSettings -- per-study "Generation model" card for the Study setup page.
 * Mounted in StudyDetail.tsx between the study card and the Versions card.
 *
 * Needs (not in the codebase yet):
 *   "@/lib/types"  : ModelConfig, ProviderInfo, and `modelConfig?: ModelConfig | null` on the study type
 *   "@/lib/api"    : getModelProviders(tenantId) -> { providers: ProviderInfo[] }
 *                    patchStudy(studyId, { modelConfig }, tenantId)   (existing function; backend must accept modelConfig)
 *
 *   export type ModelConfig = {
 *     provider: "claude" | "gemini" | "gpt";
 *     model?: string;
 *     maxTokens?: number;
 *     stepModels?: Record<string, { provider?: string; model?: string }>;
 *   };
 *   export type ProviderInfo = {
 *     id: "claude" | "gemini" | "gpt";
 *     label: string;
 *     enabled: boolean;        // allowed on this deployment (CQLGEN_ALLOWED_PROVIDERS)
 *     keyConfigured: boolean;  // the server has the API key; keys never reach the browser
 *     models: { id: string; label: string }[];   // suggestions only
 *     note?: string;           // e.g. "Testing only - not approved for client data"
 *   };
 *
 * The backend maps stepModels -> step_models and maxTokens -> max_tokens, runs
 * validate_model_config(), and returns its message as the error text.
 */

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getModelProviders, patchStudy } from "@/lib/api";
import type { ModelConfig, ProviderInfo } from "@/lib/types";
import { Badge, Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";

const STEPS: { id: string; label: string }[] = [
  { id: "domains", label: "Domains" },
  { id: "columns", label: "Columns" },
  { id: "joins", label: "Joins" },
  { id: "filters", label: "Filters" },
  { id: "edge_cases", label: "Edge cases" },
  { id: "self_check", label: "Self-check" },
  { id: "synthesis", label: "Synthesis (final CQL)" },
];

type StepRow = { provider: string; model: string };

// Shown when the server's provider list can't be loaded (for example the endpoint is not deployed yet).
// The server still validates the choice on save.
const FALLBACK_PROVIDERS: ProviderInfo[] = [
  { id: "claude", label: "Claude", enabled: true, keyConfigured: true, models: [] },
  { id: "gemini", label: "Gemini", enabled: true, keyConfigured: true, models: [] },
  { id: "gpt", label: "GPT", enabled: true, keyConfigured: true, models: [] },
];

export default function StudyModelSettings({
  studyId,
  tenantId,
  value,
}: {
  studyId: string;
  tenantId: string;
  value: ModelConfig | null;
}) {
  const qc = useQueryClient();
  const providers = useQuery({ queryKey: ["model-providers", tenantId], queryFn: () => getModelProviders(tenantId) });
  const list = providers.data?.providers?.length ? providers.data.providers : FALLBACK_PROVIDERS;

  const [provider, setProvider] = useState<string>(value?.provider ?? "claude");
  const [model, setModel] = useState<string>(value?.model ?? "");
  const [steps, setSteps] = useState<Record<string, StepRow>>(() =>
    Object.fromEntries(
      Object.entries(value?.stepModels ?? {}).map(([k, v]) => [k, { provider: v.provider ?? "", model: v.model ?? "" }]),
    ),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const current = list.find((p) => p.id === provider);

  function buildConfig(): ModelConfig {
    const stepModels: NonNullable<ModelConfig["stepModels"]> = {};
    for (const [step, row] of Object.entries(steps)) {
      if (!row.provider && !row.model.trim()) continue;
      stepModels[step] = {
        ...(row.provider ? { provider: row.provider } : {}),
        ...(row.model.trim() ? { model: row.model.trim() } : {}),
      };
    }
    return {
      provider: provider as ModelConfig["provider"],
      ...(model.trim() ? { model: model.trim() } : {}),
      ...(Object.keys(stepModels).length ? { stepModels } : {}),
    };
  }

  const cfg = buildConfig();
  const dirty = JSON.stringify(cfg) !== JSON.stringify(value ?? { provider: "claude" });

  function setStep(step: string, patch: Partial<StepRow>) {
    setSaved(false);
    setSteps((s) => ({ ...s, [step]: { provider: "", model: "", ...s[step], ...patch } }));
  }

  async function save() {
    setError(null);
    setSaved(false);
    // A step on a different provider needs its own model id (ids don't carry across providers).
    for (const [step, row] of Object.entries(steps)) {
      if (row.provider && row.provider !== provider && !row.model.trim()) {
        setError(`Step "${step}" uses a different provider, so it needs its own model id.`);
        return;
      }
    }
    setBusy(true);
    try {
      await patchStudy(studyId, { modelConfig: cfg }, tenantId);
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["studies"] }),
        qc.invalidateQueries({ queryKey: ["study", studyId] }),
      ]);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader
        title="Generation model"
        hint="Which AI model generates code for this study. Runs record the model they used, so changing it later does not alter past results."
        right={current ? <Badge tone={current.keyConfigured ? "good" : "warn"}>{current.label}</Badge> : undefined}
      />
      <div className="space-y-4 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-medium text-muted">Provider
            <select
              value={provider}
              onChange={(e) => { setProvider(e.target.value); setModel(""); setSaved(false); }}
              className={inputCls}
              aria-label="Provider"
            >
              {list.map((p) => (
                <option key={p.id} value={p.id} disabled={!p.enabled || !p.keyConfigured}>
                  {p.label}{!p.enabled ? " (not enabled)" : !p.keyConfigured ? " (no API key on server)" : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-muted">Model
            <input
              value={model}
              onChange={(e) => { setModel(e.target.value); setSaved(false); }}
              list={`models-${provider}`}
              className={inputCls}
              placeholder={provider === "claude" ? "Default model" : "Model id (required)"}
              aria-label="Model"
            />
            <datalist id={`models-${provider}`}>
              {(current?.models ?? []).map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </datalist>
            <span className="mt-1 block font-normal">Pick a suggestion or type a model id.</span>
          </label>
        </div>

        {providers.isError && (
          <p className="rounded-lg bg-warnsoft p-3 text-xs text-warn" role="alert">
            Could not load the provider list ({providers.error instanceof Error ? providers.error.message : String(providers.error)}).
            Showing all providers; the server checks your choice when you save.
          </p>
        )}
        {current?.note && <p className="rounded-lg bg-warnsoft p-3 text-xs text-warn" role="note">{current.note}</p>}

        <details className="rounded-lg border border-line">
          <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium">Advanced: different model for specific steps</summary>
          <div className="space-y-2 border-t border-line p-3">
            <p className="text-xs text-muted">Leave a step on "Same as study" to use the model above.</p>
            {STEPS.map((s) => (
              <div key={s.id} className="grid items-center gap-2 sm:grid-cols-[150px_150px_minmax(0,1fr)]">
                <span className="text-sm">{s.label}</span>
                <select
                  value={steps[s.id]?.provider ?? ""}
                  onChange={(e) => setStep(s.id, { provider: e.target.value })}
                  className={`${inputCls} mt-0`}
                  aria-label={`${s.label} provider`}
                >
                  <option value="">Same as study</option>
                  {list.map((p) => (
                    <option key={p.id} value={p.id} disabled={!p.enabled || !p.keyConfigured}>{p.label}</option>
                  ))}
                </select>
                <input
                  value={steps[s.id]?.model ?? ""}
                  onChange={(e) => setStep(s.id, { model: e.target.value })}
                  className={`${inputCls} mt-0`}
                  placeholder="Model id (optional)"
                  aria-label={`${s.label} model`}
                />
              </div>
            ))}
          </div>
        </details>

        {error && <p className="rounded-lg bg-badsoft p-3 text-sm text-bad" role="alert">{error}</p>}
        {saved && !error && <p className="text-xs text-good" role="status">Saved. New runs for this study will use this model.</p>}

        <Button variant="primary" onClick={save} disabled={busy || !dirty}>
          {busy && <Loader2 size={15} className="animate-spin" aria-hidden />} Save model
        </Button>
      </div>
    </Card>
  );
}
