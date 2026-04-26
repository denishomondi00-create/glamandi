import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class StatementGenerationScheduler {
  constructor(@InjectQueue('statement-generation') private readonly queue: Queue) {}

  schedule() {
    return this.queue.add('statement-generation.scheduled', { scheduledAt: new Date().toISOString() });
  }
}
