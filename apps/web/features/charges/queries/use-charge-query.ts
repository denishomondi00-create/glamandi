"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { ChargesSummary } from "../schemas/charge.schema";

export function useChargesQuery() {
  return useQuery({
    queryKey: ["charges", "summary"],
    queryFn: () => apiClient.get<ChargesSummary>("/charges"),
  });
}
