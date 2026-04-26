import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { id?: string }>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : undefined;
    const message = typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse
      ? (exceptionResponse as { message: string | string[] }).message
      : exception instanceof Error
        ? exception.message
        : 'Internal server error';

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      method: request.method,
      requestId: request.id ?? request.headers['x-request-id'],
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
