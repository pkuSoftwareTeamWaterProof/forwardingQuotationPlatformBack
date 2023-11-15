import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Customer, Forwarder, Administrator, Firm } from './user.entity';
import { UserController,FirmController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Forwarder, Administrator, Firm])],
  controllers: [UserController, FirmController],
  providers: [UserService],
})
export class UserModule {}
