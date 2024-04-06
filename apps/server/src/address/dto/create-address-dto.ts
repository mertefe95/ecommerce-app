import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsNumber } from 'class-validator';

export class CreateAddressDto {
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
