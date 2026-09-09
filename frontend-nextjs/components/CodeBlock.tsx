// components/CodeBlock.tsx — same lightweight, dependency-free approach as
// the original static/app.js: regex-based keyword/string/comment
// highlighting, no syntax-highlighting library. Ported to React (returns
// JSX spans instead of building an HTML string).

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON",
  "AND", "OR", "NOT", "NULL", "IS", "AS", "WITH", "CASE", "WHEN", "THEN",
  "ELSE", "END", "GROUP", "BY", "ORDER", "HAVING", "DISTINCT", "UNION", "ALL",
  "IN", "EXISTS", "BETWEEN", "LIKE", "COALESCE", "CAST", "TRY_CAST", "DATE",
  "DESC", "ASC", "COUNT", "SUM", "AVG", "MIN", "MAX",
];

const LINE_BREAK_BEFORE = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "UNION ALL", "UNION",
  "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "JOIN",
];
const LINE_BREAK_RE = new RegExp(
  "\\s+(" + [...LINE_BREAK_BEFORE].sort((a, b) => b.length - a.length).join("|") + ")\\b",
  "gi",
);

const INDENT = "  ";

function formatCode(code: string): string {
  const withMarkers = code.replace(/'[^']*'/g, (m) => m.replace(/\s+/g, "\u0001"));
  const singleSpaced = withMarkers.replace(/\s+/g, " ").trim();
  const breakable = singleSpaced.replace(LINE_BREAK_RE, (_, kw: string) => `\n${kw}`);
  const lines = breakable.split("\n").map((l) => l.trim()).filter(Boolean);

  let depth = 0;
  const out: string[] = [];
  for (const line of lines) {
    const leadingCloses = (line.match(/^\)+/) || [""])[0].length;
    const thisDepth = Math.max(depth - leadingCloses, 0);
    out.push(INDENT.repeat(thisDepth) + line);
    const opens = (line.match(/\(/g) || []).length;
    const closes = (line.match(/\)/g) || []).length;
    depth = Math.max(depth + opens - closes, 0);
  }
  return out.join("\n").replace(/\u0001/g, " ");
}

interface Segment {
  text: string;
  type: "kw" | "str" | "com" | "plain";
}

function tokenize(code: string): Segment[] {
  const stringRe = /'[^']*'/g;
  const commentRe = /--.*$/gm;
  type Mark = { start: number; end: number; type: "str" | "com" };
  const marks: Mark[] = [];
  let m: RegExpExecArray | null;
  while ((m = stringRe.exec(code))) marks.push({ start: m.index, end: m.index + m[0].length, type: "str" });
  while ((m = commentRe.exec(code))) marks.push({ start: m.index, end: m.index + m[0].length, type: "com" });
  marks.sort((a, b) => a.start - b.start);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const mark of marks) {
    if (mark.start < cursor) continue;
    if (mark.start > cursor) segments.push(...tokenizeKeywords(code.slice(cursor, mark.start)));
    segments.push({ text: code.slice(mark.start, mark.end), type: mark.type });
    cursor = mark.end;
  }
  if (cursor < code.length) segments.push(...tokenizeKeywords(code.slice(cursor)));
  return segments;
}

function tokenizeKeywords(chunk: string): Segment[] {
  const re = new RegExp(`\\b(${KEYWORDS.join("|")})\\b`, "gi");
  const segments: Segment[] = [];
  let cursor = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(chunk))) {
    if (m.index > cursor) segments.push({ text: chunk.slice(cursor, m.index), type: "plain" });
    segments.push({ text: m[0], type: "kw" });
    cursor = m.index + m[0].length;
  }
  if (cursor < chunk.length) segments.push({ text: chunk.slice(cursor), type: "plain" });
  return segments;
}

const COLOR: Record<Segment["type"], string> = {
  kw: "text-sky-400",
  str: "text-amber-400",
  com: "text-neutral-500 italic",
  plain: "text-neutral-200",
};

export default function CodeBlock({ code }: { code: string }) {
  const formatted = formatCode(code || "");
  const segments = tokenize(formatted);
  return (
    <pre className="bg-neutral-950 border border-neutral-800 rounded-sm p-4 text-[0.82rem] font-mono overflow-x-auto whitespace-pre">
      {segments.map((seg, i) => (
        <span key={i} className={COLOR[seg.type]}>
          {seg.text}
        </span>
      ))}
    </pre>
  );
}
