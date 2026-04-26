import type { ObjectIdString } from '@glamandi/types/api';

export interface BaseJobPayload {
  requestedBy?: ObjectIdString | 'system';
  requestedAt?: string;
  correlationId?: string;
}

export interface PeriodJobPayload extends BaseJobPayload {
  period?: string;
  propertyId?: ObjectIdString;
  landlordId?: ObjectIdString;
}

export interface EntityJobPayload extends BaseJobPayload {
  id: ObjectIdString;
}

export interface NotificationJobPayload extends BaseJobPayload {
  notificationId?: ObjectIdString;
  recipient?: string;
  channel?: 'email' | 'sms' | 'whatsapp' | 'in_app';
  templateKey?: string;
  context?: Record<string, unknown>;
}

export interface ExportJobPayload extends BaseJobPayload {
  reportKey: string;
  filters?: Record<string, unknown>;
  format: 'csv' | 'xlsx' | 'pdf';
}
