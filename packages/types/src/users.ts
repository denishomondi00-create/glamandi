import type { AuditStamped, ObjectIdString } from './api';
import type { SystemRole } from '@glamandi/contracts/roles';

export interface UserView extends AuditStamped {
  id: ObjectIdString;
  name: string;
  email: string;
  phone?: string;
  role: SystemRole;
  status: 'draft' | 'invited' | 'email_verified' | 'mfa_pending' | 'active' | 'suspended' | 'offboarded';
  department?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone?: string;
  role: SystemRole;
  department?: string;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  status?: UserView['status'];
}
