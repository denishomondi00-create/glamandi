"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";

export function useSaveDashboard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => apiClient.post("/reports/dashboard", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
  });
}
