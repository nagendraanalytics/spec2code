import { Badge } from "@/components/ui/primitives";
import type { KbScope, KbSource, KbStatus } from "@/lib/types";

export async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export const ACCEPT = ".pdf,.docx,.doc,.rtf,.odt,.xlsx,.csv,.txt,.md,.html,.htm,.sas,.sql,.json,.xml";

export const STATUS_TONE: Record<KbStatus, "warn" | "good" | "neutral"> = { draft: "warn", approved: "good", retired: "neutral" };
export const STATUS_LABEL: Record<KbStatus, string> = { draft: "Draft: not used", approved: "Approved", retired: "Retired" };

export const StatusBadge = ({ status }: { status: KbStatus }) => <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>;

export const scopeLabel = (scope: KbScope, ref: string) =>
  scope === "global" ? (ref ? `Global · ${ref}` : "Global") : scope === "report" ? `Report · ${ref}` : scope === "sponsor" ? `Sponsor · ${ref}` : scope === "ta" ? `TA · ${ref}` : `Study · ${ref}`;

export const fmtSize = (n: number) => (n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1048576).toFixed(1)} MB`);

export function extractBadge(s: Pick<KbSource, "extractStatus" | "extractNote">) {
  if (s.extractStatus === "ok") return null;
  const label = s.extractStatus === "needs_ocr" ? "Needs OCR" : s.extractStatus === "empty" ? "Empty" : "Unreadable";
  return <Badge tone="bad" title={s.extractNote}>{label}</Badge>;
}

export const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));
