import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsNumber, Min } from 'class-validator';

export class AddToShoppingCartDto {
  @IsNumber({}, { message: 'Quantity must be a number.' })
  @IsNotEmpty({ message: "Don't forget to provide a quantity." })
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsNumber({}, { message: 'Product ID must be a number.' })
  @IsNotEmpty({ message: "Don't forget to provide a productId." })
  @ApiProperty()
  productId: number;
}
