export const PERMISSIONS = {
  SYSTEM_ADMIN: 'system.admin',
  USERS_MANAGE: 'users.manage',
  SETTINGS_MANAGE: 'settings.manage',
  PAYMENTS_POST: 'payments.post',
  PAYMENTS_REVERSE: 'payments.reverse',
  PENALTIES_WAIVE: 'penalties.waive',
  PAYOUTS_MARK_PAID: 'payouts.mark_paid',
  OFFLINE_CONFLICTS_RESOLVE: 'offline.conflicts.resolve',
  AUDIT_READ: 'audit.read',
  REPORTS_READ: 'reports.read',
} as const;

export const ROLE_KEYS = {
  ADMIN: 'admin',
  STAFF: 'staff',
  TENANT: 'tenant',
  LANDLORD: 'landlord',
} as const;
