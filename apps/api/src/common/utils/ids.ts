import { randomBytes, randomUUID } from 'node:crypto';

export function makeId(prefix: string): string {
  return `${prefix}_${randomBytes(8).toString('hex')}`;
}

export function makeRequestId(): string {
  return randomUUID();
}

export function makeReceiptNumber(sequence: number, date = new Date()): string {
  const year = date.getFullYear();
  return `GLM-RCT-${year}-${String(sequence).padStart(6, '0')}`;
}

export function normalizeReference(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, '');
}
