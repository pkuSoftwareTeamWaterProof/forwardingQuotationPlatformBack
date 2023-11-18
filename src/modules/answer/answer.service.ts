import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';

import { SheetService } from '../sheet/sheet.service';
import { UserService } from '../user/user.service';
import { UserRole, Forwarder } from '../user/user.entity';

@Injectable()
export class AnswerService {
  constructor(
    private  readonly findsheet: SheetService,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>, 

    private readonly userService: UserService
  ) {} 

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = new Answer();
    const user = await this.userService.getUserById(createAnswerDTO.forwarderID);
    if(user == null || user.role!=UserRole.FORWARDER){
      throw new InternalServerErrorException("Unknown Forwarder");
    }
    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
    const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
    answer.sheet=sheet;
    answer.forwarder=(user as Forwarder);
    await this.answerRepository.manager.save(answer)
  }

  async getAnswerById(Answerid: string): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({ id: Answerid });
    return answer;
  }
}
