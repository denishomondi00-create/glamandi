import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DepositLedgerDocument = HydratedDocument<DepositLedger>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DepositLedger {
  @Prop({ type: Types.ObjectId, ref: 'Tenancy' })
  tenancyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({ required: true, default: 0 })
  balance!: number;

  @Prop({ default: 'held' })
  status?: string;

  @Prop({ type: [Object], default: [] })
  entries?: [Record<string, unknown>];

  @Prop()
  deleted_at?: Date;
}

export const DepositLedgerSchema = SchemaFactory.createForClass(DepositLedger);
DepositLedgerSchema.index({ created_at: -1 });
