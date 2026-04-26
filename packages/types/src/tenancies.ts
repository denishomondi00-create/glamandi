import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';
import type { TenancyStatus } from '@glamandi/contracts/tenancy-status';

export interface TenancyLocationSnapshot {
  propertyName: string;
  county: string;
  town: string;
  area: string;
  buildingName?: string;
  unitLabel: string;
}

export interface TenancyView extends AuditStamped {
  id: ObjectIdString;
  tenantId: ObjectIdString;
  propertyId: ObjectIdString;
  unitId: ObjectIdString;
  status: TenancyStatus;
  startDate: ISODateString;
  moveOutDate?: ISODateString;
  monthlyRent: MoneyAmount;
  depositRequired: MoneyAmount;
  depositPaid: MoneyAmount;
  propertyLocationSnapshot: TenancyLocationSnapshot;
}

export interface CreateTenancyInput {
  tenantId: ObjectIdString;
  unitId: ObjectIdString;
  startDate: ISODateString;
  monthlyRent: MoneyAmount;
  depositRequired: MoneyAmount;
}
