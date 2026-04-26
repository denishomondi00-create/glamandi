export function formatKes(amount: number) {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
}

export function toMinorUnits(amount: number) {
  return Math.round(amount * 100);
}

export function fromMinorUnits(amount: number) {
  return amount / 100;
}
