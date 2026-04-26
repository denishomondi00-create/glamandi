export const SYNC_STATUSES = {
  pending: 'pending',
  syncing: 'syncing',
  synced: 'synced',
  failed: 'failed',
  conflict: 'conflict',
  rejected: 'rejected',
} as const;
export type SyncStatus = (typeof SYNC_STATUSES)[keyof typeof SYNC_STATUSES];
