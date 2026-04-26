import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: string, id?: string) {
    super({ message: `${entity}${id ? ` ${id}` : ''} was not found`, code: 'ENTITY_NOT_FOUND' });
  }
}
