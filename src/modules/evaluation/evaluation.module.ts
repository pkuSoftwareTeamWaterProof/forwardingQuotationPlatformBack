import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordert } from '../order/entity/order.entity';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { Evaluation } from './entity/evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, Ordert])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
