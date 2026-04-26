import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnqueueReportExportJob {
  constructor(@InjectQueue('report-export') private readonly queue: Queue) {}

  enqueue(payload: Record<string, unknown>) {
    return this.queue.add('report.export', payload);
  }
}
