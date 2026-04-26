import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SyncConflictDocument = HydratedDocument<SyncConflict>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class SyncConflict {
  @Prop({ type: Types.ObjectId, ref: 'OfflineSyncBatch' })
  batchId?: Types.ObjectId;

  @Prop({})
  localId?: String;

  @Prop({})
  operation?: String;

  @Prop({})
  entityType?: String;

  @Prop({})
  reason?: String;

  @Prop({ type: Object })
  serverRecord?: Record<string, unknown>;

  @Prop({ type: Object })
  clientPayload?: Record<string, unknown>;

  @Prop({ default: 'open' })
  status?: String;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  resolvedBy?: Types.ObjectId;

  @Prop({})
  resolvedAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const SyncConflictSchema = SchemaFactory.createForClass(SyncConflict);
SyncConflictSchema.index({ created_at: -1 });
