import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "good" | "warn" | "bad" | "accent";
const TONE: Record<Tone, string> = {
  neutral: "bg-surface2 text-muted border-line",
  good: "bg-goodsoft text-good border-transparent",
  warn: "bg-warnsoft text-warn border-transparent",
  bad: "bg-badsoft text-bad border-transparent",
  accent: "bg-accentsoft text-accent border-transparent",
};

export function Badge({ tone = "neutral", children, title }: { tone?: Tone; children: ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className={clsx("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium", TONE[tone])}
    >
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={clsx("rounded-xl border border-line bg-surface", className)}>{children}</section>;
}

export function CardHeader({ title, hint, right }: { title: string; hint?: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      </div>
      {right}
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "warn" };
export function Button({ variant = "secondary", className, ...rest }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45";
  const v = {
    primary: "bg-accent text-accentink hover:brightness-110",
    secondary: "border border-line bg-surface hover:bg-surface2",
    ghost: "text-muted hover:bg-surface2 hover:text-ink",
    warn: "bg-warn text-white hover:brightness-110",
  }[variant];
  return <button className={clsx(base, v, className)} {...rest} />;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm placeholder:text-muted/70 focus:border-accent";
