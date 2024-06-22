import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) throw new NotFoundException('Admin is not found.');

    return admin;
  }
}
