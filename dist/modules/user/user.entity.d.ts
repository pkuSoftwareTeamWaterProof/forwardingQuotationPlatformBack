import { Sheet } from "../sheet/entity/sheet.entity";
import { Answer } from '../answer/entity/answer.entity';
export declare class Firm {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    employees: Forwarder[];
}
export declare enum UserRole {
    CUSTOMER = "customer",
    FORWARDER = "forwarder",
    ADMINISTRATOR = "administrator"
}
export declare abstract class User {
    id: string;
    username: string;
    password: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    role: UserRole;
}
export declare class Customer extends User {
    telephone: string;
    email: string;
    sheets: Sheet[];
    role: UserRole;
}
export declare class Forwarder extends User {
    telephone: string;
    email: string;
    firm: Firm;
    answers: Answer[];
    role: UserRole;
}
export declare class Administrator extends User {
    role: UserRole;
}
