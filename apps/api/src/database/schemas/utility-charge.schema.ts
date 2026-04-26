import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UtilityChargeDocument = HydratedDocument<UtilityCharge>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class UtilityCharge {
  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ required: true })
  type!: string;

  @Prop({})
  meterNumber?: string;

  @Prop({})
  reading?: number;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({})
  period?: string;

  @Prop({ default: 'open' })
  status?: string;

  @Prop()
  deleted_at?: Date;
}

export const UtilityChargeSchema = SchemaFactory.createForClass(UtilityCharge);
UtilityChargeSchema.index({ created_at: -1 });
