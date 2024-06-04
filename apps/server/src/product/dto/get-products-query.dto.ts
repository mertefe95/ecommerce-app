import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductsQueryDto {
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    return value?.map((v) => parseInt(v));
  })
  @IsOptional()
  @ApiProperty()
  productTypes?: number[];
}
