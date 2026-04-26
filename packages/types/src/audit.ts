import type { ObjectIdString, ISODateString } from './api';

export interface AuditLogView {
  id: ObjectIdString;
  actorId?: ObjectIdString;
  actorName?: string;
  action: string;
  entityType: string;
  entityId?: ObjectIdString;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: ISODateString;
}
