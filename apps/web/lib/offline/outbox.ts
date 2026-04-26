import { getOfflineDb } from "./db";
import type { OfflineMutationEnvelope, OfflineOperation } from "./stores";

function makeId() {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getDeviceId() {
  if (typeof localStorage === "undefined") return "server";
  const key = "glamandi_device_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const created = `device_${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(key, created);
  return created;
}

export async function addOfflineMutation(input: { operation: OfflineOperation; payload: unknown; entityType: string; entityLocalId?: string; entityServerId?: string }) {
  const db = await getOfflineDb();
  const envelope: OfflineMutationEnvelope = {
    localId: makeId(),
    operation: input.operation,
    payload: input.payload,
    entityType: input.entityType,
    entityLocalId: input.entityLocalId,
    entityServerId: input.entityServerId,
    createdAt: new Date().toISOString(),
    createdBy: "current-user",
    deviceId: getDeviceId(),
    clientVersion: "web-1.0.0",
    status: "pending",
  };
  await db.put("pending_mutations", envelope);
  return envelope;
}

export async function getPendingMutations() {
  const db = await getOfflineDb();
  return db.getAllFromIndex("pending_mutations", "by-status", "pending");
}

export async function markMutationSynced(localId: string) {
  const db = await getOfflineDb();
  const mutation = await db.get("pending_mutations", localId);
  if (mutation) await db.put("pending_mutations", { ...mutation, status: "synced" });
}

export async function markMutationConflict(localId: string) {
  const db = await getOfflineDb();
  const mutation = await db.get("pending_mutations", localId);
  if (mutation) await db.put("pending_mutations", { ...mutation, status: "conflict" });
}
