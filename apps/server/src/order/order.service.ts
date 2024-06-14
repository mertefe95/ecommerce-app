import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, OrderStatus } from '@prisma/client';
import { ShoppingCartService } from '../shopping-cart/shopping-cart-service';
import { ProductService } from 'src/product/product.service';

import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
const { PrismaClient } = require('@prisma/client');
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
  ) {}

  async getOrders(userId: number): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { userId },
    });
  }

  async createOrder(userId: number): Promise<void> {
    const shoppingCart =
      await this.shoppingCartService.getMyShoppingCart(userId);
    const products = shoppingCart.shoppingCartProducts;

    try {
      await this.productService.validateProductStock(products);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }

    try {
      //await tx.product.update({where})
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await this.productService.updateProductStock(products, tx);

        await tx.order.create({
          data: {
            userId,
            ...shoppingCart?.shoppingCartSummary,
            orderlines: {
              createMany: {
                data: shoppingCart.shoppingCartProducts.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.product?.price,
                })),
              },
            },
          },
        });
      });
    } catch (e) {
      throw e;
    }
  }
}
