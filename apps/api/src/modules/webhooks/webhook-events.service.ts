import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookEvent, WebhookEventDocument } from '../../database/schemas/webhook-event.schema';

@Injectable()
export class WebhookEventsService {
  constructor(@InjectModel(WebhookEvent.name) private readonly model: Model<WebhookEventDocument>) {}

  record(provider: string, payload: Record<string, unknown>, signature?: string) {
    const data = typeof payload.data === 'object' && payload.data !== null ? (payload.data as Record<string, unknown>) : {};
    return this.model.create({ provider, payload, signature, eventId: String(payload.event ?? payload.id ?? ''), reference: String(payload.reference ?? data.reference ?? '') });
  }

  markProcessed(id: string) {
    return this.model.findByIdAndUpdate(id, { $set: { status: 'processed', processedAt: new Date() } }, { new: true }).lean();
  }
}
