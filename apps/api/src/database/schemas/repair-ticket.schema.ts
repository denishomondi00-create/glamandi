import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RepairTicketDocument = HydratedDocument<RepairTicket>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class RepairTicket {
  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  unitId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  tenantId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  landlordId?: Types.ObjectId;

  @Prop({ required: true })
  title!: String;

  @Prop({})
  description?: String;

  @Prop({ default: 'open' })
  status?: String;

  @Prop({ default: 'normal' })
  priority?: String;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo?: Types.ObjectId;

  @Prop({})
  dueDate?: Date;

  @Prop()
  deleted_at?: Date;
}

export const RepairTicketSchema = SchemaFactory.createForClass(RepairTicket);
RepairTicketSchema.index({ created_at: -1 });
