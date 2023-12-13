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
import { Ordert } from './entity/order.entity';
import { OrderService } from './order.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('api/order')
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderservice: OrderService) {}

  @Public()
  @Post('create')
  async createOrder(@Body() CreateOrderDTO: CreateOrderDTO): Promise<void> {
    await this.orderservice.createOrder(CreateOrderDTO);
    return;
  }

  @Public()
  @Get('orderid/:orderID')
  @ApiOkResponse({
    description: '返回orderid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderByorderId(@Param('orderID') orderid: string): Promise<Ordert> {
    const order = this.orderservice.getOrderById(orderid);
    return order;
  }

  @Public()
  @Get('sheetid/:sheetID')
  @ApiOkResponse({
    description: '返回sheetid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderBysheetId(@Param('sheetID') sheetid: string): Promise<Ordert> {
    const order = this.orderservice.getOrderBysheetId(sheetid);
    return order;
  }

  @Public()
  @Get('cusromerid/:customerID')
  @ApiOkResponse({
    description: '返回customerid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderBycustomerId(
    @Param('customerID') customerid: string
  ): Promise<Array<Ordert>> {
    const order = this.orderservice.getOrderBycustomerId(customerid);
    return order;
  }

  @Public()
  @Get('answerid/:answerID')
  @ApiOkResponse({
    description: '返回answerid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderByanswerId(@Param('answerID') answerid: string): Promise<Ordert> {
    const order = this.orderservice.getOrderByanswerId(answerid);
    return order;
  }

  @Public()
  @Get('forwardid/:forwarderID')
  @ApiOkResponse({
    description: '返回forwardid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  getOrderByforwarderId(
    @Param('forwarderID') forwardid: string
  ): Promise<Array<Ordert>> {
    const order = this.orderservice.getOrderByforwarderId(forwardid);
    return order;
  }
}
