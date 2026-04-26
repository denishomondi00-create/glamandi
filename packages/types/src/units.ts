import type { AuditStamped, MoneyAmount, ObjectIdString } from './api';
import type { UnitStatus } from '@glamandi/contracts/unit-status';

export interface UnitLocationDetail {
  blockName?: string;
  floor?: string;
  wing?: string;
  doorNumber?: string;
  unitLabel: string;
  accessNote?: string;
  visibleOnWebsite: boolean;
}

export interface UnitView extends AuditStamped {
  id: ObjectIdString;
  propertyId: ObjectIdString;
  slug: string;
  unitNumber: string;
  unitType: string;
  bedrooms?: number;
  bathrooms?: number;
  rent: MoneyAmount;
  deposit: MoneyAmount;
  status: UnitStatus;
  locationDetail: UnitLocationDetail;
  published: boolean;
  featured: boolean;
}

export interface CreateUnitInput {
  propertyId: ObjectIdString;
  unitNumber: string;
  unitType: string;
  bedrooms?: number;
  bathrooms?: number;
  rent: MoneyAmount;
  deposit: MoneyAmount;
  locationDetail: UnitLocationDetail;
}
