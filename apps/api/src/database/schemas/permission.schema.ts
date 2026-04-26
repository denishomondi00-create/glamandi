import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Permission {
  @Prop({ required: true, unique: true })
  key!: string;

  @Prop({ required: true })
  group!: string;

  @Prop({})
  description?: string;

  @Prop()
  deleted_at?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
PermissionSchema.index({ created_at: -1 });
