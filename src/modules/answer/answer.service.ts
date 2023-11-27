import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { SheetService } from '../sheet/sheet.service';
import { UserService } from '../user/user.service';
import { UserRole, Forwarder } from '../user/entity/user.entity';

@Injectable()
export class AnswerService {
  constructor(
    private readonly findsheet: SheetService,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    private readonly userService: UserService
  ) {}

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = new Answer();
    const user = await this.userService.getUserById(
      createAnswerDTO.forwarderID
    );
    if (user == null || user.role != UserRole.FORWARDER) {
      throw new BadRequestException('Unknown Forwarder');
    }
    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
    const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
    answer.sheet = sheet;
    answer.forwarder = user as Forwarder;
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

  async getAnswerByAnswerId(Answerid: string): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({ id: Answerid });
    return answer;
  }

  async getAnswerBySheetId(sheetid: string): Promise<Array<Answer>> {
    const sheet = await this.findsheet.getSheetById(sheetid);
    return sheet.answer;
  }

  async getAnswersByUser(userID: string): Promise<Array<Answer>> {
    const user = (await this.userService.getUserById(
      userID,
      UserRole.FORWARDER
    )) as Forwarder;
    if (user == null) {
      throw new BadRequestException('Unknown User');
    }
    const sheets = await this.answerRepository.find({
      relations: { forwarder: true },
      where: { forwarder: { id: userID } },
    });
    return sheets;
  }
}
