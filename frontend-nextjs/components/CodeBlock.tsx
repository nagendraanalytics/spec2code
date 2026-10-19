"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Maximize2, Minimize2, WrapText } from "lucide-react";
import { format as formatSql } from "sql-formatter";
import clsx from "clsx";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import r from "react-syntax-highlighter/dist/esm/languages/hljs/r";
import sas from "react-syntax-highlighter/dist/esm/languages/hljs/sas";
import theme from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("r", r);
SyntaxHighlighter.registerLanguage("sas", sas);

const HIGHLIGHT: Record<string, string> = { cql: "sql", sql: "sql", python: "python", r: "r", sas: "sas" };
const EXT: Record<string, string> = { cql: "cql", sql: "sql", python: "py", r: "R", sas: "sas" };
const LABEL: Record<string, string> = { cql: "CQL", sql: "SQL", python: "Python", r: "R", sas: "SAS" };

// Fallback used only if the formatter rejects the text (CQL has Veeva-specific syntax).
const BREAK = /\s+(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|UNION ALL|UNION|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN)\b/gi;
const looseSql = (code: string) => (code.includes("\n") ? code : code.replace(BREAK, "\n$1").trim());

/** CQL and SQL are re-indented with a real formatter: one column per line, clause
 * keywords upper-cased, joins and conditions aligned. SAS, R and Python are left exactly
 * as generated, because re-flowing them could change meaning. */
export function formatCode(code: string, language: string): string {
  if (language !== "cql" && language !== "sql") return code.replace(/\s+$/, "");
  try {
    return formatSql(code, { language: "sql", keywordCase: "upper", tabWidth: 2, linesBetweenQueries: 1, expressionWidth: 90 });
  } catch {
    return looseSql(code);
  }
}

export default function CodeBlock({ code, language, fileStem }: { code: string; language: string; fileStem: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [wrap, setWrap] = useState(false);
  const shown = useMemo(() => formatCode(code, language), [code, language]);
  const lines = shown.split("\n").length;

  async function copy() {
    try {
      await navigator.clipboard.writeText(shown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard can be blocked; the user can still select the text */
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([shown], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileStem || "spec2code"}.${EXT[language] ?? "txt"}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const btn = "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[#9fb0c3] hover:bg-white/10 hover:text-white";

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 shadow-sm" style={{ background: "var(--code-bg)" }}>
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
        <span className="flex items-center gap-2 font-mono text-[#9fb0c3]">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          {fileStem || "spec2code"}.{EXT[language] ?? "txt"} <span className="text-[#6b7c90]">{LABEL[language] ?? language} · {lines} lines</span>
        </span>
        <span className="flex gap-1">
          <button onClick={() => setWrap((w) => !w)} className={clsx(btn, wrap && "bg-white/10 text-white")} aria-pressed={wrap} aria-label="Wrap long lines">
            <WrapText size={13} /> Wrap
          </button>
          <button onClick={() => setExpanded((e) => !e)} className={btn} aria-pressed={expanded} aria-label={expanded ? "Shrink code panel" : "Expand code panel"}>
            {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />} {expanded ? "Shrink" : "Expand"}
          </button>
          <button onClick={copy} className={btn} aria-label="Copy code">
            {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={download} className={btn} aria-label="Download code">
            <Download size={13} /> Download
          </button>
        </span>
      </div>
      <div style={{ minHeight: 420, maxHeight: expanded ? "88vh" : "68vh" }} className="overflow-auto">
        <SyntaxHighlighter
          language={HIGHLIGHT[language] ?? "sql"}
          style={theme}
          showLineNumbers
          lineNumberStyle={{ minWidth: "2.6em", paddingRight: "1.2em", color: "#4d5b6c", userSelect: "none", textAlign: "right" }}
          customStyle={{ margin: 0, padding: "16px 8px 24px 8px", background: "transparent", fontSize: "0.84rem", lineHeight: 1.65 }}
          wrapLongLines={wrap}
          codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
        >
          {shown}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
