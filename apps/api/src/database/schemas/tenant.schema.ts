import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Tenant {
  @Prop({ required: true })
  firstName!: String;

  @Prop({})
  lastName?: String;

  @Prop({ required: true })
  phone!: String;

  @Prop({ lowercase: true, trim: true })
  email?: String;

  @Prop({})
  idNumber?: String;

  @Prop({ default: 'active' })
  status?: String;

  @Prop({ type: Object, default: {} })
  emergencyContact?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
TenantSchema.index({ created_at: -1 });
