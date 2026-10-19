"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV } from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import { Moon, PanelLeft, Sun } from "lucide-react";
import { getHealth } from "@/lib/api";
import { useWorkspace } from "@/lib/workspace";
import { Badge } from "@/components/ui/primitives";

export default function Topbar() {
  const { tenantId, setTenantId, theme, toggleTheme, toggleSidebar } = useWorkspace();
  const path = usePathname() ?? "/";
  const health = useQuery({ queryKey: ["health", tenantId], queryFn: () => getHealth(tenantId), refetchInterval: 30000 });

  const status = health.isLoading ? (
    <Badge>Checking API</Badge>
  ) : health.isError ? (
    <Badge tone="bad" title={String(health.error)}>API offline</Badge>
  ) : health.data?.modelKeyConfigured ? (
    <Badge tone="good">API online</Badge>
  ) : (
    <Badge tone="warn" title="Set ANTHROPIC_API_KEY on the server">Model key missing</Badge>
  );

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-bg/85 px-4 py-3 backdrop-blur md:px-6">
      <button
        onClick={toggleSidebar}
        className="hidden h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted hover:text-ink md:grid"
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={15} />
      </button>
      <Link href="/" className="text-sm font-semibold md:hidden">Spec2Code</Link>
      <div className="ml-auto flex items-center gap-3">
        {status}
        <label className="flex items-center gap-2 text-xs text-muted">
          Tenant
          <input
            key={tenantId}
            defaultValue={tenantId}
            onBlur={(e) => setTenantId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            className="w-28 rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-ink"
            aria-label="Tenant id"
          />
        </label>
        <button
          onClick={toggleTheme}
          className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted hover:text-ink"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <nav className="absolute inset-x-0 top-full flex gap-1 overflow-x-auto border-b border-line bg-bg px-3 py-2 md:hidden" aria-label="Main">
        {NAV.map(({ href, label }) => {
          const on = href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));
          return (
            <Link key={href} href={href} aria-current={on ? "page" : undefined}
              className={clsx("whitespace-nowrap rounded-full px-3 py-1.5 text-xs", on ? "bg-accentsoft font-medium text-accent" : "text-muted")}>
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
