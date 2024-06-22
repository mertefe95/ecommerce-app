import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserGroup } from '@prisma/client';
import { GetAllUserGroupsQueryDto } from './dto/get-all-user-groups-query.dto';
import Search from 'utils/custom/search';
import OrderBy from 'utils/custom/order-by';
import Pagination from 'utils/custom/pagination';
import { SuccessList } from 'utils/dto';

@Injectable()
export class UserGroupService {
  constructor(private prisma: PrismaService) {}

  async getUserGroupById(id: number): Promise<UserGroup> {
    const userGroup = await this.prisma.userGroup.findUnique({
      where: { id },
    });

    if (!userGroup)
      throw new NotFoundException('Deze gebruiker is niet gevonden.');

    return userGroup;
  }

  async getAllUserGroups(
    query: GetAllUserGroupsQueryDto,
  ): Promise<SuccessList<UserGroup>> {
    const search = Search(query, [{ field: 'name' }]);

    const { pagination } = Pagination(query);

    const { orderBy } = OrderBy(query, [{ key: 'name', fields: ['name'] }]);

    const userGroups = await this.prisma.userGroup.findMany({
      where: {
        ...search,
      },
      orderBy,
      include: {
        users: true,
      },
      ...(pagination && { ...pagination }),
    });

    const totalRows = await this.prisma.userGroup.count({
      where: {
        ...search,
      },
    });

    return {
      data: userGroups,
      totalRows,
    };
  }
}
