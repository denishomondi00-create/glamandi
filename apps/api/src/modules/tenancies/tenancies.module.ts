import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenancy, TenancySchema } from '../../database/schemas/tenancy.schema';
import { TenanciesController } from './tenancies.controller';
import { TenanciesService } from './tenancies.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tenancy.name, schema: TenancySchema }])],
  controllers: [TenanciesController],
  providers: [TenanciesService],
  exports: [TenanciesService],
})
export class TenanciesModule {}
