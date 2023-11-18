import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sheet } from './entity/sheet.entity';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sheet])],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
