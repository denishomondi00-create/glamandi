import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationRecordDocument = HydratedDocument<NotificationRecord>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class NotificationRecord {
  @Prop({})
  recipientType?: String;

  @Prop({ type: Types.ObjectId })
  recipientId?: Types.ObjectId;

  @Prop({ required: true })
  channel!: String;

  @Prop({})
  templateKey?: String;

  @Prop({ default: 'pending' })
  status?: String;

  @Prop({ type: Object, default: {} })
  payload?: Record<string, unknown>;

  @Prop({})
  sentAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const NotificationRecordSchema = SchemaFactory.createForClass(NotificationRecord);
NotificationRecordSchema.index({ created_at: -1 });
