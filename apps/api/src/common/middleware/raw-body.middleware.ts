import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request & { rawBody?: Buffer }, _res: Response, next: NextFunction) {
    // NestFactory rawBody option keeps rawBody available for webhook signature verification.
    next();
  }
}
