import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';

@Controller('charges')
export class ChargesController {
  constructor(private readonly service: ChargesService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateChargeDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChargeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/void')
  voidCharge(@Param('id') id: string) { return this.service.update(id, { status: 'void' }); }

  @Post('generate-monthly-rent')
  generateMonthlyRent(@Body() dto: CreateChargeDto) { return { operation: 'generate-monthly-rent', dto }; }

  @Post('generate-move-in-charges')
  generateMoveInCharges(@Body() dto: CreateChargeDto) { return { operation: 'generate-move-in-charges', dto }; }

}
