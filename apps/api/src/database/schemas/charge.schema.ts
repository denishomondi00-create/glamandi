import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChargeDocument = HydratedDocument<Charge>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Charge {
  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
  tenantId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  unitId?: Types.ObjectId;

  @Prop({ required: true })
  type!: string;

  @Prop({})
  period?: string;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({ required: true, default: 0 })
  balance!: number;

  @Prop({})
  dueDate?: Date;

  @Prop({ default: 'open' })
  status?: string;

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const ChargeSchema = SchemaFactory.createForClass(Charge);
ChargeSchema.index({ created_at: -1 });
