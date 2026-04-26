import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SettingDocument = HydratedDocument<Setting>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Setting {
  @Prop({ required: true, unique: true })
  key!: string;

  @Prop({ type: Object, default: {} })
  value?: Record<string, unknown>;

  @Prop({})
  group?: string;

  @Prop({})
  description?: string;

  @Prop()
  deleted_at?: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
SettingSchema.index({ key: 1 }, { unique: true });
