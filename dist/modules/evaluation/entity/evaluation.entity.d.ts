import { Ordert } from 'src/modules/order/entity/order.entity';
export declare class Evaluation {
    id: string;
    order: Ordert;
    score: EvaluationScore;
    comment: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
