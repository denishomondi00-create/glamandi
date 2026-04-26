export const TENANCY_STATUSES = {
  pendingMoveIn: 'pending_move_in',
  active: 'active',
  noticeGiven: 'notice_given',
  movedOut: 'moved_out',
  transferred: 'transferred',
  cancelled: 'cancelled',
} as const;
export type TenancyStatus = (typeof TENANCY_STATUSES)[keyof typeof TENANCY_STATUSES];
