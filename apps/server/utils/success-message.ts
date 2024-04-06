import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export class SuccessMessageDto {
  @IsOptional()
  @ApiProperty()
  message: string;
  [key: string]: any;
}

export function successMessage(
  message: string,
  data?: object,
): SuccessMessageDto {
  return { message, ...data };
}
