import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from '../../database/schemas/tenant.schema';
import { Payment, PaymentDocument } from '../../database/schemas/payment.schema';
import { Charge, ChargeDocument } from '../../database/schemas/charge.schema';
import { Unit, UnitDocument } from '../../database/schemas/unit.schema';
import { Tenancy, TenancyDocument } from '../../database/schemas/tenancy.schema';
import { RepairTicket, RepairTicketDocument } from '../../database/schemas/repair-ticket.schema';
import { Penalty, PenaltyDocument } from '../../database/schemas/penalty.schema';
import { OfflineSyncBatch, OfflineSyncBatchDocument } from '../../database/schemas/offline-sync-batch.schema';
import { SyncConflict, SyncConflictDocument } from '../../database/schemas/sync-conflict.schema';
import { LandlordPayout, LandlordPayoutDocument } from '../../database/schemas/landlord-payout.schema';
import { Inquiry, InquiryDocument } from '../../database/schemas/inquiry.schema';
import { DepositLedger, DepositLedgerDocument } from '../../database/schemas/deposit-ledger.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<TenantDocument>,
    @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Charge.name) private readonly chargeModel: Model<ChargeDocument>,
    @InjectModel(Unit.name) private readonly unitModel: Model<UnitDocument>,
    @InjectModel(Tenancy.name) private readonly tenancyModel: Model<TenancyDocument>,
    @InjectModel(RepairTicket.name) private readonly repairModel: Model<RepairTicketDocument>,
    @InjectModel(Penalty.name) private readonly penaltyModel: Model<PenaltyDocument>,
    @InjectModel(OfflineSyncBatch.name) private readonly batchModel: Model<OfflineSyncBatchDocument>,
    @InjectModel(SyncConflict.name) private readonly conflictModel: Model<SyncConflictDocument>,
    @InjectModel(LandlordPayout.name) private readonly payoutModel: Model<LandlordPayoutDocument>,
    @InjectModel(Inquiry.name) private readonly inquiryModel: Model<InquiryDocument>,
    @InjectModel(DepositLedger.name) private readonly depositLedgerModel: Model<DepositLedgerDocument>,
  ) {}

  async dashboard() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const filter = { deleted_at: { $exists: false } };

    const [
      totalCollectedResult,
      totalBilledResult,
      outstandingResult,
      lateTenants,
      vacantUnits,
      occupiedUnits,
      pendingBatches,
      openConflicts,
      activeTenants,
      openRepairs,
      pendingInquiries,
      openPenalties,
    ] = await Promise.all([
      this.paymentModel.aggregate([
        { $match: { ...filter, status: 'posted', paidAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      this.chargeModel.aggregate([
        { $match: { ...filter, created_at: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      this.chargeModel.aggregate([
        { $match: { ...filter, status: { $in: ['open', 'partial'] } } },
        { $group: { _id: null, total: { $sum: '$balance' } } },
      ]),
      this.tenancyModel.countDocuments({ ...filter, status: 'active' }).then(async (active) => {
        const paidTenantIds = await this.paymentModel.distinct('tenantId', { ...filter, status: 'posted', paidAt: { $gte: monthStart } });
        return active - paidTenantIds.length;
      }),
      this.unitModel.countDocuments({ ...filter, status: 'vacant' }),
      this.unitModel.countDocuments({ ...filter, status: 'occupied' }),
      this.batchModel.countDocuments({ status: { $in: ['pending', 'processing'] } }),
      this.conflictModel.countDocuments({ status: 'open' }),
      this.tenantModel.countDocuments({ ...filter, status: 'active' }),
      this.repairModel.countDocuments({ ...filter, status: { $in: ['open', 'in_progress'] } }),
      this.inquiryModel.countDocuments({ ...filter, status: { $in: ['new', 'pending'] } }),
      this.penaltyModel.countDocuments({ ...filter, status: { $in: ['pending', 'active'] } }),
    ]);

    return {
      totalRentBilledThisMonth: totalBilledResult[0]?.total ?? 0,
      totalCollectedThisMonth: totalCollectedResult[0]?.total ?? 0,
      outstandingBalances: outstandingResult[0]?.total ?? 0,
      collectionRate: totalBilledResult[0]?.total
        ? Math.round(((totalCollectedResult[0]?.total ?? 0) / totalBilledResult[0].total) * 100)
        : 0,
      lateTenants: Math.max(0, lateTenants),
      vacantUnits,
      occupiedUnits,
      activeTenants,
      openRepairs,
      pendingInquiries,
      openPenalties,
      offlineRecordsPendingSync: pendingBatches,
      syncConflictsRequiringAdminReview: openConflicts,
    };
  }

  async collections() {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, start: d, end: new Date(d.getFullYear(), d.getMonth() + 1, 1) };
    }).reverse();

    const rows = await Promise.all(
      months.map(async ({ year, month, start, end }) => {
        const [billed, collected] = await Promise.all([
          this.chargeModel.aggregate([{ $match: { deleted_at: { $exists: false }, created_at: { $gte: start, $lt: end } } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
          this.paymentModel.aggregate([{ $match: { deleted_at: { $exists: false }, status: 'posted', paidAt: { $gte: start, $lt: end } } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
        ]);
        return { period: `${year}-${String(month).padStart(2, '0')}`, billed: billed[0]?.total ?? 0, collected: collected[0]?.total ?? 0, rate: billed[0]?.total ? Math.round(((collected[0]?.total ?? 0) / billed[0].total) * 100) : 0 };
      }),
    );
    return { report: 'collections', generatedAt: new Date().toISOString(), rows };
  }

  async occupancy() {
    const [vacant, occupied, locked, total] = await Promise.all([
      this.unitModel.countDocuments({ deleted_at: { $exists: false }, status: 'vacant' }),
      this.unitModel.countDocuments({ deleted_at: { $exists: false }, status: 'occupied' }),
      this.unitModel.countDocuments({ deleted_at: { $exists: false }, lockStatus: 'locked' }),
      this.unitModel.countDocuments({ deleted_at: { $exists: false } }),
    ]);
    return { report: 'occupancy', generatedAt: new Date().toISOString(), vacant, occupied, locked, total, occupancyRate: total ? Math.round((occupied / total) * 100) : 0, rows: [] };
  }

  async defaulters() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const paidIds = await this.paymentModel.distinct('tenantId', { deleted_at: { $exists: false }, status: 'posted', paidAt: { $gte: monthStart } });
    const defaulters = await this.tenancyModel
      .find({ deleted_at: { $exists: false }, status: 'active', tenantId: { $nin: paidIds } })
      .populate('tenantId', 'firstName lastName phone email')
      .populate('unitId', 'unitLabel')
      .lean();
    return {
      report: 'defaulters',
      generatedAt: new Date().toISOString(),
      count: defaulters.length,
      rows: defaulters.map((t) => ({
        tenantId: String(t.tenantId),
        unit: String(t.unitId),
        rent: t.rentAmount,
        since: t.startDate,
      })),
    };
  }

  async penaltiesReport() {
    const [total, pending, waived] = await Promise.all([
      this.penaltyModel.countDocuments({ deleted_at: { $exists: false } }),
      this.penaltyModel.countDocuments({ deleted_at: { $exists: false }, status: 'pending' }),
      this.penaltyModel.countDocuments({ deleted_at: { $exists: false }, status: 'waived' }),
    ]);
    const amountResult = await this.penaltyModel.aggregate([{ $match: { deleted_at: { $exists: false } } }, { $group: { _id: '$status', total: { $sum: '$amount' } } }]);
    return { report: 'penalties', generatedAt: new Date().toISOString(), total, pending, waived, breakdown: amountResult, rows: [] };
  }

  async commission() {
    const result = await this.paymentModel.aggregate([
      { $match: { deleted_at: { $exists: false }, status: 'posted' } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$paidAt' } }, collected: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      { $limit: 12 },
    ]);
    return { report: 'commission', generatedAt: new Date().toISOString(), rows: result };
  }

  async repairsReport() {
    const [open, inProgress, done, total] = await Promise.all([
      this.repairModel.countDocuments({ deleted_at: { $exists: false }, status: 'open' }),
      this.repairModel.countDocuments({ deleted_at: { $exists: false }, status: 'in_progress' }),
      this.repairModel.countDocuments({ deleted_at: { $exists: false }, status: 'done' }),
      this.repairModel.countDocuments({ deleted_at: { $exists: false } }),
    ]);
    return { report: 'repairs', generatedAt: new Date().toISOString(), open, inProgress, done, total, rows: [] };
  }

  async depositsReport() {
    const result = await this.depositLedgerModel.aggregate([
      { $match: { deleted_at: { $exists: false } } },
      { $group: { _id: '$type', total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);
    return { report: 'deposits', generatedAt: new Date().toISOString(), breakdown: result, rows: [] };
  }

  async inquiriesReport() {
    const [total, newCount, followUp, converted] = await Promise.all([
      this.inquiryModel.countDocuments({ deleted_at: { $exists: false } }),
      this.inquiryModel.countDocuments({ deleted_at: { $exists: false }, status: 'new' }),
      this.inquiryModel.countDocuments({ deleted_at: { $exists: false }, status: 'follow_up' }),
      this.inquiryModel.countDocuments({ deleted_at: { $exists: false }, status: 'converted' }),
    ]);
    return { report: 'inquiries', generatedAt: new Date().toISOString(), total, new: newCount, followUp, converted, conversionRate: total ? Math.round((converted / total) * 100) : 0, rows: [] };
  }

  async paymentChannels() {
    const result = await this.paymentModel.aggregate([
      { $match: { deleted_at: { $exists: false }, status: 'posted' } },
      { $group: { _id: '$method', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]);
    return { report: 'payment-channels', generatedAt: new Date().toISOString(), rows: result };
  }

  async landlordPayouts() {
    const result = await this.payoutModel.aggregate([
      { $match: { deleted_at: { $exists: false } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$created_at' } }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      { $limit: 12 },
    ]);
    return { report: 'landlord-payouts', generatedAt: new Date().toISOString(), rows: result };
  }
}
