import type { Job } from 'bullmq';
import { InquiryFollowupService } from '../services/inquiry-followup.service';

export class InquiryFollowupProcessor {
  constructor(private readonly service: InquiryFollowupService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
