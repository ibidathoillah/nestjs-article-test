import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository], 'postgres')
  ],
  providers: [RoleService],
  exports: [
    RoleService,
    TypeOrmModule,
  ]
})
export class RoleModule {}
