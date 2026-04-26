import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerLoggerService {
  info(message: string, context?: Record<string, unknown>) {
    console.log(JSON.stringify({ level: 'info', message, context, at: new Date().toISOString() }));
  }

  warn(message: string, context?: Record<string, unknown>) {
    console.warn(JSON.stringify({ level: 'warn', message, context, at: new Date().toISOString() }));
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    console.error(JSON.stringify({ level: 'error', message, error: error instanceof Error ? error.message : error, context, at: new Date().toISOString() }));
  }
}
