export type Permission =
  | "dashboard:view"
  | "properties:manage"
  | "units:manage"
  | "tenants:manage"
  | "landlords:view"
  | "payments:draft"
  | "payments:reverse"
  | "receipts:view"
  | "repairs:manage"
  | "statements:view"
  | "payouts:mark_paid"
  | "settings:manage"
  | "audit:view"
  | "offline_sync:resolve";

export const rolePermissions: Record<string, Permission[]> = {
  admin: ["dashboard:view", "properties:manage", "units:manage", "tenants:manage", "landlords:view", "payments:draft", "payments:reverse", "receipts:view", "repairs:manage", "statements:view", "payouts:mark_paid", "settings:manage", "audit:view", "offline_sync:resolve"],
  staff: ["dashboard:view", "properties:manage", "units:manage", "tenants:manage", "payments:draft", "receipts:view", "repairs:manage", "statements:view"],
  tenant: ["receipts:view"],
  landlord: ["landlords:view", "statements:view"],
};

export function hasPermission(permissions: Permission[], required: Permission) {
  return permissions.includes(required);
}
