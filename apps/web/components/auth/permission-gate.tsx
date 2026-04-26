import type { ReactNode } from "react";
import { hasPermission, type Permission } from "@/lib/auth/permissions";

export function PermissionGate({ permissions, required, children, fallback = null }: { permissions: Permission[]; required: Permission; children: ReactNode; fallback?: ReactNode }) {
  return hasPermission(permissions, required) ? <>{children}</> : <>{fallback}</>;
}
