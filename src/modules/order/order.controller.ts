import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/Createorder.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/order')
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderservice: OrderService) {}

  @Post('create')
  async createOrder(@Body() CreateOrderDTO: CreateOrderDTO): Promise<void> {
    await this.orderservice.createOrder(CreateOrderDTO);
    return;
  }

  @Get(':orderID')
  getOrderById(@Param() orderid: string): Promise<Order> {
    const order = this.orderservice.getOrderById(orderid);
    return order;
  }
}
