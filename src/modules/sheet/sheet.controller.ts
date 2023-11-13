import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { SheetService } from './sheet.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sheet')
@Controller('sheet')
export class SheetController {
  constructor(private readonly sheetservice: SheetService) {}

  @Post()
  async createSheet(@Body() createSheetDTO: CreateSheetDTO): Promise<void> {
    await this.sheetservice.createSheet(createSheetDTO);
    return;
  }

  @Get(':userId')
  getUserById(@Param() sheetid: string): Promise<Sheet> {
    const sheet = this.sheetservice.getSheetById(sheetid);
    return sheet;
  }
}
