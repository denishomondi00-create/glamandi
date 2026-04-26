import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) { return this.paymentsService.findAll(query); }

  @Post()
  create(@Body() dto: Record<string, unknown>) { return this.paymentsService.create(dto); }

  @Get('reconciliation')
  reconciliation() { return this.paymentsService.reconciliation(); }

  @Post('reconciliation/run')
  runReconciliation() { return { operation: 'payment-reconciliation.run' }; }

  @Post('reconciliation/:id/resolve')
  resolveReconciliation(@Param('id') id: string, @Body() dto: Record<string, unknown>) { return { reconciliationId: id, dto }; }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.paymentsService.findOne(id); }

  @Post(':id/reverse')
  reverse(@Param('id') id: string, @Body() dto: Record<string, unknown>) { return this.paymentsService.reverse(id, dto); }

  @Post('manual/mpesa')
  manualMpesa(@Body() dto: Record<string, unknown>) { return this.paymentsService.recordManualMpesa(dto); }

  @Post('manual/kcb')
  manualKcb(@Body() dto: Record<string, unknown>) { return this.paymentsService.recordManualKcb(dto); }

  @Post('manual/cash')
  manualCash(@Body() dto: Record<string, unknown>) { return this.paymentsService.recordCash(dto); }

  @Post('initialize/paystack')
  initializePaystack(@Body() dto: Record<string, unknown>) { return this.paymentsService.initializePaystack(dto); }

  @Post('verify/paystack')
  verifyPaystack(@Body() dto: Record<string, unknown>) { return this.paymentsService.verifyPaystack(dto); }

  @Post('initialize/daraja-stk')
  initializeDarajaStk(@Body() dto: Record<string, unknown>) { return this.paymentsService.initializeDarajaStk(dto); }

  @Post('verify/daraja-stk')
  verifyDarajaStk(@Body() dto: Record<string, unknown>) { return this.paymentsService.verifyDarajaStk(dto); }
}
