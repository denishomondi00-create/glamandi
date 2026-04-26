import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request & { id?: string }, res: Response, next: NextFunction) {
    const requestId = (req.headers['x-request-id'] as string | undefined) ?? randomUUID();
    req.id = requestId;
    res.setHeader('x-request-id', requestId);
    next();
  }
}
