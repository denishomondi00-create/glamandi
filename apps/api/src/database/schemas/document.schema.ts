import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DocumentRecordDocument = HydratedDocument<DocumentRecord>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DocumentRecord {
  @Prop({ required: true })
  ownerType!: String;

  @Prop({ type: Types.ObjectId })
  ownerId?: Types.ObjectId;

  @Prop({ required: true })
  type!: String;

  @Prop({ required: true })
  name!: String;

  @Prop({ required: true })
  url!: String;

  @Prop({})
  mimeType?: String;

  @Prop({})
  size?: Number;

  @Prop()
  deleted_at?: Date;
}

export const DocumentRecordSchema = SchemaFactory.createForClass(DocumentRecord);
DocumentRecordSchema.index({ created_at: -1 });
