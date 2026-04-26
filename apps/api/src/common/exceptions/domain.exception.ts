import { BadRequestException } from '@nestjs/common';

export class DomainException extends BadRequestException {
  constructor(message: string, public readonly code = 'DOMAIN_RULE_FAILED') {
    super({ message, code });
  }
}
