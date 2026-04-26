import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
  prefix: process.env.QUEUE_PREFIX ?? 'glamandi',
  defaultAttempts: Number(process.env.QUEUE_DEFAULT_ATTEMPTS ?? 3),
  backoffMs: Number(process.env.QUEUE_BACKOFF_MS ?? 30000),
}));
