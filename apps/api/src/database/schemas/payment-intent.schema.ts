import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentIntentDocument = HydratedDocument<PaymentIntent>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PaymentIntent {
  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({ required: true })
  method!: String;

  @Prop({})
  provider?: String;

  @Prop({ required: true, default: 0 })
  amount!: Number;

  @Prop({ default: 'KES' })
  currency?: String;

  @Prop({ required: true, unique: true })
  reference!: String;

  @Prop({})
  externalId?: String;

  @Prop({ default: 'pending' })
  status?: String;

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const PaymentIntentSchema = SchemaFactory.createForClass(PaymentIntent);
PaymentIntentSchema.index({ reference: 1 }, { unique: true, sparse: true });
