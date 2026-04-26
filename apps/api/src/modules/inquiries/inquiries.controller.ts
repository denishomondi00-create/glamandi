import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly service: InquiriesService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateInquiryDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInquiryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/assign')
  assign(@Param('id') id: string, @Body() dto: UpdateInquiryDto) { return this.service.update(id, dto); }

  @Post(':id/convert')
  convert(@Param('id') id: string) { return this.service.update(id, { status: 'converted' }); }

  @Post(':id/lost')
  lost(@Param('id') id: string) { return this.service.update(id, { status: 'lost' }); }

  @Post(':id/follow-up')
  followUp(@Param('id') id: string, @Body() dto: UpdateInquiryDto) { return this.service.update(id, dto); }

}
