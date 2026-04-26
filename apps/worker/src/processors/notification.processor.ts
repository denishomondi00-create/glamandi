import type { Job } from 'bullmq';
import { NotificationDispatchService } from '../services/notification-dispatch.service';

export class NotificationProcessor {
  constructor(private readonly service: NotificationDispatchService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
