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
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ReturnSheetDTO } from './dto/ReturnSheet.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('询价单管理')
@Controller('api/sheet')
export class SheetController {
  constructor(private readonly sheetservice: SheetService) {}

  @Public()
  @ApiOperation({ summary: '创建询价单' })
  @Post('create')
  async createSheet(@Body() createSheetDTO: CreateSheetDTO): Promise<void> {
    await this.sheetservice.createSheet(createSheetDTO);
    return;
  }

  @Public()
  @ApiOperation({ summary: '更新询价单' })
  @Put(':id')
  async updateSheet(
    @Param('id') sheetid: string,
    @Body() createSheetDTO: CreateSheetDTO
  ): Promise<void> {
    await this.sheetservice.updateSheet(sheetid, createSheetDTO);
    return;
  }

  @Public()
  @ApiOperation({ summary: '删除询价单' })
  @Delete(':id')
  async deleteSheet(@Param('id') sheetid: string): Promise<void> {
    await this.sheetservice.deleteSheet(sheetid);
    return;
  }

  @Public()
  @ApiOperation({ summary: '查询全部询价单' })
  @Get()
  @ApiOkResponse({ description: '返回全部表单-列表', type: ReturnSheetDTO })
  async getAllSheet(): Promise<Sheet[]> {
    return await this.sheetservice.findAll();
  }

  @Public()
  @ApiOperation({ summary: '查询符合条件的询价单' })
  @Get('select/:startpoint/:endpoint')
  @ApiOkResponse({ description: '返回相应条件表单-列表', type: ReturnSheetDTO })
  async selectSheet(
    @Param('startpoint') startpoint: string,
    @Param('endpoint') endpoint: string
  ): Promise<Sheet[]> {
    return this.sheetservice.Select(startpoint, endpoint);
  }

  @Public()
  @ApiOperation({ summary: '查询货主的询价单' })
  @Get(':sheetId')
  @ApiOkResponse({ description: '返回货主的表单', type: ReturnSheetDTO })
  async getSheetById(@Param('sheetId') sheetid: string): Promise<Sheet> {
    const sheet = this.sheetservice.getSheetById(sheetid);
    return sheet;
  }

  @Public()
  @ApiOperation({ summary: '查询货代的询价单' })
  @Get('list/:customerID')
  @ApiOkResponse({
    description: '返回货代的表单-列表',
    type: ReturnSheetDTO,
  })
  async getSheetsByUser(
    @Param('customerID') customerID: string
  ): Promise<Array<Sheet>> {
    const sheets = this.sheetservice.getSheetsByUser(customerID);
    return sheets;
  }
}
