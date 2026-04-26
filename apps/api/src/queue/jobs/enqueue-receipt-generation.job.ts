import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnqueueReceiptGenerationJob {
  constructor(@InjectQueue('receipt-generation') private readonly queue: Queue) {}

  enqueue(payload: Record<string, unknown>) {
    return this.queue.add('receipt.generate', payload);
  }
}
