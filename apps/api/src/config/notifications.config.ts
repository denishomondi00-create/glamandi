import { registerAs } from '@nestjs/config';

export default registerAs('notifications', () => ({
  emailFrom: process.env.EMAIL_FROM ?? 'Glamandi Homes <no-reply@glamandi.local>',
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  smsProvider: process.env.SMS_PROVIDER ?? 'manual',
  whatsappEnabled: process.env.WHATSAPP_ENABLED === 'true',
}));
