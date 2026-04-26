import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DocumentRecordDocument = HydratedDocument<DocumentRecord>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DocumentRecord {
  @Prop({ required: true })
  ownerType!: string;

  @Prop({ type: Types.ObjectId })
  ownerId?: Types.ObjectId;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  url!: string;

  @Prop({})
  mimeType?: string;

  @Prop({})
  size?: number;

  @Prop()
  deleted_at?: Date;
}

export const DocumentRecordSchema = SchemaFactory.createForClass(DocumentRecord);
DocumentRecordSchema.index({ created_at: -1 });
