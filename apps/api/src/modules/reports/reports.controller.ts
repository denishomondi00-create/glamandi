import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard') dashboard() { return this.reportsService.dashboard(); }
  @Get('collections') collections() { return this.reportsService.collections(); }
  @Get('occupancy') occupancy() { return this.reportsService.occupancy(); }
  @Get('defaulters') defaulters() { return this.reportsService.defaulters(); }
  @Get('penalties') penalties() { return this.reportsService.penaltiesReport(); }
  @Get('commission') commission() { return this.reportsService.commission(); }
  @Get('repairs') repairs() { return this.reportsService.repairsReport(); }
  @Get('deposits') deposits() { return this.reportsService.depositsReport(); }
  @Get('inquiries') inquiries() { return this.reportsService.inquiriesReport(); }
  @Get('payment-channels') paymentChannels() { return this.reportsService.paymentChannels(); }
  @Get('landlord-payouts') landlordPayouts() { return this.reportsService.landlordPayouts(); }
  @Post('export') export(@Body() dto: Record<string, unknown>) { return { operation: 'report-export', dto }; }
}
