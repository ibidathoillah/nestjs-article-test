import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from './access.module';
import { RoleAccessModule } from './role_access.module';
import { UserAccessRepository } from './user_access.repository';
import { UserAccessService } from './user_access.service';

@Module({
  imports: [
    RoleAccessModule,
    AccessModule,
    TypeOrmModule.forFeature([UserAccessRepository], 'postgres')
  ],
  providers: [UserAccessService],
  exports: [
    UserAccessService,
    TypeOrmModule,
  ]
})
export class UserAccessModule {}
