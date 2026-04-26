import type { Job } from 'bullmq';
import { ReceiptGenerationService } from '../services/receipt-generation.service';

export class ReceiptGenerationProcessor {
  constructor(private readonly service: ReceiptGenerationService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
