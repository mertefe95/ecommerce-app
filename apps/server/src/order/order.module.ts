import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart-service';
import { ProductService } from 'src/product/product.service';
@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, ShoppingCartService, ProductService],
  exports: [OrderService],
})
export class OrderModule {}
