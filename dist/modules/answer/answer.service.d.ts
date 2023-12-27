import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { SheetService } from '../sheet/sheet.service';
import { UserService } from '../user/user.service';
export declare class AnswerService {
    private readonly findsheet;
    private readonly answerRepository;
    private readonly userService;
    constructor(findsheet: SheetService, answerRepository: Repository<Answer>, userService: UserService);
    createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<void>;
    updateAnswer(Answerid: string, createAnswerDTO: CreateAnswerDTO): Promise<void>;
    deleteAnswer(Answerid: string): Promise<void>;
    getAnswerByAnswerId(Answerid: string): Promise<Answer>;
    getAnswerBySheetId(sheetid: string): Promise<Array<Answer>>;
    getAnswersByUser(userID: string): Promise<Array<Answer>>;
}
