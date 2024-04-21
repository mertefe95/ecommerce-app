import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { validate } from 'class-validator';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    // transform the request object to class instance

    const body = plainToInstance(LoginDto, request.body);

    // get a list of errors
    const errors = await validate(body);

    // extract error messages from the errors array
    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );

    if (errorMessages.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    const result = (await super.canActivate(context)) as boolean;

    await super.logIn(request as any);

    return result;
  }
}
