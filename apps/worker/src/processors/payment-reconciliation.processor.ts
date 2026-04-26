import type { Job } from 'bullmq';
import { PaymentReconciliationService } from '../services/payment-reconciliation.service';

export class PaymentReconciliationProcessor {
  constructor(private readonly service: PaymentReconciliationService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
