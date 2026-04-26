import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LandlordStatementDocument = HydratedDocument<LandlordStatement>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class LandlordStatement {
  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  landlordId?: Types.ObjectId;

  @Prop({ required: true })
  periodStart!: Date;

  @Prop({ required: true })
  periodEnd!: Date;

  @Prop({ default: 0 })
  grossCollected?: number;

  @Prop({ default: 0 })
  commission?: number;

  @Prop({ default: 0 })
  repairDeductions?: number;

  @Prop({ default: 0 })
  withdrawals?: number;

  @Prop({ default: 0 })
  netPayout?: number;

  @Prop({ default: 'draft' })
  status?: string;

  @Prop({})
  pdfUrl?: string;

  @Prop()
  deleted_at?: Date;
}

export const LandlordStatementSchema = SchemaFactory.createForClass(LandlordStatement);
LandlordStatementSchema.index({ created_at: -1 });
