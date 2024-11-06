import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException("User role isn't equal to required role.");
    }

    if (
      requiredRoles.includes('USER') &&
      request.url.includes('users') &&
      user.sub !== Number(request.params.id)
    ) {
      throw new ForbiddenException(
        'User with role "User" can have access only to his profile',
      );
    }

    if (!user) {
      throw new UnauthorizedException('User not authenticated.');
    }
    return true;
  }
}
