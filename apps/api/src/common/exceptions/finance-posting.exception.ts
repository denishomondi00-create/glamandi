import { BadRequestException } from '@nestjs/common';

export class FinancePostingException extends BadRequestException {
  constructor(message = 'Finance posting failed', details?: unknown) {
    super({ message, code: 'FINANCE_POSTING_FAILED', details });
  }
}
