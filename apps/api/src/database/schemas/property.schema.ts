import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Property {
  @Prop({ required: true })
  name!: String;

  @Prop({ required: true, unique: true })
  slug!: String;

  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  landlordId?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  location?: Record<string, unknown>;

  @Prop({ default: 'active' })
  status?: String;

  @Prop({ default: 'draft' })
  listingStatus?: String;

  @Prop({ default: 'managed' })
  managementType?: String;

  @Prop({ type: Types.ObjectId, ref: 'CommissionRule' })
  commissionRuleId?: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images?: [String];

  @Prop()
  deleted_at?: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
PropertySchema.index({ created_at: -1 });
