export const API_BASE_PATH = '/api/v1';

export const route = (path: string) => `${API_BASE_PATH}${path}` as const;

export const AUTH_ROUTES = {
  login: '/auth/login',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
  me: '/auth/me',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
} as const;

export const OFFLINE_SYNC_ROUTES = {
  bootstrap: '/sync/bootstrap',
  pull: '/sync/pull',
  push: '/sync/push',
  batches: '/sync/batches',
  conflicts: '/sync/conflicts',
  registerDevice: '/sync/device/register',
  revokeDevice: '/sync/device/revoke',
} as const;

export const PAYMENT_ROUTES = {
  list: '/payments',
  create: '/payments',
  byId: (id: string) => `/payments/${id}`,
  reverse: (id: string) => `/payments/${id}/reverse`,
  manualMpesa: '/payments/manual/mpesa',
  manualKcb: '/payments/manual/kcb',
  manualCash: '/payments/manual/cash',
  initializePaystack: '/payments/initialize/paystack',
  verifyPaystack: '/payments/verify/paystack',
  initializeDarajaStk: '/payments/initialize/daraja-stk',
  verifyDarajaStk: '/payments/verify/daraja-stk',
  reconciliation: '/payments/reconciliation',
  reconciliationRun: '/payments/reconciliation/run',
  reconciliationResolve: (id: string) => `/payments/reconciliation/${id}/resolve`,
} as const;

export const WEBHOOK_ROUTES = {
  paystack: '/webhooks/paystack',
  darajaStkCallback: '/webhooks/daraja/stk-callback',
  darajaResult: '/webhooks/daraja/result',
  darajaTimeout: '/webhooks/daraja/timeout',
  darajaC2bValidation: '/webhooks/daraja/c2b-validation',
  darajaC2bConfirmation: '/webhooks/daraja/c2b-confirmation',
  internalWorkerHealth: '/webhooks/internal/worker-health',
} as const;

export const RESOURCE_ROUTES = {
  health: '/health',
  users: '/users',
  roles: '/roles',
  permissions: '/permissions',
  landlords: '/landlords',
  properties: '/properties',
  units: '/units',
  tenants: '/tenants',
  tenancies: '/tenancies',
  inquiries: '/inquiries',
  charges: '/charges',
  receipts: '/receipts',
  penalties: '/penalties',
  deposits: '/deposits',
  utilities: '/utilities',
  repairs: '/repairs',
  statements: '/statements',
  payouts: '/payouts',
  reports: '/reports',
  website: '/website',
  documents: '/documents',
  notifications: '/notifications',
  settings: '/settings',
  audit: '/audit',
} as const;

export const REPORT_ROUTES = {
  dashboard: '/reports/dashboard',
  collections: '/reports/collections',
  occupancy: '/reports/occupancy',
  defaulters: '/reports/defaulters',
  penalties: '/reports/penalties',
  commission: '/reports/commission',
  repairs: '/reports/repairs',
  deposits: '/reports/deposits',
  inquiries: '/reports/inquiries',
  paymentChannels: '/reports/payment-channels',
  landlordPayouts: '/reports/landlord-payouts',
  export: '/reports/export',
} as const;

export const WEBSITE_ROUTES = {
  listings: '/website/listings',
  listingBySlug: (slug: string) => `/website/listings/${slug}`,
  syncListings: '/website/listings/sync',
  featured: '/website/featured',
  publishProperty: (id: string) => `/website/properties/${id}/publish`,
  publishUnit: (id: string) => `/website/units/${id}/publish`,
  featureUnit: (id: string) => `/website/units/${id}/feature`,
  pages: '/website/pages',
  pageByKey: (pageKey: string) => `/website/pages/${pageKey}`,
  seo: '/website/seo',
} as const;

export const QUEUE_TRIGGER_ROUTES = {
  generateMonthlyRent: '/charges/generate-monthly-rent',
  evaluatePenalties: '/penalties/evaluate',
  generateLandlordStatements: '/statements/landlords/generate',
  runNotifications: '/notifications/reminders/run',
  syncWebsiteListings: '/website/listings/sync',
  runPaymentReconciliation: '/payments/reconciliation/run',
};

export const API_ROUTES = {
  auth: AUTH_ROUTES,
  sync: OFFLINE_SYNC_ROUTES,
  payments: PAYMENT_ROUTES,
  webhooks: WEBHOOK_ROUTES,
  resources: RESOURCE_ROUTES,
  reports: REPORT_ROUTES,
  website: WEBSITE_ROUTES,
  queues: QUEUE_TRIGGER_ROUTES,
} as const;
