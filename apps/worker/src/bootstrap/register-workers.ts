import type { INestApplicationContext } from '@nestjs/common';
import { Worker } from 'bullmq';
import { QUEUE_NAMES } from '../queues/queue-names';
import { createRedisConnection } from '../queues/connection';
import { envNumber } from '../utils/env';
import { RentGenerationService } from '../services/rent-generation.service';
import { PenaltyEvaluationService } from '../services/penalty-evaluation.service';
import { StatementGenerationService } from '../services/statement-generation.service';
import { ReceiptGenerationService } from '../services/receipt-generation.service';
import { NotificationDispatchService } from '../services/notification-dispatch.service';
import { InquiryFollowupService } from '../services/inquiry-followup.service';
import { WebsiteSyncService } from '../services/website-sync.service';
import { RepairReminderService } from '../services/repair-reminder.service';
import { ExportGenerationService } from '../services/export-generation.service';
import { PaymentReconciliationService } from '../services/payment-reconciliation.service';
import { OfflineSyncCleanupService } from '../services/offline-sync-cleanup.service';

type WorkerService = { handle(payload: Record<string, unknown>, job?: any): Promise<unknown> };

function makeWorker(queueName: string, service: WorkerService, concurrency: number) {
  const worker = new Worker(
    queueName,
    async (job) => service.handle(job.data ?? {}, job),
    { connection: createRedisConnection(), concurrency },
  );

  worker.on('completed', (job) => console.log(`[worker] ${queueName} job ${job.id} completed`));
  worker.on('failed', (job, error) => console.error(`[worker] ${queueName} job ${job?.id} failed`, error));
  return worker;
}

export function registerWorkers(app: INestApplicationContext) {
  const defaultConcurrency = envNumber('WORKER_CONCURRENCY', 5);
  return [
    makeWorker(QUEUE_NAMES.rentGeneration, app.get(RentGenerationService), 1),
    makeWorker(QUEUE_NAMES.penaltyEvaluation, app.get(PenaltyEvaluationService), 1),
    makeWorker(QUEUE_NAMES.statementGeneration, app.get(StatementGenerationService), 1),
    makeWorker(QUEUE_NAMES.receiptGeneration, app.get(ReceiptGenerationService), envNumber('RECEIPT_PDF_CONCURRENCY', 3)),
    makeWorker(QUEUE_NAMES.notificationDispatch, app.get(NotificationDispatchService), envNumber('NOTIFICATION_CONCURRENCY', 10)),
    makeWorker(QUEUE_NAMES.inquiryFollowup, app.get(InquiryFollowupService), defaultConcurrency),
    makeWorker(QUEUE_NAMES.websiteSync, app.get(WebsiteSyncService), 1),
    makeWorker(QUEUE_NAMES.repairReminders, app.get(RepairReminderService), defaultConcurrency),
    makeWorker(QUEUE_NAMES.reportExport, app.get(ExportGenerationService), 2),
    makeWorker(QUEUE_NAMES.paymentReconciliation, app.get(PaymentReconciliationService), 2),
    makeWorker(QUEUE_NAMES.offlineSyncCleanup, app.get(OfflineSyncCleanupService), 1),
  ];
}
