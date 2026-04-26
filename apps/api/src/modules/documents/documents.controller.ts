import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}
  @Post('upload') upload(@Body() dto: CreateDocumentDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: PaginationQueryDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
