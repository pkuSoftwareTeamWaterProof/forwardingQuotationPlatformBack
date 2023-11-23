import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Firm,
  Customer,
  Forwarder,
  Administrator,
} from './modules/user/entity/user.entity';
import { Sheet } from './modules/sheet/entity/sheet.entity';
import { UserModule } from './modules/user/user.module';
import { SheetModule } from './modules/sheet/sheet.module';
import { Answer } from './modules/answer/entity/answer.entity';
import { AnswerModule } from './modules/answer/answer.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 使用 TypeORM 操作数据库， 以下是基本设置
    // 按照个人 mysql 设置
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      // 需要写自己的
      username: process.env.DB_USERNAME,
      // 需要写自己的
      password: process.env.DB_PASSWORD,
      // 需要创建一个 ‘forwardingQuotationPlatform’ schema
      database: process.env.DB_NAME,
      // 创建的 entity 需要 import 到这里
      entities: [Firm, Customer, Forwarder, Administrator, Sheet, Answer],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SheetModule,
    AnswerModule,
  ],
})
export class AppModule {}
