import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PaymentMethod {
  @Prop({ required: true, unique: true })
  code!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ default: 'active' })
  status?: string;

  @Prop({ default: false })
  requiresProof?: boolean;

  @Prop({ default: false })
  supportsWebhook?: boolean;

  @Prop({ default: false })
  supportsAutoVerification?: boolean;

  @Prop({ default: false })
  supportsOfflineDraft?: boolean;

  @Prop({ type: Object, default: {} })
  config?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
PaymentMethodSchema.index({ code: 1 }, { unique: true });
