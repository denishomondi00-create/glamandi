import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InquiryDocument = HydratedDocument<Inquiry>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Inquiry {
  @Prop({ default: 'website' })
  source?: String;

  @Prop({ required: true })
  fullName!: String;

  @Prop({ required: true })
  phone!: String;

  @Prop({})
  email?: String;

  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  interestedUnitId?: Types.ObjectId;

  @Prop({ default: 'new' })
  status?: String;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo?: Types.ObjectId;

  @Prop({})
  message?: String;

  @Prop({})
  followUpAt?: Date;

  @Prop({})
  duplicateKey?: String;

  @Prop()
  deleted_at?: Date;
}

export const InquirySchema = SchemaFactory.createForClass(Inquiry);
InquirySchema.index({ created_at: -1 });
