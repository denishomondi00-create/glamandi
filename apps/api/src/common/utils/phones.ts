export function normalizeKenyanPhone(phone: string): string {
  const clean = phone.replace(/[^\d+]/g, '');
  if (clean.startsWith('+')) return clean;
  if (clean.startsWith('254')) return `+${clean}`;
  if (clean.startsWith('0')) return `+254${clean.slice(1)}`;
  return clean;
}

export function maskPhone(phone: string): string {
  const normalized = normalizeKenyanPhone(phone);
  return `${normalized.slice(0, 5)}****${normalized.slice(-3)}`;
}
