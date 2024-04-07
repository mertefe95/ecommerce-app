import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  ParseIntPipe,
  Request,
  Patch,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Get('/me')
  async getMyInfo(@Request() req: ExpressRequest): Promise<User> {
    return await this.userService.getUserById(req.user.userId);
  }
}
