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
  receiptNumber!: string;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({ default: Date.now })
  issuedAt?: Date;

  @Prop({})
  pdfUrl?: string;

  @Prop({ default: 'issued' })
  status?: string;

  @Prop()
  deleted_at?: Date;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);
ReceiptSchema.index({ receiptNumber: 1 }, { unique: true });
