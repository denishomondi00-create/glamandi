import type { OfflineMutationEnvelope, OfflineOperation } from '@glamandi/types/offline-sync';

export function createMutationEnvelope<TPayload>(input: {
  operation: OfflineOperation;
  payload: TPayload;
  entityType: string;
  entityLocalId?: string;
  entityServerId?: string;
  createdBy: string;
  deviceId: string;
  clientVersion: string;
}): OfflineMutationEnvelope<TPayload> {
  return {
    localId: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    operation: input.operation,
    payload: input.payload,
    entityType: input.entityType,
    entityLocalId: input.entityLocalId,
    entityServerId: input.entityServerId,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
    deviceId: input.deviceId,
    clientVersion: input.clientVersion,
    status: 'pending',
  };
}

export function isFinancialOfflineOperation(operation: OfflineOperation) {
  return operation === 'CREATE_MANUAL_MPESA_PAYMENT' || operation === 'CREATE_MANUAL_KCB_PAYMENT' || operation === 'CREATE_CASH_PAYMENT';
}
