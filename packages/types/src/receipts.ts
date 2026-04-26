import type { AuditStamped, MoneyAmount, ObjectIdString, ISODateString } from './api';

export interface ReceiptView extends AuditStamped {
  id: ObjectIdString;
  receiptNumber: string;
  tenantId: ObjectIdString;
  paymentId: ObjectIdString;
  amount: MoneyAmount;
  issuedAt: ISODateString;
  pdfDocumentId?: ObjectIdString;
  emailedAt?: ISODateString;
}
