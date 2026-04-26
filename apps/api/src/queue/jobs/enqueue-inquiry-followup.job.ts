import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnqueueInquiryFollowupJob {
  constructor(@InjectQueue('inquiry-followup') private readonly queue: Queue) {}

  enqueue(payload: Record<string, unknown>) {
    return this.queue.add('inquiry.followup', payload);
  }
}
