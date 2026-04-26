"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { PenaltiesSummary } from "../schemas/penaltie.schema";

export function usePenaltiesQuery() {
  return useQuery({
    queryKey: ["penalties", "summary"],
    queryFn: () => apiClient.get<PenaltiesSummary>("/penalties"),
  });
}
