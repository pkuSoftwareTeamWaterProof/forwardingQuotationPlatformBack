import { OrderService } from '../order/order.service';
import { Evaluation } from './entity/evaluation.entity';
import { Repository } from 'typeorm';
import { CreateEvaluationDTO } from './dto/CreateEvaluation.dto';
export declare class EvaluationService {
    private readonly evalRepository;
    private readonly orderService;
    constructor(evalRepository: Repository<Evaluation>, orderService: OrderService);
    createEvaluation(dto: CreateEvaluationDTO): Promise<CreateResult>;
    deleteEvaluation(evalId: string): Promise<void>;
    getEvaluationById(evalId: string): Promise<Evaluation>;
    getEvaluationByOrderId(orderId: string): Promise<Evaluation>;
    getEvaluationsByCustomerId(customerId: string): Promise<Array<Evaluation>>;
    getEvaluationsByForwarderId(forwarderId: string): Promise<Array<Evaluation>>;
    getAvgEvalOfForwarder(forwarderId: string): Promise<number | null>;
}
