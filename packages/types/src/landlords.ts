import type { AuditStamped, MoneyAmount, ObjectIdString } from './api';

export interface LandlordView extends AuditStamped {
  id: ObjectIdString;
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  payoutMethod?: 'mpesa' | 'bank' | 'cash';
  payoutAccount?: string;
  propertiesCount: number;
  outstandingPayout?: MoneyAmount;
}

export interface CreateLandlordInput {
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  payoutMethod?: LandlordView['payoutMethod'];
  payoutAccount?: string;
}
