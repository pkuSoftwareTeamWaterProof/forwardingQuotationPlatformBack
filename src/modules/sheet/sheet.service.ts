import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { Answer } from '../answer/entity/answer.entity';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(Sheet)
    private readonly sheetRepository: Repository<Sheet>
  ) {}

  async createSheet(createSheetDTO: CreateSheetDTO) {
    const sheet = new Sheet();
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
  }

  async updateSheet(Sheetid: string, createSheetDTO: CreateSheetDTO) {
    const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
    if (!sheet.answer && sheet.live) {
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
    const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
    sheet.live = false;
    await this.sheetRepository.manager.save(sheet);
  }

  async findAll(): Promise<Sheet[]> {
    return this.sheetRepository.find({
      where: {
        live: true, // 这里可以根据需要更改条件，比如 { items: [] } 来查询空数组的实体
      },
    });
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
    if (sheet.live) {
      return sheet;
    } else {
      return null;
    }
  }
}
