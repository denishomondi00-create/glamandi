import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncPushDto } from './dto/sync-push.dto';

@Controller('sync')
export class SyncController {
  constructor(private readonly sync: SyncService) {}

  @Get('bootstrap') bootstrap() { return this.sync.bootstrap(); }
  @Get('pull') pull(@Query('since') since?: string) { return this.sync.pull(since); }
  @Post('push') push(@Body() dto: SyncPushDto) { return this.sync.push(dto); }
  @Get('batches') batches() { return this.sync.batches(); }
  @Get('batches/:id') batch(@Param('id') id: string) { return this.sync.batch(id); }
  @Get('conflicts') conflicts() { return this.sync.conflicts(); }
  @Post('conflicts/:id/resolve') resolveConflict(@Param('id') id: string, @Body() dto: Record<string, unknown>) { return this.sync.resolveConflict(id, dto); }
  @Post('device/register') registerDevice(@Body() dto: Record<string, unknown>) { return this.sync.registerDevice(dto); }
  @Post('device/revoke') revokeDevice(@Body() dto: Record<string, unknown>) { return this.sync.revokeDevice(dto); }
}
