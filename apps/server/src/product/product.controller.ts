import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { ProductService } from './product.service';
import { Product, ProductType, Brand, Seller } from '@prisma/client';
import { ProductsQueryDto } from './dto/get-products-query.dto';
import { ParseIntPipe } from '@nestjs/common';
import { GetAllProductsQueryDto } from './dto/get-all-products-query.dto';
import { SuccessList } from 'utils/dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN, Role.USER, Role.GUEST])
  @Get('/types')
  async getProductTypes(): Promise<ProductType[]> {
    return await this.productService.getProductTypes();
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/brands')
  async getBrands(): Promise<Brand[]> {
    return await this.productService.getBrands();
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/sellers')
  async getSellers(): Promise<Seller[]> {
    return await this.productService.getSellers();
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN, Role.USER, Role.GUEST])
  @Get('/')
  async getProducts(@Query() query: ProductsQueryDto): Promise<Product[]> {
    return await this.productService.getProducts(query);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN])
  @Get('/all')
  async getAllProducts(
    @Query() query: GetAllProductsQueryDto,
  ): Promise<SuccessList<Product>> {
    return await this.productService.getAllProducts(query);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Get('/:id')
  async getProduct(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<Product> {
    return await this.productService.getProduct(productId);
  }
}
