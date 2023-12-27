import { CreateUserDTO } from './dto/CreateUser.dto';
import { User } from './entity/user.entity';
import { Firm } from './entity/firm.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDTO: CreateUserDTO): Promise<void>;
    getUserById(userId: string): Promise<User | never>;
    getUserByName(userName: string): Promise<User | never>;
    getMyUserData(userId: string): Promise<User | never>;
    getAllUsers(): Promise<Array<User>>;
}
export declare class FirmController {
    private readonly userService;
    constructor(userService: UserService);
    getFirmById(firmId: string): Promise<Firm>;
    getFirmByName(firmName: string): Promise<Firm>;
    getAllFirms(): Promise<Array<Firm>>;
}
