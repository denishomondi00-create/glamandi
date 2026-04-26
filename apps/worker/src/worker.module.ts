import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiClientService } from './services/api-client.service';
import { WorkerLoggerService } from './services/logger.service';
import { RentGenerationService } from './services/rent-generation.service';
import { PenaltyEvaluationService } from './services/penalty-evaluation.service';
import { StatementGenerationService } from './services/statement-generation.service';
import { ReceiptGenerationService } from './services/receipt-generation.service';
import { NotificationDispatchService } from './services/notification-dispatch.service';
import { InquiryFollowupService } from './services/inquiry-followup.service';
import { WebsiteSyncService } from './services/website-sync.service';
import { RepairReminderService } from './services/repair-reminder.service';
import { ExportGenerationService } from './services/export-generation.service';
import { PaymentReconciliationService } from './services/payment-reconciliation.service';
import { OfflineSyncCleanupService } from './services/offline-sync-cleanup.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    ApiClientService,
    WorkerLoggerService,
    RentGenerationService,
    PenaltyEvaluationService,
    StatementGenerationService,
    ReceiptGenerationService,
    NotificationDispatchService,
    InquiryFollowupService,
    WebsiteSyncService,
    RepairReminderService,
    ExportGenerationService,
    PaymentReconciliationService,
    OfflineSyncCleanupService,
  ],
})
export class WorkerModule {}
