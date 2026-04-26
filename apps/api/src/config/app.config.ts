import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME ?? 'Glamandi PMOS',
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  url: process.env.API_URL ?? 'http://localhost:4000',
  webUrl: process.env.APP_URL ?? 'http://localhost:3000',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  internalApiKey: process.env.INTERNAL_API_KEY,
}));
