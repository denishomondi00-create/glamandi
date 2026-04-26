import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Penalty, PenaltySchema } from '../../database/schemas/penalty.schema';
import { PenaltiesController } from './penalties.controller';
import { PenaltiesService } from './penalties.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Penalty.name, schema: PenaltySchema }])],
  controllers: [PenaltiesController],
  providers: [PenaltiesService],
  exports: [PenaltiesService],
})
export class PenaltiesModule {}
