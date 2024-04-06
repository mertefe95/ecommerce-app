import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { ShoppingCartService } from './shopping-cart-service';
import { ShoppingCartController } from './shopping-cart-controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PrismaService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
