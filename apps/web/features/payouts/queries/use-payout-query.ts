"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { PayoutsSummary } from "../schemas/payout.schema";

export function usePayoutsQuery() {
  return useQuery({
    queryKey: ["payouts", "summary"],
    queryFn: () => apiClient.get<PayoutsSummary>("/payouts"),
  });
}
