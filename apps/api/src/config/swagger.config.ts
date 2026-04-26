import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  enabled: process.env.SWAGGER_ENABLED !== 'false',
  title: 'Glamandi PMOS API',
  description: 'Glamandi Control Center backend API for property, tenant, landlord, payment, offline sync, and website operations.',
  version: '1.0.0',
  path: process.env.SWAGGER_PATH ?? 'docs',
}));
