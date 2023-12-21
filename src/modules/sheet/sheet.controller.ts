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
import { ReturnSheetDTO } from './dto/ReturnSheet.dto';
import { Public } from '../../decorators/public.decorator';
import { BadRequestException } from '@nestjs/common';

@ApiTags('api/sheet')
@Controller('api/sheet')
export class SheetController {
  constructor(private readonly sheetservice: SheetService) {}

  @Public()
  @Post('create')
  async createSheet(@Body() createSheetDTO: CreateSheetDTO): Promise<void> {
    await this.sheetservice.createSheet(createSheetDTO);
    return;
  }

  @Public()
  @Put(':id')
  async updateSheet(
    @Param('id') sheetid: string,
    @Body() createSheetDTO: CreateSheetDTO
  ): Promise<void> {
    await this.sheetservice.updateSheet(sheetid, createSheetDTO);
    return;
  }

  @Public()
  @Delete(':id')
  async deleteSheet(@Param('id') sheetid: string): Promise<void> {
    await this.sheetservice.deleteSheet(sheetid);
    return;
  }

  @Public()
  @Get()
  @ApiOkResponse({ description: '返回全部表单-列表', type: ReturnSheetDTO })
  async getAllSheet(): Promise<Sheet[]> {
    return await this.sheetservice.findAll();
  }

  @Public()
  @Get('select/:startpoint/:endpoint')
  @ApiOkResponse({ description: '返回相应条件表单-列表', type: ReturnSheetDTO })
  async selectSheet(
    @Param('startpoint') startpoint: string,
    @Param('endpoint') endpoint: string
  ): Promise<Sheet[]> {
    return this.sheetservice.Select(startpoint, endpoint);
  }

  @Public()
  @Get(':sheetId')
  @ApiOkResponse({ description: '返回对应sheetid的表单', type: ReturnSheetDTO })
  async getSheetById(@Param('sheetId') sheetid: string): Promise<Sheet> {
    const sheet = await this.sheetservice.getSheetById(sheetid);
    if (sheet === null) {
      throw new BadRequestException('Unknown Sheet ID');
    }
    return sheet;
  }

  @Public()
  @Get('list/:customerID')
  @ApiOkResponse({
    description: '返回customerid对应的表单-列表',
    type: ReturnSheetDTO,
  })
  async getSheetsByUser(
    @Param('customerID') customerID: string
  ): Promise<Array<Sheet>> {
    const sheets = this.sheetservice.getSheetsByUser(customerID);
    return sheets;
  }
}
