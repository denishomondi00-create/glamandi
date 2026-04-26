import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Property {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  landlordId?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  location?: Record<string, unknown>;

  @Prop({ default: 'active' })
  status?: string;

  @Prop({ default: 'draft' })
  listingStatus?: string;

  @Prop({ default: 'managed' })
  managementType?: string;

  @Prop({ type: Types.ObjectId, ref: 'CommissionRule' })
  commissionRuleId?: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images?: [string];

  @Prop()
  deleted_at?: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
PropertySchema.index({ created_at: -1 });
