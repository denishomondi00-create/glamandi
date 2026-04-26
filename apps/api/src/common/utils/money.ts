export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function calculateCommission(collected: number, rate = 0.1): number {
  return roundMoney(collected * rate);
}

export function calculateLandlordNetPayout(input: { collectedRent: number; commission: number; repairDeductions?: number; withdrawals?: number }) {
  return roundMoney(input.collectedRent - input.commission - (input.repairDeductions ?? 0) - (input.withdrawals ?? 0));
}
