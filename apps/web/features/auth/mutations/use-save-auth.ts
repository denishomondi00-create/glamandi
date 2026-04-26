"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";

export function useSaveAuth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => apiClient.post("/auth/me", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });
}
