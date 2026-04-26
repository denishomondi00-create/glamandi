"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { StatementsSummary } from "../schemas/statement.schema";

export function useStatementsQuery() {
  return useQuery({
    queryKey: ["statements", "summary"],
    queryFn: () => apiClient.get<StatementsSummary>("/statements/landlords"),
  });
}
