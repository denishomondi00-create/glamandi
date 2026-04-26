import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandlordStatement, LandlordStatementSchema } from '../../database/schemas/landlord-statement.schema';
import { StatementsController } from './statements.controller';
import { StatementsService } from './statements.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: LandlordStatement.name, schema: LandlordStatementSchema }])],
  controllers: [StatementsController],
  providers: [StatementsService],
  exports: [StatementsService],
})
export class StatementsModule {}
