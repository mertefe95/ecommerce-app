import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AdminAuthGuard } from 'src/auth/admin.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/interface/role';
import { Roles } from 'src/auth/roles.decorator';
import { SuccessMessageDto, successMessage } from 'utils/success-message';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminAuthGuard)
  @Post('/login/admin')
  async loginAdmin(@Body() loginDto: LoginDto): Promise<SuccessMessageDto> {
    const admin = await this.authService.loginAdmin(loginDto);
    return successMessage(`Welcome ${admin.userName}`);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<SuccessMessageDto> {
    const user = await this.authService.loginUser(loginDto);
    return successMessage(`Welcome ${user.firstName} ${user?.lastName}`);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<SuccessMessageDto> {
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

  @Post('/logout')
  logout(
    @Req() req: ExpressRequest,
    @Res()
    res: ExpressResponse,
  ): SuccessMessageDto {
    req.session.destroy(() => {
      res.clearCookie('connect.sid', {
        // Domain is set so that the cookie works for all subdomains
        domain: ['production', 'staging']?.includes(process.env.NODE_ENV)
          ? ''
          : 'localhost',
        path: '/',
      });
      res.redirect('/');
    });

    return successMessage(`Je bent succesvol uitgelogd`);
  }
}
