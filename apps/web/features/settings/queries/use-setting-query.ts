"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
import type { SettingsSummary } from "../schemas/setting.schema";

export function useSettingsQuery() {
  return useQuery({
    queryKey: ["settings", "summary"],
    queryFn: () => apiClient.get<SettingsSummary>("/settings"),
  });
}
