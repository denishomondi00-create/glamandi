export const REPAIR_STATUSES = {
  new: 'new',
  assigned: 'assigned',
  inProgress: 'in_progress',
  pendingApproval: 'pending_approval',
  completed: 'completed',
  rejected: 'rejected',
  overdue: 'overdue',
} as const;
export type RepairStatus = (typeof REPAIR_STATUSES)[keyof typeof REPAIR_STATUSES];
