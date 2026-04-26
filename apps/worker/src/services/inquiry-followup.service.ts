import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { ApiClientService } from './api-client.service';
import { WorkerLoggerService } from './logger.service';

@Injectable()
export class InquiryFollowupService {
  constructor(
    private readonly api: ApiClientService,
    private readonly logger: WorkerLoggerService,
  ) {}

  async handle(payload: Record<string, unknown> = {}, job?: Job) {
    this.logger.info('Flag stale inquiries and queue follow-ups.', { jobId: job?.id, jobName: job?.name, payload });
    const endpoint = '/inquiries/stale/follow-up';
    return this.api.post(endpoint, { ...payload, workerJobId: job?.id, workerJobName: job?.name });
  }
}
