import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { AnswerService } from './answer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/answer')
@Controller('api/answer')
export class AnswerController {
  constructor(private readonly answerservice: AnswerService) {}

  @Post('create')
  async createAnswer(@Body() createAnswerDTO: CreateAnswerDTO): Promise<void> {
    await this.answerservice.createAnswer(createAnswerDTO);
    return;
  }

  @Put(':id')
  async updateAnswer(
    @Param('id') answerid: string,
    @Body() createAnswerDTO: CreateAnswerDTO
  ): Promise<void> {
    await this.answerservice.updateAnswer(answerid, createAnswerDTO);
    return;
  }

  @Delete(':id')
  async deleteAnswer(@Param('id') answerid: string): Promise<void> {
    await this.answerservice.deleteAnswer(answerid);
    return;
  }

  @Get(':answerID')
  getAnswerByAnswerId(@Param() answerid: string): Promise<Answer> {
    const answer = this.answerservice.getAnswerByAnswerId(answerid);
    return answer;
  }

  @Get(':sheetID')
  getAnswerBySheetId(@Param() sheetid: string): Promise<Array<Answer>> {
    return this.answerservice.getAnswerBySheetId(sheetid);
  }

  @Get('list/:forwarderID')
  async getAnswersByUser(
    @Param('forwarderID') forwarderID: string
  ): Promise<Array<Answer>> {
    const answers = await this.answerservice.getAnswersByUser(forwarderID);
    return answers;
  }
}
