import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { SheetService } from '../sheet/sheet.service';

@Injectable()
export class AnswerService {
  constructor(
    private readonly findsheet: SheetService,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>
  ) {}

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = new Answer();
    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
    const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
    answer.sheet = sheet;
    await this.answerRepository.manager.save(answer);
  }

  async updateAnswer(Answerid: string, createAnswerDTO: CreateAnswerDTO) {
    const answer = await this.answerRepository.findOneBy({ id: Answerid });

    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
    const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
    answer.sheet = sheet;
    await this.answerRepository.manager.save(answer);
  }
  async deleteAnswer(Answerid: string) {
    await this.answerRepository.softDelete({ id: Answerid });
  }
  async getAnswerById(Answerid: string): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({ id: Answerid });
    return answer;
  }
}
