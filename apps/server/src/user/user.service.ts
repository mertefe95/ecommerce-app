import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { GetAllUsersQueryDto } from './dto/get-all-users-query.dto';
import Search from 'utils/custom/search';
import OrderBy from 'utils/custom/order-by';
import Pagination from 'utils/custom/pagination';
import { SuccessList } from 'utils/dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('Deze gebruiker is niet gevonden.');

    return user;
  }

  async getAllUsers(
    query: GetAllUsersQueryDto,
  ): Promise<SuccessList<Partial<User>>> {
    const search = Search(query, [{ field: 'email' }]);

    const { pagination } = Pagination(query);

    const { orderBy } = OrderBy(query, [
      { key: 'email', fields: ['email'] },
      { key: 'firstName', fields: ['firstName'] },
      { key: 'lastName', fields: ['lastName'] },
    ]);

    console.log('query');
    console.log(query);

    const users = await this.prisma.user.findMany({
      where: {
        ...search,
      },
      orderBy,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      ...(pagination && { ...pagination }),
    });

    const totalRows = await this.prisma.user.count({
      where: {
        ...search,
      },
    });

    return {
      data: users,
      totalRows,
    };
  }
}
