import type { MoneyAmount, ISODateString } from './api';

export interface DashboardMetric {
  key: string;
  label: string;
  value: number | string;
  money?: MoneyAmount;
  trend?: 'up' | 'down' | 'flat';
}

export interface AdminDashboardReport {
  generatedAt: ISODateString;
  totalRentBilledThisMonth: MoneyAmount;
  totalCollectedThisMonth: MoneyAmount;
  outstandingBalances: MoneyAmount;
  lateTenants: number;
  penaltiesTriggered: number;
  vacantUnits: number;
  occupiedUnits: number;
  reservedUnits: number;
  maintenanceUnits: number;
  lockedUnits: number;
  commissionEarned: MoneyAmount;
  landlordPayoutsDue: MoneyAmount;
  pendingRepairDeductions: number;
  pendingStatements: number;
  manualPaymentsAwaitingReconciliation: number;
  offlineRecordsPendingSync: number;
  syncConflicts: number;
  newInquiries: number;
  uncontactedLeads: number;
}
