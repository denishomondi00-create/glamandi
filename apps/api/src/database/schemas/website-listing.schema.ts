import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WebsiteListingDocument = HydratedDocument<WebsiteListing>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class WebsiteListing {
  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  unitId?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({})
  summary?: string;

  @Prop({})
  description?: string;

  @Prop({ default: 0 })
  price?: number;

  @Prop({})
  locationLabel?: string;

  @Prop({ default: false })
  published?: boolean;

  @Prop({ default: false })
  featured?: boolean;

  @Prop({ type: [String], default: [] })
  images?: [string];

  @Prop({ type: Object, default: {} })
  seo?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const WebsiteListingSchema = SchemaFactory.createForClass(WebsiteListing);
WebsiteListingSchema.index({ slug: 1 }, { unique: true });
