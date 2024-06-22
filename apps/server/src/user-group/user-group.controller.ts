import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { UserGroupService } from './user-group.service';
import { UserGroup } from '@prisma/client';
import { GetAllUserGroupsQueryDto } from './dto/get-all-user-groups-query.dto';
import { SuccessList } from 'utils/dto';

@Controller('user-group')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/all')
  async getAllUserGroup(
    @Query() query: GetAllUserGroupsQueryDto,
  ): Promise<SuccessList<UserGroup>> {
    return await this.userGroupService.getAllUserGroups(query);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/:id')
  async getGroupById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserGroup> {
    return await this.userGroupService.getUserGroupById(id);
  }
}
