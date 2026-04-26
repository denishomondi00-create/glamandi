import { apiClient } from "@/lib/api-client/client";
import { getPendingMutations, markMutationConflict, markMutationSynced } from "./outbox";

export type SyncPushResponse = {
  accepted?: Array<{ localId: string }>;
  conflicts?: Array<{ localId: string; reason: string }>;
  rejected?: Array<{ localId: string; reason: string }>;
};

export async function pushPendingMutations() {
  const mutations = await getPendingMutations();
  if (!mutations.length) return { accepted: [], conflicts: [], rejected: [] } satisfies SyncPushResponse;

  const response = await apiClient.post<SyncPushResponse>("/sync/push", { mutations });
  await Promise.all((response.accepted ?? []).map((item) => markMutationSynced(item.localId)));
  await Promise.all([...(response.conflicts ?? []), ...(response.rejected ?? [])].map((item) => markMutationConflict(item.localId)));
  return response;
}

export async function pullSafeData(since?: string) {
  const query = since ? `?since=${encodeURIComponent(since)}` : "";
  return apiClient.get(`/sync/pull${query}`);
}
