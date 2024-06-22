import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserGroupController],
  providers: [UserGroupService, PrismaService],
  exports: [UserGroupService],
})
export class UserGroupModule {}
