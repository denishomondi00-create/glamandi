import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Tenant {
  @Prop({ required: true })
  firstName!: string;

  @Prop({})
  lastName?: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ lowercase: true, trim: true })
  email?: string;

  @Prop({})
  idNumber?: string;

  @Prop({ default: 'active' })
  status?: string;

  @Prop({ type: Object, default: {} })
  emergencyContact?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
TenantSchema.index({ created_at: -1 });
