import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard') dashboard() { return this.reportsService.dashboard(); }
  @Get('collections') collections() { return this.reportsService.report('collections'); }
  @Get('occupancy') occupancy() { return this.reportsService.report('occupancy'); }
  @Get('defaulters') defaulters() { return this.reportsService.report('defaulters'); }
  @Get('penalties') penalties() { return this.reportsService.report('penalties'); }
  @Get('commission') commission() { return this.reportsService.report('commission'); }
  @Get('repairs') repairs() { return this.reportsService.report('repairs'); }
  @Get('deposits') deposits() { return this.reportsService.report('deposits'); }
  @Get('inquiries') inquiries() { return this.reportsService.report('inquiries'); }
  @Get('payment-channels') paymentChannels() { return this.reportsService.report('payment-channels'); }
  @Get('landlord-payouts') landlordPayouts() { return this.reportsService.report('landlord-payouts'); }
  @Post('export') export(@Body() dto: Record<string, unknown>) { return { operation: 'report-export', dto }; }
}
