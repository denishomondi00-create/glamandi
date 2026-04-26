import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly service: WebsiteService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateWebsiteDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWebsiteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('listings/:slug')
  findBySlug(@Param('slug') slug: string) { return { slug, type: 'listing' }; }

  @Post('listings/sync')
  syncListings(@Body() dto: CreateWebsiteDto) { return { operation: 'website.listings.sync', dto }; }

  @Get('featured')
  featured() { return { featured: [] }; }

  @Patch('properties/:id/publish')
  publishProperty(@Param('id') id: string) { return { propertyId: id, operation: 'publish' }; }

  @Patch('units/:id/publish')
  publishUnit(@Param('id') id: string) { return { unitId: id, operation: 'publish' }; }

  @Patch('units/:id/feature')
  featureUnit(@Param('id') id: string) { return { unitId: id, operation: 'feature' }; }

  @Get('pages')
  pages() { return { pages: [] }; }

  @Patch('pages/:pageKey')
  patchPage(@Param('pageKey') pageKey: string, @Body() dto: UpdateWebsiteDto) { return { pageKey, dto }; }

  @Get('seo')
  seo() { return { seo: {} }; }

  @Patch('seo')
  patchSeo(@Body() dto: UpdateWebsiteDto) { return { seo: dto }; }

}
