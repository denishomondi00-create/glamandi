"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";

export function useSaveReceipts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => apiClient.post("/receipts", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["receipts"] }),
  });
}
