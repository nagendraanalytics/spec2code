"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BookOpen, Blocks, Database, FileCode2, FlaskConical, History, Layers, Network, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useWorkspace } from "@/lib/workspace";

export const NAV = [
  { href: "/", label: "Workspace", icon: FileCode2 },
  { href: "/batch/", label: "Batch runs", icon: Layers },
  { href: "/studies/", label: "Study setup", icon: Database },
  { href: "/synthetic/", label: "Synthetic data", icon: FlaskConical },
  { href: "/knowledge/", label: "Knowledge", icon: BookOpen },
  { href: "/modules/", label: "Clinical modules", icon: Blocks },
  { href: "/library/", label: "Spec library", icon: History },
  { href: "/platform/", label: "Platform", icon: Network },
];

export default function Sidebar() {
  const path = usePathname() ?? "/";
  const { sidebarCollapsed: c, toggleSidebar } = useWorkspace();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));
  return (
    <aside
      className={clsx(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-200 md:flex",
        c ? "w-[68px]" : "w-60",
      )}
    >
      <div className={clsx("flex items-center py-5", c ? "justify-center px-0" : "gap-3 px-5")}>
        <div className="brand-mark grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold text-white">S2C</div>
        {!c && (
          <div className="min-w-0">
            <div className="text-[15px] font-semibold tracking-tight">Spec2Code</div>
            <div className="text-[11px] text-muted">Clinical spec to code</div>
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-1 px-3" aria-label="Main">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={c ? label : undefined}
            aria-label={label}
            aria-current={active(href) ? "page" : undefined}
            className={clsx(
              "relative flex items-center rounded-lg py-2 text-sm transition",
              c ? "justify-center px-0" : "gap-3 px-3",
              active(href) ? "bg-accentsoft font-medium text-accent" : "text-muted hover:bg-surface2 hover:text-ink",
            )}
          >
            {active(href) && <span className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-[3px] rounded-r bg-accent" aria-hidden />}
            <Icon size={18} aria-hidden />
            {!c && label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-2 p-3">
        {!c && <p className="px-2 text-[11px] leading-relaxed text-muted">Generated code is a draft until a programmer signs it off.</p>}
        <button
          onClick={toggleSidebar}
          aria-label={c ? "Expand sidebar" : "Collapse sidebar"}
          title={c ? "Expand sidebar" : "Collapse sidebar"}
          className={clsx(
            "flex w-full items-center rounded-lg py-2 text-sm text-muted transition hover:bg-surface2 hover:text-ink",
            c ? "justify-center" : "gap-3 px-3",
          )}
        >
          {c ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          {!c && "Collapse"}
        </button>
      </div>
    </aside>
  );
}
