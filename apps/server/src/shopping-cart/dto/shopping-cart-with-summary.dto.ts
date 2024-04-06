import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCartProduct } from '@prisma/client';
import { IsNotEmpty, IsString, Matches, IsNumber, Min } from 'class-validator';
import { Prisma } from '@prisma/client';

export interface ShoppingCartSummary {
  totalQuantity?: number;
  totalPrice?: number;
}

export type ShoppingCartWithSummary = {
  shoppingCartProducts: ShoppingCartProductFull[];
  shoppingCartSummary?: ShoppingCartSummary;
};

export type ShoppingCartProductFull = Prisma.ShoppingCartProductGetPayload<{
  include: {
    product: true;
  };
}>;
