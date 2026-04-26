import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PayoutsService } from './payouts.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';

@Controller('payouts')
export class PayoutsController {
  constructor(private readonly service: PayoutsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreatePayoutDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePayoutDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/mark-paid')
  markPaid(@Param('id') id: string, @Body() dto: UpdatePayoutDto) { return this.service.update(id, { ...dto, status: 'paid', paidAt: new Date() }); }

  @Post(':id/reverse')
  reverse(@Param('id') id: string, @Body() dto: UpdatePayoutDto) { return this.service.update(id, { ...dto, status: 'reversed' }); }

  @Post(':id/upload-proof')
  uploadProof(@Param('id') id: string) { return { payoutId: id, operation: 'upload-proof' }; }

}
