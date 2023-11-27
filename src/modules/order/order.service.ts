import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/Createorder.dto';
import { Order } from './entity/order.entity';
import { SheetService } from '../sheet/sheet.service';
import { AnswerService } from '../answer/answer.service';
@Injectable()
export class OrderService {
  constructor(
    private findsheet: SheetService,
    private findanswer: AnswerService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async createOrder(createOrderDTO: CreateOrderDTO) {
    const order = new Order();
    order.context = createOrderDTO.context;
    const sheet = await this.findsheet.getSheetById(createOrderDTO.sheetid);
    await this.findsheet.deleteSheet(createOrderDTO.sheetid);
    const answer = await this.findanswer.getAnswerByAnswerId(
      createOrderDTO.answerid
    );
    await this.findanswer.deleteAnswer(createOrderDTO.answerid);
    order.sheet = sheet;
    order.answer = answer;
    await this.orderRepository.manager.save(order);
  }

  async getOrderById(Orderid: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: Orderid });
    return order;
  }
}
