export const PAYOUT_STATUSES = {
  draft: 'draft',
  approved: 'approved',
  paid: 'paid',
  reversed: 'reversed',
  failed: 'failed',
} as const;
export type PayoutStatus = (typeof PAYOUT_STATUSES)[keyof typeof PAYOUT_STATUSES];
