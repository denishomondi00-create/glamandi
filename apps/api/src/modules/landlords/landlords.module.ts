import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Landlord, LandlordSchema } from '../../database/schemas/landlord.schema';
import { LandlordsController } from './landlords.controller';
import { LandlordsService } from './landlords.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Landlord.name, schema: LandlordSchema }])],
  controllers: [LandlordsController],
  providers: [LandlordsService],
  exports: [LandlordsService],
})
export class LandlordsModule {}
