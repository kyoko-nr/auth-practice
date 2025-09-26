import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as { [key: string]: any } | undefined;

    // Firebase custom claims are flattened on the decoded token
    const role = user?.role as Role | undefined;
    const allowed = role ? requiredRoles.includes(role) : false;

    if (!allowed) throw new ForbiddenException('Insufficient role');
    return true;
  }
}

