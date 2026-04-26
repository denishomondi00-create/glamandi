import type { Job } from 'bullmq';
import { ExportGenerationService } from '../services/export-generation.service';

export class ExportGenerationProcessor {
  constructor(private readonly service: ExportGenerationService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
