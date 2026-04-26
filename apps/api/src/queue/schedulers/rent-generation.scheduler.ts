import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class RentGenerationScheduler {
  constructor(@InjectQueue('rent-generation') private readonly queue: Queue) {}

  schedule() {
    return this.queue.add('rent-generation.scheduled', { scheduledAt: new Date().toISOString() });
  }
}
