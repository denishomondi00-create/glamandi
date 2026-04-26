import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackClient {
  constructor(private readonly config: ConfigService) {}

  initializeTransaction(payload: Record<string, unknown>) {
    return { provider: 'paystack', payload, authorization_url: '/paystack/mock-checkout' };
  }

  verifyTransaction(reference: string) {
    return { provider: 'paystack', reference, status: 'success' };
  }
}
