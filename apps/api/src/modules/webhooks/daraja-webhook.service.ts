import { Injectable } from '@nestjs/common';
import { WebhookEventsService } from './webhook-events.service';

@Injectable()
export class DarajaWebhookService {
  constructor(private readonly events: WebhookEventsService) {}

  async handle(kind: string, payload: Record<string, unknown>) {
    const event = await this.events.record(`daraja:${kind}`, payload);
    return { accepted: true, eventId: String(event._id), provider: 'daraja', kind };
  }
}
