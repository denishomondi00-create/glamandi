"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { AuthSummary } from "../schemas/auth.schema";

export function useAuthQuery() {
  return useQuery({
    queryKey: ["auth", "summary"],
    queryFn: () => apiClient.get<AuthSummary>("/auth/me"),
  });
}
