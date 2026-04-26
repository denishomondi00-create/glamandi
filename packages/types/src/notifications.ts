import type { AuditStamped, ObjectIdString, ISODateString } from './api';

export interface NotificationView extends AuditStamped {
  id: ObjectIdString;
  recipientType: 'tenant' | 'landlord' | 'staff' | 'admin';
  recipientId?: ObjectIdString;
  channel: 'email' | 'sms' | 'whatsapp' | 'in_app';
  templateKey: string;
  subject?: string;
  body: string;
  status: 'queued' | 'sent' | 'failed' | 'skipped';
  scheduledFor?: ISODateString;
  sentAt?: ISODateString;
}

export interface NotificationJobPayload {
  notificationId?: ObjectIdString;
  channel: NotificationView['channel'];
  recipient: string;
  subject?: string;
  body: string;
  templateKey?: string;
  context?: Record<string, unknown>;
}
