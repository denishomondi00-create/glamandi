import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction) {
    res.setHeader('x-glamandi-system', 'control-center');
    res.setHeader('x-content-type-options', 'nosniff');
    next();
  }
}
