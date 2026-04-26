import { registerAs } from '@nestjs/config';

export default registerAs('offlineSync', () => ({
  enabled: process.env.OFFLINE_SYNC_ENABLED !== 'false',
  maxCacheDays: Number(process.env.OFFLINE_MAX_CACHE_DAYS ?? 14),
  maxMutationAgeDays: Number(process.env.OFFLINE_MAX_MUTATION_AGE_DAYS ?? 7),
  deviceRegistrationRequired: process.env.OFFLINE_DEVICE_REGISTRATION_REQUIRED !== 'false',
}));
