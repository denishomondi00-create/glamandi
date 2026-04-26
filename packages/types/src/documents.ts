import type { AuditStamped, ObjectIdString } from './api';
import type { DocumentType } from '@glamandi/contracts/document-types';

export interface DocumentView extends AuditStamped {
  id: ObjectIdString;
  type: DocumentType;
  ownerType: 'tenant' | 'landlord' | 'property' | 'unit' | 'payment' | 'repair' | 'statement' | 'system';
  ownerId?: ObjectIdString;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  publicUrl?: string;
}
