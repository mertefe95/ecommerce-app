import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product, ProductType } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ProductsQueryDto } from './dto/get-products-query.dto';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(query: ProductsQueryDto): Promise<Product[]> {
    const { productTypes } = query ?? {};
    const products = await this.prisma.product.findMany({
      where: {
        productType: {
          id: {
            in: productTypes,
          },
        },
      },
      include: {
        productType: true,
      },
    });

    return products;
  }

  async getProductTypes(): Promise<ProductType[]> {
    return this.prisma.productType.findMany();
  }

  async getProductFilters(): Promise<any> {}

  async validateProductStock(
    products: { productId: number; quantity: number }[],
  ): Promise<void> {
    await Promise.all(
      products?.map(async (item) => {
        const { productId, quantity } = item ?? {};

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
        const { productId, quantity } = item ?? {};

        await tx.product.update({
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

  async getProduct(productId: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        productType: true,
        brand: true,
        productSellers: true,
        productColors: true,
        productSizes: true,
      },
    });
  }
}
