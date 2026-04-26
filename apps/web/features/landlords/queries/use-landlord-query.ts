"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { LandlordsSummary } from "../schemas/landlord.schema";

export function useLandlordsQuery() {
  return useQuery({
    queryKey: ["landlords", "summary"],
    queryFn: () => apiClient.get<LandlordsSummary>("/landlords"),
  });
}
