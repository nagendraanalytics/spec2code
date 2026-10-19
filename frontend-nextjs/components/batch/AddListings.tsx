"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { FileUp, FolderOpen, Library, Loader2, Server } from "lucide-react";
import { listSpecs, parseFiles, scanServerFolder } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Button, Card, CardHeader, inputCls } from "@/components/ui/primitives";
import type { ParsedItem, ParseResult } from "@/lib/types";

const SUPPORTED = [".json", ".csv", ".xlsx", ".docx", ".txt", ".md"];
const MAX_REQUEST_BYTES = 12 * 1024 * 1024;
const MAX_REQUEST_FILES = 150;

const ext = (n: string) => n.slice(n.lastIndexOf(".")).toLowerCase();

async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

type Tab = "folder" | "files" | "server" | "library";
const TABS: { id: Tab; label: string; icon: typeof FolderOpen }[] = [
  { id: "folder", label: "Folder", icon: FolderOpen },
  { id: "files", label: "Files", icon: FileUp },
  { id: "server", label: "Server path", icon: Server },
  { id: "library", label: "Spec library", icon: Library },
];

export default function AddListings({ onAdd }: { onAdd: (items: ParsedItem[]) => void }) {
  const { tenantId } = useWorkspace();
  const [tab, setTab] = useState<Tab>("folder");
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const [path, setPath] = useState("");
  const [recursive, setRecursive] = useState(true);
  const [libSel, setLibSel] = useState<Set<string>>(new Set());
  const folderRef = useRef<HTMLInputElement | null>(null);

  const lib = useQuery({ queryKey: ["specs", tenantId], queryFn: () => listSpecs(tenantId), enabled: tab === "library" });

  function report(r: ParseResult) {
    const bad = r.items.filter((i) => i.error).length;
    const skipped = r.skipped.length;
    onAdd(r.items);
    setNote({
      tone: bad ? "bad" : "ok",
      text:
        `Added ${r.items.length - bad} listing${r.items.length - bad === 1 ? "" : "s"}` +
        (bad ? `, ${bad} could not be read` : "") +
        (skipped ? `, ${skipped} file${skipped === 1 ? "" : "s"} skipped (unsupported type)` : "") +
        ".",
    });
  }

  async function ingest(files: File[]) {
    setNote(null);
    const usable = files.filter((f) => SUPPORTED.includes(ext(f.name)));
    const skippedLocal = files.length - usable.length;
    if (!usable.length) {
      setNote({ tone: "bad", text: `No supported files found. Use ${SUPPORTED.join(", ")}.` });
      return;
    }
    try {
      const merged: ParseResult = { items: [], skipped: [] };
      let batch: { name: string; data: string }[] = [];
      let bytes = 0;
      let done = 0;
      const flush = async () => {
        if (!batch.length) return;
        const r = await parseFiles(batch, tenantId);
        merged.items.push(...r.items);
        merged.skipped.push(...r.skipped);
        batch = [];
        bytes = 0;
      };
      for (const f of usable) {
        setBusy(`Reading ${++done} of ${usable.length}`);
        const rel = (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name;
        batch.push({ name: rel, data: await toBase64(f) });
        bytes += f.size;
        if (bytes > MAX_REQUEST_BYTES || batch.length >= MAX_REQUEST_FILES) await flush();
      }
      await flush();
      for (let i = 0; i < skippedLocal; i++) merged.skipped.push({ name: "", reason: "unsupported type" });
      report(merged);
    } catch (e) {
      setNote({ tone: "bad", text: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(null);
    }
  }

  async function scan() {
    setNote(null);
    setBusy("Scanning folder");
    try {
      report(await scanServerFolder(path.trim(), recursive, tenantId));
    } catch (e) {
      setNote({ tone: "bad", text: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(null);
    }
  }

  function addFromLibrary() {
    const rows = (lib.data ?? []).filter((s) => libSel.has(s.id));
    onAdd(
      rows.map((s) => ({
        name: `library: ${s.reportId}`,
        source: `library:${s.id}`,
        kind: "spec" as const,
        reportId: s.reportId,
        rawText: null,
        error: null,
        spec: {
          reportId: s.reportId, description: s.description, columnHeading: s.columnHeading,
          logic: s.logic, reportScenarios: s.reportScenarios, sorting: s.sorting,
        },
      })),
    );
    setNote({ tone: "ok", text: `Added ${rows.length} from the library.` });
    setLibSel(new Set());
  }

  const libRows = lib.data ?? [];

  return (
    <Card>
      <CardHeader title="Add listings" hint="Folders, files, a server path or specs you already ran. Add from several sources into one batch." />
      <div className="space-y-4 p-4">
        <div role="tablist" className="flex flex-wrap gap-1 rounded-lg bg-surface2 p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={clsx(
                "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm transition",
                tab === id ? "bg-surface font-medium shadow-sm" : "text-muted hover:text-ink",
              )}
            >
              <Icon size={15} aria-hidden /> {label}
            </button>
          ))}
        </div>

        {tab === "folder" && (
          <div className="space-y-2">
            <p className="text-sm text-muted">
              Pick a folder with all your specs (sub-folders included). Reads <span className="font-mono text-xs">.json .csv .xlsx .docx .txt .md</span>; other files are skipped.
              Files stay in your browser until you start the run.
            </p>
            <input
              ref={(el) => {
                folderRef.current = el;
                el?.setAttribute("webkitdirectory", "");
              }}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                e.target.value = "";
                void ingest(files);
              }}
            />
            <Button variant="primary" disabled={!!busy} onClick={() => folderRef.current?.click()}>
              <FolderOpen size={15} aria-hidden /> Choose folder
            </Button>
          </div>
        )}

        {tab === "files" && (
          <div className="space-y-2">
            <p className="text-sm text-muted">
              Select one or many files. A <span className="font-mono text-xs">.csv</span> or <span className="font-mono text-xs">.xlsx</span> with one row per listing adds every row. Columns are matched by name (Report ID, Description, Column Heading, Logic, Scenarios, Sorting).
            </p>
            <label className="inline-flex">
              <input
                type="file"
                multiple
                hidden
                accept={SUPPORTED.join(",")}
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  e.target.value = "";
                  void ingest(files);
                }}
              />
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accentink hover:brightness-110">
                <FileUp size={15} aria-hidden /> Choose files
              </span>
            </label>
          </div>
        )}

        {tab === "server" && (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              Read a folder that lives on the machine running the API. The server only reads folders listed in
              <span className="font-mono text-xs"> SPEC2CODE_SPEC_ROOTS</span>.
            </p>
            <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="C:\specs\study_1234" className={clsx(inputCls, "mt-0 font-mono")} aria-label="Server folder path" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={recursive} onChange={(e) => setRecursive(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              Include sub-folders
            </label>
            <Button variant="primary" disabled={!!busy || !path.trim()} onClick={scan}>
              <Server size={15} aria-hidden /> Scan folder
            </Button>
          </div>
        )}

        {tab === "library" && (
          <div className="space-y-2">
            {lib.isLoading && <p className="text-sm text-muted">Loading library</p>}
            {lib.isError && <p className="text-sm text-bad">{String(lib.error)}</p>}
            {lib.data && !libRows.length && <p className="text-sm text-muted">No specs in the library yet. Specs appear here after they are reviewed or generated.</p>}
            {libRows.length > 0 && (
              <>
                <div className="flex items-center justify-between text-xs text-muted">
                  <button className="hover:text-ink" onClick={() => setLibSel(new Set(libRows.map((s) => s.id)))}>Select all</button>
                  <button className="hover:text-ink" onClick={() => setLibSel(new Set())}>Clear</button>
                </div>
                <ul className="max-h-56 divide-y divide-line overflow-y-auto rounded-lg border border-line">
                  {libRows.map((s) => (
                    <li key={s.id}>
                      <label className="flex cursor-pointer items-start gap-3 px-3 py-2 text-sm hover:bg-surface2">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-[var(--accent)]"
                          checked={libSel.has(s.id)}
                          onChange={() => {
                            const n = new Set(libSel);
                            if (n.has(s.id)) n.delete(s.id);
                            else n.add(s.id);
                            setLibSel(n);
                          }}
                        />
                        <span className="min-w-0">
                          <span className="font-mono text-xs font-semibold">{s.reportId}</span>
                          <span className="block truncate text-xs text-muted">{s.description}</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" disabled={!libSel.size} onClick={addFromLibrary}>Add {libSel.size || ""} selected</Button>
              </>
            )}
          </div>
        )}

        {busy && (
          <p className="flex items-center gap-2 text-sm text-muted" role="status">
            <Loader2 size={15} className="animate-spin" aria-hidden /> {busy}
          </p>
        )}
        {note && <p className={clsx("rounded-lg p-3 text-sm", note.tone === "ok" ? "bg-goodsoft text-good" : "bg-badsoft text-bad")} role="status">{note.text}</p>}
      </div>
    </Card>
  );
}
