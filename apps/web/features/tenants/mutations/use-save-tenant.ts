"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";

export function useSaveTenants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => apiClient.post("/tenants", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tenants"] }),
  });
}
