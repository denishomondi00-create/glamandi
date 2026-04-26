export const CHARGE_TYPES = {
  rent: 'rent',
  deposit: 'deposit',
  utility: 'utility',
  penalty: 'penalty',
  repairDeduction: 'repair_deduction',
  other: 'other',
} as const;
export type ChargeType = (typeof CHARGE_TYPES)[keyof typeof CHARGE_TYPES];
