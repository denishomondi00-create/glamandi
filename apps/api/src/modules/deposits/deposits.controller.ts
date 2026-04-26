import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly service: DepositsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateDepositDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDepositDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/refund-request')
  refundRequest(@Param('id') id: string, @Body() dto: UpdateDepositDto) { return this.service.update(id, { ...dto, status: 'refund_requested' }); }

  @Post(':id/refund-approve')
  refundApprove(@Param('id') id: string) { return this.service.update(id, { status: 'refund_approved' }); }

  @Post(':id/refund-reject')
  refundReject(@Param('id') id: string) { return this.service.update(id, { status: 'refund_rejected' }); }

  @Post(':id/adjust')
  adjust(@Param('id') id: string, @Body() dto: UpdateDepositDto) { return this.service.update(id, dto); }

  @Post(':id/exit-deduction')
  exitDeduction(@Param('id') id: string, @Body() dto: UpdateDepositDto) { return this.service.update(id, dto); }

}
