import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../../database/schemas/payment.schema';

@Injectable()
export class PaymentPostingService {
  constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>) {}

  async postManual(dto: Record<string, unknown>, method: string) {
    return this.paymentModel.create({ ...dto, method, status: 'posted', paidAt: new Date() });
  }

  async postVerifiedProviderPayment(dto: Record<string, unknown>, method: string) {
    return this.paymentModel.create({ ...dto, method, status: 'posted', paidAt: new Date(), channel: method });
  }

  async reverse(id: string, reason: string) {
    return this.paymentModel.findByIdAndUpdate(id, { $set: { status: 'reversed', reversal: { reason, reversedAt: new Date() } } }, { new: true }).lean();
  }
}
