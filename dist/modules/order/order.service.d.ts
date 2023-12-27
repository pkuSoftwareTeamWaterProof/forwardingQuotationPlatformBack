import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/Createorder.dto';
import { Ordert } from './entity/order.entity';
import { SheetService } from '../sheet/sheet.service';
import { AnswerService } from '../answer/answer.service';
export declare class OrderService {
    findsheet: SheetService;
    findanswer: AnswerService;
    private readonly orderRepository;
    constructor(findsheet: SheetService, findanswer: AnswerService, orderRepository: Repository<Ordert>);
    createOrder(createOrderDTO: CreateOrderDTO): Promise<void>;
    getOrderById(Orderid: string): Promise<Ordert>;
    getOrderBycustomerId(cusromerid: string): Promise<Array<Ordert>>;
    getOrderByForwarderId(forwarderId: string): Promise<Array<Ordert>>;
    getOrderBySheetId(Sheetid: string): Promise<Ordert>;
    getOrderByanswerId(Answerid: string): Promise<Ordert>;
}
