export const DOCUMENT_TYPES = {
  lease: 'lease',
  receipt: 'receipt',
  statement: 'statement',
  payoutProof: 'payout_proof',
  paymentProof: 'payment_proof',
  repairProof: 'repair_proof',
  landlordKyc: 'landlord_kyc',
  tenantKyc: 'tenant_kyc',
  other: 'other',
} as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[keyof typeof DOCUMENT_TYPES];
