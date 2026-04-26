import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfflineClient, OfflineClientSchema } from '../../database/schemas/offline-client.schema';
import { OfflineSyncBatch, OfflineSyncBatchSchema } from '../../database/schemas/offline-sync-batch.schema';
import { SyncConflict, SyncConflictSchema } from '../../database/schemas/sync-conflict.schema';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: OfflineClient.name, schema: OfflineClientSchema },
    { name: OfflineSyncBatch.name, schema: OfflineSyncBatchSchema },
    { name: SyncConflict.name, schema: SyncConflictSchema },
  ])],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
