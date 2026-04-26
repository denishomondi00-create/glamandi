"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";

export function useSaveWebsite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => apiClient.post("/website/listings", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["website"] }),
  });
}
