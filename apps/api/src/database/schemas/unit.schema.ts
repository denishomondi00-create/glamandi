import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UnitDocument = HydratedDocument<Unit>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Unit {
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId!: Types.ObjectId;

  @Prop({})
  unitNumber?: String;

  @Prop({ required: true })
  unitLabel!: String;

  @Prop({})
  type?: String;

  @Prop({ default: 0 })
  bedrooms?: Number;

  @Prop({ default: 0 })
  bathrooms?: Number;

  @Prop({ required: true, default: 0 })
  rentAmount!: Number;

  @Prop({ default: 0 })
  depositAmount?: Number;

  @Prop({ default: 'vacant' })
  status?: String;

  @Prop({ default: 'unlocked' })
  lockStatus?: String;

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
