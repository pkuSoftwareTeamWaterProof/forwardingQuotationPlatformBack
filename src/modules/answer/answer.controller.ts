import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { AnswerService } from './answer.service';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AnswerDTO } from './dto/Answer.dto';
import { Public } from '../../decorators/public.decorator';

@ApiTags('api/answer')
@Controller('api/answer')
export class AnswerController {
  constructor(private readonly answerservice: AnswerService) {}

  answerToDTO(answer: Answer): AnswerDTO {
    var sheetID = undefined;
    var forwarderID = undefined;
    if (answer['sheet'] === null) {
      console.error('Warning: An answer without a sheet');
      sheetID = null;
    } else {
      sheetID = answer.sheet.id;
    }
    if (answer['forwarder'] === null) {
      console.error('Warning: An answer without a forwarder');
      forwarderID = null;
    } else {
      forwarderID = answer.forwarder.id;
    }
    const dto: AnswerDTO = {
      id: answer.id,
      price: answer.price,
      remark: answer.remark,
      sheetID: sheetID,
      createdAt: answer.createdAt,
      updateAt: answer.updatedAt,
      forwarderID: forwarderID,
    };
    return dto;
  }

  @Public()
  @ApiCreatedResponse({ description: '创建报价单成功' })
  @Post('create')
  async createAnswer(@Body() createAnswerDTO: CreateAnswerDTO): Promise<void> {
    await this.answerservice.createAnswer(createAnswerDTO);
    return;
  }

  @Public()
  @ApiOkResponse({ description: '修改报价单成功' })
  @Put(':id')
  async updateAnswer(
    @Param('id') answerid: string,
    @Body() createAnswerDTO: CreateAnswerDTO
  ): Promise<void> {
    await this.answerservice.updateAnswer(answerid, createAnswerDTO);
    return;
  }

  @Public()
  @ApiOkResponse({ description: '删除报价单成功' })
  @Delete(':id')
  async deleteAnswer(@Param('id') answerid: string): Promise<void> {
    await this.answerservice.deleteAnswer(answerid);
    return;
  }

  @Public()
  @ApiOkResponse({
    description: '返回报价单ID对应的报价单',
    type: AnswerDTO,
  })
  @Get(':answerID')
  async getAnswerByAnswerId(
    @Param('answerID') answerid: string
  ): Promise<AnswerDTO> {
    const answer = await this.answerservice.getAnswerByAnswerId(answerid);
    if (answer === null) {
      throw new NotFoundException('Unknown Answer ID');
    }
    return this.answerToDTO(answer);
  }

  @Public()
  @ApiOkResponse({
    description: '返回该询价单的所有报价单',
    type: AnswerDTO,
    isArray: true,
  })
  @Get('sheet/:sheetID')
  async getAnswerBySheetId(
    @Param('sheetID') sheetid: string
  ): Promise<Array<AnswerDTO>> {
    const answers = await this.answerservice.getAnswerBySheetId(sheetid);
    return answers.map(this.answerToDTO);
  }

  @Public()
  @ApiOkResponse({
    description: '返回该货主的所有报价单',
    type: AnswerDTO,
    isArray: true,
  })
  @Get('list/:forwarderID')
  async getAnswersByUser(
    @Param('forwarderID') forwarderID: string
  ): Promise<Array<AnswerDTO>> {
    const answers = await this.answerservice.getAnswersByUser(forwarderID);
    return answers.map(this.answerToDTO);
  }
}
