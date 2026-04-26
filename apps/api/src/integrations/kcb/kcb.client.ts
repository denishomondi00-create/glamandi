import { Injectable } from '@nestjs/common';

@Injectable()
export class KcbClient {
  normalizeReference(reference: string) {
    return reference.trim().toUpperCase();
  }
}
