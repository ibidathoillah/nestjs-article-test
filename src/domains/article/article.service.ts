import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../databases/entities/article/article.entity';
import { CreateArticleDTO } from './dto/create-article.dto';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleRepository, 'postgres')
        private articlesRepository: ArticleRepository
    ) {}
    
    async getById(id: number): Promise<Article> {
        const article = await this.articlesRepository.findOne(id)
        if (!article) throw new NotFoundException('article not found')
        return article
    }
    
    async getAll(): Promise<any[]> {
        const articles = await this.articlesRepository.find({})
        return articles
    }

    async createArticle(newArticle: CreateArticleDTO): Promise<Article> {
        const article = await this.articlesRepository.save(newArticle)
        return article
    }

    async updateArticle(id: number, updateArticle: CreateArticleDTO): Promise<Article> {
        const article = await this.getById(id)
        await this.articlesRepository.update(article.id, updateArticle)
        return await this.getById(article.id)
    }

    async deleteArticle(id: number): Promise<string> {
        const article = await this.getById(id)
        await this.articlesRepository.delete(article.id)
        return 'deleted'
    }
    
}
