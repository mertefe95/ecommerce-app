import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class PaginationDto {
  @IsNumber({}, { message: 'Page number' })
  //@IsNotEmpty({ message: 'Page number is required' })
  @IsOptional()
  @ApiProperty()
  pageNumber: number;

  @IsNumber({}, { message: 'Pagination per page' })
  //@IsNotEmpty({ message: 'Pagination per page is required' })
  @IsOptional()
  @ApiProperty()
  paginationPerPage: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  skipPagination: boolean;
}
