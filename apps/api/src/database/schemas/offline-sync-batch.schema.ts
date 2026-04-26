import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OfflineSyncBatchDocument = HydratedDocument<OfflineSyncBatch>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class OfflineSyncBatch {
  @Prop({ required: true })
  deviceId!: String;

  @Prop({ default: 'pending' })
  status?: String;

  @Prop({ default: 0 })
  acceptedCount?: Number;

  @Prop({ default: 0 })
  rejectedCount?: Number;

  @Prop({ default: 0 })
  conflictCount?: Number;

  @Prop({ default: Date.now })
  pushedAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const OfflineSyncBatchSchema = SchemaFactory.createForClass(OfflineSyncBatch);
OfflineSyncBatchSchema.index({ created_at: -1 });
