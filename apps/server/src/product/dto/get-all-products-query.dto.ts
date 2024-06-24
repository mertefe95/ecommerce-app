import { IntersectionType } from '@nestjs/swagger';

import { OrderByDto, PaginationDto, SearchDto } from 'utils/dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllProductsQueryDto extends IntersectionType(
  PaginationDto,
  SearchDto,
  OrderByDto,
) {
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    return value?.map((v) => parseInt(v));
  })
  @IsOptional()
  @ApiProperty()
  productType?: number[];

  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    return value?.map((v) => parseInt(v));
  })
  @IsOptional()
  @ApiProperty()
  brand?: number[];

  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    return value?.map((v) => parseInt(v));
  })
  @IsOptional()
  @ApiProperty()
  sellers?: number[];
}
