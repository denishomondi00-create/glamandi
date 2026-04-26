import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { createBullMqConnection } from './queue.factory';
import { QUEUE_NAMES } from './queue.names';
import { EnqueueReceiptGenerationJob } from './jobs/enqueue-receipt-generation.job';
import { EnqueueNotificationJob } from './jobs/enqueue-notification.job';
import { EnqueueInquiryFollowupJob } from './jobs/enqueue-inquiry-followup.job';
import { EnqueueWebsiteSyncJob } from './jobs/enqueue-website-sync.job';
import { RentGenerationScheduler } from './schedulers/rent-generation.scheduler';
import { PenaltyEvaluationScheduler } from './schedulers/penalty-evaluation.scheduler';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ connection: createBullMqConnection(config) }),
    }),
    BullModule.registerQueue(...Object.values(QUEUE_NAMES).map((name) => ({ name }))),
  ],
  providers: [EnqueueReceiptGenerationJob, EnqueueNotificationJob, EnqueueInquiryFollowupJob, EnqueueWebsiteSyncJob, RentGenerationScheduler, PenaltyEvaluationScheduler],
  exports: [BullModule, EnqueueReceiptGenerationJob, EnqueueNotificationJob, EnqueueInquiryFollowupJob, EnqueueWebsiteSyncJob],
})
export class QueueModule {}
