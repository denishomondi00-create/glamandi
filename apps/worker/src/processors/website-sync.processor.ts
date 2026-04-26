import type { Job } from 'bullmq';
import { WebsiteSyncService } from '../services/website-sync.service';

export class WebsiteSyncProcessor {
  constructor(private readonly service: WebsiteSyncService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
