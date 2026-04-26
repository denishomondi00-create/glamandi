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
  type!: String;

  @Prop({})
  meterNumber?: String;

  @Prop({})
  reading?: Number;

  @Prop({ required: true, default: 0 })
  amount!: Number;

  @Prop({})
  period?: String;

  @Prop({ default: 'open' })
  status?: String;

  @Prop()
  deleted_at?: Date;
}

export const UtilityChargeSchema = SchemaFactory.createForClass(UtilityCharge);
UtilityChargeSchema.index({ created_at: -1 });
