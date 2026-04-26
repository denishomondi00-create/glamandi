import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DarajaClient {
  constructor(private readonly config: ConfigService) {}

  stkPush(payload: Record<string, unknown>) {
    return { provider: 'daraja', operation: 'stkPush', payload, status: 'pending' };
  }

  verify(checkoutRequestId: string) {
    return { provider: 'daraja', checkoutRequestId, status: 'pending' };
  }
}
