import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Role {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  key!: string;

  @Prop({})
  description?: string;

  @Prop({ type: [String], default: [] })
  permissions?: [string];

  @Prop({ default: false })
  system?: boolean;

  @Prop({ default: 'active' })
  status?: string;

  @Prop()
  deleted_at?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.index({ key: 1 }, { unique: true });
