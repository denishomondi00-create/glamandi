import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { RepairsService } from './repairs.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';

@Controller('repairs')
export class RepairsController {
  constructor(private readonly service: RepairsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateRepairDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRepairDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/assign')
  assign(@Param('id') id: string, @Body() dto: UpdateRepairDto) { return this.service.update(id, dto); }

  @Post(':id/complete')
  complete(@Param('id') id: string) { return this.service.update(id, { status: 'completed' }); }

  @Post(':id/expense')
  expense(@Param('id') id: string, @Body() dto: UpdateRepairDto) { return { repairId: id, operation: 'expense', dto }; }

  @Post(':id/approve-deduction')
  approveDeduction(@Param('id') id: string) { return { repairId: id, operation: 'approve-deduction' }; }

  @Post(':id/reject-deduction')
  rejectDeduction(@Param('id') id: string) { return { repairId: id, operation: 'reject-deduction' }; }

  @Post(':id/upload-proof')
  uploadProof(@Param('id') id: string) { return { repairId: id, operation: 'upload-proof' }; }

}
