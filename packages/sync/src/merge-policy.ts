import type { OfflineOperation } from '@glamandi/types/offline-sync';

export type MergeStrategy = 'server_wins' | 'client_append' | 'merge_if_valid' | 'manual_admin_resolution' | 'reject_offline_edit';

export const MERGE_POLICY_BY_OPERATION: Record<OfflineOperation, MergeStrategy> = {
  CREATE_MANUAL_MPESA_PAYMENT: 'manual_admin_resolution',
  CREATE_MANUAL_KCB_PAYMENT: 'manual_admin_resolution',
  CREATE_CASH_PAYMENT: 'manual_admin_resolution',
  CREATE_REPAIR_TICKET: 'merge_if_valid',
  CREATE_INQUIRY: 'merge_if_valid',
  CREATE_TENANT_NOTE: 'client_append',
  CREATE_COMMUNICATION_EXCEPTION: 'client_append',
  CREATE_UTILITY_CHARGE_DRAFT: 'manual_admin_resolution',
  REQUEST_PENALTY_WAIVER: 'manual_admin_resolution',
};

export function getMergeStrategy(operation: OfflineOperation): MergeStrategy {
  return MERGE_POLICY_BY_OPERATION[operation] ?? 'manual_admin_resolution';
}
