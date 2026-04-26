import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Payment, PaymentDocument } from '../../database/schemas/payment.schema';
import { PaymentIntent, PaymentIntentDocument } from '../../database/schemas/payment-intent.schema';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { getPagination, buildPaginationMeta } from '../../common/utils/pagination';
import { makeId, normalizeReference } from '../../common/utils/ids';
import { PaymentPostingService } from './payment-posting.service';
import { PaymentAllocationService } from './allocators/payment-allocation.service';
import { EnqueueReceiptGenerationJob } from '../../queue/jobs/enqueue-receipt-generation.job';
import { EnqueueNotificationJob } from '../../queue/jobs/enqueue-notification.job';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(PaymentIntent.name) private readonly paymentIntentModel: Model<PaymentIntentDocument>,
    private readonly posting: PaymentPostingService,
    private readonly allocations: PaymentAllocationService,
    private readonly receiptJob: EnqueueReceiptGenerationJob,
    private readonly notificationJob: EnqueueNotificationJob,
  ) {}

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip } = getPagination(query);
    const [items, total] = await Promise.all([
      this.paymentModel.find({ deleted_at: { $exists: false } }).sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
      this.paymentModel.countDocuments({ deleted_at: { $exists: false } }),
    ]);
    return { items, meta: buildPaginationMeta(page, limit, total) };
  }

  findOne(id: string) {
    return this.paymentModel.findById(id).lean();
  }

  create(dto: Record<string, unknown>) {
    return this.paymentModel.create(dto);
  }

  async reverse(id: string, dto: Record<string, unknown>) {
    return this.posting.reverse(id, String(dto.reason ?? 'manual reversal'));
  }

  async recordManualMpesa(dto: Record<string, unknown>) {
    const normalized = { ...dto, reference: dto.reference ? normalizeReference(String(dto.reference)) : makeId('MPESA') };
    const payment = await this.posting.postManual(normalized, 'mpesa_manual');
    await this.allocations.allocate(payment.toObject());
    await this.receiptJob.enqueue({ paymentId: String(payment._id) });
    return payment;
  }

  async recordManualKcb(dto: Record<string, unknown>) {
    const payment = await this.posting.postManual({ ...dto, reference: dto.reference ?? makeId('KCB') }, 'kcb_manual');
    await this.receiptJob.enqueue({ paymentId: String(payment._id) });
    return payment;
  }

  async recordCash(dto: Record<string, unknown>) {
    const payment = await this.posting.postManual({ ...dto, reference: dto.reference ?? makeId('CASH') }, 'cash');
    await this.receiptJob.enqueue({ paymentId: String(payment._id) });
    return payment;
  }

  async initializePaystack(dto: Record<string, unknown>) {
    const reference = makeId('PAYSTACK');
    const intent = await this.paymentIntentModel.create({ ...dto, method: 'paystack', provider: 'paystack', reference, status: 'pending' });
    return { intent, authorization_url: `/paystack/checkout/${reference}` };
  }

  async verifyPaystack(dto: Record<string, unknown>) {
    return { verified: true, reference: dto.reference };
  }

  async initializeDarajaStk(dto: Record<string, unknown>) {
    const reference = makeId('DARAJA_STK');
    const intent = await this.paymentIntentModel.create({ ...dto, method: 'daraja_stk', provider: 'daraja', reference, status: 'pending' });
    return { intent, checkoutRequestId: reference };
  }

  async verifyDarajaStk(dto: Record<string, unknown>) {
    return { verified: true, checkoutRequestId: dto.checkoutRequestId };
  }

  reconciliation() {
    return { queue: 'payment-reconciliation', status: 'ready' };
  }
}
