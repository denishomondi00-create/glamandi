import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RepairExpenseDocument = HydratedDocument<RepairExpense>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class RepairExpense {
  @Prop({ type: Types.ObjectId, ref: 'RepairTicket' })
  repairId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  landlordId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId?: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  amount!: Number;

  @Prop({ default: 'pending' })
  status?: String;

  @Prop({ default: false })
  deductionApproved?: Boolean;

  @Prop({})
  receiptUrl?: String;

  @Prop()
  deleted_at?: Date;
}

export const RepairExpenseSchema = SchemaFactory.createForClass(RepairExpense);
RepairExpenseSchema.index({ created_at: -1 });
