import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationRecord, NotificationRecordSchema } from '../../database/schemas/notification.schema';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationRecord.name, schema: NotificationRecordSchema }])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
