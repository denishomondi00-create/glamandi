"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { UnitsSummary } from "../schemas/unit.schema";

export function useUnitsQuery() {
  return useQuery({
    queryKey: ["units", "summary"],
    queryFn: () => apiClient.get<UnitsSummary>("/units"),
  });
}
