import type { AuditStamped, MoneyAmount, ObjectIdString } from './api';

export interface TenantView extends AuditStamped {
  id: ObjectIdString;
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  activeTenancyId?: ObjectIdString;
  currentBalance: MoneyAmount;
  depositStatus: 'not_paid' | 'partial' | 'paid' | 'refund_requested' | 'refunded';
}

export interface CreateTenantInput {
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}
