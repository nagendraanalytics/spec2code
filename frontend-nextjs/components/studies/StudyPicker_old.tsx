"use client";

import Link from "next/link";
import { useStudies } from "@/lib/useStudies";
import { Badge, inputCls } from "@/components/ui/primitives";

/** Select one of the loaded studies. A value that is not in the list (typed in an older spec) stays selectable. */
export default function StudyPicker({
  value,
  onChange,
  noneLabel = "No study (names come from the spec only)",
  label = "Study",
  showBadge = true,
}: {
  value: string;
  onChange: (v: string) => void;
  noneLabel?: string;
  label?: string;
  showBadge?: boolean;
}) {
  const studies = useStudies();
  const list = studies.data ?? [];
  const current = list.find((s) => s.studyId === value);
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} aria-label={label}>
        <option value="">{noneLabel}</option>
        {value && !current && <option value={value}>{value} (no metadata loaded)</option>}
        {list.map((s) => (
          <option key={s.studyId} value={s.studyId}>
            {s.studyId}{s.name ? `: ${s.name}` : ""}
          </option>
        ))}
      </select>
      {showBadge && (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted">
          {current?.counts ? (
            <Badge tone="good">Metadata v{current.activeVersion} · {current.counts.items} items · {current.counts.forms} forms</Badge>
          ) : value ? (
            <Badge tone="warn">No metadata loaded for this study</Badge>
          ) : null}
          {studies.isError ? (
            <span className="text-bad">Could not load studies: {studies.error instanceof Error ? studies.error.message : String(studies.error)}</span>
          ) : list.length === 0 && !studies.isLoading ? (
            <span>No studies yet.</span>
          ) : null}
          <Link href="/studies/" className="text-accent hover:underline">Study setup</Link>
        </div>
      )}
    </div>
  );
}
