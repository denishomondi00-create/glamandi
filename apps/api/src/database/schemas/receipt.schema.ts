import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReceiptDocument = HydratedDocument<Receipt>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Receipt {
  @Prop({ type: Types.ObjectId, ref: 'Payment', required: true })
  paymentId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  receiptNumber!: String;

  @Prop({ required: true, default: 0 })
  amount!: Number;

  @Prop({ default: Date.now })
  issuedAt?: Date;

  @Prop({})
  pdfUrl?: String;

  @Prop({ default: 'issued' })
  status?: String;

  @Prop()
  deleted_at?: Date;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);
ReceiptSchema.index({ receiptNumber: 1 }, { unique: true });
