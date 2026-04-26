"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { WebsiteSummary } from "../schemas/website.schema";

export function useWebsiteQuery() {
  return useQuery({
    queryKey: ["website", "summary"],
    queryFn: () => apiClient.get<WebsiteSummary>("/website/listings"),
  });
}
