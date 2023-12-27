import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { CreateFirmDTO } from './dto/CreateFirm.dto';
import { User, UserRole } from './entity/user.entity';
import { Firm } from './entity/firm.entity';
export declare class UserService {
    private readonly firmRepository;
    private readonly userRepository;
    constructor(firmRepository: Repository<Firm>, userRepository: Repository<User>);
    createFirm(createFirmDTO: CreateFirmDTO): Promise<void>;
    createUser(createUserDTO: CreateUserDTO): Promise<void>;
    getFrimById(firmId: string): Promise<Firm>;
    getFirmByName(firmName: string): Promise<Firm>;
    getAllUsers(): Promise<Array<User>>;
    getUserById(userId: string, userRole?: UserRole | undefined): Promise<User>;
    getUserByName(userName: string, userRole?: UserRole | undefined): Promise<User | null>;
    getAllFirms(): Promise<Array<Firm | null>>;
}
