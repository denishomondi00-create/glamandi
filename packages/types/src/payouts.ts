import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';
import type { PayoutStatus } from '@glamandi/contracts/payout-status';

export interface LandlordPayoutView extends AuditStamped {
  id: ObjectIdString;
  landlordId: ObjectIdString;
  statementId?: ObjectIdString;
  amount: MoneyAmount;
  status: PayoutStatus;
  method: 'mpesa' | 'bank' | 'cash';
  reference?: string;
  markedPaidAt?: ISODateString;
  proofDocumentId?: ObjectIdString;
}
