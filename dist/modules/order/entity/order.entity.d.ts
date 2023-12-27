import { Sheet } from '../../sheet/entity/sheet.entity';
import { Answer } from '../../answer/entity/answer.entity';
import { Evaluation } from 'src/modules/evaluation/entity/evaluation.entity';
export declare class Ordert {
    id: string;
    context: string;
    sheet: Sheet;
    answer: Answer;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    evaluation: Evaluation | null;
}
