"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { PaymentsSummary } from "../schemas/payment.schema";

export function usePaymentsQuery() {
  return useQuery({
    queryKey: ["payments", "summary"],
    queryFn: () => apiClient.get<PaymentsSummary>("/payments"),
  });
}
