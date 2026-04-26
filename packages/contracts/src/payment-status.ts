export const PAYMENT_STATUSES = {
  draft: 'draft',
  pending: 'pending',
  posted: 'posted',
  reversed: 'reversed',
  failed: 'failed',
  duplicateReview: 'duplicate_review',
} as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];
