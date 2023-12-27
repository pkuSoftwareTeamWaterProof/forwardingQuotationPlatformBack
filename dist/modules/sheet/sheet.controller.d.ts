import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { SheetService } from './sheet.service';
export declare class SheetController {
    private readonly sheetservice;
    constructor(sheetservice: SheetService);
    createSheet(createSheetDTO: CreateSheetDTO): Promise<void>;
    updateSheet(sheetid: string, createSheetDTO: CreateSheetDTO): Promise<void>;
    deleteSheet(sheetid: string): Promise<void>;
    getAllSheet(): Promise<Sheet[]>;
    selectSheet(startpoint: string, endpoint: string): Promise<Sheet[]>;
    getSheetById(sheetid: string): Promise<Sheet>;
    getSheetsByUser(customerID: string): Promise<Array<Sheet>>;
}
