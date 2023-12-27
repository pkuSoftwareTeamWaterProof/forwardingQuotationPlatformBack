import { CreateOrderDTO } from './dto/Createorder.dto';
import { ReturnOrderDTO } from './dto/Returnorder.dto';
import { Ordert } from './entity/order.entity';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderservice;
    constructor(orderservice: OrderService);
    ordertToDTO(order: Ordert): ReturnOrderDTO;
    createOrder(CreateOrderDTO: CreateOrderDTO): Promise<void>;
    getOrderByorderId(orderid: string): Promise<ReturnOrderDTO>;
    getOrderBysheetId(sheetid: string): Promise<ReturnOrderDTO>;
    getOrderBycustomerId(customerid: string): Promise<Array<ReturnOrderDTO>>;
    getOrderByanswerId(answerid: string): Promise<ReturnOrderDTO>;
    getOrderByforwarderId(forwardid: string): Promise<Array<ReturnOrderDTO>>;
}
