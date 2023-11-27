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
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

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
  @ApiOkResponse({ description: '返回全部表单' })
  async getAllSheet(): Promise<Sheet[]> {
    return await this.sheetservice.findAll();
  }

  @Get('select/:startpoint/:endpoint')
  @ApiOkResponse({ description: '返回相应条件表单' })
  async selectSheet(
    @Param('startpoint') startpoint: string,
    @Param('endpoint') endpoint: string
  ): Promise<Sheet[]> {
    return this.sheetservice.Select(startpoint, endpoint);
  }

  @Get(':sheetId')
  @ApiOkResponse({ description: '返回对应sheetid的表单' })
  async getSheetById(@Param('sheetId') sheetid: string): Promise<Sheet> {
    const sheet = this.sheetservice.getSheetById(sheetid);
    return sheet;
  }

  @Get('list/:customerID')
  @ApiOkResponse({ description: '返回customerid对应的表单' })
  async getSheetsByUser(
    @Param('customerID') customerID: string
  ): Promise<Array<Sheet>> {
    const sheets = this.sheetservice.getSheetsByUser(customerID);
    return sheets;
  }
}
