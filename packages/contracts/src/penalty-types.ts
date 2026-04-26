export const PENALTY_TYPES = {
  lateRentBandOne: 'late_rent_band_one',
  lateRentBandTwo: 'late_rent_band_two',
  lateRentBandThree: 'late_rent_band_three',
  fullMonthDefault: 'full_month_default',
  manual: 'manual',
} as const;
export type PenaltyType = (typeof PENALTY_TYPES)[keyof typeof PENALTY_TYPES];
export const PENALTY_BANDS = [
  { fromDay: 6, toDay: 10, amount: 500, type: PENALTY_TYPES.lateRentBandOne },
  { fromDay: 11, toDay: 15, amount: 700, type: PENALTY_TYPES.lateRentBandTwo },
  { fromDay: 16, toDay: 30, amount: 1000, type: PENALTY_TYPES.lateRentBandThree },
  { fromDay: 31, toDay: null, amount: 1400, type: PENALTY_TYPES.fullMonthDefault },
] as const;
