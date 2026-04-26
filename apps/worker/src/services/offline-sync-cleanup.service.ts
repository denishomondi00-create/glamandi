import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { ApiClientService } from './api-client.service';
import { WorkerLoggerService } from './logger.service';

@Injectable()
export class OfflineSyncCleanupService {
  constructor(
    private readonly api: ApiClientService,
    private readonly logger: WorkerLoggerService,
  ) {}

  async handle(payload: Record<string, unknown> = {}, job?: Job) {
    this.logger.info('Clear old synced batches and flag stale conflicts.', { jobId: job?.id, jobName: job?.name, payload });
    const endpoint = '/sync/cleanup';
    return this.api.post(endpoint, { ...payload, workerJobId: job?.id, workerJobName: job?.name });
  }
}
