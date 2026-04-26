import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SyncConflictDocument = HydratedDocument<SyncConflict>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class SyncConflict {
  @Prop({ type: Types.ObjectId, ref: 'OfflineSyncBatch' })
  batchId?: Types.ObjectId;

  @Prop({})
  localId?: string;

  @Prop({})
  operation?: string;

  @Prop({})
  entityType?: string;

  @Prop({})
  reason?: string;

  @Prop({ type: Object })
  serverRecord?: Record<string, unknown>;

  @Prop({ type: Object })
  clientPayload?: Record<string, unknown>;

  @Prop({ default: 'open' })
  status?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  resolvedBy?: Types.ObjectId;

  @Prop({})
  resolvedAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const SyncConflictSchema = SchemaFactory.createForClass(SyncConflict);
SyncConflictSchema.index({ created_at: -1 });
