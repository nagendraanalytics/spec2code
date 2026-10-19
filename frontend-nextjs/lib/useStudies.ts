"use client";

import { useQuery } from "@tanstack/react-query";
import { listStudies } from "./api";
import { useWorkspace } from "./workspace";

export function useStudies() {
  const { tenantId } = useWorkspace();
  return useQuery({ queryKey: ["studies", tenantId], queryFn: () => listStudies(tenantId) });
}
