import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommunicationExceptionDocument = HydratedDocument<CommunicationException>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class CommunicationException {
  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({})
  channel?: String;

  @Prop({ required: true })
  reason!: String;

  @Prop({})
  validUntil?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop()
  deleted_at?: Date;
}

export const CommunicationExceptionSchema = SchemaFactory.createForClass(CommunicationException);
CommunicationExceptionSchema.index({ created_at: -1 });
