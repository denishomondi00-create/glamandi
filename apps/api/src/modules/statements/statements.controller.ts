import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { StatementsService } from './statements.service';
import { CreateStatementDto } from './dto/create-statement.dto';

@Controller('statements')
export class StatementsController {
  constructor(private readonly service: StatementsService) {}

  @Get('landlords') landlordStatements(@Query() query: PaginationQueryDto) { return this.service.findAll(query); }
  @Get('landlords/:id') landlordStatement(@Param('id') id: string) { return this.service.findOne(id); }
  @Post('landlords/generate') generateLandlordStatement(@Body() dto: CreateStatementDto) { return this.service.create(dto); }
  @Get('tenants/:tenantId') tenantStatement(@Param('tenantId') tenantId: string) { return { tenantId, statement: [] }; }
  @Post('tenants/generate') generateTenantStatement(@Body() dto: CreateStatementDto) { return { operation: 'tenant-statement.generate', dto }; }
  @Get(':id/pdf') pdf(@Param('id') id: string) { return { statementId: id, operation: 'pdf' }; }
  @Post(':id/email') email(@Param('id') id: string) { return { statementId: id, operation: 'email' }; }
}
