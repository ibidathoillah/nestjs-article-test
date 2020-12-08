import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from './access.module';
import { RoleAccessRepository } from './role_access.repository';
import { RoleAccessService } from './role_access.service';
import { UserAccessModule } from './user_access.module';

@Module({
  imports: [
    AccessModule,
    TypeOrmModule.forFeature([RoleAccessRepository], 'postgres')
  ],
  providers: [RoleAccessService],
  exports: [
    RoleAccessService,
    TypeOrmModule,
  ]
})
export class RoleAccessModule {}
