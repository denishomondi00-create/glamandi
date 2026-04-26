import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyPaystackSignature } from '../../integrations/paystack/paystack-signature';
import { WebhookEventsService } from './webhook-events.service';

@Injectable()
export class PaystackWebhookService {
  constructor(private readonly config: ConfigService, private readonly events: WebhookEventsService) {}

  async handle(rawBody: Buffer, payload: Record<string, unknown>, signature?: string) {
    const valid = verifyPaystackSignature(rawBody, signature, this.config.get<string>('payments.paystack.webhookSecret'));
    if (!valid && this.config.get<string>('app.environment') === 'production') {
      throw new BadRequestException('Invalid Paystack signature');
    }
    const event = await this.events.record('paystack', payload, signature);
    return { accepted: true, eventId: String(event._id), provider: 'paystack' };
  }
}
