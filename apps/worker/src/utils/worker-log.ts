import type { Job } from 'bullmq';

export function jobLabel(job: Job) {
  return `${job.queueName}:${job.name}#${job.id ?? 'new'}`;
}
