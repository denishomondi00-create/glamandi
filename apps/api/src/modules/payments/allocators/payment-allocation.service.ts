import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentAllocationService {
  async allocate(payment: Record<string, unknown>) {
    // Allocation policy: oldest open charges first. Implement with Mongo transaction in production path.
    return { payment, allocations: [], allocationStatus: 'pending_allocation' };
  }
}
