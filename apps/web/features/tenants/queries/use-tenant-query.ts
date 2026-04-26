"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { TenantsSummary } from "../schemas/tenant.schema";

export function useTenantsQuery() {
  return useQuery({
    queryKey: ["tenants", "summary"],
    queryFn: () => apiClient.get<TenantsSummary>("/tenants"),
  });
}
