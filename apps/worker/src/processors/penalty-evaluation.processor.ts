import type { Job } from 'bullmq';
import { PenaltyEvaluationService } from '../services/penalty-evaluation.service';

export class PenaltyEvaluationProcessor {
  constructor(private readonly service: PenaltyEvaluationService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
