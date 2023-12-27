import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDTO } from './dto/CreateEvaluation.dto';
import { ReturnEvaluationDTO } from './dto/ReturnEvaluation.dto';
import { Evaluation } from './entity/evaluation.entity';
import { ReturnAvgEvalDTO } from './dto/ReturnAvgEval.dto';
export declare class EvaluationController {
    private readonly service;
    constructor(service: EvaluationService);
    evaluationWrapper(entry: Evaluation): ReturnEvaluationDTO;
    createEvaluation(dto: CreateEvaluationDTO): Promise<void>;
    deleteEvaluation(evalId: string): Promise<void>;
    getEvaluationById(evalId: string): Promise<ReturnEvaluationDTO>;
    getEvaluationByOrderId(orderId: string): Promise<ReturnEvaluationDTO>;
    getEvaluationsByForwarderId(forwarderId: string): Promise<Array<ReturnEvaluationDTO>>;
    getAvgEvalOfForwarder(forwarderId: string): Promise<ReturnAvgEvalDTO>;
}
