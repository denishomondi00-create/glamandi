"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { TenanciesSummary } from "../schemas/tenancie.schema";

export function useTenanciesQuery() {
  return useQuery({
    queryKey: ["tenancies", "summary"],
    queryFn: () => apiClient.get<TenanciesSummary>("/tenancies"),
  });
}
