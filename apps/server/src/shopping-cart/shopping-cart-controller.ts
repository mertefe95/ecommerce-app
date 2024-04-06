import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  ParseIntPipe,
  Request,
  Patch,
  BadRequestException,
  Query,
  Response,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { ShoppingCartService } from './shopping-cart-service';
import { ShoppingCartProduct } from '@prisma/client';
import { AddToShoppingCartDto } from './dto/add-to-shopping-cart-dto';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { successMessage, SuccessMessageDto } from 'utils/success-message';

import { ShoppingCartWithSummary } from './dto/shopping-cart-with-summary.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Get('/')
  async getMyShoppingCart(
    @Request() req: ExpressRequest,
  ): Promise<ShoppingCartWithSummary> {
    const userId = req.user?.userId;

    return await this.shoppingCartService.getMyShoppingCart(userId);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Post('/')
  async addToShoppingCartDto(
    @Request() req: ExpressRequest,
    @Body() addToShoppingCartDto: AddToShoppingCartDto,
  ): Promise<SuccessMessageDto> {
    const userId = req.user?.userId;

    await this.shoppingCartService.addToShoppingCart(
      userId,
      addToShoppingCartDto,
    );

    return successMessage('Product added to shopping cart');
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.USER])
  @Delete('/:id')
  async deleteShoppingCartProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Request() req: ExpressRequest,
  ): Promise<SuccessMessageDto> {
    const userId = req.user?.userId;

    await this.shoppingCartService.deleteShoppingCartProduct(userId, productId);

    return successMessage('Product removed from shopping cart');
  }
}
