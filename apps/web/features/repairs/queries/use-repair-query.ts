"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { RepairsSummary } from "../schemas/repair.schema";

export function useRepairsQuery() {
  return useQuery({
    queryKey: ["repairs", "summary"],
    queryFn: () => apiClient.get<RepairsSummary>("/repairs"),
  });
}
