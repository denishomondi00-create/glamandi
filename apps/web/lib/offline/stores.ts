export type OfflineOperation =
  | "CREATE_MANUAL_MPESA_PAYMENT"
  | "CREATE_MANUAL_KCB_PAYMENT"
  | "CREATE_CASH_PAYMENT"
  | "CREATE_REPAIR_TICKET"
  | "CREATE_INQUIRY"
  | "CREATE_TENANT_NOTE"
  | "CREATE_COMMUNICATION_EXCEPTION"
  | "CREATE_UTILITY_CHARGE_DRAFT"
  | "REQUEST_PENALTY_WAIVER";

export type OfflineMutationEnvelope = {
  localId: string;
  operation: OfflineOperation;
  payload: unknown;
  entityType: string;
  entityLocalId?: string;
  entityServerId?: string;
  createdAt: string;
  createdBy: string;
  deviceId: string;
  clientVersion: string;
  status: "pending" | "syncing" | "synced" | "failed" | "conflict";
};

export const offlineStoreNames = [
  "cached_users",
  "cached_properties",
  "cached_units",
  "cached_tenants",
  "cached_landlords",
  "cached_charges",
  "cached_receipts",
  "cached_settings",
  "pending_mutations",
  "sync_batches",
  "sync_conflicts",
  "offline_files",
] as const;
