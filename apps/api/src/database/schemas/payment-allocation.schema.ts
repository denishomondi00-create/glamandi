import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentAllocationDocument = HydratedDocument<PaymentAllocation>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PaymentAllocation {
  @Prop({ type: Types.ObjectId, ref: 'Payment', required: true })
  paymentId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Charge', required: true })
  chargeId!: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  amount!: Number;

  @Prop({ default: Date.now })
  allocationDate?: Date;

  @Prop()
  deleted_at?: Date;
}

export const PaymentAllocationSchema = SchemaFactory.createForClass(PaymentAllocation);
PaymentAllocationSchema.index({ created_at: -1 });
