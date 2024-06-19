import { IntersectionType } from '@nestjs/swagger';

import { OrderByDto, PaginationDto, SearchDto } from 'utils/dto';

export class GetAllProductsQueryDto extends IntersectionType(
  PaginationDto,
  SearchDto,
  OrderByDto,
) {}
