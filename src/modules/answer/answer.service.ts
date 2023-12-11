import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { SheetService } from '../sheet/sheet.service';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/entity/user.entity';

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
      createAnswerDTO.forwarderID,
      UserRole.FORWARDER
    );
    if (user == null) {
      throw new BadRequestException('Unknown Forwarder');
    }
    answer.price = createAnswerDTO.price;
    answer.remark = createAnswerDTO.remark;
    const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
    if (sheet == null){
      throw new BadRequestException('Unknown Sheet');
    }
    answer.sheet = sheet;
    answer.forwarder = user;
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
    const answer = await this.answerRepository.findOne({
      relations: ['sheet','forwarder'],
      where: { id: Answerid },
    });
    return answer;
  }

  async getAnswerBySheetId(sheetid: string): Promise<Array<Answer>> {
    const sheet = await this.findsheet.getSheetById(sheetid);

    return this.answerRepository.find({
      relations: ['sheet','forwarder'],
      where: { sheet: { id: sheetid } },
    });
  }

  async getAnswersByUser(userID: string): Promise<Array<Answer>> {
    const user = await this.userService.getUserById(userID, UserRole.FORWARDER);
    if (user == null) {
      throw new BadRequestException('Unknown User');
    }
    const sheets = await this.answerRepository.find({
      relations: ['sheet','forwarder'],
      where: { forwarder: { id: userID } },
    });
    return sheets;
  }
}
