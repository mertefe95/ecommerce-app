import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Brand, Product, ProductType } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ProductsQueryDto } from './dto/get-products-query.dto';
import Search from 'utils/custom/search';
import OrderBy from 'utils/custom/order-by';
import Pagination from 'utils/custom/pagination';
import Filters from 'utils/custom/filter';
import { SuccessList } from 'utils/dto';
import { GetAllProductsQueryDto } from './dto/get-all-products-query.dto';

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

  async getAllProducts(
    query: GetAllProductsQueryDto,
  ): Promise<SuccessList<Product>> {
    const search = Search(query, [
      { field: 'name' },
      { relations: ['productType'], field: 'name' },
      { relations: ['brand'], field: 'name' },
    ]);

    const filters = Filters(search, [
      {
        when: query?.productType?.length > 0 ? true : false,
        filter: {
          productType: {
            id: {
              in: query?.productType,
            },
          },
        },
      },
    ]);

    const { pagination } = Pagination(query);

    const { orderBy } = OrderBy(query, [
      { key: 'name', fields: ['name'] },
      { key: 'productType', relations: ['productType'], fields: ['name'] },
      { key: 'brand', relations: ['brand'], fields: ['name'] },
    ]);

    const products = await this.prisma.product.findMany({
      where: {
        ...filters,
      },
      include: {
        productType: true,
        brand: true,
        productSellers: true,
        productColors: true,
        productSizes: true,
      },
      orderBy,
      ...(pagination && { ...pagination }),
    });

    const totalRows = await this.prisma.product.count({
      where: {
        ...filters,
      },
    });

    return {
      data: products,
      totalRows,
    };
  }

  async getBrands(): Promise<Brand[]> {
    const brands = await this.prisma.brand.findMany();

    return brands;
  }

  async getProductTypes(): Promise<ProductType[]> {
    const productTypes = await this.prisma.productType.findMany();

    return productTypes;
  }
}
