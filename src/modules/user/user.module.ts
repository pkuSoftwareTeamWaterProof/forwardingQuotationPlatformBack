import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController, FirmController } from './user.controller';
import { UserService } from './user.service';
import { Firm } from './entity/firm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Firm])],
  controllers: [UserController, FirmController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
