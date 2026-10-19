"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { generateCode, getTargets, reviewSpec, understandSpec } from "./api";
import { useWorkspace } from "./workspace";

/** Targets depend on the study: loaded metadata turns blocked EDC systems into opt-in drafts. */
export function useTargets(studyId = "") {
  const { tenantId } = useWorkspace();
  const sid = studyId.trim();
  return useQuery({ queryKey: ["targets", tenantId, sid], queryFn: () => getTargets(tenantId, sid) });
}

type Stage = "understand" | "review" | "generate";

export function usePipeline() {
  const ws = useWorkspace();
  const { spec, tenantId, allowUnverified, review: reviewResult, setError, setTab } = ws;

  const targets = useTargets(spec.studyId);
  const cell = targets.data?.targets.find((t) => t.edcSystem === spec.edcSystem && t.language === spec.language);
  const readyToSubmit = Boolean(spec.reportId.trim() && spec.description.trim());
  const busy = Object.values(ws.stages).some((s) => s === "running");

  let blockReason: string | null = null;
  if (!readyToSubmit) blockReason = "Add a report ID and description first.";
  else if (!cell) blockReason = targets.isError ? "The target list could not be loaded." : "Loading targets";
  else if (!cell.available && !cell.optInRequired) blockReason = cell.detail;
  else if (cell.optInRequired && !allowUnverified) blockReason = "Confirm that this target is an unverified draft to continue.";
  const canGenerate = blockReason === null;

  // Each stage moves the user to its tab when it starts, so the page follows the run.
  const guard = useCallback(
    async <T,>(stage: Stage, fn: () => Promise<T>): Promise<T> => {
      setError(null);
      setTab(stage);
      ws.setStage(stage, "running");
      try {
        return await fn();
      } catch (e) {
        ws.setStage(stage, "error");
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      }
    },
    [ws, setError, setTab],
  );

  const understand = useCallback(
    () =>
      guard("understand", async () => {
        ws.setUnderstanding(await understandSpec(spec, tenantId));
        ws.setStage("understand", "done");
      }),
    [guard, spec, tenantId, ws],
  );

  const review = useCallback(
    () =>
      guard("review", async () => {
        const r = await reviewSpec(spec, tenantId);
        ws.setReview(r);
        ws.setStage("review", r.readiness === "needs_revision" ? "blocked" : "done");
        return r;
      }),
    [guard, spec, tenantId, ws],
  );

  const generate = useCallback(
    (specId?: string) =>
      guard("generate", async () => {
        ws.setResult(await generateCode(spec, specId ?? reviewResult?.specId ?? "", allowUnverified, tenantId));
        ws.setStage("generate", "done");
      }),
    [guard, spec, allowUnverified, tenantId, ws, reviewResult],
  );

  /** Runs every stage. A review that needs revision pauses the run; generation then needs an explicit click. */
  const runAll = useCallback(async () => {
    ws.resetResults();
    try {
      await understand();
      const r = await review();
      if (r.readiness === "needs_revision") return;
      await generate(r.specId);
    } catch {
      /* the failing stage has already recorded its error */
    }
  }, [understand, review, generate, ws]);

  return { busy, cell, canGenerate, blockReason, readyToSubmit, understand, review, generate, runAll };
}
