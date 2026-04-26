import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfflineSyncBatchDocument = HydratedDocument<OfflineSyncBatch>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class OfflineSyncBatch {
  @Prop({ required: true })
  deviceId!: string;

  @Prop({ default: 'pending' })
  status?: string;

  @Prop({ default: 0 })
  acceptedCount?: number;

  @Prop({ default: 0 })
  rejectedCount?: number;

  @Prop({ default: 0 })
  conflictCount?: number;

  @Prop({ default: Date.now })
  pushedAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const OfflineSyncBatchSchema = SchemaFactory.createForClass(OfflineSyncBatch);
OfflineSyncBatchSchema.index({ created_at: -1 });
