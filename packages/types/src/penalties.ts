import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';
import type { PenaltyType } from '@glamandi/contracts/penalty-types';

export interface PenaltyView extends AuditStamped {
  id: ObjectIdString;
  tenantId: ObjectIdString;
  tenancyId: ObjectIdString;
  type: PenaltyType;
  amount: MoneyAmount;
  period: string;
  triggeredAt: ISODateString;
  status: 'pending' | 'applied' | 'waived';
  reason: string;
  waivedBy?: ObjectIdString;
  waiverReason?: string;
}
