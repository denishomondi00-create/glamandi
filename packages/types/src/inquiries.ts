import type { AuditStamped, ObjectIdString, ISODateString } from './api';
import type { InquiryStatus } from '@glamandi/contracts/inquiry-status';

export interface InquiryView extends AuditStamped {
  id: ObjectIdString;
  name: string;
  phone: string;
  email?: string;
  interestedPropertyId?: ObjectIdString;
  interestedUnitId?: ObjectIdString;
  message?: string;
  status: InquiryStatus;
  assignedTo?: ObjectIdString;
  nextFollowUpAt?: ISODateString;
  source: 'website' | 'walk_in' | 'phone' | 'whatsapp' | 'referral' | 'offline';
}

export interface CreateInquiryInput {
  name: string;
  phone: string;
  email?: string;
  interestedPropertyId?: ObjectIdString;
  interestedUnitId?: ObjectIdString;
  message?: string;
  source?: InquiryView['source'];
}
