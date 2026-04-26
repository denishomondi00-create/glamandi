import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PenaltyRuleDocument = HydratedDocument<PenaltyRule>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PenaltyRule {
  @Prop({ required: true })
  name!: String;

  @Prop({ default: 5 })
  dueDay?: Number;

  @Prop({ type: [Object], default: [] })
  bands?: [Record<string, unknown>];

  @Prop({ default: 'active' })
  status?: String;

  @Prop()
  deleted_at?: Date;
}

export const PenaltyRuleSchema = SchemaFactory.createForClass(PenaltyRule);
PenaltyRuleSchema.index({ created_at: -1 });
