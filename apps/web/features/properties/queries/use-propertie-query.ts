"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { PropertiesSummary } from "../schemas/propertie.schema";

export function usePropertiesQuery() {
  return useQuery({
    queryKey: ["properties", "summary"],
    queryFn: () => apiClient.get<PropertiesSummary>("/properties"),
  });
}
