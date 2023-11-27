import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSheetDTO } from './dto/createSheet.dto';
import { Sheet } from './entity/sheet.entity';
import { SheetService } from './sheet.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/sheet')
@Controller('api/sheet')
export class SheetController {
  constructor(private readonly sheetservice: SheetService) {}

  @Post('create')
  async createSheet(@Body() createSheetDTO: CreateSheetDTO): Promise<void> {
    await this.sheetservice.createSheet(createSheetDTO);
    return;
  }

  @Put(':id')
  async updateSheet(
    @Param('id') sheetid: string,
    @Body() createSheetDTO: CreateSheetDTO
  ): Promise<void> {
    await this.sheetservice.updateSheet(sheetid, createSheetDTO);
    return;
  }

  @Delete(':id')
  async deleteSheet(@Param('id') sheetid: string): Promise<void> {
    await this.sheetservice.deleteSheet(sheetid);
    return;
  }

  @Get()
  async getAllSheet(): Promise<Sheet[]> {
    return await this.sheetservice.findAll();
  }

  @Get('select')
  async selectSheet(@Query() queryParams: any): Promise<Sheet[]> {
    return this.sheetservice.Select(
      queryParams.startpoint,
      queryParams.endpoint
    );
  }

  @Get(':sheetId')
  async getSheetById(@Param('sheetId') sheetid: string): Promise<Sheet> {
    const sheet = this.sheetservice.getSheetById(sheetid);
    return sheet;
  }

  @Get('list/:customerID')
  async getSheetsByUser(
    @Param('customerID') customerID: string
  ): Promise<Array<Sheet>> {
    const sheets = this.sheetservice.getSheetsByUser(customerID);
    return sheets;
  }
}
