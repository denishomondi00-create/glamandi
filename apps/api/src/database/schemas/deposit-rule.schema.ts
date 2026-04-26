import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DepositRuleDocument = HydratedDocument<DepositRule>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DepositRule {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 30 })
  noticeWindowDays?: number;

  @Prop({ default: 'active' })
  status?: string;

  @Prop({ type: Object, default: {} })
  settings?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const DepositRuleSchema = SchemaFactory.createForClass(DepositRule);
DepositRuleSchema.index({ created_at: -1 });
