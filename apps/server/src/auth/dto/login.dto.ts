import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'The email should consist of letters only.' })
  @IsNotEmpty({ message: "Don't forget to fill in the email." })
  @IsEmail({}, { message: 'This is not a valid email address.' })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Don't forget to fill in the password." })
  @ApiProperty()
  password: string;
}
