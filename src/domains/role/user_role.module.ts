import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role.module';
import { UserRoleRepository } from './user_role.repository';
import { UserRoleService } from './user_role.service';

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([UserRoleRepository], 'postgres')
  ],
  providers: [UserRoleService],
  exports: [
    UserRoleService,
    TypeOrmModule,
  ]
})
export class UserRoleModule {}
