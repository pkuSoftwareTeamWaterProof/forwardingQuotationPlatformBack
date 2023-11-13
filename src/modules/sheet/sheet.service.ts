import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(Sheet)
    private readonly sheetRepository: Repository<Sheet>,
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
  }

  async getSheetById(Sheetid: string): Promise<Sheet> {
    const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
    return sheet;
  }
}
