export const cachePolicy = {
  maxCacheDays: Number(process.env.NEXT_PUBLIC_OFFLINE_MAX_CACHE_DAYS ?? 14),
  safeStores: ["cached_users", "cached_properties", "cached_units", "cached_tenants", "cached_landlords", "cached_charges", "cached_receipts", "cached_settings"],
  neverCacheSensitive: ["raw_payment_proofs", "jwt_refresh_tokens", "full_audit_exports"],
};
