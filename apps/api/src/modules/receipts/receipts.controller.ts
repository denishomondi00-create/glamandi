import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly service: ReceiptsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateReceiptDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/pdf')
  pdf(@Param('id') id: string) { return { receiptId: id, operation: 'pdf' }; }

  @Post(':id/email')
  email(@Param('id') id: string) { return { receiptId: id, operation: 'email' }; }

  @Post(':id/regenerate-pdf')
  regeneratePdf(@Param('id') id: string) { return { receiptId: id, operation: 'regenerate-pdf' }; }

}
