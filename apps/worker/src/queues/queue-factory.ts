import { Queue } from 'bullmq';
import { createRedisConnection } from './connection';
import type { QueueName } from './queue-names';

export function createQueue(queueName: QueueName) {
  return new Queue(queueName, {
    connection: createRedisConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 10_000 },
      removeOnComplete: { age: 60 * 60 * 24 * 7 },
      removeOnFail: { age: 60 * 60 * 24 * 30 },
    },
  });
}
