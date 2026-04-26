import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: Error & { code?: number }, host: ArgumentsHost) {
    if (exception.code !== 11000) {
      throw exception;
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const conflict = new ConflictException('Duplicate record detected');
    response.status(conflict.getStatus()).json({
      success: false,
      message: conflict.message,
      code: 'DUPLICATE_RECORD',
      timestamp: new Date().toISOString(),
    });
  }
}
