import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsString({ message: 'Search query' })
  @IsOptional()
  @ApiProperty()
  search: string;
}
