import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { SheetService } from '../sheet/sheet.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>, private readonly findsheet: SheetService
  ) {}

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = new Answer();
    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
    const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
    answer.sheet=sheet;
    await this.answerRepository.manager.save(answer)
  }

  async getAnswerById(Answerid: string): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({ id: Answerid });
    return answer;
  }
}
