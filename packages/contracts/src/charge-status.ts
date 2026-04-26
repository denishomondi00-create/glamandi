export const CHARGE_STATUSES = {
  open: 'open',
  partiallyPaid: 'partially_paid',
  paid: 'paid',
  void: 'void',
  disputed: 'disputed',
} as const;
export type ChargeStatus = (typeof CHARGE_STATUSES)[keyof typeof CHARGE_STATUSES];
