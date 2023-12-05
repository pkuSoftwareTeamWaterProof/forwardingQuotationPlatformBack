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

  @Get('orderid/:orderID')
  @ApiOkResponse({
    description: '返回orderid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderByorderId(@Param('orderID') orderid: string): Promise<Order> {
    const order = this.orderservice.getOrderById(orderid);
    return order;
  }

  @Get('sheetid/:sheetID')
  @ApiOkResponse({
    description: '返回sheetid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderBysheetId(@Param('sheetID') sheetid: string): Promise<Order> {
    const order = this.orderservice.getOrderBysheetId(sheetid);
    return order;
  }

  @Get('answerid/:answerID')
  @ApiOkResponse({
    description: '返回answerid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderByanswerId(@Param('answerID') answerid: string): Promise<Order> {
    const order = this.orderservice.getOrderByanswerId(answerid);
    return order;
  }
}
