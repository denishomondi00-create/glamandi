import { calculateCommission, calculateLandlordNetPayout } from '../../common/utils/money';

describe('money utils', () => {
  it('calculates Glamandi commission', () => {
    expect(calculateCommission(10000, 0.1)).toBe(1000);
  });

  it('calculates landlord net payout', () => {
    expect(calculateLandlordNetPayout({ collectedRent: 10000, commission: 1000, repairDeductions: 500 })).toBe(8500);
  });
});
