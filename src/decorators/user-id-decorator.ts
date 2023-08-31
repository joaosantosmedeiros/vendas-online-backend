import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { LoginPayload } from '../auth/dtos/login-payload';
import { authorizationToLoginPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload: LoginPayload = authorizationToLoginPayload(authorization);

  return loginPayload?.id;
});
