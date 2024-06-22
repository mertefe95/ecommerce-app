import { IntersectionType } from '@nestjs/swagger';

import { OrderByDto, PaginationDto, SearchDto } from 'utils/dto';

export class GetAllUsersQueryDto extends IntersectionType(
  PaginationDto,
  SearchDto,
  OrderByDto,
) {}
