import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AdminAuthGuard } from 'src/auth/admin.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { Request as ExpressRequest } from 'express';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/interface/role';
import { Roles } from 'src/auth/roles.decorator';
import { SuccessMessageDto, successMessage } from 'utils/success-message';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminAuthGuard)
  @Post('/login/admin')
  async loginAdmin(
    @Request() req: ExpressRequest,
    @Body() loginDto: LoginDto,
  ): Promise<SuccessMessageDto> {
    const admin = await this.authService.loginAdmin(loginDto, req);
    return successMessage(`Welcome ${admin.userName}`);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req: ExpressRequest,
    @Body() loginDto: LoginDto,
  ): Promise<SuccessMessageDto> {
    console.log('here');

    const user = await this.authService.loginUser(loginDto, req);
    return successMessage(`Welcome ${user.firstName} ${user?.lastName}`);
  }

  @Post('/register')
  async register(
    @Request() req: ExpressRequest,
    @Body() registerDto: RegisterDto,
  ): Promise<SuccessMessageDto> {
    const user = await this.authService.registerUser(registerDto);
    return successMessage(`Welcome ${user.firstName} ${user?.lastName}`);
  }

  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(AuthenticatedGuard)
  @Get('/is-logged-in')
  isLoggedIn(): SuccessMessageDto {
    return successMessage(`You are logged in.`);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/is-admin')
  isAdmin(): SuccessMessageDto {
    return successMessage(`You are an admin.`);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Get('/is-user')
  isCustomer(): SuccessMessageDto {
    return successMessage(`You are an user.`);
  }
}
