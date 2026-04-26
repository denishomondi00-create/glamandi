import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';

export interface DepositLedgerEntryView extends AuditStamped {
  id: ObjectIdString;
  tenantId: ObjectIdString;
  tenancyId: ObjectIdString;
  type: 'charge' | 'payment' | 'deduction' | 'refund_request' | 'refund_approved' | 'refund_rejected' | 'refund_paid' | 'adjustment';
  amount: MoneyAmount;
  effectiveAt: ISODateString;
  reason?: string;
}
