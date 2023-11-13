import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} from './secret'
import { User } from './modules/user/entity/user.entity';
import { Sheet } from './modules/sheet/entity/sheet.entity';
import { UserModule } from './modules/user/user.module';
import { SheetModule } from './modules/sheet/sheet.module';
import { Answer } from './modules/answer/entity/answer.entity';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [
    // 使用 TypeORM 操作数据库， 以下是基本设置
    // 按照个人 mysql 设置
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      // 需要写自己的
      username: DB_USERNAME,
      // 需要写自己的
      password: DB_PASSWORD,
      // 需要创建一个 ‘forwardingQuotationPlatform’ schema
      database: DB_NAME,
      // 创建的 entity 需要 import 到这里
      entities: [User,Sheet,Answer],
      //synchronize: true,
    }),
    UserModule,
    SheetModule,
    AnswerModule,
  ],
})
export class AppModule {}
