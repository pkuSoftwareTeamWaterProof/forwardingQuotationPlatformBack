import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/Createorder.dto';
import { ReturnOrderDTO } from './dto/Returnorder.dto';
import { Ordert } from './entity/order.entity';
import { OrderService } from './order.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';

@ApiTags('api/order')
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderservice: OrderService) {}

  ordertToDTO(order: Ordert): ReturnOrderDTO {
    var sheetID = undefined;
    var answerID = undefined;
    if (order['sheet'] === null) {
      console.error('Warning: An answer without a sheet');
      sheetID = null;
    } else {
      sheetID = order.sheet.id;
    }
    if (order['answer'] === null) {
      console.error('Warning: An answer without a forwarder');
      answerID = null;
    } else {
      answerID = order.answer.id;
    }
    const dto: ReturnOrderDTO = {
      id: order.id,
      context: order.context,
      sheetId: sheetID,
      answerId: answerID,
    };
    return dto;
  }

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
  async getOrderByorderId(
    @Param('orderID') orderid: string
  ): Promise<ReturnOrderDTO> {
    const order = await this.orderservice.getOrderById(orderid);
    return this.ordertToDTO(order);
  }

  @Public()
  @Get('sheetid/:sheetID')
  @ApiOkResponse({
    description: '返回sheetid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  async getOrderBysheetId(
    @Param('sheetID') sheetid: string
  ): Promise<ReturnOrderDTO> {
    const order = await this.orderservice.getOrderBySheetId(sheetid);
    if (order === null) {
      const sheet = await this.orderservice.findsheet.getSheetById(sheetid);
      if (sheet === null) {
        throw new BadRequestException('Unknown sheet');
      }
      return null;
    }
    return this.ordertToDTO(order);
  }

  @Public()
  @Get('cusromerid/:customerID')
  @ApiOkResponse({
    description: '返回customerid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  async getOrderBycustomerId(
    @Param('customerID') customerid: string
  ): Promise<Array<ReturnOrderDTO>> {
    const order = await this.orderservice.getOrderBycustomerId(customerid);
    return order.map(this.ordertToDTO);
  }

  @Public()
  @Get('answerid/:answerID')
  @ApiOkResponse({
    description: '返回answerid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  async getOrderByanswerId(
    @Param('answerID') answerid: string
  ): Promise<ReturnOrderDTO> {
    const order = await this.orderservice.getOrderByanswerId(answerid);
    if (order === null) {
      const answer = await this.orderservice.findanswer.getAnswerByAnswerId(
        answerid
      );
      if (answer === null) {
        throw new BadRequestException('Unknown answer');
      }
      return null;
    }
    return this.ordertToDTO(order);
  }

  @Public()
  @Get('forwardid/:forwarderID')
  @ApiOkResponse({
    description: '返回forwardid对应的表单-列表',
    type: ReturnOrderDTO,
  })
  async getOrderByforwarderId(
    @Param('forwarderID') forwardid: string
  ): Promise<Array<ReturnOrderDTO>> {
    const order = await this.orderservice.getOrderByForwarderId(forwardid);
    return order.map(this.ordertToDTO);
  }
}
