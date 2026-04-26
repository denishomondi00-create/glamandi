import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookEvent, WebhookEventSchema } from '../../database/schemas/webhook-event.schema';
import { WebhooksController } from './webhooks.controller';
import { WebhookEventsService } from './webhook-events.service';
import { PaystackWebhookService } from './paystack-webhook.service';
import { DarajaWebhookService } from './daraja-webhook.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: WebhookEvent.name, schema: WebhookEventSchema }])],
  controllers: [WebhooksController],
  providers: [WebhookEventsService, PaystackWebhookService, DarajaWebhookService],
  exports: [WebhookEventsService],
})
export class WebhooksModule {}
