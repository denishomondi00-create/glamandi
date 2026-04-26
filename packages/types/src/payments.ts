import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';
import type { PaymentMethodCode } from '@glamandi/contracts/payment-methods';
import type { PaymentStatus } from '@glamandi/contracts/payment-status';

export interface PaymentView extends AuditStamped {
  id: ObjectIdString;
  tenantId: ObjectIdString;
  tenancyId?: ObjectIdString;
  method: PaymentMethodCode;
  status: PaymentStatus;
  amount: MoneyAmount;
  reference?: string;
  paidAt: ISODateString;
  receivedBy?: ObjectIdString;
  receiptId?: ObjectIdString;
  reversalReason?: string;
  offlineLocalId?: string;
}

export interface ManualPaymentInput {
  tenantId: ObjectIdString;
  tenancyId?: ObjectIdString;
  amount: MoneyAmount;
  reference?: string;
  paidAt: ISODateString;
  notes?: string;
  proofDocumentId?: ObjectIdString;
}

export interface PaymentIntentView extends AuditStamped {
  id: ObjectIdString;
  provider: 'paystack' | 'daraja';
  tenantId: ObjectIdString;
  amount: MoneyAmount;
  reference: string;
  status: 'created' | 'pending' | 'successful' | 'failed' | 'expired';
  authorizationUrl?: string;
}
