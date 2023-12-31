import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/contants';
import { LoginPayload } from '../auth/dtos/login-payload';
import { ROLES_KEY } from '../decorators/roles-decorator';
import { UserType } from '../user/enum/userType-enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPayload = await this.jwtService
      .verifyAsync(authorization, {
        secret: jwtConstants.secret,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role == loginPayload.userType);
  }
}
