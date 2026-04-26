export const INQUIRY_STATUSES = {
  new: 'new',
  contacted: 'contacted',
  viewingScheduled: 'viewing_scheduled',
  converted: 'converted',
  lost: 'lost',
  stale: 'stale',
} as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[keyof typeof INQUIRY_STATUSES];
