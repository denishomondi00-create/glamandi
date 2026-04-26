import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnqueueWebsiteSyncJob {
  constructor(@InjectQueue('website-sync') private readonly queue: Queue) {}

  enqueue(payload: Record<string, unknown>) {
    return this.queue.add('website.sync', payload);
  }
}
