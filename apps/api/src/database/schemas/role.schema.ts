import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Role {
  @Prop({ required: true })
  name!: String;

  @Prop({ required: true, unique: true })
  key!: String;

  @Prop({})
  description?: String;

  @Prop({ type: [String], default: [] })
  permissions?: [String];

  @Prop({ default: false })
  system?: Boolean;

  @Prop({ default: 'active' })
  status?: String;

  @Prop()
  deleted_at?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.index({ key: 1 }, { unique: true });
