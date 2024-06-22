import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { AdminService } from './admin.service';
import { Admin } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/me')
  async getMyInfo(@Request() req: ExpressRequest): Promise<Admin> {
    console.log('dogru mu');
    return await this.adminService.getAdminById(req.user?.adminId);
  }
}
