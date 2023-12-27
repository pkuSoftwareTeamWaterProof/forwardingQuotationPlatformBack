import { Repository } from 'typeorm';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { UserService } from '../user/user.service';
export declare class SheetService {
    private readonly sheetRepository;
    private userService;
    constructor(sheetRepository: Repository<Sheet>, userService: UserService);
    createSheet(createSheetDTO: CreateSheetDTO): Promise<void>;
    updateSheet(Sheetid: string, createSheetDTO: CreateSheetDTO): Promise<void>;
    deleteSheet(Sheetid: string): Promise<void>;
    findAll(): Promise<Sheet[]>;
    Select(startpoints: string, endpoints: string): Promise<Sheet[]>;
    getSheetById(Sheetid: string): Promise<Sheet>;
    getSheetsByUser(userID: string): Promise<Array<Sheet>>;
}
