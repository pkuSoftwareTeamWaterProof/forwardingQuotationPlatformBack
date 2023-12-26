import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from '../order/order.service';
import { Evaluation } from './entity/evaluation.entity';
import { Repository } from 'typeorm';
import { CreateEvaluationDTO } from './dto/CreateEvaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evalRepository: Repository<Evaluation>,
    private readonly orderService: OrderService
  ) {}

  async createEvaluation(dto: CreateEvaluationDTO): Promise<CreateResult> {
    const order = await this.orderService.getOrderById(dto.orderId);
    if (order === null) {
      return { success: false, cause: 'Unknown Order' };
    }
    const evaluation = new Evaluation();
    evaluation.score = dto.score;
    evaluation.comment = dto.comment;
    evaluation.order = order;
    await this.evalRepository.save(evaluation);
    return { success: true, cause: evaluation };
  }

  async deleteEvaluation(evalId: string){
    const entry = await this.evalRepository.softDelete({id : evalId});
  }

  async getEvaluationById(evalId: string): Promise<Evaluation> {
    const evaluation = await this.evalRepository.findOne({
      relations: ['ordert'],
      where: { id: evalId },
    });
    return evaluation;
  }

  async getEvaluationByOrderId(orderId: string): Promise<Evaluation> {
    const order = await this.orderService.getOrderById(orderId);
    if(order === null) return undefined;
    return order.evaluation;
  }

  async getEvaluationsByCustomerId(customerId: string): Promise<Array<Evaluation>> {
    const orders = await this.orderService.getOrderBycustomerId(customerId);
    return orders.map(order=>order.evaluation);
  }

  async getEvaluationsByForwarderId(forwarderId: string): Promise<Array<Evaluation>> {
    const orders = await this.orderService.getOrderByforwarderId(forwarderId);
    return orders.map(order=>order.evaluation);
  }

  async getAvgEvalOfForwarder(forwarderId: string): Promise<number|null> {
    const evals = await this.getEvaluationsByForwarderId(forwarderId);
    if(evals.length === 0){
        return null;
    }
    let sum = 0;
    evals.forEach(entry => {sum += entry.score});
    return sum/evals.length;
  }
}
