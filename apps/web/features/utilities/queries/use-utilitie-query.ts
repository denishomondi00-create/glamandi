"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { UtilitiesSummary } from "../schemas/utilitie.schema";

export function useUtilitiesQuery() {
  return useQuery({
    queryKey: ["utilities", "summary"],
    queryFn: () => apiClient.get<UtilitiesSummary>("/utilities"),
  });
}
