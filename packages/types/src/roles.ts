import type { AuditStamped, ObjectIdString } from './api';
import type { PermissionCode } from '@glamandi/contracts/permissions';

export interface RoleView extends AuditStamped {
  id: ObjectIdString;
  code: string;
  name: string;
  description?: string;
  permissions: PermissionCode[];
  isSystem: boolean;
}

export interface PermissionView {
  code: PermissionCode;
  label: string;
  group: string;
}
