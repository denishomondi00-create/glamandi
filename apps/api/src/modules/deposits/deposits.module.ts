import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositLedger, DepositLedgerSchema } from '../../database/schemas/deposit-ledger.schema';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DepositLedger.name, schema: DepositLedgerSchema }])],
  controllers: [DepositsController],
  providers: [DepositsService],
  exports: [DepositsService],
})
export class DepositsModule {}
