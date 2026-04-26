import type { ISODateString, ObjectIdString } from './api';
import type { SystemRole } from '@glamandi/contracts/roles';
import type { PermissionCode } from '@glamandi/contracts/permissions';

export interface AuthUser {
  id: ObjectIdString;
  name: string;
  email: string;
  phone?: string;
  role: SystemRole;
  permissions: PermissionCode[];
  status: 'invited' | 'active' | 'suspended' | 'offboarded';
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
  expiresAt: ISODateString;
}

export interface SessionView {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
