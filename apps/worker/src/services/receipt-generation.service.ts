import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { ApiClientService } from './api-client.service';
import { WorkerLoggerService } from './logger.service';

@Injectable()
export class ReceiptGenerationService {
  constructor(
    private readonly api: ApiClientService,
    private readonly logger: WorkerLoggerService,
  ) {}

  async handle(payload: Record<string, unknown> = {}, job?: Job) {
    this.logger.info('Generate or regenerate receipt PDF documents.', { jobId: job?.id, jobName: job?.name, payload });
    const endpoint = `/receipts/${payload.receiptId ?? payload.id}/regenerate-pdf`;
    return this.api.post(endpoint, { ...payload, workerJobId: job?.id, workerJobName: job?.name });
  }
}
