import { SeederSevice } from "./seeder.service";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from "src/domains/role/role.repository";
import { AccessRepository } from "src/domains/access/access.repository";
import { UserRepository } from "src/domains/user/user.repository";
import { UserAccessRepository } from "src/domains/access/user_access.repository";
import { UserRoleRepository } from "src/domains/role/user_role.repository";
import { RoleAccessRepository } from "src/domains/access/role_access.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository,
      AccessRepository,
      UserRepository,
      UserRoleRepository,
      UserAccessRepository,
      RoleAccessRepository,
    ], 'postgres')
  ],
  providers: [SeederSevice],
  exports: [
    TypeOrmModule
  ]
})
export class SeederModule {}
