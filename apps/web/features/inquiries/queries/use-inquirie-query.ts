"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { InquiriesSummary } from "../schemas/inquirie.schema";

export function useInquiriesQuery() {
  return useQuery({
    queryKey: ["inquiries", "summary"],
    queryFn: () => apiClient.get<InquiriesSummary>("/inquiries"),
  });
}
