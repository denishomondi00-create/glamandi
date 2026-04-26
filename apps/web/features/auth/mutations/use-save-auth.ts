"use client";

import { useQueryClient } from "@tanstack/react-query";

export function useSaveAuth() {
  const queryClient = useQueryClient();
  return {
    invalidate: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  };
}
