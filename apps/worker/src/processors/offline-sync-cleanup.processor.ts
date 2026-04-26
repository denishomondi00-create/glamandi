import type { Job } from 'bullmq';
import { OfflineSyncCleanupService } from '../services/offline-sync-cleanup.service';

export class OfflineSyncCleanupProcessor {
  constructor(private readonly service: OfflineSyncCleanupService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
