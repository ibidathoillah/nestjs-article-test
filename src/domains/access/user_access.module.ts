import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from './access.module';
import { UserAccessRepository } from './user_access.repository';
import { UserAccessService } from './user_access.service';

@Module({
  imports: [
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
