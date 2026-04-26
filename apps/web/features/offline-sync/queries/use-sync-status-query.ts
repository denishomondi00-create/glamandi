"use client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client/client";
export function useSyncStatusQuery() { return useQuery({ queryKey: ["offline-sync", "status"], queryFn: () => apiClient.get("/sync/status") }); }
