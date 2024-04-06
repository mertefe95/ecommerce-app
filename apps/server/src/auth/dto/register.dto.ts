import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'The email should consist of letters only.' })
  @IsNotEmpty({ message: "Don't forget to fill in the email." })
  @IsEmail({}, { message: 'This is not a valid email address.' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'The first name may consist of letters only.' })
  @IsNotEmpty({ message: "Don't forget to fill in the first name." })
  @MinLength(2, {
    message: 'The first name must consist of at least 2 letters.',
  })
  @ApiProperty()
  firstName: string;

  @IsString({ message: 'The last name must consist of letters only.' })
  @IsNotEmpty({ message: "Don't forget to fill in the last name." })
  @MinLength(2, {
    message: 'The last name must consist of at least 2 letters.',
  })
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "Don't forget to enter a password." })
  @MinLength(9, {
    message: 'The password must be a minimum of 9 characters.',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'The password must contain at least 1 digit.',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'The password must contain at least 1 uppercase letter.',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'The password must contain at least 1 lowercase letter.',
  })
  @ApiProperty()
  password: string;

  @IsString({ message: 'The zip code.' })
  @IsNotEmpty({ message: "Don't forget to fill in the zip code." })
  @ApiProperty()
  zipCode: string;

  @IsString({ message: 'The street name.' })
  @IsNotEmpty({ message: "Don't forget to fill in the street name." })
  @ApiProperty()
  street: string;

  @IsString({ message: 'The city.' })
  @IsNotEmpty({ message: "Don't forget to fill in the city." })
  @ApiProperty()
  city: string;

  @IsString({ message: 'The house number.' })
  @IsNotEmpty({ message: "Don't forget to fill in the house number." })
  @ApiProperty()
  houseNumber: string;

  @IsNumber({}, { message: 'The country ID.' })
  @IsNotEmpty({ message: "Don't forget to fill in the country." })
  @ApiProperty()
  countryId: number;

  @IsString({ message: 'The phone number.' })
  @IsNotEmpty({ message: "Don't forget to fill in the phone number." })
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'Phone number is invalid.',
  })
  @ApiProperty()
  phoneNumber: string;
}
