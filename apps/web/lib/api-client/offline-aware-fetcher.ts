import { apiClient } from "./client";
import { addOfflineMutation } from "@/lib/offline/outbox";
import type { OfflineOperation } from "@/lib/offline/stores";

const offlineDraftOperations: OfflineOperation[] = [
  "CREATE_MANUAL_MPESA_PAYMENT",
  "CREATE_MANUAL_KCB_PAYMENT",
  "CREATE_CASH_PAYMENT",
  "CREATE_REPAIR_TICKET",
  "CREATE_INQUIRY",
  "CREATE_TENANT_NOTE",
  "CREATE_COMMUNICATION_EXCEPTION",
  "CREATE_UTILITY_CHARGE_DRAFT",
  "REQUEST_PENALTY_WAIVER",
];

export async function offlineAwarePost<T>(path: string, payload: Record<string, unknown>, options?: { offlineOperation?: OfflineOperation; entityType?: string }) {
  const canDraftOffline = options?.offlineOperation && offlineDraftOperations.includes(options.offlineOperation);
  if (typeof navigator !== "undefined" && !navigator.onLine && canDraftOffline) {
    await addOfflineMutation({ operation: options.offlineOperation!, entityType: options.entityType ?? "unknown", payload });
    return { offline: true, queued: true } as T;
  }
  return apiClient.post<T>(path, payload);
}
