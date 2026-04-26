import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandlordPayout, LandlordPayoutSchema } from '../../database/schemas/landlord-payout.schema';
import { PayoutsController } from './payouts.controller';
import { PayoutsService } from './payouts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: LandlordPayout.name, schema: LandlordPayoutSchema }])],
  controllers: [PayoutsController],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}
