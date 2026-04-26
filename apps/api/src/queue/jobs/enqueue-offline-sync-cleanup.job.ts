import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnqueueOfflineSyncCleanupJob {
  constructor(@InjectQueue('offline-sync-cleanup') private readonly queue: Queue) {}

  enqueue(payload: Record<string, unknown>) {
    return this.queue.add('offline.cleanup', payload);
  }
}
