import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TenanciesService } from './tenancies.service';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';

@Controller('tenancies')
export class TenanciesController {
  constructor(private readonly service: TenanciesService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateTenancyDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenancyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/move-out')
  moveOut(@Param('id') id: string, @Body() dto: UpdateTenancyDto) { return this.service.update(id, { ...dto, status: 'move_out_pending' }); }

  @Post(':id/transfer-unit')
  transferUnit(@Param('id') id: string, @Body() dto: UpdateTenancyDto) { return this.service.update(id, dto); }

  @Post(':id/notice')
  notice(@Param('id') id: string, @Body() body: UpdateTenancyDto) { return { tenancyId: id, type: 'notice', body }; }

  @Post(':id/exit-review')
  exitReview(@Param('id') id: string, @Body() body: UpdateTenancyDto) { return { tenancyId: id, type: 'exit-review', body }; }

}
