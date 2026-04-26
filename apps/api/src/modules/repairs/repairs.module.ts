import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairTicket, RepairTicketSchema } from '../../database/schemas/repair-ticket.schema';
import { RepairsController } from './repairs.controller';
import { RepairsService } from './repairs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RepairTicket.name, schema: RepairTicketSchema }])],
  controllers: [RepairsController],
  providers: [RepairsService],
  exports: [RepairsService],
})
export class RepairsModule {}
