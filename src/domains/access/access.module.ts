import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessRepository } from './access.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessRepository], 'postgres')
  ],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [
    AccessService,
    TypeOrmModule
  ]
})
export class AccessModule {}
