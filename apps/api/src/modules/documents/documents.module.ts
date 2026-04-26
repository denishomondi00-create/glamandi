import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentRecord, DocumentRecordSchema } from '../../database/schemas/document.schema';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DocumentRecord.name, schema: DocumentRecordSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
