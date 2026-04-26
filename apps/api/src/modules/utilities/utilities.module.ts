import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilityCharge, UtilityChargeSchema } from '../../database/schemas/utility-charge.schema';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UtilityCharge.name, schema: UtilityChargeSchema }])],
  controllers: [UtilitiesController],
  providers: [UtilitiesService],
  exports: [UtilitiesService],
})
export class UtilitiesModule {}
