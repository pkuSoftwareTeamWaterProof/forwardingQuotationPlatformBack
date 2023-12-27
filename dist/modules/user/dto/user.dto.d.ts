import { UserRole } from '../entity/user.entity';
export declare abstract class UserDTO {
    username: string;
    password: string;
    role: UserRole;
    telephone: string | null;
    email: string | null;
}
