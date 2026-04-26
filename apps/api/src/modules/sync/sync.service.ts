import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfflineClient, OfflineClientDocument } from '../../database/schemas/offline-client.schema';
import { OfflineSyncBatch, OfflineSyncBatchDocument } from '../../database/schemas/offline-sync-batch.schema';
import { SyncConflict, SyncConflictDocument } from '../../database/schemas/sync-conflict.schema';
import { SyncPushDto } from './dto/sync-push.dto';

@Injectable()
export class SyncService {
  constructor(
    @InjectModel(OfflineClient.name) private readonly offlineClientModel: Model<OfflineClientDocument>,
    @InjectModel(OfflineSyncBatch.name) private readonly batchModel: Model<OfflineSyncBatchDocument>,
    @InjectModel(SyncConflict.name) private readonly conflictModel: Model<SyncConflictDocument>,
  ) {}

  bootstrap() {
    return {
      pulledAt: new Date().toISOString(),
      safeStores: ['cached_properties', 'cached_units', 'cached_tenants', 'cached_landlords', 'cached_charges', 'cached_receipts', 'cached_settings'],
      settings: { maxCacheDays: 14, serverWinsForFinancialRecords: true },
    };
  }

  pull(since?: string) {
    return { since, pulledAt: new Date().toISOString(), changes: [] };
  }

  async push(dto: SyncPushDto) {
    const accepted = [] as unknown[];
    const conflicts = [] as unknown[];
    const batch = await this.batchModel.create({ deviceId: dto.deviceId, status: 'processed' });

    for (const mutation of dto.mutations ?? []) {
      if (mutation.operation.includes('PAYMENT') && !mutation.payload) {
        const conflict = await this.conflictModel.create({ batchId: batch._id, localId: mutation.localId, operation: mutation.operation, entityType: mutation.entityType, reason: 'Missing payment payload', clientPayload: mutation, status: 'open' });
        conflicts.push(conflict);
      } else {
        accepted.push({ localId: mutation.localId, operation: mutation.operation, status: 'accepted' });
      }
    }

    await this.batchModel.findByIdAndUpdate(batch._id, { $set: { acceptedCount: accepted.length, conflictCount: conflicts.length } });
    return { batchId: String(batch._id), accepted, rejected: [], conflicts, serverCorrections: [], canonicalRecords: [] };
  }

  batches() { return this.batchModel.find().sort({ created_at: -1 }).limit(100).lean(); }
  batch(id: string) { return this.batchModel.findById(id).lean(); }
  conflicts() { return this.conflictModel.find({ status: 'open' }).sort({ created_at: -1 }).lean(); }
  resolveConflict(id: string, dto: Record<string, unknown>) { return this.conflictModel.findByIdAndUpdate(id, { $set: { ...dto, status: 'resolved', resolvedAt: new Date() } }, { new: true }).lean(); }
  registerDevice(dto: Record<string, unknown>) { return this.offlineClientModel.findOneAndUpdate({ deviceId: dto.deviceId }, { $set: dto }, { upsert: true, new: true }).lean(); }
  revokeDevice(dto: Record<string, unknown>) { return this.offlineClientModel.findOneAndUpdate({ deviceId: dto.deviceId }, { $set: { status: 'revoked' } }, { new: true }).lean(); }
}
