import { Sheet } from '../../sheet/entity/sheet.entity';
import { Answer } from '../../answer/entity/answer.entity';
import { Firm } from './firm.entity';
export declare enum UserRole {
    CUSTOMER = "customer",
    FORWARDER = "forwarder",
    ADMINISTRATOR = "administrator"
}
export declare class User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
    telephone: string;
    email: string;
    firm: Firm;
    answers: Answer[];
    sheets: Sheet[];
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
