import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SettingDocument = HydratedDocument<Setting>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Setting {
  @Prop({ required: true, unique: true })
  key!: String;

  @Prop({ type: Object, default: {} })
  value?: Record<string, unknown>;

  @Prop({})
  group?: String;

  @Prop({})
  description?: String;

  @Prop()
  deleted_at?: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
SettingSchema.index({ key: 1 }, { unique: true });
