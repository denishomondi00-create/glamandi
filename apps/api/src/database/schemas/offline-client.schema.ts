import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OfflineClientDocument = HydratedDocument<OfflineClient>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class OfflineClient {
  @Prop({ required: true, unique: true })
  deviceId!: String;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @Prop({})
  label?: String;

  @Prop({ default: 'active' })
  status?: String;

  @Prop({})
  lastSeenAt?: Date;

  @Prop({})
  clientVersion?: String;

  @Prop()
  deleted_at?: Date;
}

export const OfflineClientSchema = SchemaFactory.createForClass(OfflineClient);
OfflineClientSchema.index({ deviceId: 1 }, { unique: true });
