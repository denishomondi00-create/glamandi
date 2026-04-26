"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { AuditSummary } from "../schemas/audit.schema";

export function useAuditQuery() {
  return useQuery({
    queryKey: ["audit", "summary"],
    queryFn: () => apiClient.get<AuditSummary>("/audit"),
  });
}
