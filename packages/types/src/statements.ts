import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';

export interface StatementLineItem {
  label: string;
  amount: MoneyAmount;
  referenceId?: ObjectIdString;
  type: 'collection' | 'commission' | 'repair_deduction' | 'withdrawal' | 'payout' | 'adjustment';
}

export interface LandlordStatementView extends AuditStamped {
  id: ObjectIdString;
  landlordId: ObjectIdString;
  period: string;
  generatedAt: ISODateString;
  grossCollected: MoneyAmount;
  commission: MoneyAmount;
  repairDeductions: MoneyAmount;
  netPayout: MoneyAmount;
  status: 'draft' | 'final' | 'emailed' | 'void';
  lines: StatementLineItem[];
}

export interface TenantStatementView {
  tenantId: ObjectIdString;
  periodFrom: ISODateString;
  periodTo: ISODateString;
  openingBalance: MoneyAmount;
  charges: StatementLineItem[];
  payments: StatementLineItem[];
  closingBalance: MoneyAmount;
}
