import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
  tenantId!: Types.ObjectId;

  @Prop({ required: true })
  method!: string;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({ default: 'KES' })
  currency?: string;

  @Prop({ unique: true, sparse: true })
  reference?: string;

  @Prop({})
  channel?: string;

  @Prop({ default: 'pending' })
  status?: string;

  @Prop({})
  paidAt?: Date;

  @Prop({ default: 'unallocated' })
  allocationStatus?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  postedBy?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  reversal?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ reference: 1 }, { unique: true, sparse: true });
