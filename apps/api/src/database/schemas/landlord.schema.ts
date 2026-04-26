import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LandlordDocument = HydratedDocument<Landlord>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Landlord {
  @Prop({ required: true })
  firstName!: String;

  @Prop({})
  lastName?: String;

  @Prop({ required: true })
  phone!: String;

  @Prop({ lowercase: true, trim: true })
  email?: String;

  @Prop({ default: 'active' })
  status?: String;

  @Prop({})
  idNumber?: String;

  @Prop({ type: Object, default: {} })
  bankDetails?: Record<string, unknown>;

  @Prop({})
  notes?: String;

  @Prop()
  deleted_at?: Date;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
LandlordSchema.index({ created_at: -1 });
