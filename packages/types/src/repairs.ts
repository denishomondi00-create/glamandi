import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';
import type { RepairStatus } from '@glamandi/contracts/repair-status';

export interface RepairTicketView extends AuditStamped {
  id: ObjectIdString;
  propertyId: ObjectIdString;
  unitId?: ObjectIdString;
  tenantId?: ObjectIdString;
  title: string;
  description: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: RepairStatus;
  assignedTo?: ObjectIdString;
  dueAt?: ISODateString;
  completedAt?: ISODateString;
  landlordDeductibleAmount?: MoneyAmount;
}

export interface RepairExpenseView extends AuditStamped {
  id: ObjectIdString;
  repairTicketId: ObjectIdString;
  amount: MoneyAmount;
  vendorName?: string;
  proofDocumentId?: ObjectIdString;
  deductionStatus: 'not_requested' | 'pending_approval' | 'approved' | 'rejected';
}
