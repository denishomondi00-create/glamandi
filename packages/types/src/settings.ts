import type { MoneyAmount } from './api';
import type { PaymentMethodCode } from '@glamandi/contracts/payment-methods';

export interface BusinessRulesSettings {
  rentDueDay: number;
  commissionRate: number;
  moveInFullRentCutoffDay: number;
  moveInHalfRentAfterDay: number;
  depositCanBeUsedAsRent: false;
  noticeRequiredDays: number;
  noticeWindowStartDay: number;
  noticeWindowEndDay: number;
}

export interface PaymentMethodSettings {
  code: PaymentMethodCode;
  name: string;
  status: 'active' | 'inactive';
  requiresProof: boolean;
  supportsWebhook: boolean;
  supportsAutoVerification: boolean;
  supportsOfflineDraft: boolean;
  config: Record<string, string | number | boolean | undefined>;
}

export interface PenaltyRuleSettings {
  fromDay: number;
  toDay?: number | null;
  amount: MoneyAmount;
  enabled: boolean;
}
