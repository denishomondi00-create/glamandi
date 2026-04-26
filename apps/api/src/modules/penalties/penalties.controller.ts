import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PenaltiesService } from './penalties.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';

@Controller('penalties')
export class PenaltiesController {
  constructor(private readonly service: PenaltiesService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreatePenaltyDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePenaltyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/waive')
  waive(@Param('id') id: string, @Body() dto: UpdatePenaltyDto) { return this.service.update(id, { ...dto, status: 'waived' }); }

  @Patch(':id/apply')
  apply(@Param('id') id: string) { return this.service.update(id, { status: 'applied' }); }

  @Patch(':id/reason')
  reason(@Param('id') id: string, @Body() dto: UpdatePenaltyDto) { return this.service.update(id, dto); }

  @Post('evaluate')
  evaluate(@Body() dto: CreatePenaltyDto) { return { operation: 'penalties.evaluate', dto }; }

  @Post('communication-exceptions')
  communicationExceptions(@Body() dto: CreatePenaltyDto) { return { operation: 'penalties.communication-exceptions', dto }; }

}
