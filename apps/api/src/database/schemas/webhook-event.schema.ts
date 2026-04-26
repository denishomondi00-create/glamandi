import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WebhookEventDocument = HydratedDocument<WebhookEvent>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class WebhookEvent {
  @Prop({ required: true })
  provider!: string;

  @Prop({})
  eventId?: string;

  @Prop({})
  reference?: string;

  @Prop({})
  signature?: string;

  @Prop({ type: Object, default: {} })
  payload?: Record<string, unknown>;

  @Prop({ default: 'received' })
  status?: string;

  @Prop({})
  processedAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);
WebhookEventSchema.index({ created_at: -1 });
