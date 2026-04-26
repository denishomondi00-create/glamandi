import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Tenant, TenantSchema } from '../../database/schemas/tenant.schema';
import { Payment, PaymentSchema } from '../../database/schemas/payment.schema';
import { Charge, ChargeSchema } from '../../database/schemas/charge.schema';
import { Unit, UnitSchema } from '../../database/schemas/unit.schema';
import { Tenancy, TenancySchema } from '../../database/schemas/tenancy.schema';
import { RepairTicket, RepairTicketSchema } from '../../database/schemas/repair-ticket.schema';
import { Penalty, PenaltySchema } from '../../database/schemas/penalty.schema';
import { OfflineSyncBatch, OfflineSyncBatchSchema } from '../../database/schemas/offline-sync-batch.schema';
import { SyncConflict, SyncConflictSchema } from '../../database/schemas/sync-conflict.schema';
import { LandlordPayout, LandlordPayoutSchema } from '../../database/schemas/landlord-payout.schema';
import { Inquiry, InquirySchema } from '../../database/schemas/inquiry.schema';
import { DepositLedger, DepositLedgerSchema } from '../../database/schemas/deposit-ledger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Charge.name, schema: ChargeSchema },
      { name: Unit.name, schema: UnitSchema },
      { name: Tenancy.name, schema: TenancySchema },
      { name: RepairTicket.name, schema: RepairTicketSchema },
      { name: Penalty.name, schema: PenaltySchema },
      { name: OfflineSyncBatch.name, schema: OfflineSyncBatchSchema },
      { name: SyncConflict.name, schema: SyncConflictSchema },
      { name: LandlordPayout.name, schema: LandlordPayoutSchema },
      { name: Inquiry.name, schema: InquirySchema },
      { name: DepositLedger.name, schema: DepositLedgerSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
