"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { ReportsSummary } from "../schemas/report.schema";

export function useReportsQuery() {
  return useQuery({
    queryKey: ["reports", "summary"],
    queryFn: () => apiClient.get<ReportsSummary>("/reports/dashboard"),
  });
}
