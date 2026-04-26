import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';

export interface UtilityChargeView extends AuditStamped {
  id: ObjectIdString;
  tenantId: ObjectIdString;
  tenancyId: ObjectIdString;
  utilityType: 'water' | 'electricity' | 'garbage' | 'security' | 'service_charge' | 'other';
  period: string;
  amount: MoneyAmount;
  dueDate: ISODateString;
  meterReadingPrevious?: number;
  meterReadingCurrent?: number;
  status: 'draft' | 'posted' | 'void';
}
