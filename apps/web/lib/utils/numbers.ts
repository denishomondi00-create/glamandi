export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-KE").format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
