import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UnitDocument = HydratedDocument<Unit>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Unit {
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId!: Types.ObjectId;

  @Prop({})
  unitNumber?: string;

  @Prop({ required: true })
  unitLabel!: string;

  @Prop({})
  type?: string;

  @Prop({ default: 0 })
  bedrooms?: number;

  @Prop({ default: 0 })
  bathrooms?: number;

  @Prop({ required: true, default: 0 })
  rentAmount!: number;

  @Prop({ default: 0 })
  depositAmount?: number;

  @Prop({ default: 'vacant' })
  status?: string;

  @Prop({ default: 'unlocked' })
  lockStatus?: string;

  @Prop({ type: Object, default: {} })
  locationDetail?: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  listing?: Record<string, unknown>;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  currentTenantId?: Types.ObjectId;

  @Prop()
  deleted_at?: Date;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.index({ created_at: -1 });
