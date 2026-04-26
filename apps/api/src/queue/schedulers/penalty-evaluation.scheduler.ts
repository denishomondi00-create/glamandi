import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class PenaltyEvaluationScheduler {
  constructor(@InjectQueue('penalty-evaluation') private readonly queue: Queue) {}

  schedule() {
    return this.queue.add('penalty-evaluation.scheduled', { scheduledAt: new Date().toISOString() });
  }
}
