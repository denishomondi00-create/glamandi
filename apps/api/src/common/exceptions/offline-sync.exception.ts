import { BadRequestException } from '@nestjs/common';

export class OfflineSyncException extends BadRequestException {
  constructor(message = 'Offline sync failed', details?: unknown) {
    super({ message, code: 'OFFLINE_SYNC_FAILED', details });
  }
}
