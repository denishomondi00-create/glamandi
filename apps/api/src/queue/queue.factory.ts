import { ConfigService } from '@nestjs/config';

export function createBullMqConnection(config: ConfigService) {
  return {
    host: config.get<string>('redis.host') ?? 'localhost',
    port: config.get<number>('redis.port') ?? 6379,
    password: config.get<string>('redis.password'),
  };
}
