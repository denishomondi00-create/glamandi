import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { LandlordsService } from './landlords.service';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { UpdateLandlordDto } from './dto/update-landlord.dto';

@Controller('landlords')
export class LandlordsController {
  constructor(private readonly service: LandlordsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateLandlordDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLandlordDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/properties')
  properties(@Param('id') id: string) { return { landlordId: id, scope: 'properties' }; }

  @Get(':id/statements')
  statements(@Param('id') id: string) { return { landlordId: id, scope: 'statements' }; }

  @Get(':id/payouts')
  payouts(@Param('id') id: string) { return { landlordId: id, scope: 'payouts' }; }

  @Get(':id/repairs')
  repairs(@Param('id') id: string) { return { landlordId: id, scope: 'repairs' }; }

  @Get(':id/deductions')
  deductions(@Param('id') id: string) { return { landlordId: id, scope: 'deductions' }; }

  @Get(':id/documents')
  documents(@Param('id') id: string) { return { landlordId: id, scope: 'documents' }; }

}
