import { Queue } from 'bullmq';
import { createRedisConnection } from '../queues/connection';
import { REPEATABLE_JOBS } from '../queues/repeat-options';

export async function registerSchedulers() {
  const queues: Queue[] = [];
  for (const item of REPEATABLE_JOBS) {
    const queue = new Queue(item.queueName, { connection: createRedisConnection() });
    queues.push(queue);
    await queue.add(item.jobName, item.payload, {
      jobId: item.jobName,
      repeat: { pattern: item.cron },
      removeOnComplete: { age: 60 * 60 * 24 * 7 },
      removeOnFail: { age: 60 * 60 * 24 * 30 },
    });
  }
  console.log(`[worker] Registered ${REPEATABLE_JOBS.length} repeatable schedulers.`);
  return queues;
}
