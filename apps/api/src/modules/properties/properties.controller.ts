import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly service: PropertiesService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/units')
  units(@Param('id') id: string) { return { propertyId: id, scope: 'units' }; }

  @Get(':id/occupancy')
  occupancy(@Param('id') id: string) { return { propertyId: id, scope: 'occupancy' }; }

  @Get(':id/statement-summary')
  statementSummary(@Param('id') id: string) { return { propertyId: id, scope: 'statement-summary' }; }

  @Get(':id/location')
  location(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id/location')
  updateLocation(@Param('id') id: string, @Body() dto: UpdatePropertyDto) { return this.service.update(id, { location: dto }); }

  @Patch(':id/publish')
  publish(@Param('id') id: string) { return this.service.update(id, { listingStatus: 'published' }); }

  @Patch(':id/feature')
  feature(@Param('id') id: string) { return this.service.update(id, { featured: true }); }

}
