import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SheetService } from '../sheet/sheet.service';
import { Sheet } from '../sheet/entity/sheet.entity';
import { Answer } from '../answer/entity/answer.entity';
import { AnswerService } from '../answer/answer.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([Sheet]),
  ],
  controllers: [OrderController],
  providers: [OrderService, SheetService, AnswerService],
})
export class OrderModule {}
