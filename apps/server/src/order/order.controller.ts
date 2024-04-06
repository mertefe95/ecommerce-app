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
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/interface/Role';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN, Role.USER])
  @Get('/')
  async getOrders(@Request() req: ExpressRequest): Promise<Order[]> {
    const userId = req.user?.userId;
    return await this.orderService.getOrders(userId);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles([Role.ADMIN, Role.USER, Role.GUEST])
  @Post('/')
  async createOrder(@Request() req: ExpressRequest): Promise<void> {
    const userId = req.user?.userId;
    return await this.orderService.createOrder(userId);
  }
}
