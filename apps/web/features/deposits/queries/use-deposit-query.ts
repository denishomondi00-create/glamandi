"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { DepositsSummary } from "../schemas/deposit.schema";

export function useDepositsQuery() {
  return useQuery({
    queryKey: ["deposits", "summary"],
    queryFn: () => apiClient.get<DepositsSummary>("/deposits"),
  });
}
