import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entity/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // 使用 TypeORM 操作数据库， 以下是基本设置
    // 按照个人 mysql 设置
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      // 需要写自己的
      username: 'root',
      // 需要写自己的
      password: 'dltjdwns12@',
      // 需要创建一个 ‘forwardingQuotationPlatform’ schema
      database: 'forwardingQuotationPlatform',
      // 创建的 entity 需要 import 到这里
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
