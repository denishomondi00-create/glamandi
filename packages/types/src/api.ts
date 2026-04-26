export type ISODateString = string;
export type ObjectIdString = string;
export type CurrencyCode = 'KES' | 'USD' | 'UGX' | 'TZS' | 'GBP' | 'EUR';

export interface MoneyAmount {
  amount: number;
  currency: CurrencyCode;
}

export interface ApiSuccess<T> {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiFailure {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuditStamped {
  createdAt: ISODateString;
  updatedAt: ISODateString;
  createdBy?: ObjectIdString;
  updatedBy?: ObjectIdString;
}
