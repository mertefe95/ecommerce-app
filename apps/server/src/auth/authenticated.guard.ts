import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from './roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

import { Role } from 'src/interface/Role';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: any = context.switchToHttp().getRequest<Request>();
    const roles = this.reflector.get<Role[]>(Roles, context.getHandler());

    if (!request.isAuthenticated())
      throw new ForbiddenException('Authentication is denied.');

    const adminId = request?.user?.adminId;
    const userId = request?.user?.userId;

    if (roles?.includes(Role.ADMIN)) {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId ?? 0 },
      });

      if (admin) return request.isAuthenticated();
    }

    if (roles?.includes(Role.USER)) {
      const user = await this.prisma.user.findFirst({
        where: { id: userId ?? 0 },
      });

      if (user) return request.isAuthenticated();
    }

    if (roles?.includes(Role.GUEST)) {
      return request.isAuthenticated();
    }

    throw new ForbiddenException('Authentication is denied.');
  }
}
