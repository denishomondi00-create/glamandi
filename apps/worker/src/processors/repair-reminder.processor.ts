import type { Job } from 'bullmq';
import { RepairReminderService } from '../services/repair-reminder.service';

export class RepairReminderProcessor {
  constructor(private readonly service: RepairReminderService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
