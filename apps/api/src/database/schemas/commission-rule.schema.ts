import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommissionRuleDocument = HydratedDocument<CommissionRule>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class CommissionRule {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 0.1 })
  rate?: number;

  @Prop({ default: 'active' })
  status?: string;

  @Prop({ default: Date.now })
  effectiveFrom?: Date;

  @Prop({ type: Object, default: {} })
  scope?: Record<string, unknown>;

  @Prop()
  deleted_at?: Date;
}

export const CommissionRuleSchema = SchemaFactory.createForClass(CommissionRule);
CommissionRuleSchema.index({ created_at: -1 });
