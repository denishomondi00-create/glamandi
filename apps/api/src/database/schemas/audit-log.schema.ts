import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuditLogDocument = HydratedDocument<AuditLog>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  actorId?: Types.ObjectId;

  @Prop({})
  actorRole?: String;

  @Prop({ required: true })
  action!: String;

  @Prop({ required: true })
  entityType!: String;

  @Prop({})
  entityId?: String;

  @Prop({ type: Object })
  before?: Record<string, unknown>;

  @Prop({ type: Object })
  after?: Record<string, unknown>;

  @Prop({})
  ipAddress?: String;

  @Prop({})
  requestId?: String;

  @Prop()
  deleted_at?: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
AuditLogSchema.index({ created_at: -1 });
