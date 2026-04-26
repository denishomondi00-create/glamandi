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
  slug!: String;

  @Prop({ required: true })
  title!: String;

  @Prop({})
  summary?: String;

  @Prop({})
  description?: String;

  @Prop({ default: 0 })
  price?: Number;

  @Prop({})
  locationLabel?: String;

  @Prop({ default: false })
  published?: Boolean;

  @Prop({ default: false })
  featured?: Boolean;

  @Prop({ type: [String], default: [] })
  images?: [String];

  @Prop({ type: Object, default: {} })
  seo?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const WebsiteListingSchema = SchemaFactory.createForClass(WebsiteListing);
WebsiteListingSchema.index({ slug: 1 }, { unique: true });
