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
import { ReturnOrderDTO } from './dto/Returnorder.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

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
  @ApiOkResponse({
    description: '返回customerid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderById(@Param('orderID') orderid: string): Promise<Order> {
    const order = this.orderservice.getOrderById(orderid);
    return order;
  }
}
