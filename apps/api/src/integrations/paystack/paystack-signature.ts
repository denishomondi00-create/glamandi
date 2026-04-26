import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyPaystackSignature(rawBody: Buffer | string, signature: string | undefined, secret: string | undefined): boolean {
  if (!signature || !secret) return false;
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody);
  const expected = createHmac('sha512', secret).update(body).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
