import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PenaltyDocument = HydratedDocument<Penalty>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Penalty {
  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Charge' })
  chargeId?: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({})
  band?: string;

  @Prop({ default: 'pending' })
  status?: string;

  @Prop({})
  reason?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  waivedBy?: Types.ObjectId;

  @Prop()
  deleted_at?: Date;
}

export const PenaltySchema = SchemaFactory.createForClass(Penalty);
PenaltySchema.index({ created_at: -1 });
