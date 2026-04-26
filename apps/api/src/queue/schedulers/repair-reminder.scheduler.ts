import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class RepairReminderScheduler {
  constructor(@InjectQueue('repair-reminders') private readonly queue: Queue) {}

  schedule() {
    return this.queue.add('repair-reminders.scheduled', { scheduledAt: new Date().toISOString() });
  }
}
