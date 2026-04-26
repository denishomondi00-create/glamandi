import { ConflictException } from '@nestjs/common';

export class ConflictRecordException extends ConflictException {
  constructor(message = 'Record conflict detected', details?: unknown) {
    super({ message, code: 'RECORD_CONFLICT', details });
  }
}
