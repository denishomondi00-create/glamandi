import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantContext = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    userId: request.user?.id,
    tenantId: request.user?.tenantId,
    landlordId: request.user?.landlordId,
    role: request.user?.role,
  };
});
