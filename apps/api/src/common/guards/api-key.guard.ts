import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const configuredKey = this.config.get<string>('app.internalApiKey');
    if (!configuredKey) return true;
    const request = context.switchToHttp().getRequest();
    return request.headers['x-api-key'] === configuredKey;
  }
}
