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
    //await this.findsheet.deleteSheet(createOrderDTO.sheetid);
    const answer = await this.findanswer.getAnswerByAnswerId(
      createOrderDTO.answerid
    );
    //await this.findanswer.deleteAnswer(createOrderDTO.answerid);
    order.sheet = sheet;
    order.answer = answer;
    await this.orderRepository.manager.save(order);
  }

  async getOrderById(Orderid: string): Promise<Ordert> {
    const order = await this.orderRepository.findOneBy({ id: Orderid });
    return order;
  }

  async getOrderBycustomerId(cusromerid: string): Promise<Array<Ordert>> {
    const sheets = await this.findsheet.getSheetsByUser(cusromerid);
    var orders: Array<Ordert> = new Array();
    for (let sheet of sheets) {
      const order = await this.orderRepository.findOne({
        where: { sheet: { id: sheet.id } },
      });
      orders.push(order);
    }
    return orders;
  }

  async getOrderByforwarderId(cusromerid: string): Promise<Array<Ordert>> {
    const answers = await this.findanswer.getAnswersByUser(cusromerid);
    var orders: Array<Ordert> = new Array();
    for (let answer of answers) {
      const order = await this.orderRepository.findOne({
        where: { answer: { id: answer.id } },
      });
      orders.push(order);
    }
    return orders;
  }

  async getOrderBysheetId(Sheetid: string): Promise<Ordert> {
    //const sheet = await this.findsheet.getSheetById(Sheetid);
    const order = await this.orderRepository.findOne({
      where: { sheet: { id: Sheetid } },
    });
    return order;
  }

  async getOrderByanswerId(Answerid: string): Promise<Ordert> {
    //const answer = await this.findanswer.getAnswerByAnswerId(Answerid);
    const order = await this.orderRepository.findOne({
      where: { answer: { id: Answerid } },
    });
    return order;
  }
}
