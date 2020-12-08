import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository], 'postgres')
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [
    ArticleService,
    TypeOrmModule
  ]
})
export class ArticleModule {}
