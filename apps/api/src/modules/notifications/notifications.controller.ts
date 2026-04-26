import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}
  @Get() findAll(@Query() query: PaginationQueryDto) { return this.service.findAll(query); }
  @Post('test') test(@Body() dto: CreateNotificationDto) { return { operation: 'notifications.test', dto }; }
  @Post('send') send(@Body() dto: CreateNotificationDto) { return this.service.create(dto); }
  @Post('reminders/run') remindersRun() { return { operation: 'notifications.reminders.run' }; }
}
