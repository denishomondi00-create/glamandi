import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Charge, ChargeSchema } from '../../database/schemas/charge.schema';
import { ChargesController } from './charges.controller';
import { ChargesService } from './charges.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Charge.name, schema: ChargeSchema }])],
  controllers: [ChargesController],
  providers: [ChargesService],
  exports: [ChargesService],
})
export class ChargesModule {}
