import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sheet } from './entity/answer.entity';
import { SheetController } from './answer.controller';
import { SheetService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sheet])],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
