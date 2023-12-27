import { Answer } from '../../answer/entity/answer.entity';
import { User } from '../../user/entity/user.entity';
import { Ordert } from 'src/modules/order/entity/order.entity';
export declare class Sheet {
    id: string;
    startpoint: string;
    endpoint: string;
    weight: number;
    size: number;
    species: string;
    type_of_shipping: string;
    remark: string;
    startdate: string;
    enddate: string;
    ordert: Ordert | null;
    answer: Answer[];
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    customer: User;
}
