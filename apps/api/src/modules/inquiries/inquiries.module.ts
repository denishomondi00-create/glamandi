import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inquiry, InquirySchema } from '../../database/schemas/inquiry.schema';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Inquiry.name, schema: InquirySchema }])],
  controllers: [InquiriesController],
  providers: [InquiriesService],
  exports: [InquiriesService],
})
export class InquiriesModule {}
