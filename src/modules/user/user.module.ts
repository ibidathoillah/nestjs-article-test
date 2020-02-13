import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forFeature([UserRepository], 'postgres')
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
