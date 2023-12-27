import { Sheet } from '../../sheet/entity/sheet.entity';
import { User } from '../../user/entity/user.entity';
import { Ordert } from 'src/modules/order/entity/order.entity';
export declare class Answer {
    id: string;
    price: number;
    remark: string;
    sheet: Sheet;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    forwarder: User;
    ordert: Ordert | null;
}
