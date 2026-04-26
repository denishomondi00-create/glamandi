import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  ping() { return 'PONG'; }
}
