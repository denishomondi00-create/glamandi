"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { ReceiptsSummary } from "../schemas/receipt.schema";

export function useReceiptsQuery() {
  return useQuery({
    queryKey: ["receipts", "summary"],
    queryFn: () => apiClient.get<ReceiptsSummary>("/receipts"),
  });
}
