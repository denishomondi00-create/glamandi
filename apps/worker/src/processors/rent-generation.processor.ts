import type { Job } from 'bullmq';
import { RentGenerationService } from '../services/rent-generation.service';

export class RentGenerationProcessor {
  constructor(private readonly service: RentGenerationService) {}

  process(job: Job<Record<string, unknown>>) {
    return this.service.handle(job.data ?? {}, job);
  }
}
