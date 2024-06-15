import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export class SuccessDto {
  @IsOptional()
  @ApiProperty()
  message: string;

  [key: string]: any;
}
