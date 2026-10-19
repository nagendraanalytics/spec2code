"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ClinicalModule, GenerateResult, ReviewResult, SpecFields, StageState, UnderstandResult } from "./types";

export const EMPTY_SPEC: SpecFields = {
  reportId: "",
  description: "",
  columnHeading: "",
  logic: "",
  reportScenarios: "",
  sorting: "",
  specTemplate: "merck_cdisc_report_library",
  edcSystem: "veeva",
  language: "cql",
  studyId: "",
  specType: "edc_cdm_listing",
  listingType: "",
  useKnowledge: false,
};

export type Tab = "spec" | "understand" | "review" | "generate";
export type Stages = { understand: StageState; review: StageState; generate: StageState };
const IDLE: Stages = { understand: "idle", review: "idle", generate: "idle" };

type Workspace = {
  tenantId: string;
  setTenantId: (v: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  spec: SpecFields;
  patchSpec: (p: Partial<SpecFields>) => void;
  loadSpec: (s: Partial<SpecFields>) => void;
  loadModule: (m: ClinicalModule) => void;
  allowUnverified: boolean;
  setAllowUnverified: (v: boolean) => void;
  stages: Stages;
  setStage: (k: keyof Stages, v: StageState) => void;
  understanding: UnderstandResult | null;
  setUnderstanding: (v: UnderstandResult | null) => void;
  review: ReviewResult | null;
  setReview: (v: ReviewResult | null) => void;
  result: GenerateResult | null;
  setResult: (v: GenerateResult | null) => void;
  resetResults: () => void;
  tab: Tab;
  setTab: (t: Tab) => void;
  error: string | null;
  setError: (e: string | null) => void;
};

const Ctx = createContext<Workspace | null>(null);
export const useWorkspace = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWorkspace outside provider");
  return v;
};

const store = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage can be unavailable; the app works without it */
    }
  },
};

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } }));
  const [tenantId, setTenant] = useState("default");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [spec, setSpec] = useState<SpecFields>(EMPTY_SPEC);
  const [allowUnverified, setAllowUnverified] = useState(false);
  const [stages, setStages] = useState<Stages>(IDLE);
  const [understanding, setUnderstanding] = useState<UnderstandResult | null>(null);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [tab, setTab] = useState<Tab>("spec");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = store.get("s2c_tenant");
    if (t) setTenant(t);
    setSidebarCollapsed(store.get("s2c_sidebar") === "collapsed");
    const th = store.get("s2c_theme");
    const initial = th === "dark" || th === "light" ? th : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(initial);
    const draft = store.get("s2c_spec");
    if (draft) {
      try {
        setSpec({ ...EMPTY_SPEC, ...JSON.parse(draft) });
      } catch {
        /* ignore a corrupt draft */
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    store.set("s2c_spec", JSON.stringify(spec));
  }, [spec]);

  const resetResults = useCallback(() => {
    setStages(IDLE);
    setUnderstanding(null);
    setReview(null);
    setResult(null);
    setError(null);
  }, []);

  const value = useMemo<Workspace>(
    () => ({
      tenantId,
      setTenantId: (v) => {
        const n = v.trim() || "default";
        setTenant(n);
        store.set("s2c_tenant", n);
      },
      sidebarCollapsed,
      toggleSidebar: () =>
        setSidebarCollapsed((c) => {
          store.set("s2c_sidebar", c ? "open" : "collapsed");
          return !c;
        }),
      theme,
      toggleTheme: () =>
        setTheme((t) => {
          const n = t === "light" ? "dark" : "light";
          store.set("s2c_theme", n);
          return n;
        }),
      spec,
      // A listing type belongs to one spec type, so changing the spec type clears it.
      patchSpec: (p) => setSpec((s) => ({ ...s, ...(p.specType && p.specType !== s.specType ? { listingType: "" } : {}), ...p })),
      loadSpec: (s) => {
        setSpec({ ...EMPTY_SPEC, ...s });
        resetResults();
        setTab("spec");
      },
      loadModule: (m) => {
        setSpec({ ...EMPTY_SPEC, ...m.example_spec, specType: m.id });
        resetResults();
        setTab("spec");
      },
      allowUnverified,
      setAllowUnverified,
      stages,
      setStage: (k, v) => setStages((s) => ({ ...s, [k]: v })),
      understanding,
      setUnderstanding,
      review,
      setReview,
      result,
      setResult,
      resetResults,
      tab,
      setTab,
      error,
      setError,
    }),
    [tenantId, theme, sidebarCollapsed, spec, allowUnverified, stages, understanding, review, result, resetResults, tab, error],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Ctx.Provider value={value}>{children}</Ctx.Provider>
    </QueryClientProvider>
  );
}
