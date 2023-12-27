import { CreateAnswerDTO } from './dto/CreateAnswer.dto';
import { Answer } from './entity/answer.entity';
import { AnswerService } from './answer.service';
import { AnswerDTO } from './dto/Answer.dto';
export declare class AnswerController {
    private readonly answerservice;
    constructor(answerservice: AnswerService);
    answerToDTO(answer: Answer): AnswerDTO;
    createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<void>;
    updateAnswer(answerid: string, createAnswerDTO: CreateAnswerDTO): Promise<void>;
    deleteAnswer(answerid: string): Promise<void>;
    getAnswerByAnswerId(answerid: string): Promise<AnswerDTO>;
    getAnswerBySheetId(sheetid: string): Promise<Array<AnswerDTO>>;
    getAnswersByUser(forwarderID: string): Promise<Array<AnswerDTO>>;
}
