"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { DashboardSummary } from "../schemas/dashboard.schema";

export function useDashboardQuery() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: () => apiClient.get<DashboardSummary>("/reports/dashboard"),
  });
}
