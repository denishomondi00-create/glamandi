import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteListing, WebsiteListingSchema } from '../../database/schemas/website-listing.schema';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: WebsiteListing.name, schema: WebsiteListingSchema }])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
  exports: [WebsiteService],
})
export class WebsiteModule {}
