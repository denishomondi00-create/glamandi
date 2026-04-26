import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) { return this.audit.findAll(query); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.audit.findOne(id); }
}
