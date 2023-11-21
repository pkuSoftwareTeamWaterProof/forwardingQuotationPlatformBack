import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entity/answer.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { SheetService } from '../sheet/sheet.service';
import { Sheet } from '../sheet/entity/sheet.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([Sheet]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService, SheetService],
})
export class AnswerModule {}
