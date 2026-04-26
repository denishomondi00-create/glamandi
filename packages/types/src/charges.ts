import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';
import type { ChargeStatus } from '@glamandi/contracts/charge-status';
import type { ChargeType } from '@glamandi/contracts/charge-types';

export interface ChargeView extends AuditStamped {
  id: ObjectIdString;
  tenantId: ObjectIdString;
  tenancyId: ObjectIdString;
  unitId: ObjectIdString;
  type: ChargeType;
  description: string;
  period: string;
  dueDate: ISODateString;
  amount: MoneyAmount;
  paidAmount: MoneyAmount;
  status: ChargeStatus;
  voidReason?: string;
}

export interface CreateChargeInput {
  tenantId: ObjectIdString;
  tenancyId: ObjectIdString;
  type: ChargeType;
  description: string;
  period: string;
  dueDate: ISODateString;
  amount: MoneyAmount;
}
