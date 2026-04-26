import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PaymentMethod {
  @Prop({ required: true, unique: true })
  code!: String;

  @Prop({ required: true })
  name!: String;

  @Prop({ default: 'active' })
  status?: String;

  @Prop({ default: false })
  requiresProof?: Boolean;

  @Prop({ default: false })
  supportsWebhook?: Boolean;

  @Prop({ default: false })
  supportsAutoVerification?: Boolean;

  @Prop({ default: false })
  supportsOfflineDraft?: Boolean;

  @Prop({ type: Object, default: {} })
  config?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
PaymentMethodSchema.index({ code: 1 }, { unique: true });
