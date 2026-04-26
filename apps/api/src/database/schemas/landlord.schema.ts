import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LandlordDocument = HydratedDocument<Landlord>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Landlord {
  @Prop({ required: true })
  firstName!: string;

  @Prop({})
  lastName?: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ lowercase: true, trim: true })
  email?: string;

  @Prop({ default: 'active' })
  status?: string;

  @Prop({})
  idNumber?: string;

  @Prop({ type: Object, default: {} })
  bankDetails?: Record<string, unknown>;

  @Prop({})
  notes?: string;

  @Prop()
  deleted_at?: Date;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
LandlordSchema.index({ created_at: -1 });
