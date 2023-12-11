import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/Createorder.dto';
import { Ordert } from './entity/order.entity';
import { SheetService } from '../sheet/sheet.service';
import { AnswerService } from '../answer/answer.service';
@Injectable()
export class OrderService {
  constructor(
    private findsheet: SheetService,
    private findanswer: AnswerService,
    @InjectRepository(Ordert)
    private readonly orderRepository: Repository<Ordert>
  ) {}

  async createOrder(createOrderDTO: CreateOrderDTO) {
    const order = new Ordert();
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

  async getOrderById(Orderid: string): Promise<Ordert> {
    const order = await this.orderRepository.findOneBy({ id: Orderid });
    return order;
  }

  async getOrderBysheetId(Sheetid: string): Promise<Ordert> {
    const sheet = await this.findsheet.getSheetById(Sheetid);
    const order = await this.orderRepository.findOneBy({ sheet: sheet });
    return order;
  }

  async getOrderByanswerId(Answerid: string): Promise<Ordert> {
    const answer = await this.findanswer.getAnswerByAnswerId(Answerid);
    const order = await this.orderRepository.findOneBy({ answer: answer });
    return order;
  }
}
