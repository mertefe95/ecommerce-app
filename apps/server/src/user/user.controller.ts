import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { GetAllUsersQueryDto } from './dto/get-all-users-query.dto';
import { SuccessList } from 'utils/dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Get('/me')
  async getMyInfo(@Request() req: ExpressRequest): Promise<User> {
    return await this.userService.getUserById(req.user?.userId);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/all')
  async getAllUsers(
    @Query() query: GetAllUsersQueryDto,
  ): Promise<SuccessList<Partial<User>>> {
    return await this.userService.getAllUsers(query);
  }
}
