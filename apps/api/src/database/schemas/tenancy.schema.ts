import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TenancyDocument = HydratedDocument<Tenancy>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Tenancy {
  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
  tenantId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Unit', required: true })
  unitId!: Types.ObjectId;

  @Prop({ default: 'active' })
  status?: String;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({})
  endDate?: Date;

  @Prop({ required: true, default: 0 })
  rentAmount!: Number;

  @Prop({ default: 0 })
  depositAmount?: Number;

  @Prop({ default: 5 })
  billingDay?: Number;

  @Prop({ type: Object, default: {} })
  propertyLocationSnapshot?: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  terms?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const TenancySchema = SchemaFactory.createForClass(Tenancy);
TenancySchema.index({ created_at: -1 });
