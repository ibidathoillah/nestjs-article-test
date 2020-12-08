import { Module } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { NestModule } from '@nestjs/common/interfaces/modules/nest-module.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresTypeorm } from './config/postgres.typeorm.config';
import { SeederModule } from './databases/seeder/seeder.module';
import { ArticleModule } from './domains/article/article.module';
import { AuthModule } from './domains/auth/auth.module';
import { RoleModule } from './domains/role/role.module';
import { UserRoleModule } from './domains/role/user_role.module';
import { UserModule } from './domains/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(postgresTypeorm),
    ArticleModule,
    AuthModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    SeederModule,
  ]
})

export class AppModule {}
