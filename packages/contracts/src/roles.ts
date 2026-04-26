export const SYSTEM_ROLES = {
  admin: 'admin',
  staff: 'staff',
  landlord: 'landlord',
  tenant: 'tenant',
} as const;
export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];
