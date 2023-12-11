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
import { Public } from 'src/decorators/public.decorator';

@ApiTags('api/answer')
@Controller('api/answer')
export class AnswerController {
  constructor(private readonly answerservice: AnswerService) {}

  @Public()
  @Post('create')
  async createAnswer(@Body() createAnswerDTO: CreateAnswerDTO): Promise<void> {
    await this.answerservice.createAnswer(createAnswerDTO);
    return;
  }
  
  @Public()
  @Put(':id')
  async updateAnswer(
    @Param('id') answerid: string,
    @Body() createAnswerDTO: CreateAnswerDTO
  ): Promise<void> {
    await this.answerservice.updateAnswer(answerid, createAnswerDTO);
    return;
  }

  @Public()
  @Delete(':id')
  async deleteAnswer(@Param('id') answerid: string): Promise<void> {
    await this.answerservice.deleteAnswer(answerid);
    return;
  }

  @Public()
  @Get(':answerID')
  getAnswerByAnswerId(@Param('answerID') answerid: string): Promise<Answer> {
    const answer = this.answerservice.getAnswerByAnswerId(answerid);
    return answer;
  }

  @Public()
  @Get(':sheetID')
  getAnswerBySheetId(
    @Param('sheetID') sheetid: string
  ): Promise<Array<Answer>> {
    return this.answerservice.getAnswerBySheetId(sheetid);
  }

  @Public()
  @Get('list/:forwarderID')
  async getAnswersByUser(
    @Param('forwarderID') forwarderID: string
  ): Promise<Array<Answer>> {
    const answers = await this.answerservice.getAnswersByUser(forwarderID);
    return answers;
  }
}
