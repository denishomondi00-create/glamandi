import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly service: UnitsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateUnitDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/location')
  location(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id/location')
  updateLocation(@Param('id') id: string, @Body() dto: UpdateUnitDto) { return this.service.update(id, { locationDetail: dto }); }

  @Patch(':id/status')
  status(@Param('id') id: string, @Body() dto: UpdateUnitDto) { return this.service.update(id, dto); }

  @Patch(':id/lock-status')
  lockStatus(@Param('id') id: string, @Body() dto: UpdateUnitDto) { return this.service.update(id, dto); }

  @Patch(':id/publish')
  publish(@Param('id') id: string) { return this.service.update(id, { 'listing.published': true }); }

  @Get(':id/tenant')
  tenant(@Param('id') id: string) { return { unitId: id, scope: 'tenant' }; }

  @Get(':id/charges')
  charges(@Param('id') id: string) { return { unitId: id, scope: 'charges' }; }

  @Get(':id/repairs')
  repairs(@Param('id') id: string) { return { unitId: id, scope: 'repairs' }; }

}
