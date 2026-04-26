import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InquiryDocument = HydratedDocument<Inquiry>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Inquiry {
  @Prop({ default: 'website' })
  source?: string;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({})
  email?: string;

  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  interestedUnitId?: Types.ObjectId;

  @Prop({ default: 'new' })
  status?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo?: Types.ObjectId;

  @Prop({})
  message?: string;

  @Prop({})
  followUpAt?: Date;

  @Prop({})
  duplicateKey?: string;

  @Prop()
  deleted_at?: Date;
}

export const InquirySchema = SchemaFactory.createForClass(Inquiry);
InquirySchema.index({ created_at: -1 });
