import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnqueuePaymentReconciliationJob {
  constructor(@InjectQueue('payment-reconciliation') private readonly queue: Queue) {}

  enqueue(payload: Record<string, unknown>) {
    return this.queue.add('payment.reconcile', payload);
  }
}
