import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/charges')
  charges(@Param('id') id: string) { return { tenantId: id, scope: 'charges' }; }

  @Get(':id/payments')
  payments(@Param('id') id: string) { return { tenantId: id, scope: 'payments' }; }

  @Get(':id/receipts')
  receipts(@Param('id') id: string) { return { tenantId: id, scope: 'receipts' }; }

  @Get(':id/penalties')
  penalties(@Param('id') id: string) { return { tenantId: id, scope: 'penalties' }; }

  @Get(':id/deposit')
  deposit(@Param('id') id: string) { return { tenantId: id, scope: 'deposit' }; }

  @Get(':id/utilities')
  utilities(@Param('id') id: string) { return { tenantId: id, scope: 'utilities' }; }

  @Get(':id/repairs')
  repairs(@Param('id') id: string) { return { tenantId: id, scope: 'repairs' }; }

  @Get(':id/statement')
  statement(@Param('id') id: string) { return { tenantId: id, scope: 'statement' }; }

  @Post(':id/notice')
  notice(@Param('id') id: string, @Body() body: CreateTenantDto) { return { tenantId: id, type: 'notice', body }; }

  @Post(':id/communication-exception')
  communicationException(@Param('id') id: string, @Body() body: CreateTenantDto) { return { tenantId: id, type: 'communication-exception', body }; }

}
