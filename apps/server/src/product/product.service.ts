import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product, ProductType } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        productType: true,
      },
    });
  }

  async getProductTypes(): Promise<ProductType[]> {
    return this.prisma.productType.findMany();
  }

  async validateProductStock(
    products: { productId: number; quantity: number }[],
  ): Promise<void> {
    await Promise.all(
      products?.map(async (item) => {
        let { productId, quantity } = item ?? {};

        const product = await this.prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error('Product not found');
        }

        if (product.stock < quantity || !product?.stock) {
          throw new Error('Not enough stock');
        }
      }),
    );
  }

  async updateProductStock(
    products: { productId: number; quantity: number }[],
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await Promise.all(
      products?.map(async (item) => {
        let { productId, quantity } = item ?? {};

        const product = await tx.product.update({
          where: { id: productId },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        });
      }),
    );
  }
}
