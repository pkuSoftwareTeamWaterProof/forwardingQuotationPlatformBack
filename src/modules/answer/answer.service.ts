import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = new Answer();
    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
  }

  async getAnswerById(Answerid: string): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({ id: Answerid });
    return answer;
  }
}
