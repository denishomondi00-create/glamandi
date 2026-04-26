import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ required: true, lowercase: true, trim: true, unique: true })
  email!: String;

  @Prop({ required: true, trim: true })
  name!: String;

  @Prop({ trim: true })
  phone?: String;

  @Prop({})
  passwordHash?: String;

  @Prop({ default: 'staff' })
  role?: String;

  @Prop({ type: [String], default: [] })
  permissions?: [String];

  @Prop({ default: 'active' })
  status?: String;

  @Prop({ type: Object, default: {} })
  profile?: Record<string, unknown>;

  @Prop({})
  lastLoginAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
