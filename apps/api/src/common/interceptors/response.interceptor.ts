import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        requestId: request.id ?? request.headers['x-request-id'],
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
