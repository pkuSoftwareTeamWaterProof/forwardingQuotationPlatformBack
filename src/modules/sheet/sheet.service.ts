import { Injectable } from '@nestjs/common';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { Answer } from '../answer/entity/answer.entity';
import { UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(Sheet)
    private readonly sheetRepository: Repository<Sheet>,
    private userService: UserService
  ) {}

  async createSheet(createSheetDTO: CreateSheetDTO) {
    const sheet = new Sheet();
    const user = await this.userService.getUserById(createSheetDTO.customerID);
    if(user == null || user.role != UserRole.CUSTOMER){
      throw new InternalServerErrorException("Unknown Customer");
    }
    sheet.startpoint = createSheetDTO.startpoint;
    sheet.endpoint = createSheetDTO.endpoint;
    sheet.weight = createSheetDTO.weight;
    sheet.size = createSheetDTO.size;
    sheet.species = createSheetDTO.species;
    sheet.type_of_shipping = createSheetDTO.type_of_shipping;
    sheet.remark = createSheetDTO.remark;
    sheet.startdate = createSheetDTO.startdate;
    sheet.enddate = createSheetDTO.enddate;
    await this.sheetRepository.manager.save(sheet)
  }
 
  async findAll(): Promise<Sheet[]> {
    return this.sheetRepository.find();
  }

  async getSheetById(Sheetid: string): Promise<Sheet> {
    const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
    return sheet;
  }
}
