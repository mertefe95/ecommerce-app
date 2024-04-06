import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShoppingCartProduct } from '@prisma/client';
import { AddToShoppingCartDto } from './dto/add-to-shopping-cart-dto';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ShoppingCartWithSummary } from './dto/shopping-cart-with-summary.dto';

@Injectable()
export class ShoppingCartService {
  constructor(private prisma: PrismaService) {}

  async addToShoppingCart(
    userId: number,
    addToShoppingCartDto: AddToShoppingCartDto,
  ): Promise<ShoppingCartProduct> {
    const { productId, quantity } = addToShoppingCartDto ?? {};

    return await this.prisma.shoppingCartProduct.upsert({
      where: {
        userId_productId: {
          productId,
          userId,
        },
      },
      create: {
        productId,
        userId,
        quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  async getMyShoppingCart(userId: number): Promise<ShoppingCartWithSummary> {
    const shoppingCartProducts = await this.prisma.shoppingCartProduct.findMany(
      {
        where: { userId },
        include: {
          product: true,
        },
      },
    );

    const shoppingCartSummary = shoppingCartProducts.reduce(
      (acc, item) => {
        acc.totalPrice += item.quantity * Number(item.product?.price ?? 0);
        acc.totalQuantity += item.quantity;
        return acc;
      },
      {
        totalPrice: 0,
        totalQuantity: 0,
      },
    );

    return {
      shoppingCartProducts,
      shoppingCartSummary,
    };
  }

  async deleteShoppingCartProduct(
    userId: number,
    productId: number,
  ): Promise<ShoppingCartProduct> {
    return await this.prisma.shoppingCartProduct.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }
}
