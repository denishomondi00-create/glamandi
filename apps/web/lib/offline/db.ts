import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { OfflineMutationEnvelope } from "./stores";

interface GlamandiOfflineDB extends DBSchema {
  pending_mutations: { key: string; value: OfflineMutationEnvelope; indexes: { "by-status": string; "by-created": string } };
  sync_batches: { key: string; value: Record<string, unknown> };
  sync_conflicts: { key: string; value: Record<string, unknown> };
  cached_users: { key: string; value: Record<string, unknown> };
  cached_properties: { key: string; value: Record<string, unknown> };
  cached_units: { key: string; value: Record<string, unknown> };
  cached_tenants: { key: string; value: Record<string, unknown> };
  cached_landlords: { key: string; value: Record<string, unknown> };
  cached_charges: { key: string; value: Record<string, unknown> };
  cached_receipts: { key: string; value: Record<string, unknown> };
  cached_settings: { key: string; value: Record<string, unknown> };
  offline_files: { key: string; value: Blob };
}

let dbPromise: Promise<IDBPDatabase<GlamandiOfflineDB>> | null = null;

export function getOfflineDb() {
  if (typeof window === "undefined") throw new Error("IndexedDB is only available in the browser");
  dbPromise ??= openDB<GlamandiOfflineDB>("glamandi_offline", 1, {
    upgrade(db) {
      const pending = db.createObjectStore("pending_mutations", { keyPath: "localId" });
      pending.createIndex("by-status", "status");
      pending.createIndex("by-created", "createdAt");
      db.createObjectStore("sync_batches", { keyPath: "id" });
      db.createObjectStore("sync_conflicts", { keyPath: "id" });
      db.createObjectStore("cached_users", { keyPath: "id" });
      db.createObjectStore("cached_properties", { keyPath: "id" });
      db.createObjectStore("cached_units", { keyPath: "id" });
      db.createObjectStore("cached_tenants", { keyPath: "id" });
      db.createObjectStore("cached_landlords", { keyPath: "id" });
      db.createObjectStore("cached_charges", { keyPath: "id" });
      db.createObjectStore("cached_receipts", { keyPath: "id" });
      db.createObjectStore("cached_settings", { keyPath: "id" });
      db.createObjectStore("offline_files");
    },
  });
  return dbPromise;
}
