import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserRoleModule } from '../role/user_role.module';
import { UserAccessModule } from '../access/user_access.module';
import { RoleAccessModule } from '../access/role_access.module';

@Global()
@Module({
  imports: [
    RoleAccessModule,
    UserRoleModule,
    UserAccessModule,
    TypeOrmModule.forFeature([UserRepository], 'postgres')
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports: [
    TypeOrmModule,
    UserService
  ]
})
export class UserModule {}
