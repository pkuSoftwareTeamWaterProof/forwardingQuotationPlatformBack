import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { AnswerService } from './answer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerservice: AnswerService) {}

  @Post()
  async createAnswer(@Body() createAnswerDTO: CreateAnswerDTO): Promise<void> {
    await this.answerservice.createAnswer(createAnswerDTO);
    return;
  }

  @Get(':answerID')
  getUserById(@Param() answerid: string): Promise<Answer> {
    const answer = this.answerservice.getAnswerById(answerid);
    return answer;
  }
}
