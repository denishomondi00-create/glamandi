import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LandlordPayoutDocument = HydratedDocument<LandlordPayout>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class LandlordPayout {
  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  landlordId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LandlordStatement' })
  statementId?: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  amount!: number;

  @Prop({})
  method?: string;

  @Prop({})
  reference?: string;

  @Prop({ default: 'pending' })
  status?: string;

  @Prop({})
  paidAt?: Date;

  @Prop()
  deleted_at?: Date;
}

export const LandlordPayoutSchema = SchemaFactory.createForClass(LandlordPayout);
LandlordPayoutSchema.index({ created_at: -1 });
