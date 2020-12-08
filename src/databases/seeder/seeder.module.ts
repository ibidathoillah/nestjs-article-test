import { SeederSevice } from "./seeder.service";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from "src/domains/role/role.repository";
import { AccessRepository } from "src/domains/access/access.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository,AccessRepository], 'postgres')
  ],
  providers: [SeederSevice],
  exports: [
    TypeOrmModule
  ]
})
export class SeederModule {}
