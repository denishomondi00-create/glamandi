export const SYNC_CONFLICT_TYPES = {
  duplicateReference: 'duplicate_reference',
  staleEntity: 'stale_entity',
  closedTenancy: 'closed_tenancy',
  financialDuplicate: 'financial_duplicate',
  deletedOrMergedUnit: 'deleted_or_merged_unit',
  manualReview: 'manual_review',
} as const;

export type SyncConflictType = (typeof SYNC_CONFLICT_TYPES)[keyof typeof SYNC_CONFLICT_TYPES];

export const FINANCIAL_CONFLICT_TYPES: SyncConflictType[] = [
  SYNC_CONFLICT_TYPES.duplicateReference,
  SYNC_CONFLICT_TYPES.financialDuplicate,
  SYNC_CONFLICT_TYPES.closedTenancy,
];
