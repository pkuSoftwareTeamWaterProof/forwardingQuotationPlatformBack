import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { Answer } from '../answer/entity/answer.entity';
import { User, UserRole } from '../user/entity/user.entity';
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
    //TODO: bug fix
    // const user = await this.userService.getUserById(createSheetDTO.customerID);
    const userId = createSheetDTO.customerID;
    if (userId == null) {
      throw new BadRequestException('Unknown Customer');
    }
    const customer = await this.userService.getUserById(userId, UserRole.CUSTOMER);
    if (customer == null){
      throw new BadRequestException('Unknown Customer');
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
    sheet.customer = customer;
    await this.sheetRepository.manager.save(sheet);
  }

  async updateSheet(Sheetid: string, createSheetDTO: CreateSheetDTO) {
    const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
    if (!sheet.answer) {
      sheet.startpoint = createSheetDTO.startpoint;
      sheet.endpoint = createSheetDTO.endpoint;
      sheet.weight = createSheetDTO.weight;
      sheet.size = createSheetDTO.size;
      sheet.species = createSheetDTO.species;
      sheet.type_of_shipping = createSheetDTO.type_of_shipping;
      sheet.remark = createSheetDTO.remark;
      sheet.startdate = createSheetDTO.startdate;
      sheet.enddate = createSheetDTO.enddate;
      await this.sheetRepository.manager.save(sheet);
    } else {
      throw new BadRequestException();
    }
  }

  async deleteSheet(Sheetid: string) {
    const sheet = await this.sheetRepository.softDelete({ id: Sheetid });
  }

  async findAll(): Promise<Sheet[]> {
    return this.sheetRepository.find();
  }

  async Select(startpoints: string, endpoints: string): Promise<Sheet[]> {
    return this.sheetRepository.find({
      where: {
        startpoint: startpoints, // 这里可以根据需要更改条件，比如 { items: [] } 来查询空数组的实体
        endpoint: endpoints,
      },
    });
  }

  async getSheetById(Sheetid: string): Promise<Sheet> {
    const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
    return sheet;
  }

  async getSheetsByUser(userID: string): Promise<Array<Sheet>> {
    const user = (await this.userService.getUserById(
      userID,
      UserRole.CUSTOMER
    ));
    if (user == null) {
      throw new BadRequestException('Unknown User');
    }
    const sheets = await this.sheetRepository.find({
      relations: { customer: true },
      where: { customer: { id: userID } },
    });
    return sheets;
  }
}
