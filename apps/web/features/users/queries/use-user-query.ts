"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { UsersSummary } from "../schemas/user.schema";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users", "summary"],
    queryFn: () => apiClient.get<UsersSummary>("/users"),
  });
}
