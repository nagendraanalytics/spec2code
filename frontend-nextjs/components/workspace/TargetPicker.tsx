"use client";

import clsx from "clsx";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useTargets } from "@/lib/usePipeline";
import { useWorkspace } from "@/lib/workspace";
import { Badge } from "@/components/ui/primitives";
import type { Target } from "@/lib/types";

const ORDER = ["cql", "sql", "sas", "r", "python"];

function statusBadge(t: Target) {
  if (t.coverage === "rules_only") return <Badge tone="accent" title={t.detail}>Rules only</Badge>;
  if (t.status === "verified" || t.status === "built") return <Badge tone="good">Verified</Badge>;
  if (t.status === "unverified_beta") return <Badge tone="warn">Unverified</Badge>;
  return <Badge>Not available</Badge>;
}

export type TargetValue = { edcSystem: string; language: string };

/** Workspace-bound picker: reads and writes the current spec. */
export default function TargetPicker() {
  const { spec, patchSpec, allowUnverified, setAllowUnverified } = useWorkspace();
  return (
    <TargetPickerView
      studyId={spec.studyId}
      value={spec}
      onChange={patchSpec}
      allowUnverified={allowUnverified}
      onAllowUnverified={setAllowUnverified}
    />
  );
}

/** Controlled picker, used by the workspace and by batch runs. */
export function TargetPickerView({
  value: spec,
  studyId = "",
  onChange: patchSpec,
  allowUnverified,
  onAllowUnverified: setAllowUnverified,
}: {
  value: TargetValue;
  studyId?: string;
  onChange: (patch: Partial<TargetValue>) => void;
  allowUnverified: boolean;
  onAllowUnverified: (v: boolean) => void;
}) {
  const targets = useTargets(studyId);
  const all = targets.data?.targets ?? [];
  const edcSystems = Array.from(new Map(all.map((t) => [t.edcSystem, t.edcLabel])).entries());
  const cells = all.filter((t) => t.edcSystem === spec.edcSystem).sort((a, b) => ORDER.indexOf(a.language) - ORDER.indexOf(b.language));
  const current = cells.find((c) => c.language === spec.language);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted">Output language</span>
        <select
          value={spec.edcSystem}
          onChange={(e) => patchSpec({ edcSystem: e.target.value })}
          className="rounded-md border border-line bg-surface px-2 py-1 text-xs"
          aria-label="EDC system"
        >
          {(edcSystems.length ? edcSystems : [["veeva", "Veeva Vault CDMS"]]).map(([id, label]) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
      </div>

      {targets.isError && (
        <p className="text-xs text-bad">
          Could not load the target list: {targets.error instanceof Error ? targets.error.message : String(targets.error)}{" "}
          <button type="button" className="underline" onClick={() => targets.refetch()}>Retry</button>
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Output language">
        {cells.map((c) => {
          const selected = c.language === spec.language;
          const usable = c.available || c.optInRequired;
          return (
            <button
              key={c.language}
              role="radio"
              aria-checked={selected}
              disabled={!usable}
              title={c.detail}
              onClick={() => patchSpec({ language: c.language })}
              className={clsx(
                "flex flex-col items-start gap-1 rounded-lg border px-3 py-2 text-left transition",
                selected ? "border-accent bg-accentsoft" : "border-line bg-surface hover:bg-surface2",
                !usable && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="text-sm font-medium">{c.languageLabel}</span>
              {statusBadge(c)}
            </button>
          );
        })}
      </div>

      {current && !current.available && !current.optInRequired && (
        <p className="rounded-lg bg-surface2 p-3 text-xs text-muted">
          {current.detail}
          {!studyId && spec.edcSystem !== "veeva" && ["sql", "sas", "r"].includes(current.language) && " Choose a study with loaded metadata to get an unverified draft."}
        </p>
      )}

      {current?.optInRequired && (
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent bg-warnsoft p-3 text-xs text-warn">
          <input
            type="checkbox"
            checked={allowUnverified}
            onChange={(e) => setAllowUnverified(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--warn)]"
          />
          <span>
            <span className="flex items-center gap-1 font-semibold">
              <AlertTriangle size={13} aria-hidden /> Unverified target
            </span>
            This language has never been checked against a confirmed-correct result. The output is a draft for a
            programmer to review. I understand.
          </span>
        </label>
      )}
      {current && current.coverage === "full" && (
        <p className="flex items-center gap-1 text-xs text-good">
          <ShieldCheck size={13} aria-hidden /> Verified path: rules, retrieval and guardrails apply.
        </p>
      )}
      {current && current.coverage === "rules_only" && (
        <p className="rounded-lg bg-accentsoft p-3 text-xs text-accent">
          Rules only: this language runs one deterministic rule and has no model fallback, so most specs will produce no code.
        </p>
      )}
    </div>
  );
}
