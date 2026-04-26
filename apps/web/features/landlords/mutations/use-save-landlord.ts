"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";

export function useSaveLandlords() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => apiClient.post("/landlords", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["landlords"] }),
  });
}
