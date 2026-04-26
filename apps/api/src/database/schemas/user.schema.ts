import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ required: true, lowercase: true, trim: true, unique: true })
  email!: string;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop({})
  passwordHash?: string;

  @Prop({ default: 'staff' })
  role?: string;

  @Prop({ type: [String], default: [] })
  permissions?: [string];

  @Prop({ default: 'active' })
  status?: string;

  @Prop({ type: Object, default: {} })
  profile?: Record<string, unknown>;

  @Prop({})
  lastLoginAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
