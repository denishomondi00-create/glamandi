import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuditContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    request.auditContext = {
      actorId: request.user?.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
      requestId: request.id ?? request.headers['x-request-id'],
    };
    return next.handle();
  }
}
