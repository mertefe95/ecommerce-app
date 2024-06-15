import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class OrderByDto {
  @IsString({ message: 'Sort column' })
  @IsOptional()
  @ApiProperty()
  orderByColumn: string = 'id';

  @IsEnum(['asc', 'desc', ''], { message: 'Sort direction' })
  @ApiProperty()
  orderDirection: 'asc' | 'desc' = 'desc';
}
