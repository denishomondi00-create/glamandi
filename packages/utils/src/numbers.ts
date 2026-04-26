export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function percentage(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 10000) / 100;
}
