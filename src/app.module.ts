import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresTypeorm } from './config/postgres.typeorm.config';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(postgresTypeorm),
    BookModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
