import { User } from './user.entity';
export declare class Firm {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    employees: User[];
}
