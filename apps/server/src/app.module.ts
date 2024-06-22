import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart-module';
import { UserModule } from './user/user.module';
import { UserGroupModule } from './user-group/user-group.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    OrderModule,
    ProductModule,
    AddressModule,
    ShoppingCartModule,
    UserModule,
    UserGroupModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
