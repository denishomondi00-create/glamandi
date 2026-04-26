import type { ISODateString, ObjectIdString } from './api';

export type OfflineOperation =
  | 'CREATE_MANUAL_MPESA_PAYMENT'
  | 'CREATE_MANUAL_KCB_PAYMENT'
  | 'CREATE_CASH_PAYMENT'
  | 'CREATE_REPAIR_TICKET'
  | 'CREATE_INQUIRY'
  | 'CREATE_TENANT_NOTE'
  | 'CREATE_COMMUNICATION_EXCEPTION'
  | 'CREATE_UTILITY_CHARGE_DRAFT'
  | 'REQUEST_PENALTY_WAIVER';

export type OfflineMutationStatus = 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';

export interface OfflineMutationEnvelope<TPayload = unknown> {
  localId: string;
  operation: OfflineOperation;
  payload: TPayload;
  entityType: string;
  entityLocalId?: string;
  entityServerId?: ObjectIdString;
  createdAt: ISODateString;
  createdBy: ObjectIdString | string;
  deviceId: string;
  clientVersion: string;
  status: OfflineMutationStatus;
}

export interface SyncAcceptedMutation {
  localId: string;
  serverId?: ObjectIdString;
  entityType: string;
}

export interface SyncRejectedMutation {
  localId: string;
  reason: string;
  code: string;
}

export interface SyncConflictView {
  id: ObjectIdString;
  localId: string;
  entityType: string;
  reason: string;
  conflictType: 'duplicate_reference' | 'stale_entity' | 'closed_tenancy' | 'financial_duplicate' | 'deleted_or_merged_unit' | 'manual_review';
  serverRecord?: unknown;
  clientRecord?: unknown;
  status: 'open' | 'resolved' | 'rejected';
}

export interface SyncPushRequest {
  deviceId: string;
  clientVersion: string;
  mutations: OfflineMutationEnvelope[];
}

export interface SyncPushResponse {
  batchId: string;
  accepted: SyncAcceptedMutation[];
  rejected: SyncRejectedMutation[];
  conflicts: SyncConflictView[];
  serverTime: ISODateString;
}

export interface SyncPullResponse {
  since?: ISODateString;
  serverTime: ISODateString;
  records: Record<string, unknown[]>;
}
