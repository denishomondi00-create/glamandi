import type { Job } from 'bullmq';
import { StatementGenerationService } from '../services/statement-generation.service';

export class StatementGenerationProcessor {
  constructor(private readonly service: StatementGenerationService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
