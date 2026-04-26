import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '../../database/schemas/payment.schema';
import { PaymentIntent, PaymentIntentSchema } from '../../database/schemas/payment-intent.schema';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentPostingService } from './payment-posting.service';
import { PaymentAllocationService } from './allocators/payment-allocation.service';
import { QueueModule } from '../../queue/queue.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: PaymentIntent.name, schema: PaymentIntentSchema },
    ]),
    QueueModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentPostingService, PaymentAllocationService],
  exports: [PaymentsService, PaymentPostingService, PaymentAllocationService],
})
export class PaymentsModule {}
