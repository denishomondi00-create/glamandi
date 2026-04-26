import type { OfflineOperation } from '@glamandi/types/offline-sync';

export const OFFLINE_OPERATIONS: Record<OfflineOperation, { label: string; entityType: string; requiresManualConflictReview: boolean }> = {
  CREATE_MANUAL_MPESA_PAYMENT: { label: 'Manual M-Pesa payment draft', entityType: 'payment', requiresManualConflictReview: true },
  CREATE_MANUAL_KCB_PAYMENT: { label: 'Manual KCB payment draft', entityType: 'payment', requiresManualConflictReview: true },
  CREATE_CASH_PAYMENT: { label: 'Cash payment draft', entityType: 'payment', requiresManualConflictReview: true },
  CREATE_REPAIR_TICKET: { label: 'Repair ticket', entityType: 'repair_ticket', requiresManualConflictReview: false },
  CREATE_INQUIRY: { label: 'Inquiry', entityType: 'inquiry', requiresManualConflictReview: false },
  CREATE_TENANT_NOTE: { label: 'Tenant note', entityType: 'tenant_note', requiresManualConflictReview: false },
  CREATE_COMMUNICATION_EXCEPTION: { label: 'Communication exception', entityType: 'communication_exception', requiresManualConflictReview: false },
  CREATE_UTILITY_CHARGE_DRAFT: { label: 'Utility charge draft', entityType: 'utility_charge', requiresManualConflictReview: true },
  REQUEST_PENALTY_WAIVER: { label: 'Penalty waiver request', entityType: 'penalty', requiresManualConflictReview: true },
};

export const OFFLINE_ALLOWED_OPERATIONS = Object.keys(OFFLINE_OPERATIONS) as OfflineOperation[];

export function assertOfflineOperation(operation: string): asserts operation is OfflineOperation {
  if (!OFFLINE_ALLOWED_OPERATIONS.includes(operation as OfflineOperation)) {
    throw new Error(`Unsupported offline operation: ${operation}`);
  }
}
