import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  ConflictException,
} from '@nestjs/common/exceptions';

import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { encodePassword, comparePasswords } from '../../utils/bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request as ExpressRequest } from 'express';
import { RegisterDto } from './dto/register.dto';
import { User, Admin } from '@prisma/client';
import { AddressType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  //validate a user
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });

    if (!admin) {
      throw new NotFoundException('Unable to found admin.');
    }

    const passwordValid = await bcrypt.compare(password, admin.password);

    if (admin && passwordValid) {
      return {
        adminId: admin.id,
        email: admin.email,
      };
    }

    return admin;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userId: number; email: string }> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Unable to found user.');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return {
        userId: user.id,
        email: user.email,
      };
    }
  }

  async loginAdmin(body: LoginDto, req: ExpressRequest): Promise<Admin> {
    const admin = await this.prisma.admin.findFirst({
      where: { email: body.email },
    });

    if (!admin) throw new NotFoundException('Unable to found admin.');

    const passwordValid = await comparePasswords(body.password, admin.password);

    if (!passwordValid) throw new NotFoundException('Password is not valid.');

    delete admin.password;
    return admin;
  }

  async loginUser(body: LoginDto, req: ExpressRequest): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user)
      throw new NotFoundException(
        'This password and email combination does not exist.',
      );

    const passwordValid = await comparePasswords(body.password, user.password);

    if (!passwordValid)
      throw new NotFoundException(
        'This password and email combination does not exist.',
      );

    delete user.password;
    return user;
  }

  async registerUser(body: RegisterDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });

    if (user) {
      throw new ConflictException('This email is in use.');
    }

    const password: string = await encodePassword(body.password);

    let address = {
      firstName: body.firstName,
      lastName: body.lastName,
      street: body.street,
      city: body.city,
      zipCode: body.zipCode,
      phoneNumber: body.phoneNumber,
      countryId: body.countryId,
      houseNumber: body.houseNumber,
      currentAddress: true,
    };

    const newUser = await this.prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password,
        addresses: {
          createMany: {
            data: [
              {
                ...address,
                addressType: AddressType.INVOICE,
              },
              {
                ...address,
                addressType: AddressType.DELIVERY,
              },
            ],
          },
        },
      },
    });

    return newUser;
  }
}
